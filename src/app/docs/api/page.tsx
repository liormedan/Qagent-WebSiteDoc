import { ApiServerFlowDiagram } from "@/components/ui/ApiServerFlowDiagram";

export default function ApiPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold">WaveQ API Server — Overview</h1>
        <p className="text-sm text-[var(--muted)]">Status: 🚧 In Progress</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Purpose</h2>
        <p className="text-base text-[var(--muted)]">The WaveQ API Server is the execution layer of the system.</p>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Receiving high-volume requests</li>
          <li>Managing execution workflows</li>
          <li>Scheduling and processing jobs</li>
          <li>Coordinating between QAgent (brain) and execution systems</li>
        </ul>
        <p className="text-base text-[var(--muted)]">It does not think — it executes and orchestrates workload.</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Role in the System</h2>
        <p className="text-base text-[var(--muted)]">WaveQ is composed of two main layers:</p>
        <div className="space-y-2 text-[var(--muted)]">
          <p>
            <span className="font-semibold text-slate-100">1. QAgent (Frontend / Brain)</span>: Interprets user intent, builds execution plans, and
            manages user interaction and approval.
          </p>
          <p>
            <span className="font-semibold text-slate-100">2. API Server (Backend / Execution Layer)</span>: Receives execution requests, queues and
            manages jobs, executes plans via workers, and tracks job status and progress.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">System Flow</h2>
        <ApiServerFlowDiagram />
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`User -> QAgent -> Plan
             |
        API Server (/run)
             |
          Job Queue
             |
       Worker Execution
             |
        Result / Status
             |
      QAgent -> Canvas / UI`}
        </pre>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Core Responsibilities</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p><span className="font-semibold text-slate-100">1. Request Handling</span>: Accept incoming requests, validate input, create execution jobs.</p>
          <p><span className="font-semibold text-slate-100">2. Job Management</span>: Assign job IDs and track lifecycle (queued, running, completed, failed).</p>
          <p><span className="font-semibold text-slate-100">3. Queue Orchestration</span>: Manage high-throughput queue and support concurrent processing.</p>
          <p><span className="font-semibold text-slate-100">4. Execution Coordination</span>: Dispatch jobs, manage plan steps, and collect results.</p>
          <p><span className="font-semibold text-slate-100">5. Status & Monitoring</span>: Expose status endpoints and progress polling for QAgent.</p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Non-Responsibilities (Boundaries)</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Perform intent detection</li>
          <li>Build execution plans</li>
          <li>Handle UI logic</li>
          <li>Manage user interactions</li>
          <li>Contain business decision logic (QAgent responsibility)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Design Principles</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Stateless API layer (state is managed via jobs/external storage)</li>
          <li>Asynchronous processing for heavy work</li>
          <li>High scalability with queue-based architecture</li>
          <li>Separation of concerns: QAgent = intelligence, API Server = execution</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Architecture Components</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>API Layer (FastAPI): request handling, validation, immediate responses</li>
          <li>Queue Manager: queue and execution flow control</li>
          <li>Job Manager: metadata, status, and progress tracking</li>
          <li>Worker System: asynchronous job processing</li>
          <li>Execution Engine: interpretation and execution of plan instructions</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Capabilities</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>High request throughput</li>
          <li>Concurrent job execution</li>
          <li>Job lifecycle tracking</li>
          <li>Scalable execution model</li>
          <li>Modular execution pipeline</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Technologies</h2>
        <div className="space-y-2 text-[var(--muted)]">
          <p><span className="font-semibold text-slate-100">Core Stack</span>: Python 3.11+, FastAPI.</p>
          <p><span className="font-semibold text-slate-100">Async / Concurrency</span>: asyncio, background workers.</p>
          <p><span className="font-semibold text-slate-100">Future Extensions</span>: Redis / PubSub, Cloud Tasks / PubSub, Firestore / DB.</p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Deployment Model</h2>
        <p className="text-[var(--muted)]">Designed for Google Cloud Run with stateless containers, horizontal scaling, and external queue support.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Integration with QAgent</h2>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Input (from QAgent)</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "sessionId": "...",
  "intent": "...",
  "plan": [...]
}`}</pre>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Output (to QAgent)</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "jobId": "...",
  "status": "accepted"
}`}</pre>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-100">Status Check</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "status": "running",
  "progress": 0.45
}`}</pre>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Mental Model</h2>
        <p className="text-[var(--muted)]">
          Think of the API Server as an Execution Operating System: QAgent is the CPU (decision making), API Server is the OS (task execution and scheduling).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Future Evolution</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Distributed workers</li>
          <li>Advanced scheduling</li>
          <li>Priority queues</li>
          <li>Real-time streaming updates</li>
          <li>DSP processing pipelines</li>
          <li>Multi-tenant execution isolation</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Summary</h2>
        <p className="text-[var(--muted)]">
          The WaveQ API Server is a scalable execution layer, a job orchestration system, and a bridge between intelligence and action.
        </p>
      </section>
    </main>
  );
}
