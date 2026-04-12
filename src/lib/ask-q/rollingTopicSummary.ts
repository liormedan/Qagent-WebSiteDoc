/**
 * Client-side rolling summary of assistant substance for the next API call (no server session store).
 */

function stripLightMarkdown(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\r?\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Merge prior summary with the first sentence (or chunk) of the latest assistant reply; cap total length. */
export function appendRollingTopicSummary(prev: string, latestAssistantAnswer: string, maxTotal = 400): string {
  const plain = stripLightMarkdown(latestAssistantAnswer);
  if (!plain) return prev.trim();
  const firstSentence = /^.+?[.!?](?=\s|$)/.exec(plain);
  const chunkRaw = firstSentence ? firstSentence[0].trim() : plain.slice(0, 220);
  const chunk = chunkRaw.length > 220 ? `${chunkRaw.slice(0, 217)}…` : chunkRaw;
  const merged = [prev.trim(), chunk].filter(Boolean).join(" · ");
  if (merged.length <= maxTotal) return merged;
  return `${merged.slice(0, maxTotal - 1)}…`;
}
