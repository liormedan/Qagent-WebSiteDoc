"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { AskQLauncher } from "@/components/ask-q/AskQLauncher";
import { DocsHeaderSearch } from "@/components/layout/DocsHeaderSearch";
import { DocsNavMegaFlyout, DocsNavMegaMobileBlock } from "@/components/layout/DocsNavMegaMenu";
import {
  DOCS_NAV_GROUPS,
  type DocsNavGroupId,
  getDocsNavActivityFlags,
  isDocsNavGroupActive,
  normalizeDocsPath,
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

  const { clientActive, authSecurityActive } = getDocsNavActivityFlags(safePathname);
  const developmentActive = normalizeDocsPath(safePathname) === "/docs/development";
  const terminologyActive = normalizeDocsPath(safePathname) === "/docs/terminology";

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

  const contextText = clientActive
    ? "Client Layer - User Interface"
    : authSecurityActive
      ? "Auth & Security Layer — specification"
      : "Documentation Context";

  const linkBase = "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors sm:py-2";
  const linkIdle = "text-slate-200 hover:bg-slate-800/80";
  const linkActive = "bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/40";

  const sourcesNavTabClass = (active: boolean) =>
    cn(
      "flex max-w-[152px] shrink-0 items-center gap-0.5 rounded-full px-2.5 py-1.5 text-left text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors lg:max-w-none lg:px-3 lg:text-sm lg:tracking-[0.09em]",
      active ? "bg-slate-800/90 text-slate-50" : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200",
    );

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

          {/* Desktop / tablet: group flyouts; Sources sits after Platform, same tab chrome (slate, no cyan). */}
          <div ref={navClusterRef} className="relative ml-1 hidden min-w-0 flex-1 sm:block lg:ml-3">
            <nav className="flex items-center gap-1 lg:gap-2" aria-label="Docs section groups">
              {DOCS_NAV_GROUPS.map((group) => {
                const routeActive = isDocsNavGroupActive(group, safePathname);
                const flyoutOpen = openGroupId === group.id;
                return (
                  <div key={group.id} className="relative">
                    <button
                      type="button"
                      className={cn(
                        "flex max-w-[152px] items-center gap-0.5 rounded-full px-2.5 py-1.5 text-left text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors lg:max-w-none lg:px-3 lg:text-sm lg:tracking-[0.09em]",
                        routeActive || flyoutOpen ? "bg-slate-800/95 text-slate-50" : "text-slate-400 hover:bg-slate-900/80 hover:text-slate-200",
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
                        "absolute left-0 top-full z-50 mt-2 w-[min(calc(100vw-1.5rem),42rem)] origin-top rounded-xl border border-slate-800/90 bg-[#070a12] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.78)] ring-1 ring-white/[0.04] backdrop-blur-xl transition-[opacity,transform] duration-150 ease-out",
                        !flyoutOpen && "pointer-events-none invisible scale-[0.98] opacity-0",
                        flyoutOpen && "visible scale-100 opacity-100",
                      )}
                    >
                      <DocsNavMegaFlyout group={group} pathname={safePathname} onPick={() => setOpenGroupId(null)} />
                    </div>
                  </div>
                );
              })}
              <Link
                href="/docs/development"
                className={sourcesNavTabClass(developmentActive)}
                aria-current={developmentActive ? "page" : undefined}
              >
                <span className="truncate lg:hidden">Src</span>
                <span className="hidden truncate lg:inline">Sources</span>
              </Link>
            </nav>
          </div>

          <div className="ml-auto flex min-w-0 max-w-[calc(100vw-12rem)] shrink-0 items-center gap-1.5 sm:max-w-none md:max-w-[min(320px,calc(100vw-20rem)))] lg:max-w-[360px]">
            <Link
              href="/docs/terminology"
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-700/90 bg-slate-950/60 text-slate-300 transition-colors hover:border-cyan-500/35 hover:bg-slate-800/85 hover:text-cyan-100/95",
                terminologyActive && "border-cyan-500/40 bg-cyan-500/10 text-cyan-100 ring-1 ring-cyan-400/35",
              )}
              aria-label="Terminology — glossary index (A–Z by scope)"
              title="Terminology (glossary index)"
            >
              <BookOpen className="h-[18px] w-[18px]" aria-hidden />
            </Link>
            <AskQLauncher />
            <div className="hidden min-w-0 flex-1 md:block">
              <DocsHeaderSearch />
            </div>
          </div>

          <button type="button" onClick={onOpenToc} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 md:hidden">
            On this page
          </button>
        </div>

        {/* Mobile: Sources entry always visible (separate from Browse documentation) */}
        <div className="border-t border-[var(--border)]/60 px-1 py-2 sm:hidden">
          <Link
            href="/docs/development"
            className={cn(
              "block rounded-md px-3 py-2 text-center text-sm font-semibold uppercase tracking-[0.08em] transition-colors",
              developmentActive ? "bg-slate-800/90 text-slate-50" : "text-slate-200 hover:bg-slate-800/80",
            )}
            aria-current={developmentActive ? "page" : undefined}
          >
            Sources
          </Link>
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
            <div className="space-y-4 border-t border-[var(--border)]/40 px-1 pb-2 pt-2">
              {DOCS_NAV_GROUPS.map((group) => (
                <DocsNavMegaMobileBlock
                  key={group.id}
                  group={group}
                  pathname={safePathname}
                  onPick={() => setMobileBrowseOpen(false)}
                  linkBase={linkBase}
                  linkIdle={linkIdle}
                  linkActive={linkActive}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="hidden h-[32px] items-center border-t border-[var(--border)]/60 md:flex">
          <p
            className={`truncate text-[13px] font-medium leading-5 tracking-[0.05em] ${clientActive || authSecurityActive ? "text-slate-400" : "text-transparent select-none"}`}
          >
            {contextText}
          </p>
        </div>
      </div>
    </header>
  );
}
