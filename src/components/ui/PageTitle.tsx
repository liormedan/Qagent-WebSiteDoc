"use client";

import { usePathname } from "next/navigation";
import { getFlowNeighborsByHref, getNavigationItemByHref } from "@/lib/navigation";

export function PageTitle({ title, description }: { title: string; description: string }) {
  const pathname = usePathname();
  const item = getNavigationItemByHref(pathname);
  const flowNeighbors = getFlowNeighborsByHref(pathname);
  const shortDescription = description.trim();
  const isMainFlow = item?.group === "Main Flow";

  const whenItRuns = isMainFlow
    ? `After ${flowNeighbors.previous?.title ?? "system entry"} and before ${flowNeighbors.next?.title ?? "session continuation"}.`
    : "During the relevant step in the end-to-end request flow.";

  const nextInFlow = isMainFlow
    ? flowNeighbors.next
      ? `${flowNeighbors.next.title} (${flowNeighbors.next.description})`
      : "Flow complete for this cycle; continue with review or session closure."
    : "Continue to the next page in flow navigation.";

  return (
    <div className="mb-10 space-y-5">
      <h1 className="text-4xl font-bold leading-tight">{title}</h1>
      <p className="max-w-3xl text-base text-[var(--muted)]">{description}</p>

      <div className="rounded-lg bg-[var(--panel)] p-4">
        <div className="space-y-2">
          <p className="text-sm font-bold">Quick Scan</p>
          <p className="text-sm text-slate-200">What it does: {shortDescription}</p>
          <p className="text-sm text-slate-300">When it runs: {whenItRuns}</p>
          <p className="text-sm text-slate-300">Inputs: Current flow context, active version, and user/system signals.</p>
          <p className="text-sm text-slate-300">Outputs: Deterministic artifacts consumed by the next flow step.</p>
          <p className="text-sm text-slate-300">Depends on: Upstream orchestration state and validated contracts.</p>
          <p className="text-sm text-slate-300">Next in flow: {nextInFlow}</p>
        </div>
      </div>
    </div>
  );
}
