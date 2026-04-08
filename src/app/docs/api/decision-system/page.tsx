import { API_SERVER_CANONICAL_NAME } from "@/lib/api-server-canonical";

const modules = [
  "Request Admission Controller",
  "Execution Policy Guard",
  "Load Shedding Controller",
  "Priority Resolver",
  "Failure Classification Unit",
  "Retry Decision Logic",
];

export default function ApiDecisionSystemPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Decision System</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (structure)</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Subsystem Scope</h2>
        <p className="text-[var(--muted)]">
          Decision System in API Server Layer controls execution admission, policy compliance, load behavior, failure classification, and retry posture. It does not perform
          intent or planning decisions.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Modules</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {modules.map((moduleName) => (
            <li key={moduleName}>{moduleName}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Internal Flow</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
          Request intake -{">"} Admission check -{">"} Policy check -{">"} Load control -{">"} Priority resolution -{">"} Decision output to orchestration -{">"} Failure
          classification (if needed) -{">"} Retry posture decision.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Boundaries</h2>
        <p className="text-[var(--muted)]">
          Can control operational execution decisions only. Must not control QAgent ownership domains: intent interpretation, planning, approval policy, and user-facing decision
          behavior.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Layer Integration</h2>
        <p className="text-[var(--muted)]">
          Receives approved execution handoff from QAgent, emits control decisions to Job Orchestration, and evaluates execution outcomes from the Execution Layer.
        </p>
        <p className="text-[var(--muted)]">
          Job Orchestration must execute Decision System output without changing priority, retry behavior, or execution interpretation.
        </p>
      </section>
    </main>
  );
}
