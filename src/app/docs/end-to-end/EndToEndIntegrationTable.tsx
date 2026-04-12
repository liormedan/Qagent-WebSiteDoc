import Link from "next/link";

/** Shared integration cuts table; single source for End-to-end / Integration points. */
export function EndToEndIntegrationTable() {
  return (
    <div className="overflow-x-auto rounded-md border border-[var(--border)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
          <tr>
            <th className="px-3 py-2">Cut</th>
            <th className="px-3 py-2">Contracts</th>
            <th className="px-3 py-2">Layer authorities (read there)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
          <tr className="bg-slate-950/30">
            <td className="px-3 py-2 text-slate-300">Structured client handoff → QAgent intake</td>
            <td className="px-3 py-2 font-mono text-[11px] text-emerald-100/90">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
                Trace + registry
              </Link>
            </td>
            <td className="px-3 py-2 font-mono text-[11px]">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/client/contracts">
                /docs/client/contracts
              </Link>
              {" · "}
              <Link className="text-[var(--accent)] hover:underline" href="/docs/q-agent">
                /docs/q-agent
              </Link>
            </td>
          </tr>
          <tr className="bg-slate-950/30">
            <td className="px-3 py-2 text-slate-300">Approved execution → API admission</td>
            <td className="px-3 py-2 font-mono text-[11px] text-emerald-100/90">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
                Trace + registry
              </Link>
            </td>
            <td className="px-3 py-2 font-mono text-[11px]">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/api">
                /docs/api
              </Link>
              {" · "}
              <Link className="text-[var(--accent)] hover:underline" href="/docs/api-server-layer">
                /docs/api-server-layer
              </Link>
            </td>
          </tr>
          <tr className="bg-slate-950/30">
            <td className="px-3 py-2 text-slate-300">API execution → DSP processing boundary</td>
            <td className="px-3 py-2 font-mono text-[11px] text-emerald-100/90">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
                Trace + registry
              </Link>
            </td>
            <td className="px-3 py-2 font-mono text-[11px]">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/dsp-layer/contracts">
                /docs/dsp-layer/contracts
              </Link>
            </td>
          </tr>
          <tr className="bg-slate-950/30">
            <td className="px-3 py-2 text-slate-300">DSP completion → persistence / projection path</td>
            <td className="px-3 py-2 font-mono text-[11px] text-emerald-100/90">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
                Trace + registry
              </Link>
            </td>
            <td className="px-3 py-2 font-mono text-[11px]">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/data-layer">
                /docs/data-layer
              </Link>
              {" · "}
              <Link className="text-[var(--accent)] hover:underline" href="/docs/api">
                /docs/api
              </Link>
            </td>
          </tr>
          <tr className="bg-slate-950/30">
            <td className="px-3 py-2 text-slate-300">Client event bus (projection / UI loop)</td>
            <td className="px-3 py-2 font-mono text-[11px] text-emerald-100/90">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#event-contracts">
                Event envelope JSON
              </Link>
            </td>
            <td className="px-3 py-2 font-mono text-[11px]">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/client/event-contract">
                /docs/client/event-contract
              </Link>
              {" · "}
              <Link className="text-[var(--accent)] hover:underline" href="/docs/client/event-flow">
                /docs/client/event-flow
              </Link>
            </td>
          </tr>
          <tr className="bg-slate-950/30">
            <td className="px-3 py-2 text-slate-300">Global schema and lineage references (cross-cutting)</td>
            <td className="px-3 py-2 font-mono text-[11px] text-emerald-100/90">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
                Trace + registry
              </Link>
            </td>
            <td className="px-3 py-2 font-mono text-[11px]">
              <Link className="text-[var(--accent)] hover:underline" href="/docs/architecture/contracts/schema-registry">
                /docs/architecture/contracts/schema-registry
              </Link>
              {" · "}
              <Link className="text-[var(--accent)] hover:underline" href="/docs/architecture/contracts/lineage-model">
                /docs/architecture/contracts/lineage-model
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
