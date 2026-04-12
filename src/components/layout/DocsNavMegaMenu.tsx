"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  AudioWaveform,
  Bot,
  Cloud,
  Database,
  GitBranch,
  LayoutDashboard,
  MonitorSmartphone,
  Server,
  Shield,
} from "lucide-react";
import type { DocsNavGroup, DocsNavIconId, DocsNavItem } from "@/components/layout/docs-nav-config";
import { cn } from "@/lib/utils";

const ICONS: Record<DocsNavIconId, LucideIcon> = {
  system: LayoutDashboard,
  client: MonitorSmartphone,
  qagent: Bot,
  api: Server,
  dsp: AudioWaveform,
  data: Database,
  auth: Shield,
  infra: Cloud,
  e2e: GitBranch,
};

export function DocsNavMegaFlyout({
  group,
  pathname,
  onPick,
}: {
  group: DocsNavGroup;
  pathname: string;
  onPick: () => void;
}) {
  return (
    <div className="p-3 sm:p-4">
      <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">{group.label}</p>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-2">
        {group.items.map((item) => (
          <DocsNavMegaRow key={item.href} item={item} pathname={pathname} onPick={onPick} />
        ))}
      </div>
    </div>
  );
}

function DocsNavMegaRow({ item, pathname, onPick }: { item: DocsNavItem; pathname: string; onPick: () => void }) {
  const Icon = ICONS[item.iconId];
  const active = item.matches(pathname);
  return (
    <Link
      href={item.href}
      role="menuitem"
      aria-current={active ? "page" : undefined}
      onClick={onPick}
      className={cn(
        "group flex gap-3 rounded-xl px-2.5 py-2.5 transition-colors sm:px-3 sm:py-3",
        active ? "bg-cyan-500/[0.08] ring-1 ring-cyan-400/35" : "hover:bg-slate-800/70",
      )}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-900/80 sm:h-9 sm:w-9",
          active ? "border-cyan-500/40 bg-cyan-500/10" : "group-hover:border-slate-600",
        )}
      >
        <Icon className={cn("h-[18px] w-[18px] sm:h-4 sm:w-4", active ? "text-cyan-200/90" : "text-slate-400 group-hover:text-slate-200")} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-semibold leading-tight", active ? "text-cyan-100" : "text-slate-100 group-hover:text-white")}>{item.label}</p>
        <p className="mt-0.5 text-xs leading-snug text-slate-500 group-hover:text-slate-400">{item.description}</p>
      </div>
    </Link>
  );
}

/** Mobile: stacked list with title + description (no icon grid squeeze). */
export function DocsNavMegaMobileBlock({
  group,
  pathname,
  onPick,
  linkBase,
  linkIdle,
  linkActive,
}: {
  group: DocsNavGroup;
  pathname: string;
  onPick: () => void;
  linkBase: string;
  linkIdle: string;
  linkActive: string;
}) {
  return (
    <div>
      <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{group.label}</p>
      <div className="flex flex-col gap-1">
        {group.items.map((item) => {
          const itemActive = item.matches(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(linkBase, "rounded-lg", itemActive ? linkActive : linkIdle)}
              onClick={onPick}
            >
              <span className="block font-medium text-slate-100">{item.label}</span>
              <span className="mt-0.5 block text-xs leading-snug text-slate-500">{item.description}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
