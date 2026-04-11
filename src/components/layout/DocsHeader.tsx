"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DOCS_NAV_GROUPS,
  type DocsNavGroupId,
  getDocsNavActivityFlags,
  isDocsNavGroupActive,
} from "@/components/layout/docs-nav-config";
import { cn } from "@/lib/utils";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function DocsHeader({ onOpenMenu, onOpenToc }: { onOpenMenu: () => void; onOpenToc: () => void }) {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const safePathname = hydrated ? pathname : "";

  const { clientActive } = getDocsNavActivityFlags(safePathname);

  const [openGroupId, setOpenGroupId] = useState<DocsNavGroupId | null>(null);
  const [mobileBrowseOpen, setMobileBrowseOpen] = useState(false);
  const navClusterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setOpenGroupId(null);
      setMobileBrowseOpen(false);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    if (!openGroupId) return;
    const onDocMouseDown = (event: MouseEvent) => {
      const el = navClusterRef.current;
      if (el && !el.contains(event.target as Node)) setOpenGroupId(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenGroupId(null);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openGroupId]);

  const toggleGroupFlyout = useCallback((groupId: DocsNavGroupId) => {
    setOpenGroupId((current) => (current === groupId ? null : groupId));
  }, []);

  const contextText = clientActive ? "Client Layer - User Interface" : "Documentation Context";

  const linkBase = "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors sm:py-2";
  const linkIdle = "text-slate-200 hover:bg-slate-800/80";
  const linkActive = "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/40";

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[#0b1020f2] backdrop-blur">
      <div className="h-full px-3 md:px-6">
        <div className="flex h-[56px] w-full items-center gap-2 lg:gap-3">
          <button type="button" onClick={onOpenMenu} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 md:hidden">
            Menu
          </button>

          <Link href="/docs" className="shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-base font-bold leading-none hover:bg-slate-800 sm:text-lg md:text-xl">
            WaveQ Docs
          </Link>

          {/* Desktop / tablet: group tabs open a single flyout (no secondary strip) */}
          <div ref={navClusterRef} className="relative ml-1 hidden min-w-0 flex-1 sm:block">
            <nav className="flex items-center gap-1 lg:ml-3 lg:gap-2" aria-label="Docs section groups">
              {DOCS_NAV_GROUPS.map((group) => {
                const routeActive = isDocsNavGroupActive(group, safePathname);
                const flyoutOpen = openGroupId === group.id;
                return (
                  <div key={group.id} className="relative">
                    <button
                      type="button"
                      className={cn(
                        "flex max-w-[140px] items-center gap-0.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold uppercase tracking-[0.06em] transition-colors lg:max-w-none lg:px-2.5 lg:text-[11px] lg:tracking-[0.1em]",
                        routeActive || flyoutOpen ? "bg-slate-800/90 text-slate-50" : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200",
                      )}
                      aria-expanded={flyoutOpen}
                      aria-haspopup="menu"
                      aria-controls={`docs-nav-flyout-${group.id}`}
                      id={`docs-nav-group-${group.id}`}
                      onClick={() => toggleGroupFlyout(group.id)}
                    >
                      <span className="truncate lg:hidden">{group.labelShort}</span>
                      <span className="hidden truncate lg:inline">{group.label}</span>
                      <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 opacity-70 transition-transform", flyoutOpen && "rotate-180")} aria-hidden />
                    </button>
                    <div
                      id={`docs-nav-flyout-${group.id}`}
                      role="menu"
                      aria-labelledby={`docs-nav-group-${group.id}`}
                      hidden={!flyoutOpen}
                      className={cn(
                        "absolute left-0 top-full z-50 mt-1 min-w-[11rem] rounded-md border border-[var(--border)] bg-[#0d1428f2] py-1.5 shadow-xl backdrop-blur",
                        !flyoutOpen && "pointer-events-none invisible opacity-0",
                        flyoutOpen && "visible opacity-100",
                      )}
                    >
                      {group.items.map((item) => {
                        const itemActive = item.matches(safePathname);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            aria-current={itemActive ? "page" : undefined}
                            className={cn(
                              "block whitespace-nowrap px-3 py-2 text-sm transition-colors",
                              itemActive ? "bg-cyan-500/15 text-cyan-100" : "text-slate-200 hover:bg-slate-800/90",
                            )}
                            onClick={() => setOpenGroupId(null)}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="ml-auto hidden min-w-0 max-w-[200px] shrink-0 md:block lg:max-w-[280px]">
            <Input placeholder="Search Documentation" aria-label="Search Documentation" />
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden w-[88px] shrink-0 justify-center md:inline-flex"
            title="Ask anything about WaveQ..."
            aria-label="Ask anything about WaveQ..."
          >
            Ask Q
          </Button>

          <button type="button" onClick={onOpenToc} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 md:hidden">
            On this page
          </button>
        </div>

        {/* Mobile: expandable grouped list only */}
        <div className="border-t border-[var(--border)]/60 pb-2 sm:hidden">
          <button
            type="button"
            className="flex w-full cursor-pointer items-center justify-between gap-2 px-1 py-2.5 text-left text-sm font-semibold text-slate-200"
            aria-expanded={mobileBrowseOpen}
            onClick={() => setMobileBrowseOpen((o) => !o)}
          >
            <span>Browse documentation</span>
            <ChevronDown className={cn("h-4 w-4 shrink-0 text-slate-400 transition-transform", mobileBrowseOpen && "rotate-180")} aria-hidden />
          </button>
          {mobileBrowseOpen ? (
            <div className="space-y-3 border-t border-[var(--border)]/40 px-1 pb-2 pt-2">
              {DOCS_NAV_GROUPS.map((group) => (
                <div key={group.id}>
                  <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{group.label}</p>
                  <div className="flex flex-col gap-0.5">
                    {group.items.map((item) => {
                      const itemActive = item.matches(safePathname);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(linkBase, itemActive ? linkActive : linkIdle)}
                          onClick={() => setMobileBrowseOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden h-[32px] items-center border-t border-[var(--border)]/60 md:flex">
          <p className={`truncate text-xs font-medium leading-5 tracking-[0.04em] ${clientActive ? "text-slate-400" : "text-transparent select-none"}`}>
            {contextText}
          </p>
        </div>
      </div>
    </header>
  );
}
