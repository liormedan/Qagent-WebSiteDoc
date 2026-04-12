import type { GlossaryEntry } from "@/lib/docs-glossary";
import { glossaryEntriesForScope } from "@/lib/docs-glossary";

export type GlossaryTextSegment =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; entryId: string };

export type GlossaryMatch = {
  start: number;
  end: number;
  entryId: string;
  phrase: string;
  href: string;
};

type Candidate = { phrase: string; entry: GlossaryEntry; len: number };

/** Collapse whitespace for stable matching (callers often combine with normalizeDocListText). */
export function normalizeGlossaryText(value: string): string {
  return value.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
}

function isWordChar(ch: string): boolean {
  return /[\p{L}\p{N}_]/u.test(ch);
}

function boundariesOk(text: string, start: number, phrase: string): boolean {
  const end = start + phrase.length;
  if (text.slice(start, end).toLowerCase() !== phrase.toLowerCase()) return false;
  const before = start > 0 ? text[start - 1]! : "";
  const after = end < text.length ? text[end]! : "";
  const first = phrase[0] ?? "";
  const last = phrase[phrase.length - 1] ?? "";
  if (first && isWordChar(first) && before && isWordChar(before)) return false;
  if (last && isWordChar(last) && after && isWordChar(after)) return false;
  return true;
}

function buildCandidates(entries: readonly GlossaryEntry[]): Candidate[] {
  const list: Candidate[] = [];
  for (const entry of entries) {
    const phrases = [entry.label, ...(entry.aliases ?? [])].filter((p) => p.trim().length > 0);
    const seen = new Set<string>();
    for (const phrase of phrases) {
      const key = phrase.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      list.push({ phrase, entry, len: phrase.length });
    }
  }
  list.sort((a, b) => b.len - a.len || a.phrase.localeCompare(b.phrase));
  return list;
}

/** Split so backtick-delimited spans are never matched. */
export function partitionByBackticks(input: string): { text: string; isCode: boolean }[] {
  const out: { text: string; isCode: boolean }[] = [];
  let i = 0;
  while (i < input.length) {
    const tick = input.indexOf("`", i);
    if (tick === -1) {
      out.push({ text: input.slice(i), isCode: false });
      break;
    }
    if (tick > i) out.push({ text: input.slice(i, tick), isCode: false });
    const tick2 = input.indexOf("`", tick + 1);
    if (tick2 === -1) {
      out.push({ text: input.slice(tick), isCode: false });
      break;
    }
    out.push({ text: input.slice(tick + 1, tick2), isCode: true });
    i = tick2 + 1;
  }
  return out;
}

function mergeAdjacentText(segments: GlossaryTextSegment[]): GlossaryTextSegment[] {
  const out: GlossaryTextSegment[] = [];
  for (const seg of segments) {
    const last = out[out.length - 1];
    if (seg.type === "text" && last?.type === "text") {
      last.text += seg.text;
    } else {
      out.push(seg);
    }
  }
  return out;
}

function matchPlainSegment(
  text: string,
  candidates: readonly Candidate[],
  usedEntryIds: Set<string> | null,
): GlossaryTextSegment[] {
  const segments: GlossaryTextSegment[] = [];
  let i = 0;
  let textBuffer = "";

  const flushText = () => {
    if (textBuffer.length > 0) {
      segments.push({ type: "text", text: textBuffer });
      textBuffer = "";
    }
  };

  while (i < text.length) {
    let best: Candidate | null = null;
    for (const c of candidates) {
      if (usedEntryIds?.has(c.entry.id)) continue;
      if (c.len === 0 || i + c.len > text.length) continue;
      if (!boundariesOk(text, i, c.phrase)) continue;
      if (!best || c.len > best.len) best = c;
    }
    if (best) {
      flushText();
      const slice = text.slice(i, i + best.len);
      segments.push({ type: "link", text: slice, href: best.entry.href, entryId: best.entry.id });
      usedEntryIds?.add(best.entry.id);
      i += best.len;
    } else {
      textBuffer += text[i]!;
      i += 1;
    }
  }
  flushText();
  return segments;
}

export type FindGlossaryOptions = {
  scope?: string;
  /** Default true: each glossary entry links at most once per input string. */
  firstMentionPerEntryOnly?: boolean;
};

/**
 * Match list derived from {@link findGlossarySegments} (same longest-first and first-mention rules).
 * `start` / `end` are offsets in the original `text` when segments are concatenated in order (code spans keep backticks).
 */
export function findGlossaryMatches(text: string, options: FindGlossaryOptions = {}): GlossaryMatch[] {
  const segments = findGlossarySegments(text, options);
  let pos = 0;
  const matches: GlossaryMatch[] = [];
  for (const s of segments) {
    if (s.type === "link") {
      matches.push({
        start: pos,
        end: pos + s.text.length,
        entryId: s.entryId,
        phrase: s.text,
        href: s.href,
      });
    }
    pos += s.text.length;
  }
  return matches;
}

/**
 * Renderable segments: code spans emitted as literal text (including backticks), glossary links elsewhere.
 * Longest match first; first mention per entry per full input string (default).
 */
export function findGlossarySegments(text: string, options: FindGlossaryOptions = {}): GlossaryTextSegment[] {
  const { scope, firstMentionPerEntryOnly = true } = options;
  const entries = glossaryEntriesForScope(scope);
  const candidates = buildCandidates(entries);
  const usedEntryIds = firstMentionPerEntryOnly ? new Set<string>() : null;

  const segments: GlossaryTextSegment[] = [];

  for (const part of partitionByBackticks(text)) {
    if (part.isCode) {
      segments.push({ type: "text", text: `\`${part.text}\`` });
      continue;
    }
    segments.push(...matchPlainSegment(part.text, candidates, usedEntryIds));
  }

  return mergeAdjacentText(segments);
}
