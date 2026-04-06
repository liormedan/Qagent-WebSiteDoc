"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { DocsHeader } from "@/components/layout/DocsHeader";
import { DocsPager } from "@/components/layout/DocsPager";
import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { DocsToc } from "@/components/layout/DocsToc";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onSummaryClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const summary = target.closest("summary");
      if (!(summary instanceof HTMLElement)) return;
      const details = summary.parentElement;
      if (!(details instanceof HTMLDetailsElement)) return;
      if (details.getAttribute("name") !== "docs-primary-accordion") return;

      event.preventDefault();

      if (details.open) {
        details.open = false;
        return;
      }

      const allPrimary = Array.from(document.querySelectorAll("details[name='docs-primary-accordion']"));
      allPrimary.forEach((node) => {
        if (node instanceof HTMLDetailsElement && node !== details) {
          node.open = false;
        }
      });
      details.open = true;
    };

    document.addEventListener("click", onSummaryClick);
    return () => document.removeEventListener("click", onSummaryClick);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <DocsHeader key={pathname} onOpenMenu={() => setMobileMenuOpen(true)} onOpenToc={() => setMobileTocOpen(true)} />

      <div className="mx-auto grid h-[calc(100vh-72px)] w-full max-w-[1800px] grid-cols-1 overflow-hidden lg:grid-cols-[220px_minmax(0,1fr)_210px] xl:grid-cols-[240px_minmax(0,1fr)_230px] 2xl:grid-cols-[260px_minmax(0,1fr)_260px]">
        <div className="hidden border-r border-[var(--border)] lg:block">
          <DocsSidebar className="h-full overflow-y-auto" />
        </div>

        <main ref={mainRef} className="docs-main-scroll min-h-0 min-w-0 overflow-y-auto px-4 py-4 md:px-6 md:py-6 xl:px-8">
          {children}
          <DocsPager />
        </main>

        <div
          className="hidden min-h-0 overflow-hidden border-l border-[var(--border)] px-3 py-4 lg:block xl:px-4 xl:py-6"
          onWheel={(event) => {
            if (!mainRef.current) return;
            event.preventDefault();
            mainRef.current.scrollBy({ top: event.deltaY });
          }}
        >
          <DocsToc className="h-full overflow-hidden" />
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
  );
}
