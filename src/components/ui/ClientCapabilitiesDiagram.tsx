"use client";

import { ArrowRight } from "lucide-react";

const capabilities = [
  "Chat Interaction",
  "Visual Canvas",
  "Real-time Feedback",
  "Audio Preview",
  "Session State",
];

export function ClientCapabilitiesDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-sky-500/20 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(14,165,233,0.2),rgba(2,6,23,0.96)_65%)] p-4 md:p-6">
      <div className="mb-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300/80">Client Capabilities</p>
        <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">Experience Pipeline</h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {capabilities.map((item, index) => (
          <div key={item} className="flex items-center gap-2">
            <div className="rounded-lg border border-white/10 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-100">{item}</div>
            {index < capabilities.length - 1 ? <ArrowRight className="h-4 w-4 text-sky-300/80" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
