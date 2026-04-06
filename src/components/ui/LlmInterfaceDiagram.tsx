"use client";

import { ArrowRight } from "lucide-react";

const flowSteps = [
  "QCore",
  "Context Builder",
  "Model Selector",
  "Invocation Engine",
  "LLM",
  "Response Parser",
  "Validation Layer",
  "Decision Formatter",
  "QCore",
];

export function LlmInterfaceDiagram() {
  return (
    <div className="space-y-4 rounded-xl border border-[var(--border)] bg-slate-950/40 p-4">
      <div className="relative mx-auto h-[420px] w-full max-w-3xl">
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30 bg-cyan-500/10" />

        <div className="absolute left-1/2 top-1/2 z-10 w-64 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-300/45 bg-slate-900/95 p-4 text-center">
          <p className="text-lg font-semibold text-white">LLM Interface Layer</p>
          <p className="mt-1 text-xs text-slate-300">Controlled bridge between QCore and external reasoning engines</p>
        </div>

        <div className="absolute left-1/2 top-4 z-10 w-40 -translate-x-1/2 rounded-xl border border-slate-500/50 bg-slate-900/95 p-2 text-center text-xs font-semibold text-slate-100">Context Builder</div>
        <div className="absolute right-4 top-24 z-10 w-40 rounded-xl border border-slate-500/50 bg-slate-900/95 p-2 text-center text-xs font-semibold text-slate-100">Model Selector</div>
        <div className="absolute right-4 bottom-24 z-10 w-40 rounded-xl border border-slate-500/50 bg-slate-900/95 p-2 text-center text-xs font-semibold text-slate-100">Invocation Engine</div>
        <div className="absolute left-1/2 bottom-4 z-10 w-40 -translate-x-1/2 rounded-xl border border-slate-500/50 bg-slate-900/95 p-2 text-center text-xs font-semibold text-slate-100">Response Parser</div>
        <div className="absolute left-4 bottom-24 z-10 w-40 rounded-xl border border-slate-500/50 bg-slate-900/95 p-2 text-center text-xs font-semibold text-slate-100">Validation Layer</div>
        <div className="absolute left-4 top-24 z-10 w-40 rounded-xl border border-slate-500/50 bg-slate-900/95 p-2 text-center text-xs font-semibold text-slate-100">Decision Formatter</div>
      </div>

      <div className="rounded-lg border border-[var(--border)] bg-slate-900/40 p-3">
        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-300">Linear Flow</p>
        <div className="flex flex-wrap items-center gap-2">
          {flowSteps.map((step, index) => (
            <div key={step + index} className="flex items-center gap-2">
              <span className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-100">{step}</span>
              {index < flowSteps.length - 1 ? <ArrowRight className="h-3.5 w-3.5 text-cyan-300" /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
