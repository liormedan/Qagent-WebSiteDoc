import { DocsContent } from "@/components/layout/DocsContent";

export default function ErrorModelPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Error Model</h1>
          <p className="text-[var(--muted)]">Client errors use one canonical format and deterministic recovery behavior.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Canonical Error Format</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "code": "VALIDATION_ERROR",
  "category": "validation | runtime | network | desync",
  "message": "Human-readable message",
  "recoverable": true,
  "retryable": true,
  "correlationId": "...",
  "sessionId": "...",
  "details": {}
}`}</pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Error Categories</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>validation errors: invalid input/payload/schema.</li>
            <li>runtime errors: execution or preview failures.</li>
            <li>network errors: request timeout/disconnect/retry exhaustion.</li>
            <li>desync errors: stale state/event ordering mismatch.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">User-Visible Behavior</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>All errors MUST be visible in UI with actionable status.</li>
            <li>Recoverable errors expose retry/reset actions.</li>
            <li>Non-recoverable errors expose safe fallback and diagnostics reference.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Recovery Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Validation: block transition, request correction, no partial apply.</li>
            <li>Runtime: transition to failed and allow controlled retry.</li>
            <li>Network: retry with exponential backoff; fail after max attempts.</li>
            <li>Desync: invalidate stale branch and resync from latest authoritative snapshot.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Retry Policy</h2>
          <p className="text-[var(--muted)]">Default policy: max 3 attempts, exponential backoff, same correlationId lineage, and hard stop after terminal failure.</p>
        </section>
      </main>
    </DocsContent>
  );
}
