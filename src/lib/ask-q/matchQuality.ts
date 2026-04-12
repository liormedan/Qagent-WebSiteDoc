import type { AskQRetrievalSnapshot } from "@/lib/askQRetrieval";

/** Same weighting as the Gemini gate: glossary strongest, then registry, then nav. */
export function computeAskQMatchScore(snap: AskQRetrievalSnapshot): number {
  return snap.glossaryHits.length * 3 + snap.registryHits.length * 2 + snap.sourceDocs.length;
}

/** Minimum aggregate match score before calling Gemini (avoids weak-context generations). */
export const GEMINI_MIN_MATCH_SCORE = 3;

export function snapshotMeetsGeminiMatchGate(snap: AskQRetrievalSnapshot): boolean {
  return computeAskQMatchScore(snap) >= GEMINI_MIN_MATCH_SCORE;
}

/**
 * 0–1 confidence from hit counts and source breadth (independent of rerank internals).
 * Caps near 1 once the weighted score reaches ~14.
 */
export function computeAskQConfidence(snap: AskQRetrievalSnapshot): number {
  const raw = computeAskQMatchScore(snap);
  const normalized = Math.min(1, raw / 14);
  return Math.round(normalized * 100) / 100;
}
