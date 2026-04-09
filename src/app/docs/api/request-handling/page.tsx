import Link from "next/link";

export default function ApiRequestHandlingPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold">Request Handling</h1>
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <p className="text-[var(--muted)]">Validation and normalization boundary before job creation and orchestration.</p>

      <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Validates request shape and required contract fields.</p>
        <p><span className="font-semibold">What it receives:</span> Request accepted by API Gateway.</p>
        <p><span className="font-semibold">What it returns:</span> Validated request context for Job Orchestration.</p>
        <p><span className="font-semibold">Owner:</span> API Server Layer.</p>
      </section>

      <Link href="/docs/api/architecture#request-handling" className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
        Open architecture reference
      </Link>
    </main>
  );
}
