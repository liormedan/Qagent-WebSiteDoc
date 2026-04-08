import {
  API_GATEWAY_CANONICAL_FLOW,
  API_GATEWAY_HANDOFF_CONTRACT,
  API_GATEWAY_STRICT_ROLE,
  API_SERVER_CANONICAL_NAME,
  EXECUTION_REQUEST_ENVELOPE,
} from "@/lib/api-server-canonical";

export default function ApiGatewayPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">API Gateway Layer — Structural Lock</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (Authoritative)</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Strict Functional Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-emerald-900/30 bg-emerald-950/20 p-4">
            <h3 className="text-lg font-medium text-emerald-400 mb-2">Gateway MUST:</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-300 text-sm">
              {API_GATEWAY_STRICT_ROLE.mustOnly.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-red-900/30 bg-red-950/20 p-4">
            <h3 className="text-lg font-medium text-red-400 mb-2">Gateway MUST NOT:</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-300 text-sm">
              {API_GATEWAY_STRICT_ROLE.mustNot.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm text-[var(--muted)]">
          The Gateway is a structural shell. It serves as the interface owner and does not participate in domain logic.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">2. Canonical Gateway Flow</h2>
        <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 font-mono text-sm text-slate-200">
          {API_GATEWAY_CANONICAL_FLOW.split(" -> ").map((step, i, arr) => (
            <span key={step}>
              {step}
              {i < arr.length - 1 && <span className="mx-2 text-slate-500">→</span>}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)]">
          Scope is strictly limited to the intake and handoff boundaries. No job creation or queueing occurs here.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Execution Request Envelope (Gateway View)</h2>
        <div className="rounded-md border border-[var(--border)] bg-slate-950/20 p-4 space-y-3">
          <p className="text-sm">
            <span className="font-semibold text-slate-100">{EXECUTION_REQUEST_ENVELOPE.name}</span>: {EXECUTION_REQUEST_ENVELOPE.represents}
          </p>
          <div className="bg-slate-900/50 p-3 rounded border border-slate-800">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Gateway Structural Responsibility</p>
            <p className="text-sm text-slate-300">{EXECUTION_REQUEST_ENVELOPE.gatewayResponsibility}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-100">Required Conceptual Fields:</p>
            <ul className="grid grid-cols-2 gap-x-4 list-disc pl-6 text-xs text-[var(--muted)]">
              {EXECUTION_REQUEST_ENVELOPE.requiredConceptualFields.map((field) => (
                <li key={field}>{field}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Internal Handoff Boundary</h2>
        <div className="rounded-md border border-sky-900/30 bg-sky-950/20 p-4 space-y-3">
          <h3 className="text-lg font-medium text-sky-400">{API_GATEWAY_HANDOFF_CONTRACT.name}</h3>
          <p className="text-sm text-slate-300">{API_GATEWAY_HANDOFF_CONTRACT.represents}</p>
          <div className="flex flex-wrap gap-2">
            {API_GATEWAY_HANDOFF_CONTRACT.characteristics.map((char) => (
              <span key={char} className="px-2 py-1 rounded-full bg-sky-900/40 border border-sky-700/50 text-[10px] text-sky-200 uppercase font-bold">
                {char}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Endpoint Contract Depth</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase">/run</h3>
            <ul className="text-sm space-y-1 text-[var(--muted)] pl-4 border-l-2 border-slate-700">
              <li><span className="text-slate-200">Enters:</span> Execution Request Envelope</li>
              <li><span className="text-slate-200">Immediate Return:</span> 202 Accepted (Job Identity + Initial Status)</li>
              <li><span className="text-slate-200">Deferred:</span> All execution results and progress via /jobs</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase">/jobs</h3>
            <ul className="text-sm space-y-1 text-[var(--muted)] pl-4 border-l-2 border-slate-700">
              <li><span className="text-slate-200">Exposes:</span> Direct mirror of Job Lifecycle State Machine</li>
              <li><span className="text-slate-200">Scope:</span> Status, Progress (%), and result artifacts</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase">/files</h3>
            <ul className="text-sm space-y-1 text-[var(--muted)] pl-4 border-l-2 border-slate-700">
              <li><span className="text-slate-200">Boundary:</span> Execution-related file exchange boundary</li>
              <li><span className="text-slate-200">Isolation:</span> Storage refers strictly to assets used or produced in current context</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase">/health</h3>
            <ul className="text-sm space-y-1 text-[var(--muted)] pl-4 border-l-2 border-slate-700">
              <li><span className="text-slate-200">Checks:</span> Connectivity, internal routing readiness, core database liveness</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Error Surface (Gateway Boundaries)</h2>
        <div className="rounded-md border border-[var(--border)] bg-slate-950/20 p-4">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="pb-2 px-2">Gateway Handles</th>
                <th className="pb-2 px-2">Gateway MUST NOT Handle</th>
              </tr>
            </thead>
            <tbody className="text-[var(--muted)]">
              <tr>
                <td className="py-2 px-2 border-r border-slate-800">Malformed Request (400)</td>
                <td className="py-2 px-2">Execution Logic Failures</td>
              </tr>
              <tr>
                <td className="py-2 px-2 border-r border-slate-800">Missing Required Fields (422)</td>
                <td className="py-2 px-2">Job Timeouts / Infrastructure Crashes</td>
              </tr>
              <tr>
                <td className="py-2 px-2 border-r border-slate-800">Unauthorized Access (401/403)</td>
                <td className="py-2 px-2">Worker Connectivity Issues</td>
              </tr>
              <tr>
                <td className="py-2 px-2 border-r border-slate-800">Rate Limit Rejection (429)</td>
                <td className="py-2 px-2">Tool Execution Errors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
