import { ApiArchitectureLayersDiagram } from "@/components/ui/ApiArchitectureLayersDiagram";
import {
  API_SERVER_CANONICAL_NAME,
  API_SERVER_CANONICAL_FLOW,
  API_SERVER_DOC_SOURCE_OF_TRUTH,
  EXECUTION_LAYER_CANONICAL_FLOW,
  EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH,
  JOB_ORCHESTRATION_DOC_SOURCE_OF_TRUTH,
} from "@/lib/api-server-canonical";

export default function ApiArchitecturePage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Architecture</h1>
        <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Layer Tree (Canonical)</h2>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`API Server Layer
├── API Gateway Layer
│   ├── /run
│   ├── /jobs
│   ├── /files
│   └── /health
│
├── Request Handling
│   ├── Validation
│   ├── Authentication / Authorization
│   ├── Rate / Load Handling
│   └── Request Routing
│
├── Job Orchestration
│   ├── Queue Manager
│   ├── Job Manager
│   ├── Worker Manager
│   └── Status Tracker
│
├── Execution Layer
│   ├── Execution Engine
│   ├── Plan Interpreter
│   ├── Action Dispatcher
│   └── Result Collector
│
└── Responsibilities
    ├── Accept High Volume Requests
    ├── Queue Jobs
    ├── Manage Concurrency
    ├── Dispatch Execution
    └── Return Results / Status`}
        </pre>
      </section>

      <section className="space-y-2">
        <h2 id="api-gateway-layer" className="text-2xl font-semibold">API Gateway Layer</h2>
        <p className="text-[var(--muted)]">Owns the endpoint surface (`/run`, `/jobs`, `/files`, `/health`) and accepts external requests into API Server Layer.</p>
      </section>

      <section className="space-y-2">
        <h2 id="request-handling" className="text-2xl font-semibold">Request Handling</h2>
        <p className="text-[var(--muted)]">Applies validation, authentication/authorization, rate/load handling, and routing before orchestration.</p>
      </section>

      <section className="space-y-2">
        <h2 id="job-orchestration" className="text-2xl font-semibold">Job Orchestration</h2>
        <p className="text-[var(--muted)]">Manages queue, job lifecycle, worker assignment, and status tracking as the orchestration control surface.</p>
        <p className="text-[var(--muted)]">
          Canonical governance for this module is centralized at{" "}
          <span className="font-semibold text-slate-100">{JOB_ORCHESTRATION_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>.
        </p>
      </section>

      <section className="space-y-2">
        <h2 id="execution-layer" className="text-2xl font-semibold">Execution Layer</h2>
        <p className="text-[var(--muted)]">Coordinates executable plan interpretation, dispatch, and result collection from runtime processing.</p>
        <p className="text-[var(--muted)]">
          Canonical governance for this module is centralized at{" "}
          <span className="font-semibold text-slate-100">{EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>.
        </p>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{EXECUTION_LAYER_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 id="responsibilities" className="text-2xl font-semibold">Responsibilities</h2>
        <p className="text-[var(--muted)]">Accept high-volume requests, queue jobs, manage concurrency, dispatch execution, and return results/status.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{API_SERVER_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">System Position</h2>
        <ApiArchitectureLayersDiagram />
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Documentation Authority</h2>
        <p className="text-[var(--muted)]">
          Canonical location: <span className="font-semibold text-slate-100">{API_SERVER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
        <p className="text-[var(--muted)]">{API_SERVER_DOC_SOURCE_OF_TRUTH.rule}</p>
        <p className="text-[var(--muted)]">
          Execution Layer canonical location:{" "}
          <span className="font-semibold text-slate-100">{EXECUTION_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
      </section>
    </main>
  );
}

