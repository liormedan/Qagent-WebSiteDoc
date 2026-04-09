import {
  API_SERVER_CANONICAL_FLOW,
  API_SERVER_FLOW_SEGMENTS,
  EXECUTION_LAYER_CANONICAL_FLOW,
  EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH,
  JOB_ORCHESTRATION_CANONICAL_FLOW,
} from "@/lib/api-server-canonical";
import { SYSTEM_DOC_SOURCE_OF_TRUTH, SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

export default function ApiCoreFlowPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold">API Server Layer - Core Flow</h1>
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Flow</h2>
        <ol className="space-y-2 rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
          <li>1. QAgent sends approved execution request.</li>
          <li>2. API Gateway receives request at `/run`.</li>
          <li>3. Request Handling validates input.</li>
          <li>4. Job Orchestration creates and queues job.</li>
          <li>5. Execution Layer executes plan.</li>
          <li>6. Results are exposed via `/jobs`.</li>
          <li>7. QAgent consumes results.</li>
        </ol>
        <p className="text-xs text-[var(--muted)]">Canonical reference: {API_SERVER_CANONICAL_FLOW}</p>
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

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">System Lifecycle Reference</h2>
        <p className="text-[var(--muted)]">
          Canonical system location: <span className="font-semibold text-slate-100">{SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{SYSTEM_RUNTIME_LIFECYCLE}</p>
      </section>
    </main>
  );
}

