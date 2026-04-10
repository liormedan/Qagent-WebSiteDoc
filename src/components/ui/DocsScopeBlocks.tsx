import React from "react";
import { normalizeDocListText } from "@/lib/docs-text";

type DocsScopeBlocksProps = {
  covers: string;
  doesNotCover: string;
};

export function DocsScopeBlocks({ covers, doesNotCover }: DocsScopeBlocksProps) {
  return (
    <section className="mt-4 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
      <div className="grid gap-2 md:grid-cols-2">
        <div className="rounded-md border border-cyan-300/30 bg-cyan-400/10 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">This page covers</p>
          <p className="mt-1 text-sm">{normalizeDocListText(covers)}</p>
        </div>
        <div className="rounded-md border border-amber-300/30 bg-amber-400/10 px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">This page does not cover</p>
          <p className="mt-1 text-sm">{normalizeDocListText(doesNotCover)}</p>
        </div>
      </div>
    </section>
  );
}
