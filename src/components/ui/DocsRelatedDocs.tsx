type DocsRelatedDocsProps = {
  items: string[];
};

export function DocsRelatedDocs({ items }: DocsRelatedDocsProps) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
      {items.slice(0, 5).map((item) => (
        <li key={item}>{item.replace(/^(?:[-*\u2022]\s*)+/, "").trim()}</li>
      ))}
    </ul>
  );
}
