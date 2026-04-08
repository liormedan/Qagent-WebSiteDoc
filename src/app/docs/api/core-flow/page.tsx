import {
  API_SERVER_CANONICAL_FLOW,
  API_SERVER_FLOW_SEGMENTS,
  EXECUTION_LAYER_CANONICAL_FLOW,
  EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH,
  JOB_ORCHESTRATION_CANONICAL_FLOW,
} from "@/lib/api-server-canonical";

export default function ApiCoreFlowPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold">API Server Layer - Core Flow</h1>
      <p className="text-sm text-emerald-300">Status: LOCKED (structure)</p>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{API_SERVER_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Stage Segments</h2>
        <div className="space-y-1 text-[var(--muted)]">
          {API_SERVER_FLOW_SEGMENTS.map((segment) => (
            <p key={segment.stage}>
              <span className="font-semibold text-slate-100">{segment.stage}</span>: {segment.modules.join(", ")}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Job Orchestration Canonical Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{JOB_ORCHESTRATION_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Execution Layer Canonical Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{EXECUTION_LAYER_CANONICAL_FLOW}</p>
        <p className="text-[var(--muted)]">
          Canonical reference location:{" "}
          <span className="font-semibold text-slate-100">{EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
      </section>
    </main>
  );
}
