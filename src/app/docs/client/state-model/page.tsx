import { DocsContent } from "@/components/layout/DocsContent";

export default function ClientStateModelPage() {
  return (
    <DocsContent>
      <main className="space-y-6">
        <section className="space-y-2">
          <h1 className="text-3xl font-semibold">Client State Model</h1>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Purpose</h2>
          <p className="text-[var(--muted)]">Define how state is shared across Chat, Canvas, and Runtime.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Core Stores</h2>
          <ul className="list-disc space-y-1 pl-6 text-[var(--muted)]">
            <li>chatState</li>
            <li>canvasState</li>
            <li>audioState</li>
            <li>sessionState</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Principle</h2>
          <p className="text-[var(--muted)]">State is centralized but consumed per layer.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Rule</h2>
          <p className="text-[var(--muted)]">No component owns the full state.</p>
        </section>
      </main>
    </DocsContent>
  );
}
