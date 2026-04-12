/**
 * Lightweight intent routing for Ask Q (no ML).
 * Runs before retrieval to avoid unnecessary work and model calls.
 */

export type AskQIntent = "greeting" | "low_signal" | "doc_query";

const GREETINGS_ASCII = new Set(["hi", "hey", "hello"]);
const GREETINGS_HE = new Set(["הי", "שלום"]);

function stripEdgePunctuation(s: string): string {
  return s.replace(/^[\s!.,?;:]+|[\s!.,?;:]+$/gu, "").trim();
}

function hasMeaningfulToken(trimmed: string): boolean {
  const parts = trimmed.split(/\s+/);
  for (const part of parts) {
    const chunks = part.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    for (const tok of chunks) {
      if (/[\u0590-\u05FF]/.test(tok) && tok.length >= 1) return true;
      if (tok.length >= 2) return true;
    }
  }
  return false;
}

export function detectIntent(query: string): AskQIntent {
  const trimmed = query.trim();
  if (!trimmed) return "low_signal";

  const lower = trimmed.toLowerCase();
  const asciiStripped = stripEdgePunctuation(lower);
  if (GREETINGS_ASCII.has(lower) || GREETINGS_ASCII.has(asciiStripped)) {
    return "greeting";
  }

  const heStripped = stripEdgePunctuation(trimmed);
  if (GREETINGS_HE.has(trimmed) || GREETINGS_HE.has(heStripped)) {
    return "greeting";
  }

  if (trimmed.length < 3) return "low_signal";

  if (!hasMeaningfulToken(trimmed)) return "low_signal";

  return "doc_query";
}
