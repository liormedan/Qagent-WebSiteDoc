import {
  REQUEST_HANDLING_CANONICAL_FLOW,
  REQUEST_HANDLING_STRICT_ROLE,
  REQUEST_HANDLING_OUTPUT_CONTEXT,
  API_SERVER_CANONICAL_NAME,
} from "@/lib/api-server-canonical";

export default function RequestHandlingPage() {
  return (
    <main className="space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Request Handling Subsystem — Structural Definition</h1>
        <p className="text-sm text-emerald-300">Status: LOCKED (Authoritative)</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Subsystem Definition</h2>
        <p className="text-[var(--muted)]">
          Request Handling is the <strong>deterministic technical gatekeeping layer</strong> of the {API_SERVER_CANONICAL_NAME}. 
          It sits between the API Gateway and the Decision System, responsible for ensuring that only technically valid, authenticated, 
          and authorized requests proceed to operational decision-making.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="rounded-md border border-emerald-900/30 bg-emerald-950/20 p-4">
            <h3 className="text-lg font-medium text-emerald-400 mb-2">Primary Role</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-300 text-sm">
              {REQUEST_HANDLING_STRICT_ROLE.mustOnly.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-red-900/30 bg-red-950/20 p-4">
            <h3 className="text-lg font-medium text-red-400 mb-2">Forbidden Actions</h3>
            <ul className="list-disc pl-6 space-y-1 text-slate-300 text-sm">
              {REQUEST_HANDLING_STRICT_ROLE.mustNot.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Internal Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 space-y-2">
            <h3 className="font-semibold text-slate-100">Validation</h3>
            <p className="text-xs text-[var(--muted)]">Ensures deep schema compliance and semantic integrity of the request payload beyond simple structural checks.</p>
            <ul className="text-[10px] text-slate-400 uppercase font-bold flex flex-wrap gap-2">
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Input: Normal Context</li>
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Output: Validated Context</li>
            </ul>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 space-y-2">
            <h3 className="font-semibold text-slate-100">Authentication / Authorization</h3>
            <p className="text-xs text-[var(--muted)]">Verifies identity (API keys, Tokens) and enforces access control policies for specific resources/actions.</p>
            <ul className="text-[10px] text-slate-400 uppercase font-bold flex flex-wrap gap-2">
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Input: Validated Context</li>
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Output: Authenticated Context</li>
            </ul>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 space-y-2">
            <h3 className="font-semibold text-slate-100">Rate / Load Handling</h3>
            <p className="text-xs text-[var(--muted)]">Protects system resources by enforcing technical quotas and concurrency limits at the request level.</p>
            <ul className="text-[10px] text-slate-400 uppercase font-bold flex flex-wrap gap-2">
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Input: Authenticated Context</li>
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Output: Admitted Context</li>
            </ul>
          </div>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 space-y-2">
            <h3 className="font-semibold text-slate-100">Request Routing</h3>
            <p className="text-xs text-[var(--muted)]">Structural-only traffic directing based on request type or path. Does NOT involve execution strategy.</p>
            <ul className="text-[10px] text-slate-400 uppercase font-bold flex flex-wrap gap-2">
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Input: Admitted Context</li>
              <li className="px-1.5 py-0.5 bg-slate-800 rounded">Output: Final Context</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">3. Internal Flow (Canonical)</h2>
        <div className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 font-mono text-sm text-slate-200">
          {REQUEST_HANDLING_CANONICAL_FLOW.split(" -> ").map((step, i, arr) => (
            <span key={step}>
              {step}
              {i < arr.length - 1 && <span className="mx-2 text-slate-500">→</span>}
            </span>
          ))}
        </div>
        <p className="text-xs text-[var(--muted)] italic">
          Deviation from this sequence is strictly forbidden. Every request must pass through all technical gates in order.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Request Handling Output Context</h2>
        <div className="rounded-md border border-sky-900/30 bg-sky-950/20 p-4 space-y-3">
          <h3 className="text-lg font-medium text-sky-400">{REQUEST_HANDLING_OUTPUT_CONTEXT.name}</h3>
          <p className="text-sm text-slate-300">{REQUEST_HANDLING_OUTPUT_CONTEXT.represents}</p>
          <div className="flex flex-wrap gap-2">
            {REQUEST_HANDLING_OUTPUT_CONTEXT.characteristics.map((char) => (
              <span key={char} className="px-2 py-1 rounded-full bg-sky-900/40 border border-sky-700/50 text-[10px] text-sky-200 uppercase font-bold">
                {char}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Boundaries</h2>
        <div className="space-y-4 text-sm">
          <div className="border-l-2 border-slate-700 pl-4 space-y-1">
            <h3 className="font-bold text-slate-200">Gateway ↔ Request Handling</h3>
            <p className="text-[var(--muted)]">Gateway passes a structured but raw request. Request Handling upgrades this to a technically verified context.</p>
          </div>
          <div className="border-l-2 border-slate-700 pl-4 space-y-1">
            <h3 className="font-bold text-slate-200">Request Handling ↔ Decision System</h3>
            <p className="text-[var(--muted)]">Request Handling guarantees technical validity. Decision System applies operational policies (Priority, Retries, Policy Compliance).</p>
          </div>
          <div className="border-l-2 border-slate-700 pl-4 space-y-1">
            <h3 className="font-bold text-slate-200">Request Handling ↔ Job Orchestration</h3>
            <p className="text-[var(--muted)]">Direct interaction is forbidden. All requests must pass through the Decision System before reaching Orchestration.</p>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">6. State & Ownership</h2>
        <div className="rounded-md border border-amber-900/30 bg-amber-950/20 p-4">
          <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">Stateless Operation</h3>
          <p className="text-sm text-slate-300">
            Request Handling is <strong>strictly stateless</strong>. It does not persist request state, does not track job IDs, and does not maintain internal caches 
            that affect execution logic. Once a request is forwarded, Request Handling has no further visibility or ownership.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Error Role</h2>
        <table className="w-full text-left text-sm border-collapse">
          <thead className="text-xs text-slate-400 uppercase border-b border-slate-800">
            <tr>
              <th className="pb-2 px-2">Originates Here</th>
              <th className="pb-2 px-2">Passes Through</th>
            </tr>
          </thead>
          <tbody className="text-[var(--muted)]">
            <tr>
              <td className="py-2 px-2 border-b border-slate-900">401 Unauthorized / 403 Forbidden</td>
              <td className="py-2 px-2 border-b border-slate-900 whitespace-pre-wrap text-xs italic opacity-70">Handled at Gateway</td>
            </tr>
            <tr>
              <td className="py-2 px-2 border-b border-slate-900">429 Rate Limit Exceeded</td>
              <td className="py-2 px-2 border-b border-slate-900">All 5xx Infrastructure Errors</td>
            </tr>
            <tr>
              <td className="py-2 px-2">422 Semantic Validation Failures</td>
              <td className="py-2 px-2">All Outcome Failures</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">8. Source of Truth</h2>
        <div className="rounded-md border border-[var(--border)] bg-slate-950/20 p-4">
          <p className="text-sm text-[var(--muted)]">
            This page (/docs/api/request-handling) is the <strong>canonical structural definition</strong> for Request Handling. 
            Any implementation must adhere to these modules, flow, and boundaries.
          </p>
        </div>
      </section>
    </main>
  );
}
