import {
  API_SERVER_CANONICAL_NAME,
  JOB_ORCHESTRATION_AUTHORITY_MODEL,
  JOB_ORCHESTRATION_CANONICAL_FLOW,
  JOB_ORCHESTRATION_DOC_SOURCE_OF_TRUTH,
} from "@/lib/api-server-canonical";

const orchestrationModules = ["Queue Manager", "Job Manager", "Worker Manager", "Status Tracker"];

const immutableFields = ["plan", "decision output", "execution intent"];

const prohibitedOrchestrationBehaviors = [
  "Change decision priority",
  "Change retry behavior decided by Decision System",
  "Reinterpret or transform Decision System execution intent",
];

export default function ApiJobOrchestrationPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Job Orchestration (Canonical)</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (governance)</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Authority Definition</h2>
        <p className="text-[var(--muted)]">{JOB_ORCHESTRATION_AUTHORITY_MODEL.noDecisionLogic}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Canonical Modules</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {orchestrationModules.map((moduleName) => (
            <li key={moduleName}>{moduleName}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Prohibited Behaviors</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {prohibitedOrchestrationBehaviors.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Job Immutability</h2>
        <p className="text-[var(--muted)]">{JOB_ORCHESTRATION_AUTHORITY_MODEL.immutableJobDefinition}</p>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          {immutableFields.map((fieldName) => (
            <li key={fieldName}>{fieldName}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Worker Manager Role</h2>
        <p className="text-[var(--muted)]">{JOB_ORCHESTRATION_AUTHORITY_MODEL.workerManagerRole}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Status Tracker Authority</h2>
        <p className="text-[var(--muted)]">{JOB_ORCHESTRATION_AUTHORITY_MODEL.statusTrackerAuthority}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">JOB_ORCHESTRATION_CANONICAL_FLOW</h2>
        <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{JOB_ORCHESTRATION_CANONICAL_FLOW}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Source of Truth</h2>
        <p className="text-[var(--muted)]">
          Canonical location: <span className="font-semibold text-slate-100">{JOB_ORCHESTRATION_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </p>
        <p className="text-[var(--muted)]">{JOB_ORCHESTRATION_DOC_SOURCE_OF_TRUTH.rule}</p>
      </section>
    </main>
  );
}
