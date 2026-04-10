import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const quickActions = [
  { label: "Start with System Map", href: "/docs/system" },
  { label: "Understand the UI (Client)", href: "/docs/client" },
  { label: "Understand the Brain (QAgent)", href: "/docs/q-agent" },
  { label: "Understand Execution (API Server)", href: "/docs/api" },
];

const readingPath = [
  { step: "System", href: "/docs/system", description: "Understand the complete system map, major layers, and cross-layer flow." },
  { step: "Client", href: "/docs/client", description: "Understand the user-facing interface, interaction model, and UI boundaries." },
  { step: "QAgent", href: "/docs/q-agent", description: "Understand intent interpretation, planning, clarification, and approval logic." },
  { step: "API", href: "/docs/api", description: "Understand execution contracts, orchestration flow, and runtime boundaries." },
  { step: "DSP", href: "/docs/dsp-layer", description: "Understand processing engine structure, transformation flow, and DSP integration boundaries." },
];

export default function DocsIndexPage() {
  return (
    <DocsContent>
      <PageTitle
        title="WaveQ"
        description="WaveQ is an AI-powered audio workflow system that connects user intent to audio execution."
      />

      <div className="flex flex-col gap-5">
        <SectionBlock title="Quick Actions" body={[]}>
          <div className="grid gap-3 md:grid-cols-2">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-md border border-[var(--border)] bg-slate-950/30 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Recommended Reading Path" body={[]}>
          <p className="text-sm text-[var(--muted)]">
            This path gives new readers the quickest way to understand WaveQ from high-level system structure to runtime execution.
          </p>
          <ul className="space-y-3 text-sm text-[var(--muted)]">
            {readingPath.map((item) => (
              <li key={item.href} className="rounded-md border border-[var(--border)] bg-slate-950/30 px-3 py-2">
                <Link href={item.href} className="font-semibold text-[var(--accent)] hover:underline">
                  {item.step}
                </Link>
                <span>: {item.description}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/docs/system"
            className="inline-flex w-fit rounded-md border border-cyan-400/40 bg-cyan-500/10 px-3 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:border-cyan-300/70 hover:bg-cyan-500/20"
          >
            Start with System
          </Link>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
