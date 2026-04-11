"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
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
    <div className="mt-10 flex flex-col gap-3 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-stretch sm:justify-between sm:gap-4">
      <div className="flex min-w-0 flex-1 justify-start">
        {previous ? (
          <Button variant="outline" size="default" asChild className="h-auto min-h-9 w-full max-w-full justify-start px-3 py-2.5 text-left sm:w-auto sm:max-w-[min(100%,28rem)]">
            <Link href={previous.href} className="inline-flex w-full items-center gap-2">
              <ChevronLeft className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <span className="min-w-0 truncate text-sm leading-snug text-slate-300">
                Previous: <span className="font-medium text-slate-100">{previous.title}</span>
              </span>
            </Link>
          </Button>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 justify-end">
        {next ? (
          <Button variant="outline" size="default" asChild className="h-auto min-h-9 w-full max-w-full justify-end px-3 py-2.5 sm:w-auto sm:max-w-[min(100%,28rem)]">
            <Link href={next.href} className="inline-flex w-full items-center justify-end gap-2">
              <span className="min-w-0 truncate text-right text-sm leading-snug text-slate-300">
                Next: <span className="font-medium text-slate-100">{next.title}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
