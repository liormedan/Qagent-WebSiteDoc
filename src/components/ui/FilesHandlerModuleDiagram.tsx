"use client";

import { useCallback, useRef } from "react";
import { normalizeDocListText } from "@/lib/docs-text";

const ROOT = "Files Handler";

type DiagramItem = { label: string; detailId: string };

const GROUPS: Array<{ title: string; items: DiagramItem[] }> = [
  {
    title: "INPUT",
    items: [
      { label: "Upload/Link Intake", detailId: "ingestion-boundary" },
      { label: "Source Resolution", detailId: "ingestion-boundary" },
    ],
  },
  {
    title: "PREPARATION",
    items: [
      { label: "Validation", detailId: "validation-and-normalization" },
      { label: "Normalization", detailId: "validation-and-normalization" },
      { label: "Metadata Extraction", detailId: "validation-and-normalization" },
    ],
  },
  {
    title: "OUTPUT",
    items: [
      { label: "Stable File Reference", detailId: "output-contract" },
      { label: "Analyzer-Ready Artifact", detailId: "output-contract" },
    ],
  },
];

const HIGHLIGHT_MS = 1600;

function clearHighlight(el: HTMLElement) {
  el.style.boxShadow = "";
  el.style.transition = "";
}

function applyHighlight(el: HTMLElement) {
  el.style.transition = "box-shadow 0.25s ease";
  el.style.boxShadow = "0 0 0 3px rgba(34, 211, 238, 0.45)";
}

export function FilesHandlerModuleDiagram() {
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const highlightedSectionRef = useRef<HTMLElement | null>(null);

  const openDetailFromDiagram = useCallback((detailId: string) => {
    const section = document.getElementById(detailId);
    if (!section) return;

    const details = section.querySelector("details");
    if (details) {
      (details as HTMLDetailsElement).open = true;
    }

    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
    if (highlightedSectionRef.current && highlightedSectionRef.current !== section) {
      clearHighlight(highlightedSectionRef.current);
    }

    highlightedSectionRef.current = section;
    applyHighlight(section);
    highlightTimerRef.current = setTimeout(() => {
      clearHighlight(section);
      if (highlightedSectionRef.current === section) highlightedSectionRef.current = null;
      highlightTimerRef.current = null;
    }, HIGHLIGHT_MS);

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
      <div className="mx-auto w-full max-w-sm rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
        {normalizeDocListText(ROOT)}
      </div>
      <div className="mx-auto h-4 w-px bg-cyan-400/40" />
      <div className="grid gap-3 md:grid-cols-3">
        {GROUPS.map((group) => (
          <div key={group.title} className="rounded-md border border-[var(--border)] bg-slate-950/40 p-3">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-300">{group.title}</p>
            <div className="mt-2 space-y-1.5 text-sm">
              {group.items.map((node) => (
                <button
                  key={`${group.title}-${node.label}`}
                  type="button"
                  className="w-full rounded-md border border-[var(--border)]/70 bg-slate-950/20 px-2.5 py-1.5 text-center leading-6 text-[var(--muted)] transition-colors hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60"
                  onClick={() => openDetailFromDiagram(node.detailId)}
                >
                  {normalizeDocListText(node.label)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
