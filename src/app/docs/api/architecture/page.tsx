import { ApiArchitectureLayersDiagram } from "@/components/ui/ApiArchitectureLayersDiagram";
import { API_SERVER_CANONICAL_NAME, API_SERVER_CANONICAL_FLOW, API_SERVER_DOC_SOURCE_OF_TRUTH } from "@/lib/api-server-canonical";

export default function ApiArchitecturePage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Architecture</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (structure)</p>
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
        <h2 id="api-gateway-layer" className="text-2xl font-semibold flex items-center gap-3">
          API Gateway Layer
          <a href="/docs/api/gateway" className="text-xs font-bold text-sky-400 border border-sky-400/30 px-2 py-0.5 rounded hover:bg-sky-400/10 transition-colors uppercase tracking-widest">
            Structural Lock Source of Truth
          </a>
        </h2>
        <p className="text-[var(--muted)]">Owns the endpoint surface (`/run`, `/jobs`, `/files`, `/health`) and accepts external requests into API Server Layer.</p>
        <p className="text-sm text-[var(--muted)] italic">
          Defines the legal entry boundary, structural validation rules, and the immutable handoff context.
        </p>
      </section>


      <section className="space-y-2">
        <h2 id="request-handling" className="text-2xl font-semibold flex items-center gap-3">
          Request Handling
          <a href="/docs/api/request-handling" className="text-xs font-bold text-sky-400 border border-sky-400/30 px-2 py-0.5 rounded hover:bg-sky-400/10 transition-colors uppercase tracking-widest">
            Structural Lock Source of Truth
          </a>
        </h2>
        <p className="text-[var(--muted)]">Applies validation, authentication/authorization, rate/load handling, and routing before orchestration.</p>
        <p className="text-sm text-[var(--muted)] italic">
          Acts as the deterministic technical gatekeeper between the Gateway and the Decision System.
        </p>
      </section>

      <section className="space-y-2">
        <h2 id="job-orchestration" className="text-2xl font-semibold">Job Orchestration</h2>
        <p className="text-[var(--muted)]">Manages queue, job lifecycle, worker assignment, and status tracking as the orchestration control surface.</p>
      </section>

      <section className="space-y-2">
        <h2 id="execution-layer" className="text-2xl font-semibold">Execution Layer</h2>
        <p className="text-[var(--muted)]">Coordinates executable plan interpretation, dispatch, and result collection from runtime processing.</p>
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
      </section>
    </main>
  );
}
