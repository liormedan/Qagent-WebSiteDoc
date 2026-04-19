"use client";

import { ArrowDown, CornerLeftUp } from "lucide-react";
import { WAVEQ_CANONICAL_FLOW_STEPS } from "@/lib/waveq-authority";

const flowSteps = WAVEQ_CANONICAL_FLOW_STEPS;

export function QAgentArchitectureLinearDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(110%_95%_at_50%_0%,rgba(14,116,144,0.24),rgba(2,6,23,0.96)_62%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Architecture Flow</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">QAgent Ordered Module Flow</h3>
        <p className="mt-2 text-sm text-slate-300">Deterministic routing from user input through versioning.</p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-2">
        {flowSteps.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-slate-100 md:text-base">
              {step}
            </div>
            {index < flowSteps.length - 1 ? (
              <ArrowDown className="h-4 w-4 text-cyan-300/90" />
            ) : null}
          </div>
        ))}

        <div className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-200">
          <CornerLeftUp className="h-4 w-4" />
          <span>Refinement Cycle (optional loop back)</span>
        </div>
      </div>
    </div>
  );
}

