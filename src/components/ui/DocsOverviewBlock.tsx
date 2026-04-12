import React from "react";
import { AutoLinkedText } from "@/components/docs/AutoLinkedText";
import { normalizeDocListText } from "@/lib/docs-text";

type DocsOverviewBlockProps = {
  intro: string;
  areasTitle: string;
  areas: string[];
  outOfScope: string;
  relatedBoundaries: string[];
  /** When set (e.g. `end-to-end`), glossary autolinking is applied to intro / list copy. */
  glossaryScope?: string;
};

export function DocsOverviewBlock({
  intro,
  areasTitle,
  areas,
  outOfScope,
  relatedBoundaries,
  glossaryScope,
}: DocsOverviewBlockProps) {
  const renderBody = (raw: string) =>
    glossaryScope ? (
      <AutoLinkedText text={raw} scope={glossaryScope} />
    ) : (
      normalizeDocListText(raw)
    );

  const renderPlainList = (items: string[]) => (
    <div className="mt-2 space-y-2 text-sm text-[var(--muted)]">
      {items.map((item) => (
        <div key={item} className="rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-3 py-2 leading-6">
          {renderBody(item)}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <p className="text-sm text-[var(--muted)]">{renderBody(intro)}</p>

      <div className="mt-3">
        <p className="text-sm font-semibold text-slate-100">{areasTitle}</p>
        {renderPlainList(areas)}
      </div>

      <div className="mt-3 rounded-md border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-100">
        <span className="font-semibold">Out of Scope:</span> {glossaryScope ? <AutoLinkedText text={outOfScope} scope={glossaryScope} /> : outOfScope}
      </div>

      <div className="mt-3">
        <p className="text-sm font-semibold text-slate-100">Related boundaries</p>
        {renderPlainList(relatedBoundaries)}
      </div>
    </>
  );
}
