"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocsReadMode } from "@/components/layout/DocsReadModeContext";
import { getFlowNeighborsByHref, getFlowProgressByHref, getNavigationByGroup, getNavigationItemByHref } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocsHeader({ onOpenMenu, onOpenToc }: { onOpenMenu: () => void; onOpenToc: () => void }) {
  const pathname = usePathname();
  const item = getNavigationItemByHref(pathname);
  const { mode, setMode } = useDocsReadMode();
  const groupHomeHref = item ? getNavigationByGroup(item.group)[0]?.href ?? "/docs" : "/docs";
  const flowProgress = getFlowProgressByHref(pathname);
  const flowNeighbors = getFlowNeighborsByHref(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[#0b1020f2] backdrop-blur">
      <div className="px-3 py-3 md:px-6">
        <div className="flex items-center gap-2 lg:gap-4">
          <button type="button" onClick={onOpenMenu} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 lg:hidden">
            Menu
          </button>
          <Link href="/docs" className="rounded-md px-2 py-1 text-lg font-bold hover:bg-slate-800 md:text-2xl">
            WaveQ
          </Link>
          <nav className="hidden items-center gap-2 text-sm text-slate-300 md:flex">
            <button type="button" className="rounded-md px-2 py-1 hover:bg-slate-800">Products</button>
            <button type="button" className="rounded-md px-2 py-1 hover:bg-slate-800">Resources</button>
            <button type="button" className="rounded-md px-2 py-1 hover:bg-slate-800">Solutions</button>
          </nav>
          <div className="ml-auto hidden w-full max-w-sm md:block">
            <Input placeholder="Search Documentation" aria-label="Search Documentation" />
          </div>
          <Button type="button" variant="ghost" size="sm" className="hidden md:inline-flex">
            Ask Q
          </Button>
          <button type="button" onClick={onOpenToc} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 lg:hidden">
            On this page
          </button>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-4 py-3 md:px-10">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Link href="/docs" className="rounded-md px-2 py-1 text-slate-200 hover:bg-slate-800">Q Documentation</Link>
              <span className="text-slate-500">&gt;</span>
              <Link href={item ? groupHomeHref : "/docs"} className="rounded-md px-2 py-1 text-slate-300 hover:bg-slate-800">
                {item ? item.group : "Docs Index"}
              </Link>
              {item ? (
                <>
                  <span className="text-slate-500">&gt;</span>
                  <div className="rounded-md bg-slate-800 px-2 py-1 text-slate-100">{item.title}</div>
                </>
              ) : null}
            </div>
            {flowProgress ? (
              <div className="w-fit max-w-full rounded-md bg-teal-900/35 px-3 py-2">
                <p className="text-sm font-semibold text-teal-200">
                  {flowProgress.group} · Step {flowProgress.step} of {flowProgress.total}
                </p>
                <p className="mt-0.5 text-xs text-teal-100">
                  You are in: {item?.flowHelper ?? `Transitioning to ${flowNeighbors.next?.title ?? "the next stage"}.`}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-md bg-slate-900 p-1">
              <button
                className={`rounded-md px-3 py-1.5 text-sm ${mode === "overview" ? "bg-slate-700 text-slate-100" : "text-slate-400"}`}
                onClick={() => setMode("overview")}
                type="button"
              >
                Overview Mode
              </button>
              <button
                className={`rounded-md px-3 py-1.5 text-sm ${mode === "technical" ? "bg-slate-700 text-slate-100" : "text-slate-400"}`}
                onClick={() => setMode("technical")}
                type="button"
              >
                Technical Mode
              </button>
            </div>
            <Button asChild variant="link" size="sm" className="px-3 py-1.5 text-base">
              <Link href="/docs">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
