"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocsHeader({ onOpenMenu, onOpenToc }: { onOpenMenu: () => void; onOpenToc: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[var(--border)] bg-[#0b1020f2] backdrop-blur">
      <div className="flex h-full items-center px-3 md:px-6">
        <div className="flex w-full items-center gap-2 lg:gap-4">
          <button type="button" onClick={onOpenMenu} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 lg:hidden">
            Menu
          </button>

          <Link href="/docs" className="rounded-md px-2 py-1 text-base font-bold hover:bg-slate-800 sm:text-lg md:text-xl">
            WaveQ Docs
          </Link>

          <div className="ml-auto hidden w-full max-w-sm lg:block">
            <Input placeholder="Search Documentation" aria-label="Search Documentation" />
          </div>

          <Button type="button" variant="ghost" size="sm" className="hidden lg:inline-flex">
            Ask Q
          </Button>

          <button type="button" onClick={onOpenToc} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 lg:hidden">
            On this page
          </button>
        </div>
      </div>
    </header>
  );
}
