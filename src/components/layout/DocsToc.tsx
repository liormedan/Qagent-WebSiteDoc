"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    const root = document.querySelector("[data-docs-content]");
    if (!root) return;

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

    const frame = window.requestAnimationFrame(() => setHeadings(nextHeadings));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const scrollRoot = document.querySelector("main");
    if (!(scrollRoot instanceof HTMLElement) || !headings.length) return;

    const getTopRelativeToScrollRoot = (el: HTMLElement): number => {
      const rootRect = scrollRoot.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      return elRect.top - rootRect.top + scrollRoot.scrollTop;
    };

    const updateActiveHeading = () => {
      const markerLine = scrollRoot.scrollTop + 120;
      let nextActive = headings[0]?.id ?? "";

      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.offsetParent === null) continue;
        const top = getTopRelativeToScrollRoot(el);
        if (top <= markerLine) {
          nextActive = heading.id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === nextActive ? prev : nextActive));
    };

    updateActiveHeading();
    scrollRoot.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      scrollRoot.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);
    };
  }, [headings]);

  const hasHeadings = useMemo(() => headings.length > 0, [headings]);

  return (
    <aside className={cn("space-y-4", className)}>
      <p className="text-xl font-semibold">On this page</p>
      {hasHeadings ? (
        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <Link
              key={`${heading.id}-${index}`}
              href={`#${heading.id}`}
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
