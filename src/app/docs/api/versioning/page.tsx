import { API_SERVER_CANONICAL_NAME } from "@/lib/api-server-canonical";

export default function ApiVersioningPage() {
  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">{API_SERVER_CANONICAL_NAME} - Versioning</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (structure)</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Versioning Scope</h2>
        <p className="text-[var(--muted)]">
          API Server versioning scope covers traceable job lifecycle transitions and publication-ready result snapshots only.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Owned Outputs</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Job lifecycle state transitions</li>
          <li>Execution result publication records</li>
          <li>Failure/result correlation context</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Non-Ownership</h2>
        <p className="text-[var(--muted)]">
          API Server versioning does not own user-facing content history and does not replace QAgent decision lineage.
        </p>
        <p className="text-[var(--muted)]">
          Authority split: API Server owns execution publication lineage for /jobs results; QAgent owns user-facing version references and decision-context history.
        </p>
      </section>
    </main>
  );
}
