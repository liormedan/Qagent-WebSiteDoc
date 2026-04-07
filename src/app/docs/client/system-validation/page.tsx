import { DocsContent } from "@/components/layout/DocsContent";

export default function SystemValidationPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">System Validation</h1>
          <p className="text-[var(--muted)]">Minimal success scenario for lock-level validation.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Scenario</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`Upload -> Plan -> uiPlan -> Render -> Runtime -> Output`}
          </pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Expected States</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Chat: input accepted, response with plan+uiPlan.</li>
            <li>Canvas: uiPlan validated and rendered fully.</li>
            <li>Runtime: ready -&gt; running -&gt; completed transitions emitted.</li>
            <li>Output: result visible and aligned with completed state.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Pass/Fail Criteria</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>PASS: no partial render, no stale state apply, deterministic final state.</li>
            <li>FAIL: ghost state, mismatched status, missing output, or silent contract violation.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">UI Expectations</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Immediate feedback for each step.</li>
            <li>Visible progress while running.</li>
            <li>Clear success/failure terminal feedback.</li>
          </ul>
        </section>
      </main>
    </DocsContent>
  );
}
