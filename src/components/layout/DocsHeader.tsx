"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DocsHeader({ onOpenMenu, onOpenToc }: { onOpenMenu: () => void; onOpenToc: () => void }) {
  const pathname = usePathname();
  const clientActive = pathname.startsWith("/docs/client");
  const apiActive = pathname.startsWith("/docs/api");
  const qagentActive = !apiActive && !clientActive;

  return (
    <header className="sticky top-0 z-30 h-[72px] border-b border-[var(--border)] bg-[#0b1020f2] backdrop-blur">
      <div className="flex h-full items-center px-3 md:px-6">
        <div className="flex w-full items-center gap-2 lg:gap-4">
          <button type="button" onClick={onOpenMenu} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 md:hidden">
            Menu
          </button>

          <Link href="/docs" className="rounded-md px-2 py-1 text-base font-bold hover:bg-slate-800 sm:text-lg md:text-xl">
            WaveQ Docs
          </Link>

          <nav className="ml-4 hidden items-center gap-6 sm:flex" aria-label="Docs sections">
            <Link
              href="/docs/qagent"
              className={`text-sm font-medium transition-colors ${qagentActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              QAgent
            </Link>
            <Link
              href="/docs/client"
              className={`text-sm font-medium transition-colors ${clientActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              Client
            </Link>
            <Link
              href="/docs/api"
              className={`text-sm font-medium transition-colors ${apiActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              API Server
            </Link>
          </nav>

          {clientActive ? <p className="hidden text-xs font-medium text-slate-400 md:block">Client Layer — User Interface</p> : null}

          <div className="ml-auto hidden w-full max-w-sm md:block">
            <Input placeholder="Search Documentation" aria-label="Search Documentation" />
          </div>

          <Button type="button" variant="ghost" size="sm" className="hidden md:inline-flex">
            Ask Q
          </Button>

          <button type="button" onClick={onOpenToc} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 md:hidden">
            On this page
          </button>
        </div>
      </div>
    </header>
  );
}
