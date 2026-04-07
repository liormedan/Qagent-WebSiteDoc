import { DocsContent } from "@/components/layout/DocsContent";

export default function ConformanceTestsPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Conformance & Determinism Tests</h1>
          <p className="text-[var(--muted)]">Executable validation scenarios proving implementation conformance with Client contracts.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">1. Conformance Test Suites</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">Suite</th>
                  <th className="px-3 py-2 font-semibold">Scenario</th>
                  <th className="px-3 py-2 font-semibold">Expected Behavior</th>
                  <th className="px-3 py-2 font-semibold">Pass Criteria</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">uiPlan validation</td>
                  <td className="px-3 py-2">Invalid enum/missing required field</td>
                  <td className="px-3 py-2">Reject before render, no partial UI</td>
                  <td className="px-3 py-2">Validation error emitted; rendered tree unchanged</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">State ownership enforcement</td>
                  <td className="px-3 py-2">Unauthorized writer attempts mutation</td>
                  <td className="px-3 py-2">Write denied deterministically</td>
                  <td className="px-3 py-2">State snapshot unchanged + violation event logged</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Event contract compliance</td>
                  <td className="px-3 py-2">Missing correlationId/sequence/sessionId</td>
                  <td className="px-3 py-2">Event rejected, no state mutation</td>
                  <td className="px-3 py-2">Reducer not invoked + error surfaced</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">2. Event Order Tests</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">Scenario</th>
                  <th className="px-3 py-2 font-semibold">Input Pattern</th>
                  <th className="px-3 py-2 font-semibold">Deterministic Behavior</th>
                  <th className="px-3 py-2 font-semibold">Pass Criteria</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Duplicate events</td>
                  <td className="px-3 py-2">Same eventId delivered twice</td>
                  <td className="px-3 py-2">Second event ignored</td>
                  <td className="px-3 py-2">Exactly one state transition occurs</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Out-of-order events</td>
                  <td className="px-3 py-2">Sequence 5 arrives before 4</td>
                  <td className="px-3 py-2">Buffer or reject by policy; final state identical</td>
                  <td className="px-3 py-2">Final applied sequence is monotonic</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Delayed events</td>
                  <td className="px-3 py-2">Late arrival after terminal state</td>
                  <td className="px-3 py-2">Ignored as stale</td>
                  <td className="px-3 py-2">No rollback/ghost UI state</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">3. Runtime Lifecycle Tests</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Valid transitions accepted: idle-&gt;ready-&gt;running-&gt;paused-&gt;running-&gt;completed.</li>
            <li>Invalid transitions rejected: idle-&gt;running, completed-&gt;running, failed-&gt;running.</li>
            <li>Retry behavior: failed-&gt;ready-&gt;running only, attempt counter increments.</li>
            <li>Cancellation behavior: running/paused only; stale post-cancel events ignored.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">4. Edge Case Matrix</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">Scenario</th>
                  <th className="px-3 py-2 font-semibold">Expected Behavior</th>
                  <th className="px-3 py-2 font-semibold">Pass Criteria</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Rapid clicks</td>
                  <td className="px-3 py-2">Debounced or deduplicated action dispatch</td>
                  <td className="px-3 py-2">Single effective execution trigger</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Network loss</td>
                  <td className="px-3 py-2">Retry policy runs, terminal error surfaced if exhausted</td>
                  <td className="px-3 py-2">No silent stall, deterministic terminal state</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Session switch mid-run</td>
                  <td className="px-3 py-2">Old session events isolated and dropped</td>
                  <td className="px-3 py-2">No cross-session state contamination</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Stale uiPlan</td>
                  <td className="px-3 py-2">Rejected by version/checksum policy</td>
                  <td className="px-3 py-2">No render mutation from stale payload</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">5. Lock Validation Rule</h2>
          <p className="text-[var(--muted)]">
            System is considered LOCKED only if all tests pass, no undefined behavior exists, and no state divergence occurs.
          </p>
        </section>
      </main>
    </DocsContent>
  );
}
