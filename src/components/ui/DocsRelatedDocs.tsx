import Link from "next/link";
import { AutoLinkedText } from "@/components/docs/AutoLinkedText";
import { normalizeDocListText } from "@/lib/docs-text";

export type DocsRelatedDocLink = {
  href: string;
  title: string;
  description: string;
};

type DocsRelatedDocsProps = {
  items?: string[];
  links?: DocsRelatedDocLink[];
  /** When set, plain `items` rows use glossary autolinking (no links inside existing Link cards). */
  glossaryScope?: string;
};

export function DocsRelatedDocs({ items = [], links, glossaryScope }: DocsRelatedDocsProps) {
  return (
    <div className="space-y-2 text-sm text-[var(--muted)]">
      {links?.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-3 py-2 leading-6 transition-colors hover:border-cyan-400/50"
        >
          <span className="font-medium text-slate-100">{normalizeDocListText(link.title)}</span>
          <span className="mt-1 block text-xs text-[var(--muted)]">{normalizeDocListText(link.description)}</span>
        </Link>
      ))}
      {items.slice(0, 5).map((item) => (
        <div key={item} className="rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-3 py-2 leading-6">
          {glossaryScope ? <AutoLinkedText text={item} glossaryScope={glossaryScope} /> : normalizeDocListText(item)}
        </div>
      ))}
    </div>
  );
}
