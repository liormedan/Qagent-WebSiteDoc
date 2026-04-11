import { DocsDiagram } from "@/components/ui/DocsDiagram";

/** Exact cross-layer sequence (order preserved; wording unchanged). */
const END_TO_END_STEPS = [
  "User submits request",
  "Client Layer captures interaction",
  "QAgent resolves intent and plan",
  "QAgent sends Execution Request Envelope to API",
  "API validates and creates job",
  "Execution Layer runs job actions",
  "Versioning stores canonical result",
  "API exposes status and result via /jobs",
  "Client renders output to user",
] as const;

/** Same steps grouped by layer for alignment (no new steps; order within each column follows global sequence). */
const END_TO_END_LAYER_GROUPS = [
  { title: "User / Client", items: ["User submits request", "Client Layer captures interaction"] },
  { title: "QAgent", items: ["QAgent resolves intent and plan", "QAgent sends Execution Request Envelope to API"] },
  { title: "API", items: ["API validates and creates job", "API exposes status and result via /jobs"] },
  { title: "Execution", items: ["Execution Layer runs job actions"] },
  { title: "Versioning", items: ["Versioning stores canonical result"] },
  { title: "Client output", items: ["Client renders output to user"] },
] as const;

export function EndToEndSequenceDiagram() {
  return (
    <div className="space-y-6 rounded-xl border border-cyan-500/25 bg-slate-950/40 p-4">
      <div>
        <h3 className="text-base font-semibold text-slate-100">End-to-End Sequence</h3>
        <p className="mt-1 text-sm text-slate-300">Cross-layer sequence from request intake to user-visible output.</p>
        <div className="mt-4">
          <DocsDiagram mode="flow" steps={[...END_TO_END_STEPS]} />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">By layer</p>
        <p className="mt-1 text-xs text-slate-500">Same nine steps aligned to responsibility bands (read left-to-right, top-to-bottom within each column).</p>
        <div className="mt-3">
          <DocsDiagram
            mode="structure"
            root="Cross-layer path"
            groups={END_TO_END_LAYER_GROUPS.map((g) => ({ title: g.title, items: [...g.items] }))}
          />
        </div>
      </div>
    </div>
  );
}
