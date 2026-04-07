import { DocsContent } from "@/components/layout/DocsContent";

export default function ClientEventFlowPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Client Event Flow</h1>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Canonical Flow</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
{`User types -> Chat -> QAgent -> uiPlan -> Canvas -> Runtime -> Audio -> UI update`}
          </pre>
          <p className="text-[var(--muted)]">Use this flow as the default reference for debugging and frontend integration behavior.</p>
        </section>
      </main>
    </DocsContent>
  );
}
