"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AskQPanel } from "@/components/ask-q/AskQPanel";
import { AskQProvider } from "@/components/ask-q/AskQProvider";
import { DocsHeader } from "@/components/layout/DocsHeader";
import { DocsPager } from "@/components/layout/DocsPager";
import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { DocsToc } from "@/components/layout/DocsToc";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [viewportWidth, setViewportWidth] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);
  const resizeStartXRef = useRef(0);
  const resizeStartWidthRef = useRef(240);

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

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const startSidebarResize = (event: React.MouseEvent<HTMLDivElement>) => {
    if (viewportWidth < 768) return;

    resizeStartXRef.current = event.clientX;
    resizeStartWidthRef.current = sidebarWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - resizeStartXRef.current;
      const next = Math.min(420, Math.max(200, resizeStartWidthRef.current + delta));
      setSidebarWidth(next);
    };

    const onMouseUp = () => {
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const gridTemplateColumns =
    viewportWidth >= 1536
      ? `${sidebarWidth}px minmax(0,1fr) 260px`
      : viewportWidth >= 1280
        ? `${sidebarWidth}px minmax(0,1fr) 230px`
        : viewportWidth >= 768
          ? `${sidebarWidth}px minmax(0,1fr)`
          : undefined;

  return (
    <AskQProvider>
    <div className="bg-[var(--bg)] text-[var(--text)]">
      <DocsHeader onOpenMenu={() => setMobileMenuOpen(true)} onOpenToc={() => setMobileTocOpen(true)} />

      <div
        className="mx-auto grid w-full max-w-[1800px] grid-cols-1 md:h-[calc(100dvh-88px)] md:grid-cols-[240px_minmax(0,1fr)] md:overflow-hidden xl:grid-cols-[240px_minmax(0,1fr)_230px] 2xl:grid-cols-[260px_minmax(0,1fr)_260px]"
        style={gridTemplateColumns ? { gridTemplateColumns } : undefined}
      >
        <aside className="relative hidden border-r border-[var(--border)] md:block md:min-h-0 md:overflow-hidden">
          <DocsSidebar className="h-full min-h-0" />
          <div
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize left navigation"
            onMouseDown={startSidebarResize}
            className="absolute right-0 top-0 hidden h-full w-2 translate-x-1/2 cursor-col-resize bg-transparent md:block"
          />
        </aside>

        <main ref={mainRef} className="docs-main-scroll min-h-screen min-w-0 overflow-y-visible px-4 py-4 md:min-h-0 md:overflow-y-auto md:px-6 md:py-6 xl:px-8">
          <div key={pathname} className="mx-auto w-full max-w-4xl">
            {children}
            <DocsPager />
          </div>
        </main>

        <aside
          className="hidden min-h-0 overflow-hidden border-l border-[var(--border)] px-3 py-4 xl:block xl:px-4 xl:py-6"
          onWheel={(event) => {
            if (!mainRef.current) return;
            event.preventDefault();
            mainRef.current.scrollBy({ top: event.deltaY });
          }}
        >
          <DocsToc className="h-full overflow-hidden" />
        </aside>
      </div>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm border-r border-[var(--border)] bg-[var(--panel)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <p className="font-semibold">Navigation</p>
              <button type="button" className="rounded-md px-2 py-1 text-sm hover:bg-slate-800" onClick={() => setMobileMenuOpen(false)}>
                Close
              </button>
            </div>
            <DocsSidebar className="h-[calc(100%-57px)] min-h-0" onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      ) : null}

      {mobileTocOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
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

      <AskQPanel />
    </div>
    </AskQProvider>
  );
}
