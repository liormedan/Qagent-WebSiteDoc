"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type TocHeading = {
  id: string;
  text: string;
  level: 2;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u0590-\u05ff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function DocsToc({ className }: { className?: string }) {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const syncActiveSectionVisual = useCallback((nextActive: string) => {
    const root = document.querySelector("[data-docs-content]");
    if (!(root instanceof HTMLElement)) return;
    const sections = Array.from(root.querySelectorAll("section"));
    sections.forEach((section) => section.classList.remove("docs-section-active"));
    if (!nextActive) return;
    const headingEl = document.getElementById(nextActive);
    const sectionEl = headingEl?.closest("section");
    sectionEl?.classList.add("docs-section-active");
  }, []);

  const collectHeadings = useCallback(() => {
    const root = document.querySelector("[data-docs-content]");
    if (!root) {
      setHeadings([]);
      return;
    }

    const nodes = Array.from(root.querySelectorAll("h2")).filter(
      (node) => (node as HTMLHeadingElement).dataset.tocHidden !== "true",
    ) as HTMLHeadingElement[];
    const idCounts = new Map<string, number>();
    const nextHeadings: TocHeading[] = [];

    for (const node of nodes) {
      const text = (node.dataset.tocTitle ?? node.textContent ?? "").trim();
      if (!text) continue;

      const baseId = slugify(text) || "section";
      const seen = idCounts.get(baseId) ?? 0;
      const uniqueId = seen === 0 ? baseId : `${baseId}-${seen + 1}`;
      idCounts.set(baseId, seen + 1);
      node.id = uniqueId;

      nextHeadings.push({
        id: uniqueId,
        text,
        level: 2,
      });
    }

    setHeadings(nextHeadings);
  }, []);

  const closeAllAccordions = useCallback(() => {
    const root = document.querySelector("[data-docs-content]");
    if (!(root instanceof HTMLElement)) return;
    const allDetails = Array.from(root.querySelectorAll("details")) as HTMLDetailsElement[];
    allDetails.forEach((detailsEl) => {
      detailsEl.open = false;
    });
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(collectHeadings);

    const root = document.querySelector("[data-docs-content]");
    if (!root) return () => window.cancelAnimationFrame(frame);
    const observer = new MutationObserver(() => collectHeadings());
    observer.observe(root, { subtree: true, attributes: true, attributeFilter: ["open"] });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname, collectHeadings]);

  useEffect(() => {
    if (!headings.length) return;
    let raf = 0;
    const scrollRoot = document.querySelector("main");
    if (!(scrollRoot instanceof HTMLElement)) return;
    const contentRoot = document.querySelector("[data-docs-content]");
    const markerOffset = 160;

    const updateActiveHeading = () => {
      const markerLine = scrollRoot.scrollTop + markerOffset;
      let nextActive = headings[0]?.id ?? "";

      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.offsetParent === null) continue;
        const rootRect = scrollRoot.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        const top = elRect.top - rootRect.top + scrollRoot.scrollTop;
        if (top <= markerLine) {
          nextActive = heading.id;
        } else {
          break;
        }
      }

      syncActiveSectionVisual(nextActive);
      setActiveId((prev) => (prev === nextActive ? prev : nextActive));
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        updateActiveHeading();
      });
    };

    updateActiveHeading();
    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveHeading);
    window.addEventListener("hashchange", updateActiveHeading);
    contentRoot?.addEventListener("toggle", updateActiveHeading, true);
    contentRoot?.addEventListener("transitionend", updateActiveHeading, true);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      scrollRoot.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveHeading);
      window.removeEventListener("hashchange", updateActiveHeading);
      contentRoot?.removeEventListener("toggle", updateActiveHeading, true);
      contentRoot?.removeEventListener("transitionend", updateActiveHeading, true);
    };
  }, [headings, syncActiveSectionVisual]);

  const hasHeadings = useMemo(() => headings.length > 0, [headings]);

  return (
    <aside className={cn("space-y-4 overflow-hidden", className)}>
      <p className="text-xl font-semibold">On this page</p>
      {hasHeadings ? (
        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <Link
              key={`${heading.id}-${index}`}
              href={`#${heading.id}`}
              onClick={(event) => {
                event.preventDefault();
                const target = document.getElementById(heading.id);
                const scrollRoot = document.querySelector("main");
                if (!(target instanceof HTMLElement) || !(scrollRoot instanceof HTMLElement)) {
                  setActiveId(heading.id);
                  return;
                }

                closeAllAccordions();
                const detailsParent = target.closest("details");
                if (detailsParent instanceof HTMLDetailsElement) {
                  detailsParent.open = true;
                }

                const rootRect = scrollRoot.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const top = targetRect.top - rootRect.top + scrollRoot.scrollTop - 24;
                scrollRoot.scrollTo({ top: Math.max(0, top), behavior: "smooth" });

                if (window.location.hash !== `#${heading.id}`) {
                  window.history.replaceState(null, "", `#${heading.id}`);
                }

                syncActiveSectionVisual(heading.id);
                setActiveId(heading.id);
              }}
              className={cn(
                "block rounded-md border-l-2 border-transparent px-3 py-1.5 text-sm text-slate-300 transition-all duration-150 hover:bg-slate-800 hover:text-white",
                heading.id === activeId ? "translate-x-2 border-cyan-300 bg-slate-800/95 font-semibold text-white shadow-[0_0_0_1px_rgba(125,211,252,0.25)]" : "",
              )}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      ) : (
        <p className="text-sm text-slate-500">No headings found on this page.</p>
      )}
    </aside>
  );
}
