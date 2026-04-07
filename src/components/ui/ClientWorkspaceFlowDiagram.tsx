"use client";

import { ArrowDown } from "lucide-react";

const steps = ["Sidebar Navigation", "Header Actions", "Project/Session Switch", "Docs/Tools Access", "Context Sync"];

export function ClientWorkspaceFlowDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-amber-500/20 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(245,158,11,0.2),rgba(2,6,23,0.96)_65%)] p-4">
      <div className="mb-4 text-center text-sm font-semibold text-amber-200">Workspace UI Flow</div>
      <div className="mx-auto flex max-w-2xl flex-col items-stretch gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-center text-sm text-slate-100">{step}</div>
            {index < steps.length - 1 ? <ArrowDown className="h-4 w-4 text-amber-300/90" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
