import Link from "next/link";

export default function ApiGatewayPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-3xl font-semibold">API Gateway</h1>
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>
      <p className="text-[var(--muted)]">Gateway entry for execution requests and admission into API Server processing.</p>

      <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
        <p><span className="font-semibold">What it does:</span> Accepts incoming execution requests at `/run` and forwards valid payloads.</p>
        <p><span className="font-semibold">What it receives:</span> Approved execution request from QAgent.</p>
        <p><span className="font-semibold">What it returns:</span> Admission outcome and handoff to Request Handling.</p>
        <p><span className="font-semibold">Owner:</span> API Server Layer.</p>
      </section>

      <Link href="/docs/api/architecture#api-gateway-layer" className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
        Open architecture reference
      </Link>
    </main>
  );
}
