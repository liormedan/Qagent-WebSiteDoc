"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
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
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = document.querySelector("[data-docs-content]");
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll("h2, h3")) as HTMLHeadingElement[];
    const nextHeadings: TocHeading[] = nodes
      .map((node) => {
        const text = (node.textContent ?? "").trim();
        if (!text) return null;
        if (!node.id) node.id = slugify(text);
        return {
          id: node.id,
          text,
          level: node.tagName === "H2" ? 2 : 3,
        } as TocHeading;
      })
      .filter((value): value is TocHeading => Boolean(value));

    const frame = window.requestAnimationFrame(() => setHeadings(nextHeadings));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const hasHeadings = useMemo(() => headings.length > 0, [headings]);

  return (
    <aside className={cn("space-y-4", className)}>
      <p className="text-xl font-semibold">On this page</p>
      {hasHeadings ? (
        <nav className="space-y-1">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block rounded-md px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-white",
                heading.level === 3 ? "ms-4" : "",
                heading.id === activeId ? "bg-slate-800 text-white" : "",
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
