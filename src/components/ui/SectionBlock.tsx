"use client";

import { useDocsReadMode } from "@/components/layout/DocsReadModeContext";

export function SectionBlock({ id, title, body, children }: { id?: string; title: string; body: readonly string[]; children?: React.ReactNode }) {
  const { mode } = useDocsReadMode();
  const summaryLines = body.slice(0, 2);
  const detailLines = body.slice(2);
  const hasTechnicalDetails = detailLines.length > 0 || Boolean(children);
  const showTechnicalDetails = mode === "technical" && hasTechnicalDetails;

  return (
    <section id={id} className="rounded-xl bg-[var(--panel)] p-5 md:p-7">
      <div className="space-y-5">
        <h2 className="text-2xl font-semibold">{title}</h2>

        {summaryLines.length > 0 ? (
          <div className="space-y-3">
            {summaryLines.map((line, index) => (
              <p key={`${title}-summary-${index}`} className="text-base leading-8 text-slate-100">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">No summary available.</p>
        )}

        {hasTechnicalDetails ? (
          <details open={mode === "technical"}>
            <summary>
              <span className="cursor-pointer text-sm font-semibold text-[var(--muted)] hover:text-slate-200">Technical Details</span>
            </summary>
            {showTechnicalDetails ? (
              <div className="mt-3 space-y-3">
                {detailLines.map((line, index) => (
                  <p key={`${title}-details-${index}`} className="text-sm leading-7 text-slate-300">
                    {line}
                  </p>
                ))}
                {children}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Switch to Technical Mode to view full details.</p>
            )}
          </details>
        ) : null}
      </div>
    </section>
  );
}
