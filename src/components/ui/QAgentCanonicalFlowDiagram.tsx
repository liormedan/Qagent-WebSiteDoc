import { ArrowDown } from "lucide-react";
import { WAVEQ_CANONICAL_FLOW_STEPS } from "@/lib/waveq-authority";

const qagentFlow = WAVEQ_CANONICAL_FLOW_STEPS;

export function QAgentCanonicalFlowDiagram() {
  return (
    <div className="rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4">
      <h3 className="text-base font-semibold text-slate-100">QAgent Canonical Flow</h3>
      <p className="mt-1 text-sm text-slate-300">Canonical handoff path from user input to versioning.</p>
      <div className="mx-auto mt-4 flex w-full max-w-3xl flex-col items-stretch gap-2">
        {qagentFlow.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
              {step}
            </div>
            {index < qagentFlow.length - 1 ? <ArrowDown className="h-4 w-4 text-cyan-300/80" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

