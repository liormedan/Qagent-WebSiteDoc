import { getDocsNavSearchItems, normalizeDocsPath, type DocsNavSearchItem } from "@/components/layout/docs-nav-config";
import { DOCS_GLOSSARY, type GlossaryEntry, type GlossaryScope } from "@/lib/docs-glossary";
import { normalizeSearchQuery, searchGlossaryTerms } from "@/lib/searchGlossaryTerms";

export { normalizeSearchQuery, searchGlossaryTerms };
export type { GlossarySearchResult, SearchGlossaryTermsOptions } from "@/lib/searchGlossaryTerms";

const TOP_N = 5;

/**
 * Infer glossary filter scope from the current docs pathname.
 * Returns undefined when the path is broad so all scoped entries may appear.
 */
export function glossaryScopeFromPathname(pathname: string): GlossaryScope | undefined {
  const p = normalizeDocsPath(pathname);
  if (p.startsWith("/docs/end-to-end")) return "end-to-end";
  if (p.startsWith("/docs/client")) return "client";
  if (p.startsWith("/docs/contracts") || p.includes("/architecture/contracts")) return "contracts";
  if (p.startsWith("/docs/q-agent") || p.startsWith("/docs/qcore")) return "qagent";
  if (
    p === "/docs" ||
    p.startsWith("/docs/system") ||
    p === "/docs/system-runtime" ||
    p === "/docs/authority-map" ||
    p === "/docs/events-map" ||
    p === "/docs/system-flow" ||
    p.startsWith("/docs/system-flow") ||
    p.startsWith("/docs/auth-security") ||
    p === "/docs/terminology"
  ) {
    return "system";
  }
  return undefined;
}

/** Like {@link glossaryScopeFromPathname}, but falls back to no scope when no glossary rows use that scope (keeps Terms visible on Client/QAgent, etc.). */
export function glossarySearchScopeForFilter(pathname: string): GlossaryScope | undefined {
  const s = glossaryScopeFromPathname(pathname);
  if (!s) return undefined;
  const count = DOCS_GLOSSARY.filter((e) => e.scopes?.includes(s)).length;
  return count > 0 ? s : undefined;
}

export type GlossarySearchHit = { entry: GlossaryEntry; score: number };

/** @deprecated Prefer {@link searchGlossaryTerms}; kept for callers that only need `{ entry, score }`. */
export function searchGlossary(query: string, scope?: GlossaryScope): GlossarySearchHit[] {
  return searchGlossaryTerms(query, { scope, limit: TOP_N }).map(({ entry, score }) => ({ entry, score }));
}

export type { DocsNavSearchItem };

export type DocsNavPageHit = DocsNavSearchItem & { score: number };

function scoreNavItem(item: DocsNavSearchItem, q: string): number {
  const hay = `${item.title} ${item.subtitle}`.toLowerCase();
  if (item.title.toLowerCase() === q) return 95;
  if (item.title.toLowerCase().startsWith(q)) return 75;
  if (hay.includes(q)) return 45;
  return 0;
}

/** Lightweight page search over nav hubs (not full-text site index). */
export function searchDocsNavPages(query: string, max = TOP_N): DocsNavPageHit[] {
  const q = normalizeSearchQuery(query);
  if (!q) return [];
  const items = getDocsNavSearchItems();
  const hits: DocsNavPageHit[] = [];
  for (const item of items) {
    const score = scoreNavItem(item, q);
    if (score > 0) hits.push({ ...item, score });
  }
  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
  return hits.slice(0, max);
}
