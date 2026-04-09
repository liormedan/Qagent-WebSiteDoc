import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { EndToEndSequenceDiagram } from "@/components/ui/EndToEndSequenceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { SystemArchitectureDiagram } from "@/components/ui/SystemArchitectureDiagram";
import { SYSTEM_DOC_SOURCE_OF_TRUTH, SYSTEM_EDGE_CASE_HANDLING, SYSTEM_ERROR_OWNERSHIP_MODEL, SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

const layerNavigationCards: Array<{
  order: number;
  title: string;
  href: string;
  summary: string;
  responsibilities: string[];
}> = [
  {
    order: 1,
    title: "Client Layer",
    href: "/docs/client",
    summary: "User-facing interaction layer and UI runtime.",
    responsibilities: [
      "Capture user input and interaction events.",
      "Render runtime progress and final outputs.",
      "Forward structured requests to QAgent.",
    ],
  },
  {
    order: 2,
    title: "QAgent Layer",
    href: "/docs/q-agent",
    summary: "Decision-making layer that builds execution plans.",
    responsibilities: [
      "Resolve intent and clarification requirements.",
      "Build execution handoff artifacts.",
      "Apply approval logic before API handoff.",
    ],
  },
  {
    order: 3,
    title: "API Server Layer",
    href: "/docs/api",
    summary: "Execution orchestration and job system.",
    responsibilities: [
      "Validate `/run` input contract.",
      "Create and manage queued jobs.",
      "Expose status and results through API endpoints.",
    ],
  },
  {
    order: 4,
    title: "DSP / Processing Layer",
    href: "/docs/dsp-layer",
    summary: "Processing and transformation layer for audio workloads.",
    responsibilities: [
      "Run signal processing and audio transformations.",
      "Support execution pipelines with processing primitives.",
      "Produce processed audio outputs.",
    ],
  },
  {
    order: 5,
    title: "Data Layer",
    href: "/docs/data-layer",
    summary: "Canonical storage and data model layer.",
    responsibilities: [
      "Store canonical records and artifacts.",
      "Maintain schema consistency.",
      "Track lineage and reference relationships.",
    ],
  },
  {
    order: 6,
    title: "Infrastructure Layer",
    href: "/docs/infrastructure-layer",
    summary: "Platform runtime and deployment support layer.",
    responsibilities: [
      "Provide hosting and runtime environment.",
      "Support scaling and deployment operations.",
      "Stabilize execution conditions for system services.",
    ],
  },
  {
    order: 7,
    title: "Auth & Security Layer",
    href: "/docs/auth-security",
    summary: "Identity, access, and isolation boundary layer.",
    responsibilities: [
      "Authenticate identities and session context.",
      "Authorize access to protected operations.",
      "Enforce isolation and boundary security rules.",
    ],
  },
];

export default function SystemPage() {
  return (
    <DocsContent>
      <PageTitle title="WaveQ System Structure" description="This page presents the full architecture of WaveQ as a unified system." />

      <section className="mt-4 space-y-3 rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4">
        <h2 className="text-lg font-semibold text-cyan-100">Start Exploring</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Link href="/docs/system" className="rounded-md border border-cyan-300/30 bg-slate-950/40 px-3 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-300/60 hover:underline">
            Understand the system
          </Link>
          <Link href="/docs/client" className="rounded-md border border-cyan-300/30 bg-slate-950/40 px-3 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-300/60 hover:underline">
            Go to Client Layer
          </Link>
          <Link href="/docs/q-agent" className="rounded-md border border-cyan-300/30 bg-slate-950/40 px-3 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-300/60 hover:underline">
            Go to QAgent Layer
          </Link>
          <Link href="/docs/api" className="rounded-md border border-cyan-300/30 bg-slate-950/40 px-3 py-2 text-sm font-medium text-cyan-100 hover:border-cyan-300/60 hover:underline">
            Go to API Server Layer
          </Link>
        </div>
      </section>

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock title="System Architecture Diagram" body={[]}>
          <SystemArchitectureDiagram />
        </SectionBlock>

        <section className="space-y-3 rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
          <h2 className="text-lg font-semibold text-slate-100">Layer Navigation</h2>
          <div className="space-y-3 text-sm text-[var(--muted)]">
            {layerNavigationCards.map((layer) => (
              <div key={layer.title} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="font-semibold text-slate-100">
                  {layer.order}. {layer.title}
                </p>
                <p className="mt-2">{layer.summary}</p>
                <div className="mt-2 border-l border-cyan-400/40 pl-3">
                  <p className="font-medium text-slate-200">What it does:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5">
                    {layer.responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <Link href={layer.href} className="mt-3 inline-block font-medium text-[var(--accent)] hover:underline">
                  Explore in detail
                </Link>
              </div>
            ))}
          </div>
        </section>

        <SectionBlock title="End-to-End Flow" body={["Cross-layer path from request to output."]}>
          <EndToEndSequenceDiagram />
          <Link href="/docs/system-flow" className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
            Open full cross-layer flow page
          </Link>
        </SectionBlock>

        <SectionBlock title="System Edge Case Handling" body={["Canonical system-level handling ownership and behavior for required edge conditions."]}>
          <div className="space-y-3">
            {SYSTEM_EDGE_CASE_HANDLING.map((item) => (
              <div key={item.edgeCase} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm">
                <p className="font-semibold text-slate-100">{item.edgeCase}</p>
                <p className="text-[var(--muted)]">Handling layer: {item.handlingLayer}</p>
                <p className="text-[var(--muted)]">System behavior: {item.systemBehavior}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="System Error Ownership Model" body={["Single canonical ownership table with no duplicate authority."]}>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">Error Type</th>
                  <th className="px-3 py-2 font-semibold">Owning Layer</th>
                </tr>
              </thead>
              <tbody>
                {SYSTEM_ERROR_OWNERSHIP_MODEL.map((row) => (
                  <tr key={row.errorType} className="border-t border-[var(--border)] text-slate-300">
                    <td className="px-3 py-2">{row.errorType}</td>
                    <td className="px-3 py-2">{row.owningLayer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock title="System Runtime Lifecycle (Canonical)" body={[SYSTEM_RUNTIME_LIFECYCLE]} />

        <section className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
          Source of truth: <span className="font-semibold">{SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          <br />
          {SYSTEM_DOC_SOURCE_OF_TRUTH.rule}
        </section>
      </div>
    </DocsContent>
  );
}

