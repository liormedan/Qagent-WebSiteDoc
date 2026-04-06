"use client";

import { ChevronDown } from "lucide-react";

const items = [
  {
    title: "QCore Engine",
    description: "Internal runtime core that orchestrates loop progression, routing decisions, and state-aware control.",
  },
  {
    title: "LLM Interface Layer",
    description: "Controlled boundary that prepares model context, executes calls, and validates responses before re-entry to QCore.",
  },
  {
    title: "Model Provider Registry",
    description: "Provider abstraction layer for model selection, fallback routing, and multi-model governance.",
  },
  {
    title: "Tool System",
    description: "Execution path for approved actions, translating decisions into concrete module/tool operations.",
  },
  {
    title: "State Manager",
    description: "Persistence layer for runtime context, stage progression, and synchronized state snapshots.",
  },
  {
    title: "Flow Controller",
    description: "Transition guardrail that enforces valid state movement and blocks invalid execution sequences.",
  },
  {
    title: "Memory / History Layer",
    description: "Context continuity layer that surfaces prior interactions, decisions, and lifecycle lineage.",
  },
];

export function DiagramComponentsAccordion() {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <details key={item.title} className="group/item rounded-md border border-[var(--border)] bg-slate-900/40 px-3 py-2">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[13.5px] font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
            <span>{item.title}</span>
            <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/item:rotate-180" />
          </summary>
          <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
        </details>
      ))}
    </div>
  );
}
