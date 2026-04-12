/**
 * Lightweight intent routing for Q Doc Agent (no ML).
 * Runs before retrieval to avoid unnecessary work and model calls.
 */

export type AskQIntent = "greeting" | "low_signal" | "overview" | "navigation" | "doc_query";

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

  const lowerSpaced = lower.replace(/\s+/g, " ");

  if (
    /\b(where\s+(is|are|can|do|i|should)|which\s+(page|doc|url|section)|how\s+(do|can)\s+i\s+(find|open|navigate|get)|find\s+(the\s+)?(page|doc|section)|link\s+to|locate\s+(the\s+)?(page|doc))\b/.test(
      lowerSpaced,
    )
  ) {
    return "navigation";
  }

  if (
    /\b(overview|big\s+picture|high[-\s]?level|architecture(\s+of|\s+overview)?|layers\s+(in|of|for)|what\s+is\s+waveq|explain\s+(the\s+)?(system|waveq|platform)|how\s+does\s+waveq\s+work|end[-\s]?to[-\s]?end\s+overview|system[-\s]?level)\b/.test(
      lowerSpaced,
    )
  ) {
    return "overview";
  }

  return "doc_query";
}
