import Link from "next/link";
import { ApiLifecycleDiagram } from "@/components/ui/ApiLifecycleDiagram";
import {
  API_SERVER_CANONICAL_NAME,
  API_SERVER_DOC_SOURCE_OF_TRUTH,
  EXECUTION_REQUEST_ENVELOPE,
} from "@/lib/api-server-canonical";

const quickNav = [
  { label: "Core Flow", href: "/docs/api/core-flow" },
  { label: "Architecture", href: "/docs/api/architecture" },
  { label: "Gateway", href: "/docs/api/gateway" },
  { label: "Request Handling", href: "/docs/api/request-handling" },
  { label: "Job Orchestration", href: "/docs/api/job-orchestration" },
  { label: "Execution Layer", href: "/docs/api/execution" },
  { label: "Decision System", href: "/docs/api/decision-system" },
  { label: "Versioning", href: "/docs/api/versioning" },
];

export default function ApiPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME}</h1>
        <p className="text-[var(--muted)]">Execution orchestration layer that receives plans, manages jobs, and executes workflows.</p>
      </section>

      <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <h2 className="text-lg font-semibold">What happens here?</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>QAgent sends execution requests.</li>
          <li>API validates and queues jobs.</li>
          <li>Workers execute plans.</li>
          <li>Results are returned to QAgent.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Explore API Layer</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {quickNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md border border-[var(--border)] bg-slate-950/30 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Execution Flow</h2>
        <ol className="list-decimal space-y-2 rounded-md border border-[var(--border)] bg-slate-950/40 p-4 pl-8 text-sm text-slate-200">
          <li>QAgent sends approved execution request.</li>
          <li>API Gateway receives request at `/run`.</li>
          <li>Request Handling validates input.</li>
          <li>Job Orchestration creates and queues job.</li>
          <li>Execution Layer executes plan.</li>
          <li>Results are exposed via `/jobs`.</li>
          <li>QAgent consumes results.</li>
        </ol>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Lifecycle Diagram</h2>
        <ApiLifecycleDiagram />
      </section>

      <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <h2 className="text-lg font-semibold">API at a Glance</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>Input: {EXECUTION_REQUEST_ENVELOPE.name}</li>
          <li>Output: Job + Status</li>
          <li>Core Endpoints: `/run`, `/jobs`, `/files`, `/health`</li>
          <li>Owner: API Server Layer</li>
        </ul>
      </section>

      <section className="rounded-md border border-[var(--border)] bg-slate-950/30 p-4 text-sm">
        <h2 className="text-lg font-semibold text-slate-100">Where this fits in the system</h2>
        <p className="mt-2 text-[var(--muted)]">Client -&gt; QAgent -&gt; API Server -&gt; Execution -&gt; Versioning</p>
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
