import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { normalizeDocListText } from "@/lib/docs-text";

export type DocsDetailsItem = {
  id: string;
  title: string;
  subtitle: string;
  purpose: string;
  defines: readonly string[];
  doesNotDefine: string;
  href: string;
  linkLabel?: string;
};

export function DocsDetailsAccordion({ items }: { items: readonly DocsDetailsItem[] }) {
  return (
    <div className="space-y-4 text-sm">
      {items.map((item, index) => (
        <section id={item.id} key={item.id} className="overflow-hidden rounded-lg border border-[var(--border)] bg-slate-950/30 shadow-sm">
          <details className="group/details" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-900/30 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block font-semibold text-slate-100">{item.title}</span>
                <span className="block text-xs text-[var(--muted)]">{item.subtitle}</span>
                <span className="mt-2 block text-[11px] uppercase tracking-wide text-slate-500">Preview</span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-400">{normalizeDocListText(item.purpose)}</span>
              </span>
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform group-open/details:rotate-90" />
            </summary>
            <div className="border-t border-[var(--border)]">
              <div className="space-y-3 px-3 py-3">
                <p className="rounded-md bg-slate-900/30 px-2.5 py-2 text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Purpose:</span> {normalizeDocListText(item.purpose)}
                </p>
                <p className="font-semibold text-slate-100">Defines:</p>
                <div className="space-y-2 text-[var(--muted)]">
                  {item.defines.map((line, lineIndex) => (
                    <div key={`${item.id}-defines-${lineIndex}`} className="rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-2.5 py-2 leading-6">
                      {normalizeDocListText(line)}
                    </div>
                  ))}
                </div>
                <p className="rounded-md bg-slate-900/30 px-2.5 py-2 text-[var(--muted)]">
                  <span className="font-semibold text-slate-100">Does not define:</span> {normalizeDocListText(item.doesNotDefine)}
                </p>
                <Link href={item.href} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                  {item.linkLabel ?? "Related section"}
                </Link>
              </div>
            </div>
          </details>
        </section>
      ))}
    </div>
  );
}
