import { ArrowDown, ArrowRight } from "lucide-react";

const primaryLayers = ["Client Layer", "QAgent Layer", "API Server Layer"];
const supportingLayers = ["DSP / Processing", "Data", "Infrastructure", "Auth & Security"];
const flow = ["User Input", "Client", "QAgent", "API Server", "Execution", "Versioning", "Output"];

export function SystemArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4">
      <h3 className="text-base font-semibold text-slate-100">WaveQ High-Level Architecture</h3>
      <p className="mt-1 text-sm text-slate-300">Primary layers, supporting layers, and cross-layer flow.</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Primary Layers</p>
          <div className="mt-3 flex flex-col gap-2">
            {primaryLayers.map((item, index) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-100">
                  {item}
                </div>
                {index < primaryLayers.length - 1 ? <ArrowDown className="h-4 w-4 text-cyan-300/80" /> : null}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Supporting Layers</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {supportingLayers.map((item) => (
              <div key={item} className="rounded-md border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-100">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">End-to-End Cross-Layer Flow</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {flow.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-indigo-400/30 bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-100 md:text-sm">
                {step}
              </span>
              {index < flow.length - 1 ? <ArrowRight className="h-4 w-4 text-indigo-300/80" /> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

