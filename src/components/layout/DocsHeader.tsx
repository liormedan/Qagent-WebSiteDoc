"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const clientActive = safePathname.startsWith("/docs/client");
  const apiActive = safePathname.startsWith("/docs/api");
  const dataLayerActive = safePathname.startsWith("/docs/data-layer");
  const dspActive =
    safePathname.startsWith("/docs/dsp-layer") ||
    safePathname.startsWith("/docs/architecture/dagent/dsp-engine-abstraction");
  const systemActive =
    safePathname === "/docs" ||
    safePathname.startsWith("/docs/system") ||
    safePathname.startsWith("/docs/system-flow") ||
    safePathname.startsWith("/docs/auth-security") ||
    safePathname.startsWith("/docs/infrastructure-layer");
  const qagentActive =
    safePathname.startsWith("/docs/q-agent") ||
    safePathname.startsWith("/docs/architecture") ||
    safePathname.startsWith("/docs/orchestration") ||
    safePathname.startsWith("/docs/qcore") ||
    safePathname.startsWith("/docs/module-design") ||
    safePathname.startsWith("/docs/function-contracts") ||
    safePathname.startsWith("/docs/testing-strategy") ||
    safePathname.startsWith("/docs/implementation-map") ||
    safePathname.startsWith("/docs/concepts");
  const contextText = clientActive ? "Client Layer - User Interface" : "Documentation Context";

  return (
    <header className="sticky top-0 z-30 h-[88px] border-b border-[var(--border)] bg-[#0b1020f2] backdrop-blur">
      <div className="h-full px-3 md:px-6">
        <div className="flex h-[56px] w-full items-center gap-2 lg:gap-4">
          <button type="button" onClick={onOpenMenu} className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-slate-200 md:hidden">
            Menu
          </button>

          <Link href="/docs" className="shrink-0 whitespace-nowrap rounded-md px-2 py-1 text-base font-bold leading-none hover:bg-slate-800 sm:text-lg md:text-xl">
            WaveQ Docs
          </Link>

          <nav className="ml-4 hidden min-w-0 items-center gap-5 sm:flex" aria-label="Docs sections">
            <Link
              href="/docs/system"
              className={`whitespace-nowrap text-sm font-medium leading-5 transition-colors ${systemActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              System
            </Link>
            <Link
              href="/docs/q-agent"
              className={`whitespace-nowrap text-sm font-medium leading-5 transition-colors ${qagentActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              QAgent
            </Link>
            <Link
              href="/docs/client"
              className={`whitespace-nowrap text-sm font-medium leading-5 transition-colors ${clientActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              Client
            </Link>
            <Link
              href="/docs/api"
              className={`whitespace-nowrap text-sm font-medium leading-5 transition-colors ${apiActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              API Server
            </Link>
            <Link
              href="/docs/dsp-layer"
              className={`whitespace-nowrap text-sm font-medium leading-5 transition-colors ${dspActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              DSP
            </Link>
            <Link
              href="/docs/data-layer"
              className={`whitespace-nowrap text-sm font-medium leading-5 transition-colors ${dataLayerActive ? "text-slate-100" : "text-slate-400 hover:text-slate-200"}`}
            >
              Data Layer
            </Link>
          </nav>

          <div className="ml-auto hidden w-[320px] shrink-0 md:block">
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
        <div className="hidden h-[32px] items-center border-t border-[var(--border)]/60 md:flex">
          <p className={`truncate text-xs font-medium leading-5 tracking-[0.04em] ${clientActive ? "text-slate-400" : "text-transparent select-none"}`}>
            {contextText}
          </p>
        </div>
      </div>
    </header>
  );
}
