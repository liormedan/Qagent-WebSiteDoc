"use client";

import { ArrowDown, CornerLeftUp } from "lucide-react";

const flowSteps = [
  "QAgent Core",
  "Files Handler",
  "Analyzer",
  "Intent + Clarification",
  "DAL (Decision Abstraction Layer)",
  "UAgent (UI Plan Generation)",
  "Approval (User Confirmation)",
  "DAgent (Execution)",
  "Versioning (Result & State Update)",
];

export function QAgentArchitectureLinearDiagram() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-slate-950/35 p-4 md:p-5">
      <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-2">
        {flowSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-lg border border-[var(--border)] bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-slate-100 md:text-base">
              {step}
            </div>
            {index < flowSteps.length - 1 ? (
              <ArrowDown className="h-4 w-4 text-cyan-300/90" />
            ) : null}
          </div>
        ))}

        <div className="mt-1 flex items-center justify-center gap-2 text-sm font-semibold text-cyan-200">
          <CornerLeftUp className="h-4 w-4" />
          <span>Refinement Cycle (optional loop back)</span>
        </div>
      </div>
    </div>
  );
}
