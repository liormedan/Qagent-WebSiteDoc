"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/layout/DocsHeader";
import { DocsPager } from "@/components/layout/DocsPager";
import { DocsReadModeProvider, type DocsReadMode } from "@/components/layout/DocsReadModeContext";
import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { DocsToc } from "@/components/layout/DocsToc";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<DocsReadMode>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  return (
    <DocsReadModeProvider value={{ mode, setMode }}>
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <DocsHeader onOpenMenu={() => setMobileMenuOpen(true)} onOpenToc={() => setMobileTocOpen(true)} />

        <div className="mx-auto grid w-full max-w-[1800px] grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_290px]">
          <div className="sticky top-[138px] hidden h-[calc(100vh-138px)] border-r border-[var(--border)] lg:block">
            <DocsSidebar className="h-full" />
          </div>

          <main className="min-w-0 px-4 py-6 md:px-10 md:py-8">
            {children}
            <DocsPager />
          </main>

          <div className="sticky top-[138px] hidden h-[calc(100vh-138px)] overflow-y-auto border-l border-[var(--border)] px-5 py-6 lg:block">
            <DocsToc />
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm border-r border-[var(--border)] bg-[var(--panel)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                <p className="font-semibold">Navigation</p>
                <button type="button" className="rounded-md px-2 py-1 text-sm hover:bg-slate-800" onClick={() => setMobileMenuOpen(false)}>
                  Close
                </button>
              </div>
              <DocsSidebar className="h-[calc(100%-57px)]" onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        ) : null}

        {mobileTocOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
            <button type="button" aria-label="Close on this page" className="absolute inset-0 bg-black/60" onClick={() => setMobileTocOpen(false)} />
            <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm border-l border-[var(--border)] bg-[var(--panel)] px-4 py-4">
              <div className="mb-4 flex items-center justify-between border-b border-[var(--border)] pb-3">
                <p className="font-semibold">On this page</p>
                <button type="button" className="rounded-md px-2 py-1 text-sm hover:bg-slate-800" onClick={() => setMobileTocOpen(false)}>
                  Close
                </button>
              </div>
              <DocsToc />
            </div>
          </div>
        ) : null}
      </div>
    </DocsReadModeProvider>
  );
}
