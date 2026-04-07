"use client";

import { ArrowRight } from "lucide-react";

const steps = ["Audio Preview Engine", "Canvas State", "UI State", "Auth Session", "QAgent Sync"];

export function ClientRuntimeFlowDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-fuchsia-500/20 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(217,70,239,0.2),rgba(2,6,23,0.96)_65%)] p-4">
      <div className="mb-4 text-center text-sm font-semibold text-fuchsia-200">Client Runtime Flow</div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <div className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-100">{step}</div>
            {index < steps.length - 1 ? <ArrowRight className="h-4 w-4 text-fuchsia-300/90" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
