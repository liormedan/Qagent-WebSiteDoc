import { DocsContent } from "@/components/layout/DocsContent";

export default function TestReportPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Client Test Report</h1>
          <p className="text-[var(--muted)]">Execution evidence from actual command runs in this workspace.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">1. Test Execution Report</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">testId</th>
                  <th className="px-3 py-2 font-semibold">result</th>
                  <th className="px-3 py-2 font-semibold">execution trace</th>
                  <th className="px-3 py-2 font-semibold">timestamp (UTC)</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2 font-mono">T-LINT-001</td>
                  <td className="px-3 py-2">pass</td>
                  <td className="px-3 py-2">npm run lint -&gt; eslint -&gt; exit_code 0</td>
                  <td className="px-3 py-2">2026-04-07T20:47Z</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2 font-mono">T-BUILD-001</td>
                  <td className="px-3 py-2">pass</td>
                  <td className="px-3 py-2">npm run build -&gt; next build -&gt; compiled + generated docs routes</td>
                  <td className="px-3 py-2">2026-04-07T20:49Z</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2 font-mono">T-CONFORM-001</td>
                  <td className="px-3 py-2">fail</td>
                  <td className="px-3 py-2">uiPlan/state/event conformance suite not executable (no automated harness present)</td>
                  <td className="px-3 py-2">2026-04-07T20:49Z</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">2. End-to-End Trace (Upload -&gt; Plan -&gt; uiPlan -&gt; Render -&gt; Runtime -&gt; Output)</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">step</th>
                  <th className="px-3 py-2 font-semibold">events</th>
                  <th className="px-3 py-2 font-semibold">state changes</th>
                  <th className="px-3 py-2 font-semibold">result</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Upload -&gt; Plan</td>
                  <td className="px-3 py-2">not executed (no runtime harness)</td>
                  <td className="px-3 py-2">not captured</td>
                  <td className="px-3 py-2">blocked</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">uiPlan -&gt; Render</td>
                  <td className="px-3 py-2">spec defined, runtime trace unavailable</td>
                  <td className="px-3 py-2">not captured</td>
                  <td className="px-3 py-2">blocked</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">Runtime -&gt; Output</td>
                  <td className="px-3 py-2">not executed (no executable scenario runner)</td>
                  <td className="px-3 py-2">not captured</td>
                  <td className="px-3 py-2">blocked</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">3. Determinism Check</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>Same input -&gt; same result: blocked (no executable runner).</li>
            <li>No race conditions: blocked (no runtime event replay test executed).</li>
            <li>No duplicate effects: blocked (dedup scenarios defined, not executed).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">4. Failure Simulation</h2>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">scenario</th>
                  <th className="px-3 py-2 font-semibold">status</th>
                  <th className="px-3 py-2 font-semibold">trace</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">network loss</td>
                  <td className="px-3 py-2">blocked</td>
                  <td className="px-3 py-2">no simulation harness executed</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">duplicate events</td>
                  <td className="px-3 py-2">blocked</td>
                  <td className="px-3 py-2">no replay runner executed</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">stale uiPlan</td>
                  <td className="px-3 py-2">blocked</td>
                  <td className="px-3 py-2">schema rules documented; runtime execution not recorded</td>
                </tr>
                <tr className="border-t border-[var(--border)]">
                  <td className="px-3 py-2">cancellation mid-run</td>
                  <td className="px-3 py-2">blocked</td>
                  <td className="px-3 py-2">lifecycle rules documented; no live trace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">5. Lock Rule Result</h2>
          <p className="text-[var(--muted)]">
            LOCK status is currently <span className="font-semibold text-amber-300">NOT MET</span>. Build and lint pass, but conformance and
            deterministic runtime tests are not executed in an automated harness.
          </p>
        </section>
      </main>
    </DocsContent>
  );
}
