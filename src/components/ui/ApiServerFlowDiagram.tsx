"use client";

import { ArrowDown } from "lucide-react";

const steps = [
  "User Request",
  "QAgent Intent + Plan",
  "API Server (/run)",
  "Queue + Job Creation",
  "Worker Execution",
  "Result + Status",
  "QAgent UI Update",
];

export function ApiServerFlowDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(14,116,144,0.2),rgba(2,6,23,0.96)_65%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">System Flow</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">WaveQ API Execution Path</h3>
        <p className="mt-2 text-sm text-slate-300">From user intent to queued execution and result delivery.</p>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-slate-100 md:text-base">
              {step}
            </div>
            {index < steps.length - 1 ? <ArrowDown className="h-4 w-4 text-cyan-300/90" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
