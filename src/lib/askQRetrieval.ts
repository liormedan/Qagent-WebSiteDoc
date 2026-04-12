import { searchDocsNavPages, type DocsNavPageHit } from "@/lib/searchGlossary";
import { normalizeSearchQuery, searchGlossaryTerms, type GlossarySearchResult } from "@/lib/searchGlossaryTerms";
import { TERMINOLOGY_ENTRIES, type TerminologyEntry } from "@/lib/terminology-registry";

const GLOSSARY_MATCH_LIMIT = 8;
const REGISTRY_MATCH_LIMIT = 8;
const SOURCE_DOC_LIMIT = 8;
const MAX_SOURCES = 16;

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

/** Glossary rows ranked for Ask Q (full `DOCS_GLOSSARY` pool, no path scope). */
export function retrieveGlossaryMatches(query: string): GlossarySearchResult[] {
  return searchGlossaryTerms(query, { limit: GLOSSARY_MATCH_LIMIT });
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
export function retrieveRegistryMatches(query: string): RegistrySearchResult[] {
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
    .slice(0, REGISTRY_MATCH_LIMIT);

  return scored;
}

/** Nav hub search items (same index as header docs search). */
export function retrieveSourceDocs(query: string): DocsNavPageHit[] {
  return searchDocsNavPages(query, SOURCE_DOC_LIMIT);
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
    return [
      { href: "/docs/terminology", title: "Terminology" },
      { href: "/docs", title: "Documentation home" },
    ];
  }
  return capped;
}

function buildRetrievalTemplateAnswer(snap: AskQRetrievalSnapshot): string {
  const raw = snap.queryNormalized;
  if (!snap.glossaryHits.length && !snap.registryHits.length && !snap.sourceDocs.length) {
    const qShow = truncate(raw, 100);
    return [
      "I couldn't find a direct answer in the documentation.",
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
  lines.push("From WaveQ documentation (retrieval only — no external model).");
  lines.push("");

  if (snap.glossaryHits.length) {
    lines.push("Glossary");
    for (const { entry } of snap.glossaryHits.slice(0, 6)) {
      const desc = entry.description ?? "See the linked page for the full specification.";
      lines.push(`• ${entry.label} — ${truncate(desc, 300)}`);
    }
    lines.push("");
  }

  if (snap.registryHits.length) {
    lines.push("Terminology registry");
    for (const { entry } of snap.registryHits.slice(0, 5)) {
      lines.push(`• ${entry.term} — ${truncate(entry.definition, 280)}`);
    }
    lines.push("");
  }

  if (snap.sourceDocs.length) {
    lines.push("Doc pages (nav)");
    for (const p of snap.sourceDocs.slice(0, 5)) {
      const sub = p.subtitle ? ` — ${truncate(p.subtitle, 100)}` : "";
      lines.push(`• ${p.title}${sub}`);
    }
  }

  return lines.join("\n").trimEnd();
}

/**
 * Single retrieval pass for Ask Q (server + client fallback). Preserves existing ranking limits.
 */
export function gatherAskQRetrieval(query: string): AskQRetrievalSnapshot {
  const raw = query.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  const glossaryHits = retrieveGlossaryMatches(raw);
  const registryHits = retrieveRegistryMatches(raw);
  const sourceDocs = retrieveSourceDocs(raw);
  const sources = collectSourcesFromHits(glossaryHits, registryHits, sourceDocs);
  return {
    queryNormalized: raw,
    glossaryHits,
    registryHits,
    sourceDocs,
    sources,
  };
}

/**
 * Structured context block for Gemini (or any LLM). Uses only glossary / registry / nav fields.
 */
export function formatAskQContextForLlm(snap: AskQRetrievalSnapshot): string {
  const lines: string[] = [];
  lines.push(`Normalized query: ${snap.queryNormalized || "(empty)"}`);
  lines.push("");

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
export function assembleAskQContext(query: string): AssembledAskQ {
  return assembleAskQFromSnapshot(gatherAskQRetrieval(query));
}
