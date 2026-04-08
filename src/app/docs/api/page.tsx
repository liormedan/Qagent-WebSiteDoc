import {
  API_SERVER_ALLOWED_ALIASES,
  API_SERVER_CANONICAL_FLOW,
  API_SERVER_CANONICAL_NAME,
  API_SERVER_DOC_SOURCE_OF_TRUTH,
  API_SERVER_FLOW_SEGMENTS,
  API_SERVER_FORBIDDEN_TERMS,
  EXECUTION_REQUEST_ENVELOPE,
} from "@/lib/api-server-canonical";

const endpointSurface = [
  {
    endpoint: "/run",
    represents: "Execution intake boundary for approved QAgent handoff.",
    inbound: "Execution Request Envelope",
    returns: "Job acceptance with job identity and initial queued status.",
  },
  {
    endpoint: "/jobs",
    represents: "Job lifecycle visibility boundary.",
    inbound: "Job lookup context (job identity and optional query filters).",
    returns: "Job status, progress, and result or failure outcome.",
  },
  {
    endpoint: "/files",
    represents: "Execution-related file exchange boundary.",
    inbound: "File references and file transfer context tied to execution.",
    returns: "File operation outcome and file reference state.",
  },
  {
    endpoint: "/health",
    represents: "Service liveness/readiness boundary.",
    inbound: "Health probe request.",
    returns: "Operational health projection.",
  },
];

export default function ApiPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Overview</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (structure)</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Naming</h2>
        <p className="text-[var(--muted)]">
          Canonical layer name: <span className="font-semibold text-slate-100">{API_SERVER_CANONICAL_NAME}</span>
        </p>
        <p className="text-[var(--muted)]">
          Allowed aliases:{" "}
          <span className="font-semibold text-slate-100">{API_SERVER_ALLOWED_ALIASES.length ? API_SERVER_ALLOWED_ALIASES.join(", ") : "none"}</span>
        </p>
        <p className="text-[var(--muted)]">
          Forbidden terms: <span className="font-semibold text-slate-100">{API_SERVER_FORBIDDEN_TERMS.join(", ")}</span>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Layer Purpose and Role</h2>
        <div className="space-y-3 text-[var(--muted)]">
          <p>
            {API_SERVER_CANONICAL_NAME} is the execution orchestration boundary between QAgent decisions and runtime execution. It accepts workload, orchestrates jobs and
            workers, and exposes status and results.
          </p>
          <div className="rounded-md border border-amber-900/40 bg-amber-950/20 p-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-1">Structural Boundary (API Gateway)</h3>
            <p className="text-sm">
              The entry sub-layer (API Gateway) acts as a strictly structural shell. It **MUST NOT** interpret plans or modify execution semantics. Its scope is limited to validation, normalization, and routing.
            </p>
            <a href="/docs/api/gateway" className="inline-block mt-2 text-xs font-bold text-amber-400 underline underline-offset-4 hover:text-amber-300">
              View authoritative Gateway Structural Lock →
            </a>
          </div>
          <p>
            The layer as a whole does not decide intent, does not build plans, and does not own UI or approval logic.
          </p>
        </div>
      </section>


      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{API_SERVER_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Execution Request Envelope</h2>
        <p className="text-[var(--muted)]">
          <span className="font-semibold text-slate-100">{EXECUTION_REQUEST_ENVELOPE.name}</span>: {EXECUTION_REQUEST_ENVELOPE.represents}
        </p>
        <p className="text-[var(--muted)]">{EXECUTION_REQUEST_ENVELOPE.relationToQAgent}</p>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Required conceptual fields</p>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            {EXECUTION_REQUEST_ENVELOPE.requiredConceptualFields.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Flow Segmentation</h2>
        <div className="space-y-2 text-[var(--muted)]">
          {API_SERVER_FLOW_SEGMENTS.map((segment) => (
            <p key={segment.stage}>
              <span className="font-semibold text-slate-100">{segment.stage}</span>: {segment.modules.join(", ")}
            </p>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Contract Surface</h2>
        <div className="space-y-3">
          {endpointSurface.map((item) => (
            <div key={item.endpoint} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm">
              <p>
                <span className="font-semibold text-slate-100">{item.endpoint}</span>: {item.represents}
              </p>
              <p className="text-[var(--muted)]">Inbound: {item.inbound}</p>
              <p className="text-[var(--muted)]">Returns: {item.returns}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Source of Truth</h2>
        <p className="text-[var(--muted)]">
          Canonical location: <span className="font-semibold text-slate-100">{API_SERVER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
        <p className="text-[var(--muted)]">{API_SERVER_DOC_SOURCE_OF_TRUTH.rule}</p>
      </section>
    </main>
  );
}
