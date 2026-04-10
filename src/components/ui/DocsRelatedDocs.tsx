import { normalizeDocListText } from "@/lib/docs-text";

type DocsRelatedDocsProps = {
  items: string[];
};

export function DocsRelatedDocs({ items }: DocsRelatedDocsProps) {
  return (
    <div className="space-y-2 text-sm text-[var(--muted)]">
      {items.slice(0, 5).map((item) => (
        <div key={item} className="rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-3 py-2 leading-6">
          {normalizeDocListText(item)}
        </div>
      ))}
    </div>
  );
}
