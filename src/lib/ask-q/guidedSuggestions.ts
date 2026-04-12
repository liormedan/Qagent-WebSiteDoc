import { DOCS_GLOSSARY, getGlossaryEntryById, type GlossaryEntry } from "@/lib/docs-glossary";
import type { AskQInterpretedConcept, AskQSemanticIntent } from "@/lib/ask-q/interpretQuery";
import type { AskQRetrievalSnapshot, AskQSource } from "@/lib/askQRetrieval";

export type AskQSuggestion = {
  label: string;
  href?: string;
  reason?: string;
};

const CORE_DOC_PREFIXES = ["/docs/system-runtime", "/docs/end-to-end", "/docs/contracts", "/docs/authority-map"] as const;

function stripHash(href: string): string {
  return href.split("#")[0].replace(/\/+$/, "") || href;
}

/** Hrefs that appear anywhere in the glossary corpus (canonical + related + sources). */
function buildGlossaryHrefBases(): Set<string> {
  const s = new Set<string>();
  for (const e of DOCS_GLOSSARY) {
    s.add(stripHash(e.href));
    for (const r of e.relatedHrefs ?? []) s.add(stripHash(r));
    for (const h of e.sourceHrefs ?? []) s.add(stripHash(h));
  }
  return s;
}

const GLOSSARY_HREF_BASES = buildGlossaryHrefBases();

function isKnownDocHref(href: string): boolean {
  const b = stripHash(href);
  if (!b.startsWith("/docs/")) return false;
  if (GLOSSARY_HREF_BASES.has(b)) return true;
  return [...GLOSSARY_HREF_BASES].some((known) => b === known || b.startsWith(`${known}/`));
}

function isCoreCanonicalBase(b: string): boolean {
  return CORE_DOC_PREFIXES.some((p) => b === p || b.startsWith(`${p}/`));
}

function lookupEntryForBase(base: string): GlossaryEntry | undefined {
  const exact = DOCS_GLOSSARY.find((e) => stripHash(e.href) === base);
  if (exact) return exact;
  const byRelated = DOCS_GLOSSARY.find((e) =>
    [...(e.relatedHrefs ?? []), ...(e.sourceHrefs ?? [])].some((h) => stripHash(h) === base),
  );
  if (byRelated) return byRelated;
  return DOCS_GLOSSARY.filter((e) => base.startsWith(stripHash(e.href) + "/")).sort(
    (a, b) => stripHash(b.href).length - stripHash(a.href).length,
  )[0];
}

function labelForHref(href: string): string {
  const base = stripHash(href);
  const entry = lookupEntryForBase(base);
  if (entry && stripHash(entry.href) === base) return entry.label;
  if (entry) return entry.label;
  const tail = base.split("/").filter(Boolean).pop();
  if (!tail) return base;
  return tail
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const REASON_BY_GLOSSARY_ID: Record<string, string> = {
  "contracts-hub": "Interfaces and traceability tie back to runtime phases you just read about.",
  "runtime-truth": "Cross-layer ordering pointers that complement runtime and contracts.",
  "authority-map": "Shows which documentation URLs are canonical versus supplement.",
  "system-runtime": "Execution spine phases that ground contracts and end-to-end ordering.",
  "system-overview": "Layer map and entry points before diving into one subsystem.",
  terminology: "Shared definitions that anchor runtime and contracts terminology.",
  "system-flow": "System-wide flow chapters that pair with the runtime spine.",
  "events-map": "Event surface map aligned with the runtime spine.",
};

const CONCEPT_NEIGHBORS: Record<AskQInterpretedConcept, readonly string[]> = {
  "system-runtime": ["contracts-hub", "runtime-truth"],
  contracts: ["authority-map", "runtime-truth"],
  "authority-map": ["contracts-hub", "system-runtime"],
  "end-to-end": ["runtime-truth", "system-runtime"],
};

const INTENT_NEIGHBORS: Record<AskQSemanticIntent, readonly string[]> = {
  navigation: ["authority-map", "contracts-hub"],
  flow: ["runtime-truth", "system-runtime"],
  overview: ["system-overview", "system-runtime"],
  concept: ["terminology", "contracts-hub"],
};

type Scored = { label: string; href: string; score: number; reason: string };

function pushEntryId(out: Map<string, Scored>, id: string, score: number, reason: string) {
  const e = getGlossaryEntryById(id);
  if (!e) return;
  const href = stripHash(e.href);
  if (!isKnownDocHref(href)) return;
  const prev = out.get(href);
  const label = e.label;
  const resolvedReason = REASON_BY_GLOSSARY_ID[id] ?? reason;
  if (!prev || score > prev.score) {
    out.set(href, { href, label, score, reason: resolvedReason });
  }
}

function pushHref(out: Map<string, Scored>, href: string, score: number, reason: string) {
  const base = stripHash(href);
  if (!isKnownDocHref(base)) return;
  const label = labelForHref(href);
  const prev = out.get(base);
  if (!prev || score > prev.score) {
    let r = reason;
    const entry = DOCS_GLOSSARY.find((e) => stripHash(e.href) === base);
    if (entry && REASON_BY_GLOSSARY_ID[entry.id]) r = REASON_BY_GLOSSARY_ID[entry.id];
    out.set(base, { href: base, label, score, reason: r });
  }
}

function pushSource(out: Map<string, Scored>, s: AskQSource, score: number, reason: string) {
  const base = stripHash(s.href);
  if (!isKnownDocHref(base)) return;
  const prev = out.get(base);
  if (!prev || score > prev.score) {
    out.set(base, { href: base, label: s.title, score, reason });
  }
}

function excludeCurrentPage(href: string, pathname?: string): boolean {
  if (!pathname?.trim()) return false;
  return stripHash(href) === stripHash(pathname);
}

/**
 * Builds 0–2 grounded next-step suggestions from glossary-linked hrefs and top retrieval rows.
 */
export function buildGuidedSuggestions(params: {
  snapshot: AskQRetrievalSnapshot;
  intent: AskQSemanticIntent;
  concepts: readonly AskQInterpretedConcept[];
  pathname?: string;
}): AskQSuggestion[] {
  const { snapshot, intent, concepts, pathname } = params;
  const out = new Map<string, Scored>();

  for (const c of concepts) {
    for (const id of CONCEPT_NEIGHBORS[c] ?? []) {
      pushEntryId(out, id, 110, "Related pillar for this topic.");
    }
  }

  for (const id of INTENT_NEIGHBORS[intent] ?? []) {
    pushEntryId(out, id, 72, "Fits the kind of question you asked.");
  }

  for (const { entry } of snapshot.glossaryHits.slice(0, 3)) {
    for (const h of entry.relatedHrefs?.slice(0, 4) ?? []) {
      pushHref(out, h, 88, "Linked from a glossary match for your question.");
    }
    for (const h of entry.sourceHrefs?.slice(0, 3) ?? []) {
      pushHref(out, h, 78, "Source page tied to the matched glossary entry.");
    }
  }

  for (const { entry } of snapshot.registryHits.slice(0, 2)) {
    pushHref(out, entry.authority_href, 70, "Authority page for a matched registry term.");
  }

  for (const s of snapshot.sources.slice(0, 5)) {
    pushSource(out, s, isCoreCanonicalBase(stripHash(s.href)) ? 68 : 52, "Top-ranked doc for this query.");
  }

  const ranked = [...out.values()]
    .filter((c) => !excludeCurrentPage(c.href, pathname))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ac = isCoreCanonicalBase(a.href) ? 1 : 0;
      const bc = isCoreCanonicalBase(b.href) ? 1 : 0;
      if (bc !== ac) return bc - ac;
      return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
    });

  const picked = ranked.slice(0, 2);
  if (!picked.length) return [];

  return picked.map((p) => ({
    label: p.label,
    href: p.href,
    reason: p.reason,
  }));
}
