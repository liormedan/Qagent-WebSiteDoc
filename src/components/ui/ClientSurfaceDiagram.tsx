"use client";

import { ArrowDown } from "lucide-react";

const surfaces = [
  "Chat UI: messages, approvals, context",
  "Canvas UI: waveform, blocks, progress",
  "Workspace UI: navigation, sessions, docs",
  "Client Runtime: preview, state sync, auth",
];

export function ClientSurfaceDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-500/20 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(139,92,246,0.22),rgba(2,6,23,0.96)_65%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-300/80">Client Surfaces</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Frontend Subsystems</h3>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-col items-stretch gap-2">
        {surfaces.map((surface, index) => (
          <div key={surface} className="flex flex-col items-center gap-2">
            <div className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-center text-sm font-semibold text-slate-100 md:text-base">
              {surface}
            </div>
            {index < surfaces.length - 1 ? <ArrowDown className="h-4 w-4 text-violet-300/90" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
