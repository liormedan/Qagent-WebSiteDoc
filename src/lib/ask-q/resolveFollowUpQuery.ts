export type AskQHistoryTurn = {
  role: "user" | "assistant";
  content: string;
};

export function lastUserContentFromHistory(history: readonly AskQHistoryTurn[]): string | undefined {
  for (let i = history.length - 1; i >= 0; i -= 1) {
    if (history[i].role === "user") return history[i].content.trim();
  }
  return undefined;
}

const FOLLOW_HINT = /\b(what\s+about|what\s+does\s+that|what\s+is\s+that|and\s+why|and\s+how|explain\s+more|go\s+on|elaborate|same\s+for|ומה|מה\s+זה|מה\s+הכוונה|זה\s+אומר|ולמה|איך\s+זה|למה\s+זה|המשך|פירוט)\b/i;

function looksLikeFollowUp(latest: string): boolean {
  const t = latest.trim();
  if (!t) return false;
  const words = t.split(/\s+/).filter(Boolean);
  if (t.length <= 52 && words.length <= 9) return true;
  if (FOLLOW_HINT.test(t)) return true;
  return false;
}

/**
 * If the latest message is short or vague, combine it with the prior user message for retrieval / interpretation.
 */
export function resolveFollowUpQuery(latest: string, history: readonly AskQHistoryTurn[]): string {
  const t = latest.trim();
  if (!t) return t;
  const prior = lastUserContentFromHistory(history);
  if (!prior || prior === t) return t;
  if (!looksLikeFollowUp(t)) return t;
  return `${prior}\n\n(Follow-up: ${t})`;
}
