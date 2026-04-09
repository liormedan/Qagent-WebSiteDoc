import Link from "next/link";
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

const subsystemBlocks = [
  {
    title: "API Gateway",
    description: "Handles incoming execution requests and entry validation.",
    href: "/docs/api/gateway",
  },
  {
    title: "Request Handling",
    description: "Validates request shape and admission requirements.",
    href: "/docs/api/request-handling",
  },
  {
    title: "Job Orchestration",
    description: "Creates jobs, queues work, and tracks lifecycle state.",
    href: "/docs/api/job-orchestration",
  },
  {
    title: "Execution Layer",
    description: "Runs executable plans and gathers execution outputs.",
    href: "/docs/api/execution",
  },
  {
    title: "Decision System",
    description: "Owns policy decisions for admission and retry behavior.",
    href: "/docs/api/decision-system",
  },
  {
    title: "Versioning",
    description: "Stores versioned outputs and stable result references.",
    href: "/docs/api/versioning",
  },
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
        <ol className="space-y-2 rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
          <li>1. QAgent sends approved execution request.</li>
          <li>2. API Gateway receives request at `/run`.</li>
          <li>3. Request Handling validates input.</li>
          <li>4. Job Orchestration creates and queues job.</li>
          <li>5. Execution Layer executes plan.</li>
          <li>6. Results are exposed via `/jobs`.</li>
          <li>7. QAgent consumes results.</li>
        </ol>
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

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Subsystems</h2>
        <div className="space-y-3">
          {subsystemBlocks.map((block) => (
            <div key={block.href} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
              <p className="font-semibold text-slate-100">{block.title}</p>
              <p className="text-sm text-[var(--muted)]">{block.description}</p>
              <Link href={block.href} className="mt-1 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                Go to {block.title}
              </Link>
            </div>
          ))}
        </div>
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
