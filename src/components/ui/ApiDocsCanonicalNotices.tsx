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

/** Shown on /docs/api overview: operational docs link to architecture spec tree. */
export function ApiOperationalDocsCanonicalNotice() {
  return (
    <section
      className="mb-5 rounded-md border border-violet-400/35 bg-violet-500/10 p-4 text-sm text-violet-50"
      aria-label="Operational API documentation versus layer specification"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-violet-200">Operational API documentation</p>
      <p className="mt-2 text-slate-100">This page defines the operational API behavior.</p>
      <p className="mt-2 text-[var(--muted)]">For architectural structure and system positioning, refer to:</p>
      <p className="mt-1">
        <Link href="/docs/api-server-layer" className="font-medium text-violet-200 hover:text-violet-100 hover:underline">
          → /docs/api-server-layer
        </Link>
      </p>
    </section>
  );
}
