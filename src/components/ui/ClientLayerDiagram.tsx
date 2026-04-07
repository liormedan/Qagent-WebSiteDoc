"use client";

import { ArrowDown } from "lucide-react";

const layers = [
  "User",
  "Client Layer (Chat / Canvas / Workspace / Runtime)",
  "QAgent Layer (Intent + Planning + Approval)",
  "API Server Layer (Queue + Workers + Execution)",
  "Result back to Client",
];

export function ClientLayerDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(16,185,129,0.2),rgba(2,6,23,0.96)_65%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300/80">Client System Position</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Client Layer Interaction Flow</h3>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-2">
        {layers.map((layer, index) => (
          <div key={layer} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-slate-100 md:text-base">
              {layer}
            </div>
            {index < layers.length - 1 ? <ArrowDown className="h-4 w-4 text-emerald-300/90" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
