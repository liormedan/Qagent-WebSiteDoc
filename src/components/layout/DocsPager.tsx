"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFlowNeighborsByHref, getFlowOrderedNavigation, getNavigationItemByHref } from "@/lib/navigation";

export function DocsPager() {
  const pathname = usePathname();
  const navItem = getNavigationItemByHref(pathname);
  const flowNeighbors = getFlowNeighborsByHref(pathname);
  const flowOrder = getFlowOrderedNavigation();
  const index = flowOrder.findIndex((item) => item.href === pathname);

  if (index < 0) return null;

  const previous = navItem?.group === "Main Flow" ? flowNeighbors.previous : flowOrder[index - 1];
  const next = navItem?.group === "Main Flow" ? flowNeighbors.next : flowOrder[index + 1];

  return (
    <div className="mt-10 flex justify-between gap-4 border-t border-[var(--border)] pt-6">
      {previous ? (
        <Link href={previous.href} className="text-[var(--muted)] hover:text-[var(--accent)]">
          Previous: {previous.title}
        </Link>
      ) : (
        <span className="text-slate-600">&nbsp;</span>
      )}
      {next ? (
        <Link href={next.href} className="text-[var(--muted)] hover:text-[var(--accent)]">
          Next: {next.title}
        </Link>
      ) : null}
    </div>
  );
}
