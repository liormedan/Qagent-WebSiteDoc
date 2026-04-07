import { DocsContent } from "@/components/layout/DocsContent";

const transitions = [
  "idle -> ready",
  "ready -> running",
  "running -> paused",
  "paused -> running",
  "running -> completed",
  "running -> failed",
  "paused -> failed",
  "failed -> ready",
  "completed -> ready",
];

const invalidTransitions = [
  "idle -> running (requires ready first)",
  "completed -> running (must reset to ready first)",
  "failed -> running (must reset to ready first)",
  "ready -> completed (requires running first)",
];

export default function RuntimeLifecyclePage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Runtime Lifecycle</h1>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`idle -> ready -> running -> paused -> running -> completed
                      \\-> failed`}
          </pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Allowed Transitions</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">{transitions.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Invalid Transitions</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">{invalidTransitions.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">UI Behavior per State</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>idle: controls disabled except input/load actions.</li>
            <li>ready: execute controls enabled, preview allowed.</li>
            <li>running: show progress and active block, lock conflicting actions.</li>
            <li>paused: show paused badge, allow resume/cancel only.</li>
            <li>completed: show success/output, allow restart.</li>
            <li>failed: show error context, allow retry/reset.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Retry Behavior</h2>
          <p className="text-[var(--muted)]">Retry is allowed only from failed -&gt; ready -&gt; running. Retry MUST reuse the same session scope and increment runtime attempt number.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Cancellation Rules</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Cancellation is valid only in running or paused states.</li>
            <li>Cancel emits terminal runtime event and forces transition to failed or ready (policy-defined).</li>
            <li>Post-cancel stale events MUST be ignored by state version check.</li>
          </ul>
        </section>
      </main>
    </DocsContent>
  );
}
