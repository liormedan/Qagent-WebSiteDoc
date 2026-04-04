import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      <div className="flex flex-col items-start gap-8">
        <p className="text-sm font-bold tracking-widest text-[var(--accent)] uppercase">WaveQ Docs</p>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Engineering documentation for Q Agent and audio.dal
        </h1>
        <p className="max-w-3xl text-lg text-[var(--muted)]">
          Q is a planning and reasoning agent that resolves intent ambiguity, asks clarifications when needed, and
          generates deterministic DAL contracts for safe execution.
        </p>

        <ul className="list-disc space-y-2 ps-4">
          <li>Planner + reasoner + clarification loop before execution handoff</li>
          <li>Strict TypeScript contracts for intents, plans, safety, and DAL</li>
          <li>Design layer that maps spec directly to implementation phases</li>
        </ul>

        <div className="flex flex-col gap-3 md:flex-row">
          <Button asChild>
            <Link href="/docs">Open Docs</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/overview">Quick Start</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/architecture">Architecture</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs/api">API</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
