import { DocsContent } from "@/components/layout/DocsContent";

export default function EventContractPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Event Contract</h1>
          <p className="text-[var(--muted)]">Events are the ONLY way to mutate state.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Canonical Event Shape</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "eventId": "...",
  "eventType": "...",
  "correlationId": "...",
  "sessionId": "...",
  "sequence": 42,
  "timestamp": 1710000000000,
  "payload": {},
  "version": "1.0"
}`}</pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">CorrelationId Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>All events in one user operation MUST share correlationId.</li>
            <li>Retry attempts keep correlationId and increment sequence.</li>
            <li>Cross-session reuse of correlationId is forbidden.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Ordering Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Ordering is by (sessionId, correlationId, sequence).</li>
            <li>Out-of-order events MUST be buffered or dropped by policy.</li>
            <li>Lower sequence than applied state version MUST be ignored.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Deduplication Logic</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Duplicate eventId MUST be ignored.</li>
            <li>Idempotent reducers MUST produce same state for repeated event payload.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Cancellation Handling</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Cancellation emits explicit cancel event with same correlationId.</li>
            <li>Post-cancel non-terminal events for that correlationId MUST be dropped.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Session Isolation Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Events MUST be applied only to matching sessionId store scope.</li>
            <li>Session switch MUST invalidate pending queue from previous session scope.</li>
          </ul>
        </section>
      </main>
    </DocsContent>
  );
}
