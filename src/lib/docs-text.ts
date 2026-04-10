export function normalizeDocListText(value: string): string {
  if (!value) return "";

  let text = value.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();

  // Remove markdown-like list prefixes (supports duplicated patterns like "* • item" or "1.) - item").
  const leadingListPrefix = /^(?:\s*(?:\d+\s*[.)-]|[-*•]+)\s*)+/u;
  text = text.replace(leadingListPrefix, "");
  text = text.replace(leadingListPrefix, "");

  return text.trim();
}

