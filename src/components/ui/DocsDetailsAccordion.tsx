import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { normalizeDocListText } from "@/lib/docs-text";

export type DocsDetailsItem = {
  id: string;
  title: string;
  subtitle: string;
  purpose: string;
  defines: readonly string[];
  /** Optional rich content (e.g. tables) rendered after Defines, before Does not define. */
  supplement?: ReactNode;
  doesNotDefine: string;
  href: string;
  linkLabel?: string;
};

export type DocsDetailsSummaryVariant = "default" | "reference";

export type DocsDetailsAccordionVariant = "spec" | "chapter";

export function DocsDetailsAccordion({
  items,
  defaultOpenAll = false,
  summaryVariant = "default",
  variant = "spec",
}: {
  items: readonly DocsDetailsItem[];
  defaultOpenAll?: boolean;
  /** `reference`: compact summary (title + subtitle only); body stays inside closed details until expanded. */
  summaryVariant?: DocsDetailsSummaryVariant;
  /** `chapter`: chapter index rows — title-only summary; body is short description + CTA link only. */
  variant?: DocsDetailsAccordionVariant;
}) {
  const isChapter = variant === "chapter";

  return (
    <div className="space-y-4 text-sm">
      {items.map((item, index) => {
        const defineLines = item.defines.filter((line) => line.trim().length > 0);
        const showSubtitle = !isChapter && item.subtitle.trim().length > 0;
        const showSummaryPurposePreview = !isChapter && summaryVariant === "default";

        return (
          <section
            id={item.id}
            key={item.id}
            className="scroll-mt-28 overflow-hidden rounded-lg border border-[var(--border)] bg-slate-950/30 shadow-sm"
          >
            <div className="border-b border-[var(--border)]/70 bg-slate-900/40 px-3 py-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {isChapter ? `Chapter ${index + 1}` : `Detail Entry ${index + 1}`}
              </p>
            </div>
            <details className="group/details" open={defaultOpenAll}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-900/30 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0">
                  <span className="block font-semibold text-slate-100">{item.title}</span>
                  {showSubtitle ? <span className="block text-xs text-[var(--muted)]">{item.subtitle}</span> : null}
                  {showSummaryPurposePreview ? (
                    <>
                      <span className="mt-2 block text-[11px] uppercase tracking-wide text-slate-500">Preview</span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-400">{normalizeDocListText(item.purpose)}</span>
                    </>
                  ) : null}
                </span>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-transform group-open/details:rotate-90" />
              </summary>
              <div className="border-t border-[var(--border)]">
                {isChapter ? (
                  <div className="space-y-3 px-3 py-3">
                    <p className="text-sm leading-relaxed text-[var(--muted)]">{normalizeDocListText(item.purpose)}</p>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent)] hover:underline"
                    >
                      {item.linkLabel ?? "Open chapter"}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 px-3 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Detail Content</p>
                    <p className="rounded-md bg-slate-900/30 px-2.5 py-2 text-[var(--muted)]">
                      <span className="font-semibold text-slate-100">Purpose:</span> {normalizeDocListText(item.purpose)}
                    </p>
                    {defineLines.length > 0 ? (
                      <>
                        <p className="font-semibold text-slate-100">Defines:</p>
                        <div className="space-y-2 text-[var(--muted)]">
                          {defineLines.map((line, lineIndex) => (
                            <div key={`${item.id}-defines-${lineIndex}`} className="rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-2.5 py-2 leading-6">
                              {normalizeDocListText(line)}
                            </div>
                          ))}
                        </div>
                      </>
                    ) : null}
                    {item.supplement ? <div className="space-y-2">{item.supplement}</div> : null}
                    <p className="rounded-md bg-slate-900/30 px-2.5 py-2 text-[var(--muted)]">
                      <span className="font-semibold text-slate-100">Does not define:</span> {normalizeDocListText(item.doesNotDefine)}
                    </p>
                    <Link href={item.href} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                      {item.linkLabel ?? "Related section"}
                    </Link>
                  </div>
                )}
              </div>
            </details>
          </section>
        );
      })}
    </div>
  );
}
