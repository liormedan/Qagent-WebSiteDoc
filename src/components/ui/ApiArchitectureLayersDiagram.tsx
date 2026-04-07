"use client";

import { ArrowDown } from "lucide-react";

const layers = [
  "Frontend Layer: Chat, Canvas, Workspace UI",
  "QAgent Layer: Intent, Planning, Approval, Execution Bridge",
  "API Server Layer: Intake, Queue, Workers, Execution Engine",
  "Processing Layer: Client Preview DSP + Backend DSP",
  "Data Layer: Users, Sessions, Files, Jobs, Results",
  "Infrastructure Layer: Vercel, Cloud Run, Firestore, Storage/Queue",
  "Documentation Layer: QAgent Docs + API Server Docs",
];

export function ApiArchitectureLayersDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-indigo-500/25 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(79,70,229,0.2),rgba(2,6,23,0.96)_65%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-300/80">Architecture Layers</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">WaveQ Layered Architecture</h3>
        <p className="mt-2 text-sm text-slate-300">High-level stack from UI through execution, data, and infrastructure.</p>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-2">
        {layers.map((layer, index) => (
          <div key={layer} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-slate-100 md:text-base">
              {layer}
            </div>
            {index < layers.length - 1 ? <ArrowDown className="h-4 w-4 text-indigo-300/90" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
