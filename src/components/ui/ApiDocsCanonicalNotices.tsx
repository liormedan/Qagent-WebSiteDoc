import Link from "next/link";

/** Shown on every /docs/api-server-layer/* page: architecture spec defers operational truth to /docs/api. */
export function ApiServerLayerSpecCanonicalNotice() {
  return (
    <section
      className="mb-5 rounded-md border border-cyan-400/35 bg-cyan-500/10 p-4 text-sm text-cyan-50"
      aria-label="API Server Layer specification versus operational documentation"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">API Server Layer Specification</p>
      <p className="mt-2 text-slate-100">This section defines the architectural structure of the API layer.</p>
      <p className="mt-2 text-[var(--muted)]">
        For operational behavior, request handling, and runtime implementation details, refer to:
      </p>
      <p className="mt-1">
        <Link href="/docs/api" className="font-medium text-cyan-200 hover:text-cyan-100 hover:underline">
          → /docs/api <span className="font-normal text-slate-300">(canonical source of truth)</span>
        </Link>
      </p>
    </section>
  );
}
