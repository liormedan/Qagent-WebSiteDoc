"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getFlowNeighborsByHref, getFlowOrderedNavigation, getNavigationItemByHref } from "@/lib/navigation";

function normalizePathname(pathname: string): { normalizedPath: string; qagentPrefix: boolean } {
  if (pathname === "/docs/qagent") {
    return { normalizedPath: "/docs", qagentPrefix: true };
  }

  if (pathname.startsWith("/docs/qagent/")) {
    const suffix = pathname.replace("/docs/qagent", "");
    return { normalizedPath: `/docs${suffix}`, qagentPrefix: true };
  }

  return { normalizedPath: pathname, qagentPrefix: false };
}

function toContextHref(href: string, qagentPrefix: boolean): string {
  if (!qagentPrefix || !href.startsWith("/docs")) {
    return href;
  }
  return `/docs/qagent${href.replace("/docs", "")}`;
}

export function DocsPager() {
  const pathname = usePathname();
  const { normalizedPath, qagentPrefix } = normalizePathname(pathname);
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
        <Link href={toContextHref(previous.href, qagentPrefix)} className="text-[var(--muted)] hover:text-[var(--accent)]">
          Previous: {previous.title}
        </Link>
      ) : (
        <span className="text-slate-600">&nbsp;</span>
      )}
      {next ? (
        <Link href={toContextHref(next.href, qagentPrefix)} className="text-[var(--muted)] hover:text-[var(--accent)]">
          Next: {next.title}
        </Link>
      ) : null}
    </div>
  );
}
