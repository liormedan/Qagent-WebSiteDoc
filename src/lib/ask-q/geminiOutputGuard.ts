import type { AskQRetrievalSnapshot } from "@/lib/askQRetrieval";
import { GEMINI_REFUSAL_PHRASE } from "@/lib/ask-q/providers/gemini";

const STOP = new Set([
  "that",
  "this",
  "with",
  "from",
  "your",
  "have",
  "been",
  "they",
  "will",
  "would",
  "could",
  "should",
  "about",
  "there",
  "their",
  "these",
  "those",
  "other",
  "than",
  "into",
  "also",
  "more",
  "some",
  "such",
  "what",
  "when",
  "where",
  "which",
  "while",
  "without",
  "within",
  "between",
  "through",
  "being",
  "here",
  "just",
  "like",
  "make",
  "made",
  "each",
  "both",
  "most",
  "very",
  "well",
  "only",
  "even",
  "then",
  "them",
  "than",
  "much",
  "many",
]);

/** Terms that are always acceptable in user-facing answers (reduce false guard trips). */
const LEXICAL_ALLOW = new Set([
  "waveq",
  "documentation",
  "document",
  "system",
  "runtime",
  "contract",
  "contracts",
  "authority",
  "canonical",
  "supplement",
  "layer",
  "layers",
  "module",
  "modules",
  "component",
  "components",
  "glossary",
  "registry",
  "terminology",
  "overview",
  "navigation",
  "flow",
  "flows",
  "pipeline",
  "page",
  "pages",
  "reader",
  "sources",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((w) => w.length >= 4 && !STOP.has(w));
}

function buildVocabularyFromSnapshot(snap: AskQRetrievalSnapshot, contextBlock: string): Set<string> {
  const bag = new Set<string>();
  const pushText = (t: string, max = 400) => {
    const slice = t.slice(0, max).toLowerCase();
    for (const w of tokenize(slice)) bag.add(w);
  };

  for (const { entry } of snap.glossaryHits) {
    pushText(`${entry.label} ${entry.description ?? ""}`);
  }
  for (const { entry } of snap.registryHits) {
    pushText(`${entry.term} ${entry.definition}`);
  }
  for (const p of snap.sourceDocs) {
    pushText(`${p.title} ${p.subtitle ?? ""}`);
  }
  for (const w of tokenize(contextBlock)) bag.add(w);

  return bag;
}

/** Remove URLs and inline doc paths from model text (PART 1). */
export function stripUrlsFromAnswer(text: string): string {
  let s = text;
  s = s.replace(/https?:\/\/[^\s\]\)>"'`]+/gi, "");
  s = s.replace(/\bwww\.[^\s\]\)>"'`]+/gi, "");
  s = s.replace(/`?\/docs\/[^\s\]`'")>]+`?/gi, "");
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  s = s.replace(/\s{2,}/g, " ");
  return s.trim();
}

function isTooGenericAfterStrip(stripped: string): boolean {
  if (stripped.startsWith(GEMINI_REFUSAL_PHRASE)) return false;
  if (stripped.length < 36) return true;
  const words = stripped.split(/\s+/).filter(Boolean);
  if (words.length < 6 && stripped.length < 72 && !/[\u2022\u2023\u2013\-•\n]/.test(stripped)) return true;
  return false;
}

function isLikelyUngrounded(stripped: string, vocab: Set<string>, contextBlob: string): boolean {
  const significant = tokenize(stripped).filter((w) => !LEXICAL_ALLOW.has(w));
  if (significant.length < 6) return false;
  let hits = 0;
  for (const w of significant) {
    if (vocab.has(w) || contextBlob.includes(w)) hits += 1;
  }
  return hits / significant.length < 0.35;
}

export type GeminiOutputGuardResult = {
  ok: boolean;
  /** Always URL-stripped; use this for the user when ok. */
  answer: string;
};

/**
 * Post-generation checks: strip URLs first, then reject generic or poorly grounded text.
 */
export function guardGeminiAnswer(
  rawAnswer: string,
  snap: AskQRetrievalSnapshot,
  contextBlock: string,
): GeminiOutputGuardResult {
  const answer = stripUrlsFromAnswer(rawAnswer);
  if (!answer) {
    return { ok: false, answer: "" };
  }
  if (isTooGenericAfterStrip(answer)) {
    return { ok: false, answer };
  }
  const vocab = buildVocabularyFromSnapshot(snap, contextBlock);
  const contextBlob = `${contextBlock.toLowerCase()} ${[...vocab].join(" ")}`;
  if (isLikelyUngrounded(answer, vocab, contextBlob)) {
    return { ok: false, answer };
  }
  return { ok: true, answer };
}
