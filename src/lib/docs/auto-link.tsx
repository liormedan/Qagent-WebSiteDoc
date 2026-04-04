import type { ReactNode } from "react";
import { CONCEPTS } from "@/lib/docs/concept-registry";
import { ConceptLink } from "@/shared/components/concept-link";

const LINK_LIKE_PATTERN = /\[[^\]]+\]\([^)]+\)|<a\s/i;

function isWordChar(char: string | undefined): boolean {
  if (!char) return false;
  return /[a-zA-Z0-9_\u0590-\u05ff]/.test(char);
}

function findFirstMatchIndex(text: string, token: string): { start: number; end: number } | null {
  const haystack = text.toLowerCase();
  const needle = token.toLowerCase();
  let from = 0;

  while (from < haystack.length) {
    const index = haystack.indexOf(needle, from);
    if (index < 0) return null;
    const start = index;
    const end = index + needle.length;
    const before = text[start - 1];
    const after = text[end];

    if (!isWordChar(before) && !isWordChar(after)) {
      return { start, end };
    }

    from = index + 1;
  }

  return null;
}

export function linkConcepts(text: string, maxLinksPerBlock = 4): ReactNode {
  if (!text || LINK_LIKE_PATTERN.test(text)) return text;

  const orderedConcepts = [...CONCEPTS].sort((a, b) => a.priority - b.priority);
  const candidates: Array<{ start: number; end: number; conceptId: string; raw: string }> = [];

  for (const concept of orderedConcepts) {
    const tokens = [concept.label, ...(concept.aliases ?? [])];
    let best: { start: number; end: number; conceptId: string; raw: string } | null = null;

    for (const token of tokens) {
      const found = findFirstMatchIndex(text, token);
      if (!found) continue;
      if (!best || found.start < best.start) {
        best = { ...found, conceptId: concept.id, raw: text.slice(found.start, found.end) };
      }
    }

    if (best) candidates.push(best);
  }

  const selected = candidates
    .sort((a, b) => a.start - b.start)
    .filter((item, idx, arr) => {
      if (idx === 0) return true;
      return item.start >= arr[idx - 1].end;
    })
    .slice(0, maxLinksPerBlock);

  if (selected.length === 0) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;

  selected.forEach((match, index) => {
    if (match.start > cursor) {
      parts.push(text.slice(cursor, match.start));
    }
    parts.push(<ConceptLink key={`${match.conceptId}-${match.start}-${index}`} conceptId={match.conceptId} text={match.raw} />);
    cursor = match.end;
  });

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}
