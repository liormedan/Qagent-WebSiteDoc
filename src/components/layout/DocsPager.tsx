"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFlowNeighborsByHref, getFlowOrderedNavigation, getNavigationItemByHref } from "@/lib/navigation";

const canonicalOverviewPath: Record<string, { previous?: { title: string; href: string }; next?: { title: string; href: string } }> = {
  "/docs": { next: { title: "System Structure", href: "/docs/system" } },
  "/docs/system": {
    previous: { title: "Docs Home", href: "/docs" },
    next: { title: "Client Layer", href: "/docs/client" },
  },
  "/docs/client": {
    previous: { title: "System Structure", href: "/docs/system" },
    next: { title: "QAgent Layer", href: "/docs/q-agent" },
  },
  "/docs/q-agent": {
    previous: { title: "Client Layer", href: "/docs/client" },
    next: { title: "API Server Layer", href: "/docs/api" },
  },
  "/docs/api": {
    previous: { title: "QAgent Layer", href: "/docs/q-agent" },
    next: { title: "API Core Flow", href: "/docs/api/core-flow" },
  },
};

export function DocsPager() {
  const pathname = usePathname();
  const normalizedPath = pathname;
  const canonical = canonicalOverviewPath[normalizedPath];
  const navItem = getNavigationItemByHref(normalizedPath);
  const flowNeighbors = getFlowNeighborsByHref(normalizedPath);
  const flowOrder = getFlowOrderedNavigation();
  const index = flowOrder.findIndex((item) => item.href === normalizedPath);

  if (index < 0 && !canonical) return null;

  const previous = canonical?.previous ?? (navItem?.group === "Core Flow" ? flowNeighbors.previous : flowOrder[index - 1]);
  const next = canonical?.next ?? (navItem?.group === "Core Flow" ? flowNeighbors.next : flowOrder[index + 1]);

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
