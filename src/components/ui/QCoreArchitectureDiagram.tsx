const layers = [
  "LLM Interface Layer",
  "Model Provider Registry",
  "Tool System",
  "State Manager",
  "Flow Controller",
  "Memory / History Layer",
];

export function QCoreArchitectureDiagram() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[radial-gradient(110%_95%_at_50%_0%,rgba(14,116,144,0.26),rgba(2,6,23,0.96)_62%)] p-4 md:p-6">
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">QCore Topology</p>
        <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">QCore Central Architecture</h3>
        <p className="mt-2 text-sm text-slate-300">
          QCore is the canonical orchestrator node. QCore Engine is the internal runtime component at the center.
        </p>
      </div>

      <div className="mx-auto max-w-4xl rounded-xl border border-white/10 bg-slate-900/60 p-4">
        <div className="grid gap-3 md:grid-cols-3 md:items-stretch">
          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-center text-sm font-medium text-slate-100">
              {layers[0]}
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-center text-sm font-medium text-slate-100">
              {layers[1]}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full rounded-xl border border-cyan-500/35 bg-cyan-500/10 px-4 py-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/85">Center Runtime</p>
              <p className="mt-2 text-xl font-semibold text-white">QCore Engine</p>
              <p className="mt-2 text-sm text-slate-300">Flow, state, routing, and orchestration authority</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-center text-sm font-medium text-slate-100">
              {layers[2]}
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-center text-sm font-medium text-slate-100">
              {layers[3]}
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-center text-sm font-medium text-slate-100">
            {layers[4]}
          </div>
          <div className="rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-center text-sm font-medium text-slate-100">
            {layers[5]}
          </div>
        </div>
      </div>
    </div>
  );
}
