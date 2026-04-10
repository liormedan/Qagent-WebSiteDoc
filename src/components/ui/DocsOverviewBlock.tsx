import React from "react";

type DocsOverviewBlockProps = {
  intro: string;
  areasTitle: string;
  areas: string[];
  outOfScope: string;
  relatedBoundaries: string[];
};

export function DocsOverviewBlock({ intro, areasTitle, areas, outOfScope, relatedBoundaries }: DocsOverviewBlockProps) {
  return (
    <>
      <p className="text-sm text-[var(--muted)]">{intro}</p>

      <div className="mt-3">
        <p className="text-sm font-semibold text-slate-100">{areasTitle}</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
          {areas.map((item) => (
            <li key={item}>{item.replace(/^(?:[-*\u2022]\s*)+/, "").trim()}</li>
          ))}
        </ul>
      </div>

      <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
        <span className="font-semibold">Out of Scope:</span> {outOfScope}
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-slate-100">Related boundaries</p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
          {relatedBoundaries.map((item) => (
            <li key={item}>{item.replace(/^(?:[-*\u2022]\s*)+/, "").trim()}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
