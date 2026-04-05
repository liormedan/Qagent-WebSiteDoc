"use client";

import { linkConcepts } from "@/lib/docs/auto-link";

export function SectionBlock({ id, title, body, children }: { id?: string; title: string; body: readonly string[]; children?: React.ReactNode }) {
  const summaryLines = body.slice(0, 2);
  const detailLines = body.slice(2);
  const hasTechnicalDetails = detailLines.length > 0 || Boolean(children);

  return (
    <section id={id} className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
      <div className="space-y-3">
        <h2 className="break-words text-xl font-semibold leading-tight md:text-2xl">{linkConcepts(title, 1)}</h2>

        {summaryLines.length > 0 ? (
          <div className="space-y-2">
            {summaryLines.map((line, index) => (
              <p key={`${title}-summary-${index}`} className="break-words text-sm leading-6 text-slate-100">
                {linkConcepts(line)}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No summary available.</p>
        )}

        {hasTechnicalDetails ? (
          <details>
            <summary>
              <span className="cursor-pointer text-sm font-semibold text-[var(--muted)] hover:text-slate-200">Technical Details</span>
            </summary>
            <div className="mt-3 space-y-3">
              {detailLines.map((line, index) => (
                <p key={`${title}-details-${index}`} className="text-sm leading-7 text-slate-300">
                  {linkConcepts(line)}
                </p>
              ))}
              {children}
            </div>
          </details>
        ) : null}
      </div>
    </section>
  );
}
