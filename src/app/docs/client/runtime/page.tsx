import { DocsContent } from "@/components/layout/DocsContent";
import { ClientRuntimeFlowDiagram } from "@/components/ui/ClientRuntimeFlowDiagram";

export default function ClientRuntimePage() {
  return (
    <DocsContent>
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold">Client Runtime</h1>
        <p className="text-base text-[var(--muted)]">
          Client runtime manages local execution behavior: audio preview engine, canvas state, UI state handling, and authenticated session continuity.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Role in System</h2>
        <ClientRuntimeFlowDiagram />
        <p className="text-[var(--muted)]">
          Power responsive local interactions and short-cycle feedback while synchronizing authoritative state with QAgent and API Server systems.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Responsibilities</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Run audio preview interactions for immediate feedback</li>
          <li>Manage client-side canvas and UI state transitions</li>
          <li>Handle auth session state needed by user workflows</li>
          <li>Support resilient interaction behavior during async updates</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Boundaries (Does Not Do)</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Does not replace API Server processing or exports</li>
          <li>Does not own queue-backed execution guarantees</li>
          <li>Does not determine business intent or approval policy</li>
          <li>Does not perform server-side orchestration</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Interaction with QAgent</h2>
        <p className="text-[var(--muted)]">
          Uses QAgent outputs to update local runtime state and feeds user actions/runtime events back into QAgent as part of the conversational orchestration loop.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Integration Note</h2>
        <p className="text-[var(--muted)]">
          Runtime executes preview based on the current <span className="font-mono">uiPlan</span> and reflects execution state back to Canvas.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Debug Mode</h2>
        <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
          <li>Show raw uiPlan</li>
          <li>Show execution state</li>
          <li>Highlight active blocks</li>
        </ul>
      </section>
    </main>
    </DocsContent>
  );
}
