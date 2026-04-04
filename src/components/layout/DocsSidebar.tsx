"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getNavigationByGroup, getNavigationGroups, getNavigationItemByHref } from "@/lib/navigation";

export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const activeGroup = getNavigationItemByHref(pathname)?.group ?? "Start Here";
  const groups = getNavigationGroups();
  const normalizedQuery = query.trim().toLowerCase();

  const visibleByGroup = useMemo(() => {
    return groups.reduce<Record<string, ReturnType<typeof getNavigationByGroup>>>((acc, group) => {
      const items = getNavigationByGroup(group);
      acc[group] = normalizedQuery
        ? items.filter((item) => item.title.toLowerCase().includes(normalizedQuery) || item.description.toLowerCase().includes(normalizedQuery))
        : items;
      return acc;
    }, {});
  }, [groups, normalizedQuery]);

  return (
    <aside className={cn("h-full overflow-y-auto bg-[var(--panel)] px-5 py-6", className)}>
      <div className="space-y-3">
        <Link href="/docs" className="inline-block font-bold" onClick={() => setQuery("")}>
          WaveQ Docs
        </Link>
        <Input placeholder="Search docs..." value={query} onChange={(event) => setQuery(event.target.value)} />

        {groups.map((group) => {
          const items = visibleByGroup[group] ?? [];
          const shouldOpen = normalizedQuery.length > 0 ? group === activeGroup || items.length > 0 : Boolean(expandedGroups[group]);

          return (
            <details
              key={group}
              open={shouldOpen}
              onToggle={(event) => {
                if (normalizedQuery.length > 0) return;
                const isOpen = (event.currentTarget as HTMLDetailsElement).open;
                setExpandedGroups((prev) => ({ ...prev, [group]: isOpen }));
              }}
            >
              <summary className="cursor-pointer py-2 text-xs uppercase tracking-wide text-[var(--muted)]">{group}</summary>
              <div className="mt-1.5 space-y-0.5">
                {items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      title={item.description}
                      className={`block rounded-md px-3 py-1.5 ${active ? "bg-slate-800" : "hover:bg-slate-800"}`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.recommendedFirst ? <Badge className="bg-green-700">Recommended First</Badge> : null}
                      </span>
                    </Link>
                  );
                })}
                {items.length === 0 ? <p className="px-3 py-2 text-sm text-[var(--muted)]">No results in {group}</p> : null}
              </div>
            </details>
          );
        })}
      </div>
    </aside>
  );
}
