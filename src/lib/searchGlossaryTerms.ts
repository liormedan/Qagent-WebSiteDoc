import { DOCS_GLOSSARY, type GlossaryEntry, type GlossaryScope } from "@/lib/docs-glossary";

const DESCRIPTION_SNIP = 200;
const DEFAULT_LIMIT = 5;

/** Collapse whitespace; lowercase for matching. */
export function normalizeSearchQuery(query: string): string {
  return query.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
}

export type GlossarySearchResult = {
  entry: GlossaryEntry;
  score: number;
  canonicalHref: string;
  onPageHref: string;
};

export type SearchGlossaryTermsOptions = {
  pool?: readonly GlossaryEntry[];
  scope?: GlossaryScope;
  limit?: number;
};

function haystack(entry: GlossaryEntry): string {
  const desc = (entry.description ?? "").slice(0, DESCRIPTION_SNIP);
  return [entry.label, ...(entry.aliases ?? []), ...(entry.tags ?? []), desc].join(" ").toLowerCase();
}

/**
 * Single scoring pipeline for glossary term search (header + /docs/terminology).
 * Priority: exact label → exact alias → prefix (label/alias) → contains → tags → description → haystack fallback.
 */
function scoreTerm(entry: GlossaryEntry, q: string): number {
  if (!q) return 0;
  let best = 0;
  const label = entry.label.toLowerCase();
  if (label === q) best = Math.max(best, 1000);
  else if (label.startsWith(q)) best = Math.max(best, 820);
  else if (label.includes(q)) best = Math.max(best, 520);

  for (const a of entry.aliases ?? []) {
    const al = a.toLowerCase();
    if (al === q) best = Math.max(best, 960);
    else if (al.startsWith(q)) best = Math.max(best, 740);
    else if (al.includes(q)) best = Math.max(best, 420);
  }

  for (const t of entry.tags ?? []) {
    const tl = t.toLowerCase();
    if (tl === q) best = Math.max(best, 610);
    else if (tl.startsWith(q)) best = Math.max(best, 460);
    else if (tl.includes(q)) best = Math.max(best, 290);
  }

  const desc = (entry.description ?? "").toLowerCase();
  if (desc.includes(q)) best = Math.max(best, 210);

  if (best === 0 && haystack(entry).includes(q)) best = 130;

  return best;
}

function sourceDepth(entry: GlossaryEntry): number {
  return entry.sourceHrefs?.length ?? 0;
}

/**
 * Unified term search over DOCS_GLOSSARY (or a subset). No LLM — ranking only.
 * Used by DocsHeaderSearch and TerminologyLocalSearch with different `limit` / UI.
 */
export function searchGlossaryTerms(query: string, options?: SearchGlossaryTermsOptions): GlossarySearchResult[] {
  const q = normalizeSearchQuery(query);
  if (!q) return [];

  const limit = options?.limit ?? DEFAULT_LIMIT;
  let pool = options?.pool ?? DOCS_GLOSSARY;
  const scope = options?.scope;
  if (scope) {
    pool = pool.filter((e) => e.scopes?.includes(scope));
  }

  const scored = pool
    .map((entry) => ({ entry, score: scoreTerm(entry, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const ds = sourceDepth(b.entry) - sourceDepth(a.entry);
      if (ds !== 0) return ds;
      return a.entry.label.localeCompare(b.entry.label, undefined, { sensitivity: "base" });
    })
    .slice(0, limit);

  return scored.map(({ entry, score }) => ({
    entry,
    score,
    canonicalHref: entry.href,
    onPageHref: `#term-${entry.id}`,
  }));
}
