import { getGlossaryEntryById, type GlossaryEntry } from "@/lib/docs-glossary";
import {
  buildExpandedRetrievalQuery,
  INTERPRETED_CONCEPT_HREF_PREFIX,
  type AskQInterpretedConcept,
} from "@/lib/ask-q/interpretQuery";
import { glossarySearchScopeForFilter, searchDocsNavPages, type DocsNavPageHit } from "@/lib/searchGlossary";
import { normalizeSearchQuery, searchGlossaryTerms, type GlossarySearchResult } from "@/lib/searchGlossaryTerms";
import { TERMINOLOGY_ENTRIES, type TerminologyEntry } from "@/lib/terminology-registry";

const GLOSSARY_MATCH_LIMIT = 8;
const REGISTRY_MATCH_LIMIT = 8;
const SOURCE_DOC_LIMIT = 8;
/** Wider candidate pool before core-doc boost reranking (final slice still capped above). */
const RETRIEVAL_CANDIDATE_POOL = 24;
const MAX_SOURCES = 16;

/** Ask Q retrieval boosts rows tied to these canonical hubs (prefix match on hrefs). */
const CORE_DOC_PREFIXES = [
  "/docs/system-runtime",
  "/docs/end-to-end",
  "/docs/contracts",
  "/docs/authority-map",
] as const;

/** Glossary rows used as always-on structural anchors for the model (no user→concept string map). */
const CANONICAL_SKILL_ENTRY_IDS = ["system-runtime", "contracts-hub", "authority-map", "runtime-truth"] as const;

export type AskQSource = {
  href: string;
  title: string;
};

export type RegistrySearchResult = {
  entry: TerminologyEntry;
  score: number;
};

export type AskQRetrievalSnapshot = {
  queryNormalized: string;
  glossaryHits: GlossarySearchResult[];
  registryHits: RegistrySearchResult[];
  sourceDocs: DocsNavPageHit[];
  /** Deduped hrefs for UI and for the model “open these pages” list. */
  sources: AskQSource[];
};

export type GatherAskQRetrievalOptions = {
  query: string;
  pathname?: string;
  concepts?: readonly AskQInterpretedConcept[];
  /** Optional prior user text for mild lexical expansion (capped; keep short). */
  lexicalContext?: string;
};

type RetrievalBoostOpts = {
  pathname?: string;
  concepts?: readonly AskQInterpretedConcept[];
};

function docsSectionPrefix(pathname: string): string | null {
  const p = pathname.split("#")[0];
  const m = p.match(/^(\/docs\/[^/]+)/);
  return m ? m[1] : null;
}

function pathnameHrefBoost(href: string, pathname?: string): number {
  if (!pathname) return 0;
  const pathBase = pathname.split("#")[0].replace(/\/+$/, "") || pathname;
  const hrefBase = href.split("#")[0].replace(/\/+$/, "");
  if (hrefBase === pathBase || hrefBase === `${pathBase}/`) return 92;
  const sec = docsSectionPrefix(pathBase);
  if (!sec) return 0;
  if (hrefBase === sec || href.startsWith(`${sec}/`) || href.startsWith(`${sec}#`)) return 46;
  return 0;
}

function interpretedConceptHrefBoost(href: string, concepts?: readonly AskQInterpretedConcept[]): number {
  if (!concepts?.length) return 0;
  let b = 0;
  const h = href.split("#")[0];
  for (const c of concepts) {
    const p = INTERPRETED_CONCEPT_HREF_PREFIX[c];
    if (h === p || href.startsWith(`${p}/`) || href.startsWith(`${p}#`)) b += 48;
  }
  return Math.min(b, 110);
}

function combinedLocationBoost(href: string, opts?: RetrievalBoostOpts): number {
  return Math.min(
    150,
    pathnameHrefBoost(href, opts?.pathname) + interpretedConceptHrefBoost(href, opts?.concepts),
  );
}

function glossaryContextBoost(entry: GlossaryEntry, opts?: RetrievalBoostOpts): number {
  let b = combinedLocationBoost(entry.href, opts);
  const urls = [...(entry.relatedHrefs ?? []), ...(entry.sourceHrefs ?? [])];
  let side = 0;
  for (const u of urls) {
    side = Math.max(side, combinedLocationBoost(u, opts));
  }
  return b + Math.min(side, 40);
}

function registryContextBoost(entry: TerminologyEntry, opts?: RetrievalBoostOpts): number {
  return combinedLocationBoost(entry.authority_href, opts);
}

/** Glossary rows ranked for Ask Q (full `DOCS_GLOSSARY` pool, no path scope). */
export function retrieveGlossaryMatches(query: string): GlossarySearchResult[] {
  return searchGlossaryTerms(query, { limit: GLOSSARY_MATCH_LIMIT });
}

function mergeGlossaryResultsByEntryId(a: GlossarySearchResult[], b: GlossarySearchResult[]): GlossarySearchResult[] {
  const byId = new Map<string, GlossarySearchResult>();
  for (const h of a) {
    byId.set(h.entry.id, h);
  }
  for (const h of b) {
    const prev = byId.get(h.entry.id);
    if (!prev || h.score > prev.score) byId.set(h.entry.id, h);
  }
  return [...byId.values()].sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    return x.entry.label.localeCompare(y.entry.label, undefined, { sensitivity: "base" });
  });
}

/** Wider glossary pool: merges path-scoped hits with global hits so cross-layer terms are not dropped. */
function retrieveGlossaryCandidatesForAskQ(query: string, pathname?: string): GlossarySearchResult[] {
  const globalHits = searchGlossaryTerms(query, { limit: RETRIEVAL_CANDIDATE_POOL });
  const scope = pathname?.trim() ? glossarySearchScopeForFilter(pathname.trim()) : undefined;
  if (!scope) return globalHits;
  const scopedHits = searchGlossaryTerms(query, { limit: RETRIEVAL_CANDIDATE_POOL, scope });
  return mergeGlossaryResultsByEntryId(scopedHits, globalHits).slice(0, RETRIEVAL_CANDIDATE_POOL);
}

function hrefTouchesCoreDoc(href: string): boolean {
  return CORE_DOC_PREFIXES.some(
    (p) => href === p || href.startsWith(`${p}/`) || href.startsWith(`${p}#`),
  );
}

function glossaryCoreBoost(entry: GlossaryEntry): number {
  let b = 0;
  if (hrefTouchesCoreDoc(entry.href)) b += 140;
  const urls = [...(entry.sourceHrefs ?? []), ...(entry.relatedHrefs ?? [])];
  if (urls.some((u) => hrefTouchesCoreDoc(u))) b += 50;
  return Math.min(b, 220);
}

function registryCoreBoost(entry: TerminologyEntry): number {
  return hrefTouchesCoreDoc(entry.authority_href) ? 100 : 0;
}

function navCoreBoost(href: string): number {
  return hrefTouchesCoreDoc(href) ? 55 : 0;
}

function sourceDepthEntry(entry: GlossaryEntry): number {
  return entry.sourceHrefs?.length ?? 0;
}

function rerankGlossaryHits(hits: GlossarySearchResult[], opts?: RetrievalBoostOpts): GlossarySearchResult[] {
  return [...hits]
    .map((h) => ({
      ...h,
      score: h.score + glossaryCoreBoost(h.entry) + glossaryContextBoost(h.entry, opts),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ds = sourceDepthEntry(b.entry) - sourceDepthEntry(a.entry);
      if (ds !== 0) return ds;
      return a.entry.label.localeCompare(b.entry.label, undefined, { sensitivity: "base" });
    })
    .slice(0, GLOSSARY_MATCH_LIMIT);
}

function rerankRegistryHits(hits: RegistrySearchResult[], opts?: RetrievalBoostOpts): RegistrySearchResult[] {
  return [...hits]
    .map((h) => ({
      ...h,
      score: h.score + registryCoreBoost(h.entry) + registryContextBoost(h.entry, opts),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.entry.term.localeCompare(b.entry.term, undefined, { sensitivity: "base" });
    })
    .slice(0, REGISTRY_MATCH_LIMIT);
}

function rerankSourceDocs(hits: DocsNavPageHit[], opts?: RetrievalBoostOpts): DocsNavPageHit[] {
  return [...hits]
    .map((h) => ({
      ...h,
      score: h.score + navCoreBoost(h.href) + combinedLocationBoost(h.href, opts),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    })
    .slice(0, SOURCE_DOC_LIMIT);
}

function scoreRegistryEntry(entry: TerminologyEntry, q: string): number {
  if (!q) return 0;
  let best = 0;
  const term = entry.term.toLowerCase();
  if (term === q) best = Math.max(best, 920);
  else if (term.startsWith(q)) best = Math.max(best, 720);
  else if (term.includes(q)) best = Math.max(best, 520);

  const def = entry.definition.toLowerCase();
  if (def.includes(q)) best = Math.max(best, 380);

  const auth = entry.authority_href.toLowerCase();
  const qSlug = q.replace(/^\/docs\/?/, "");
  if (qSlug && auth.includes(qSlug)) best = Math.max(best, 240);

  const hay = `${term} ${def} ${auth}`.toLowerCase();
  if (best === 0 && hay.includes(q)) best = Math.max(best, 120);

  return best;
}

/** Terminology registry rows ranked by term / definition / authority path overlap. */
export function retrieveRegistryMatches(query: string, limit = REGISTRY_MATCH_LIMIT): RegistrySearchResult[] {
  const q = normalizeSearchQuery(query);
  if (!q) return [];

  const scored = TERMINOLOGY_ENTRIES.map((entry) => ({
    entry,
    score: scoreRegistryEntry(entry, q),
  }))
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.entry.term.localeCompare(b.entry.term, undefined, { sensitivity: "base" });
    })
    .slice(0, limit);

  return scored;
}

/** Nav hub search items (same index as header docs search). */
export function retrieveSourceDocs(query: string, max = SOURCE_DOC_LIMIT): DocsNavPageHit[] {
  return searchDocsNavPages(query, max);
}

export type AssembledAskQ = {
  answer: string;
  sources: AskQSource[];
};

function pushSource(out: AskQSource[], seen: Set<string>, href: string, title: string) {
  if (!href || seen.has(href)) return;
  seen.add(href);
  out.push({ href, title });
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

const NO_MATCH_SOURCE_FALLBACK: AskQSource[] = [
  { href: "/docs/system-runtime", title: "System runtime" },
  { href: "/docs/end-to-end/runtime-truth", title: "End-to-end runtime truth" },
  { href: "/docs/contracts", title: "Contracts hub" },
  { href: "/docs/authority-map", title: "Authority map" },
  { href: "/docs/terminology", title: "Terminology" },
];

function collectSourcesFromHits(
  glossaryHits: GlossarySearchResult[],
  registryHits: RegistrySearchResult[],
  sourceDocs: DocsNavPageHit[],
): AskQSource[] {
  const sources: AskQSource[] = [];
  const seen = new Set<string>();

  for (const { entry } of glossaryHits) {
    pushSource(sources, seen, entry.href, entry.label);
  }
  for (const { entry } of glossaryHits.slice(0, 3)) {
    let i = 0;
    for (const sh of entry.sourceHrefs ?? []) {
      if (i >= 2) break;
      pushSource(sources, seen, sh, `${entry.label} (source)`);
      i += 1;
    }
  }
  for (const { entry } of registryHits) {
    pushSource(sources, seen, entry.authority_href, `Registry: ${entry.term}`);
  }
  for (const p of sourceDocs) {
    pushSource(sources, seen, p.href, p.title);
  }

  const capped = sources.slice(0, MAX_SOURCES);
  if (capped.length === 0) {
    return [...NO_MATCH_SOURCE_FALLBACK];
  }
  return capped;
}

function buildRetrievalTemplateAnswer(snap: AskQRetrievalSnapshot): string {
  const raw = snap.queryNormalized;
  if (!snap.glossaryHits.length && !snap.registryHits.length && !snap.sourceDocs.length) {
    const qShow = truncate(raw, 100);
    return [
      "I couldn't find a clear answer in the documentation.",
      "",
      "For orientation, explore these areas in the Sources list:",
      "- System runtime (execution spine)",
      "- Contracts hub (interfaces and traceability)",
      "- Authority map (canonical vs supplement docs)",
      "- End-to-end runtime truth (cross-layer ordering pointers)",
      "",
      "Try asking about:",
      "- system runtime",
      "- contracts",
      "- authority map",
      "- end-to-end flow",
      "",
      `(Your query: “${qShow}”)`,
    ].join("\n");
  }

  const lines: string[] = [];
  lines.push("From the WaveQ documentation catalog (no external model).");
  lines.push("");

  if (snap.glossaryHits.length) {
    lines.push("Glossary excerpts");
    for (const { entry } of snap.glossaryHits.slice(0, 6)) {
      const desc = entry.description ?? "See the linked page for the full specification.";
      lines.push(`• ${entry.label} — ${truncate(desc, 300)}`);
    }
    lines.push("");
  }

  if (snap.registryHits.length) {
    lines.push("Terminology registry excerpts");
    for (const { entry } of snap.registryHits.slice(0, 5)) {
      lines.push(`• ${entry.term} — ${truncate(entry.definition, 280)}`);
    }
    lines.push("");
  }

  if (snap.sourceDocs.length) {
    lines.push("Related doc pages");
    for (const p of snap.sourceDocs.slice(0, 5)) {
      const sub = p.subtitle ? ` — ${truncate(p.subtitle, 100)}` : "";
      lines.push(`• ${p.title}${sub}`);
    }
  }

  return lines.join("\n").trimEnd();
}

function formatCanonicalWaveQPillarsSection(): string[] {
  const lines: string[] = [];
  lines.push("### Canonical WaveQ pillars (structural reference)");
  lines.push(
    "Ground truth for how the product is documented: runtime spine, contracts posture, canonical URL policy, and end-to-end truth pointers. Use when ranked matches are sparse.",
  );
  for (const id of CANONICAL_SKILL_ENTRY_IDS) {
    const e = getGlossaryEntryById(id);
    if (!e) continue;
    lines.push(`- **${e.label}** (glossary id: ${e.id})`);
    lines.push(`  canonical href: ${e.href}`);
    if (e.description) lines.push(`  summary: ${truncate(e.description, 320)}`);
  }
  lines.push("");
  return lines;
}

/**
 * Single retrieval pass for Q Doc Agent (server + client fallback). Applies core-doc + page/concept boost reranking.
 */
export function gatherAskQRetrieval(queryOrOpts: string | GatherAskQRetrievalOptions): AskQRetrievalSnapshot {
  const opts: GatherAskQRetrievalOptions =
    typeof queryOrOpts === "string" ? { query: queryOrOpts } : queryOrOpts;

  const raw = opts.query.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  const boostOpts: RetrievalBoostOpts = { pathname: opts.pathname, concepts: opts.concepts };
  let expanded = buildExpandedRetrievalQuery(raw, opts.concepts ?? []);
  if (opts.lexicalContext?.trim()) {
    expanded = `${expanded} ${opts.lexicalContext.trim()}`.replace(/\s+/g, " ").trim().slice(0, 1800);
  }

  const glossaryHits = rerankGlossaryHits(
    retrieveGlossaryCandidatesForAskQ(expanded, opts.pathname),
    boostOpts,
  );
  const registryHits = rerankRegistryHits(retrieveRegistryMatches(expanded, RETRIEVAL_CANDIDATE_POOL), boostOpts);
  const sourceDocs = rerankSourceDocs(retrieveSourceDocs(expanded, RETRIEVAL_CANDIDATE_POOL), boostOpts);
  const sources = collectSourcesFromHits(glossaryHits, registryHits, sourceDocs);
  return {
    queryNormalized: raw,
    glossaryHits,
    registryHits,
    sourceDocs,
    sources,
  };
}

export type AskQLlmContextExtras = {
  pathname?: string;
  latestUserMessage?: string;
  conversationSummary?: string;
  /** Client-maintained short summary of the running thread topic (capped by caller). */
  rollingTopicSummary?: string;
  semanticIntent?: string;
  semanticConcepts?: readonly string[];
};

/**
 * Structured context block for Gemini (or any LLM). Uses only glossary / registry / nav fields
 * plus canonical pillar summaries from DOCS_GLOSSARY (no user→concept map).
 */
export function formatAskQContextForLlm(snap: AskQRetrievalSnapshot, extras?: AskQLlmContextExtras): string {
  const lines: string[] = [];
  lines.push(`Normalized query: ${snap.queryNormalized || "(empty)"}`);
  lines.push("");

  if (extras?.semanticIntent || (extras?.semanticConcepts && extras.semanticConcepts.length)) {
    lines.push("### Semantic hints (heuristic; for prioritization)");
    lines.push(`intent: ${extras.semanticIntent ?? "(unspecified)"}`);
    lines.push(`concepts: ${extras.semanticConcepts?.length ? extras.semanticConcepts.join(", ") : "(none)"}`);
    lines.push("");
  }

  if (extras?.pathname?.trim()) {
    lines.push("### User page context");
    lines.push(`Currently viewing: ${extras.pathname.trim()}`);
    lines.push("Prioritize excerpts relevant to this page when scores are close.");
    lines.push("");
  }

  if (extras?.conversationSummary?.trim()) {
    lines.push("### Recent conversation (truncated)");
    lines.push(extras.conversationSummary.trim());
    lines.push("");
  }

  if (extras?.rollingTopicSummary?.trim()) {
    lines.push("### Running topic summary (from prior turns; may be partial)");
    lines.push(extras.rollingTopicSummary.trim());
    lines.push("");
  }

  if (extras?.latestUserMessage?.trim() && extras.latestUserMessage.trim() !== snap.queryNormalized) {
    lines.push("### Latest user message (may be a short follow-up)");
    lines.push(extras.latestUserMessage.trim());
    lines.push("");
  }

  lines.push("### Glossary matches");
  if (!snap.glossaryHits.length) {
    lines.push("(none)");
  } else {
    for (const { entry, score } of snap.glossaryHits) {
      lines.push(`- ${entry.label} [retrieval score ${score}]`);
      lines.push(`  id: ${entry.id}; kind: ${entry.kind}`);
      lines.push(`  canonical href: ${entry.href}`);
      if (entry.description) lines.push(`  description: ${truncate(entry.description, 400)}`);
      if (entry.tags?.length) lines.push(`  tags: ${entry.tags.join(", ")}`);
      if (entry.relatedHrefs?.length) lines.push(`  related: ${entry.relatedHrefs.slice(0, 5).join(", ")}`);
    }
  }
  lines.push("");

  lines.push("### Terminology registry definitions");
  if (!snap.registryHits.length) {
    lines.push("(none)");
  } else {
    for (const { entry, score } of snap.registryHits) {
      lines.push(`- ${entry.term} [retrieval score ${score}]`);
      lines.push(`  definition: ${truncate(entry.definition, 420)}`);
      lines.push(`  authority_href: ${entry.authority_href}`);
      if (entry.glossaryEntryId) lines.push(`  glossary_entry_id: ${entry.glossaryEntryId}`);
    }
  }
  lines.push("");

  lines.push("### Doc pages (navigation index)");
  if (!snap.sourceDocs.length) {
    lines.push("(none)");
  } else {
    for (const p of snap.sourceDocs) {
      lines.push(`- ${p.title} [score ${p.score}]`);
      lines.push(`  href: ${p.href}`);
      if (p.subtitle) lines.push(`  subtitle: ${truncate(p.subtitle, 200)}`);
    }
  }
  lines.push("");

  lines.push(...formatCanonicalWaveQPillarsSection());

  lines.push("### Sources (curated list for the reader — use these hrefs when suggesting where to read next)");
  snap.sources.forEach((s, i) => {
    lines.push(`${i + 1}. ${s.title} — ${s.href}`);
  });

  return lines.join("\n");
}

/** Retrieval-only assembled text from an existing snapshot (no second retrieval pass). */
export function assembleAskQFromSnapshot(snap: AskQRetrievalSnapshot): AssembledAskQ {
  return {
    answer: buildRetrievalTemplateAnswer(snap),
    sources: snap.sources,
  };
}

/**
 * Merges glossary, terminology registry, and nav hits into one answer string plus deduped sources.
 * No generative model — only strings present in glossary / registry / nav metadata.
 */
export function assembleAskQContext(query: string, opts?: { pathname?: string }): AssembledAskQ {
  return assembleAskQFromSnapshot(
    gatherAskQRetrieval(opts?.pathname ? { query, pathname: opts.pathname } : query),
  );
}
