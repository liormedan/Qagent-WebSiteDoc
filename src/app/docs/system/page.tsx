import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { SYSTEM_DOC_SOURCE_OF_TRUTH, SYSTEM_EDGE_CASE_HANDLING, SYSTEM_ERROR_OWNERSHIP_MODEL, SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

const systemTree = `WaveQ
|- Primary Layers
|  |- Client Layer
|  |- QAgent Layer
|  |- API Server Layer
|- Supporting Layers
|  |- DSP / Processing Layer
|  |- Data Layer
|  |- Infrastructure Layer
|  |- Auth & Security Layer
|- End-to-End Flow (cross-layer flow)`;

const primaryLayers: Array<{ title: string; href: string; description: string }> = [
  { title: "Client Layer", href: "/docs/client", description: "User-facing surfaces, interaction patterns, and runtime UX." },
  { title: "QAgent Layer", href: "/docs/q-agent", description: "Core agentic orchestration and layer-level logic." },
  { title: "API Server Layer", href: "/docs/api", description: "Server-side request, orchestration, execution, and version APIs." },
];

const supportingLayers: Array<{ title: string; href: string; description: string }> = [
  { title: "DSP / Processing Layer", href: "/docs/dsp-layer", description: "Audio processing and execution-oriented compute paths." },
  { title: "Data Layer", href: "/docs/data-layer", description: "Schemas, lineage, records, and persistence-facing structures." },
  { title: "Infrastructure Layer", href: "/docs/infrastructure-layer", description: "Runtime platform, deployment, and implementation baseline surfaces." },
  { title: "Auth & Security Layer", href: "/docs/auth-security", description: "Isolation, access boundaries, and protection controls." },
];

const crossLayerFlow = {
  title: "End-to-End Flow (cross-layer flow)",
  href: "/docs/system-flow",
  description: "High-level cross-layer path from request to final output.",
};

const layerNavigationCards: Array<{
  order: number;
  title: string;
  href: string;
  explanation: string[];
  responsibilities: string[];
}> = [
  {
    order: 1,
    title: "Client Layer",
    href: "/docs/client",
    explanation: [
      "Client Layer is the user-facing runtime where users interact with chat, canvas, and workspace surfaces.",
      "It translates user actions into structured requests and presents status/result updates coming from downstream layers.",
    ],
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
    explanation: [
      "QAgent Layer is the decision and planning center of WaveQ.",
      "It interprets intent, builds execution-ready plans, and enforces approval gates before execution handoff.",
    ],
    responsibilities: [
      "Resolve intent and clarification requirements.",
      "Build plan and execution handoff artifacts.",
      "Apply approval logic before API handoff.",
    ],
  },
  {
    order: 3,
    title: "API Server Layer",
    href: "/docs/api",
    explanation: [
      "API Server Layer is the orchestration boundary for execution requests from QAgent.",
      "It validates requests, manages asynchronous job pipelines, and publishes status/results.",
    ],
    responsibilities: [
      "Validate `/run` input contract.",
      "Create and manage queued jobs.",
      "Expose status/results through API endpoints.",
    ],
  },
  {
    order: 4,
    title: "DSP / Processing Layer",
    href: "/docs/dsp-layer",
    explanation: [
      "DSP / Processing Layer performs audio transformations and signal-level operations during execution.",
      "It provides specialized processing capabilities used by execution pipelines.",
    ],
    responsibilities: [
      "Run signal processing and audio transformations.",
      "Support execution engine with processing primitives.",
      "Produce processed audio outputs.",
    ],
  },
  {
    order: 5,
    title: "Data Layer",
    href: "/docs/data-layer",
    explanation: [
      "Data Layer provides canonical storage, schema governance, and lineage traceability for system entities.",
      "It preserves structured artifacts and historical references across system runs.",
    ],
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
    explanation: [
      "Infrastructure Layer supplies the runtime environment that hosts and scales WaveQ services.",
      "It provides platform-level support for reliability, deployment, and operational execution.",
    ],
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
    explanation: [
      "Auth & Security Layer enforces identity, access control, and isolation boundaries.",
      "It protects system resources and ensures secure interaction across layers.",
    ],
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
      <p className="text-sm text-emerald-300">Status: Ready for Implementation</p>

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

      <section className="mt-4 space-y-3 rounded-md border border-[var(--border)] bg-slate-950/30 p-4">
        <h2 className="text-lg font-semibold text-slate-100">Layer Navigation</h2>
        <div className="space-y-3 text-sm text-[var(--muted)]">
          {layerNavigationCards.map((layer) => (
            <div key={layer.title} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
              <p className="font-semibold text-slate-100">
                {layer.order}. {layer.title}
              </p>
              <div className="mt-2 space-y-1">
                {layer.explanation.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
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

      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Purpose"
          body={["System page is the canonical map of WaveQ layers, ownership boundaries, and cross-layer references."]}
          collapsible
        />

        <SectionBlock
          title="Responsibilities"
          body={[
            "Responsible for presenting the canonical layer model.",
            "Handles system-level edge-case, error ownership, and lifecycle declarations.",
            "Owns the single system-map entry authority.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Non-Responsibilities"
          body={[
            "Does NOT redefine internal module semantics of layer pages.",
            "Does NOT duplicate canonical contract schemas from dedicated contract pages.",
            "Does NOT alter API or QAgent runtime ownership boundaries.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Position in System"
          body={[
            "Before: documentation navigation entry selection.",
            "After: layer-specific canonical pages and flow references.",
          ]}
          collapsible
        >
          <p className="text-sm text-[var(--muted)]">
            Cross-layer graph: <Link href="/docs/client" className="text-[var(--accent)] hover:underline">Client Layer</Link>{" -> "}
            <Link href="/docs/q-agent" className="text-[var(--accent)] hover:underline">QAgent</Link>{" -> "}
            <Link href="/docs/api" className="text-[var(--accent)] hover:underline">API Server Layer</Link>{" -> "}
            <Link href="/docs/api/execution" className="text-[var(--accent)] hover:underline">Execution Layer</Link>{" -> "}
            <Link href="/docs/api/versioning" className="text-[var(--accent)] hover:underline">Versioning</Link>.
          </p>
        </SectionBlock>

        <SectionBlock
          title="Inputs"
          body={[
            "Receives canonical references from layer source-of-truth pages.",
            "Receives system-level lifecycle, error, and edge-case declarations from canonical constants.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Outputs"
          body={[
            "Produces the unified layer map and canonical navigation links.",
            "Produces authoritative system-level definitions for lifecycle, edge cases, and error ownership.",
          ]}
          collapsible
        />

        <SectionBlock
          title="Boundaries"
          body={[
            "System page MUST NOT redefine layer-internal flows.",
            "Layer pages remain authoritative for their own detailed module structure.",
            "System page references, but does not duplicate, canonical contracts.",
          ]}
          collapsible
        />

        <SectionBlock title="Canonical Flow" body={[SYSTEM_RUNTIME_LIFECYCLE]} collapsible />

        <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs leading-5 text-cyan-100 md:text-sm">
          Primary entry point: <span className="font-semibold">/docs/system</span>
          <br />
          Use this page as the single system map.
        </section>

        <section className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
          Canonical system-level definitions are locked here.
          <br />
          Source of truth: <span className="font-semibold">{SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </section>

        <SectionBlock title="System Tree" body={[]} collapsible>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{systemTree}</pre>
        </SectionBlock>

        <SectionBlock title="Primary Layers" body={["Client, QAgent, and API Server are the primary system layers."]} collapsible>
          <div className="space-y-3">
            {primaryLayers.map((section) => (
              <div key={section.title} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="font-semibold text-slate-100">{section.title}</p>
                <p className="text-sm text-[var(--muted)]">{section.description}</p>
                <Link href={section.href} className="mt-2 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                  Open Layer Entry
                </Link>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="Supporting Layers" body={["DSP, Data, Infrastructure, and Auth & Security support the primary layers."]} collapsible>
          <div className="space-y-3">
            {supportingLayers.map((section) => (
              <div key={section.title} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
                <p className="font-semibold text-slate-100">{section.title}</p>
                <p className="text-sm text-[var(--muted)]">{section.description}</p>
                <Link href={section.href} className="mt-2 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                  Open Layer Entry
                </Link>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title={crossLayerFlow.title} body={[crossLayerFlow.description]} collapsible>
          <Link href={crossLayerFlow.href} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
            Open Cross-Layer Flow Entry
          </Link>
        </SectionBlock>

        <SectionBlock title="System Edge Case Handling" body={["Canonical system-level handling ownership and behavior for required edge conditions."]} collapsible>
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

        <SectionBlock title="System Error Ownership Model" body={["Single canonical ownership table with no duplicate authority."]} collapsible>
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

        <SectionBlock title="System Runtime Lifecycle (Canonical)" body={["Defined once here and referenced elsewhere without redefinition."]} collapsible>
          <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{SYSTEM_RUNTIME_LIFECYCLE}</p>
        </SectionBlock>

        <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 p-4 text-sm text-cyan-100">
          <h2 className="text-base font-semibold">End-to-End Flow</h2>
          <p className="mt-1">Cross-layer path from request to output.</p>
          <Link href="/docs/system-flow" className="mt-2 inline-block font-medium text-cyan-100 underline hover:text-cyan-200">
            View full flow
          </Link>
        </section>
      </div>
    </DocsContent>
  );
}
