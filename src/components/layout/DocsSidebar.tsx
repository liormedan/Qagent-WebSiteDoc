"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getGroupHubHref, getNavigationGroups, getNavigationItemByHref } from "@/lib/navigation";

export function DocsSidebar({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  const groups = getNavigationGroups();
  const activeGroup =
    groups.find((group) => pathname.startsWith(getGroupHubHref(group))) ?? getNavigationItemByHref(pathname)?.group ?? "Start Here";

  return (
    <aside className={cn("h-full overflow-y-auto bg-[var(--panel)] px-5 py-6", className)}>
      <div className="space-y-3">
        <Link href="/docs" className="inline-block font-bold">
          WaveQ Docs
        </Link>

        <nav className="space-y-1">
          {groups.map((group) => {
            const active = activeGroup === group;
            return (
              <Link
                key={group}
                href={getGroupHubHref(group)}
                onClick={onNavigate}
                className={`block rounded-md px-3 py-2 text-sm ${active ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"}`}
              >
                {group}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
