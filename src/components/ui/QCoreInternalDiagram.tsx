"use client";

type DiagramNode = {
  label: string;
  className: string;
};

const outerNodes: DiagramNode[] = [
  { label: "Agent Controller", className: "left-1/2 top-4 -translate-x-1/2" },
  { label: "Decision Engine", className: "right-4 top-1/2 -translate-y-1/2" },
  { label: "Execution Router", className: "left-1/2 bottom-4 -translate-x-1/2" },
  { label: "State Coordinator", className: "left-4 top-1/2 -translate-y-1/2" },
];

export function QCoreInternalDiagram() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-slate-950/40 p-4">
      <div className="relative mx-auto h-[420px] w-full max-w-3xl">
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/35 bg-cyan-500/10 shadow-[0_0_60px_-20px_rgba(34,211,238,0.45)]" />

        <div className="absolute left-1/2 top-1/2 z-10 w-56 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-cyan-300/45 bg-slate-900/95 p-4 text-center">
          <p className="text-lg font-semibold text-white">QCore Engine</p>
          <p className="mt-1 text-xs text-slate-300">Internal execution and orchestration core</p>
        </div>

        {outerNodes.map((node) => (
          <div
            key={node.label}
            className={`absolute z-10 w-40 rounded-xl border border-slate-500/50 bg-slate-900/95 p-3 text-center text-sm font-semibold text-slate-100 ${node.className}`}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  );
}
