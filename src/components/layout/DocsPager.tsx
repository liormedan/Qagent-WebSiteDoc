"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFlowNeighborsByHref, getFlowOrderedNavigation, getNavigationItemByHref } from "@/lib/navigation";

export function DocsPager() {
  const pathname = usePathname();
  const normalizedPath = pathname;
  const navItem = getNavigationItemByHref(normalizedPath);
  const flowNeighbors = getFlowNeighborsByHref(normalizedPath);
  const flowOrder = getFlowOrderedNavigation();
  const index = flowOrder.findIndex((item) => item.href === normalizedPath);

  if (index < 0) return null;

  const previous = navItem?.group === "Core Flow" ? flowNeighbors.previous : flowOrder[index - 1];
  const next = navItem?.group === "Core Flow" ? flowNeighbors.next : flowOrder[index + 1];

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
