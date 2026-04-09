import { ArrowRight } from "lucide-react";

const lifecycleSteps = [
  "/run intake",
  "validation",
  "job creation",
  "queue / orchestration",
  "execution",
  "/jobs status/results",
];

export function ApiLifecycleDiagram() {
  return (
    <div className="rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4">
      <h3 className="text-base font-semibold text-slate-100">API Lifecycle Diagram</h3>
      <p className="mt-1 text-sm text-slate-300">Request lifecycle from intake endpoint to observable job outcomes.</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {lifecycleSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-100 md:text-sm">
              {step}
            </span>
            {index < lifecycleSteps.length - 1 ? <ArrowRight className="h-4 w-4 text-cyan-300/80" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

