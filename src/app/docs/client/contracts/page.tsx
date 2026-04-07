import { DocsContent } from "@/components/layout/DocsContent";

export default function ClientContractsPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Cross-Layer Contracts</h1>
          <p className="text-[var(--muted)]">All contracts are versioned and must be validated at boundary ingress.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Chat ↔ QAgent (v1.0)</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`// Request
{
  "version": "1.0",
  "sessionId": "...",
  "message": "...",
  "files": []
}

// Response
{
  "version": "1.0",
  "intent": "...",
  "plan": [],
  "uiPlan": {},
  "requiresApproval": true,
  "message": "..."
}`}</pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Canvas ↔ Runtime (v1.0)</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`// Canvas -> Runtime
{
  "version": "1.0",
  "sessionId": "...",
  "uiPlanVersion": "1.0",
  "action": "preview | pause | cancel",
  "correlationId": "..."
}

// Runtime -> Canvas
{
  "version": "1.0",
  "sessionId": "...",
  "status": "ready | running | paused | completed | failed",
  "activeBlockId": "...",
  "progress": 0.42,
  "correlationId": "..."
}`}</pre>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Runtime ↔ UI Feedback (v1.0)</h2>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{`{
  "version": "1.0",
  "eventType": "runtime.status",
  "sessionId": "...",
  "correlationId": "...",
  "state": "idle | ready | running | paused | completed | failed",
  "userMessage": "...",
  "error": null
}`}</pre>
        </section>
      </main>
    </DocsContent>
  );
}
