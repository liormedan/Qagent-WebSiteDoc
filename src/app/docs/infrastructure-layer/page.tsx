import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { INFRASTRUCTURE_SCOPE_LINKS } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "Role of this layer spec.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Runtime foundation map.", href: "#infrastructure-layer-structure-diagram" },
  { title: "Details", subtitle: "Orientation entries.", href: "#details" },
  { title: "Core Specification", subtitle: "Behavior model.", href: "/docs/infrastructure-layer/core" },
  { title: "Contracts", subtitle: "Interface authority.", href: "/docs/infrastructure-layer/contracts" },
  { title: "Internal Modules", subtitle: "Implementation map.", href: "/docs/infrastructure-layer/modules" },
  { title: "System Integration", subtitle: "Cross-layer flows.", href: "/docs/infrastructure-layer/integration" },
  { title: "Related Docs", subtitle: "System map and neighbors.", href: "#related-docs" },
];

const overviewDetails = [
  {
    id: "infra-definition",
    title: "Definition",
    subtitle: "Runtime foundation of WaveQ",
    purpose: "State what the Infrastructure Layer is: the non-domain substrate on which all execution-capable services depend.",
    defines: [
      "Provides execution environment, reliability mechanisms, queueing, observability, and deployment/runtime surfaces.",
      "Makes scaling, recovery, and operational continuity possible without encoding product rules.",
      "Treats orchestration handoffs as opaque inputs at the transport boundary (see Contracts).",
    ],
    doesNotDefine: "Business workflows, transform math, or canonical record meaning.",
    href: "/docs/infrastructure-layer/core",
    linkLabel: "Core Specification",
  },
  {
    id: "infra-why-organized",
    title: "Why It Exists & How The Spec Is Organized",
    subtitle: "Entry point to the tree",
    purpose: "Explain why the layer is isolated in documentation and how readers should navigate the five pages.",
    defines: [
      "Exists so runtime, operations, and platform concerns stay separable from API, DSP, Data, and Client specifications.",
      "Core = behavior; Contracts = interfaces; Modules = implementation map; Integration = cross-layer flows—all at the same abstraction level as other layer specs.",
      "Readers should start here for intent, then drill Core → Contracts → Modules → Integration for build order.",
    ],
    doesNotDefine: "A second source of truth for API or DSP contracts.",
    href: "/docs/infrastructure-layer/contracts",
    linkLabel: "Contracts (this spec)",
  },
  {
    id: "infra-cross-layer-boundaries",
    title: "Cross-Layer Boundaries",
    subtitle: "Who owns what",
    purpose: "Anchor responsibility splits so infrastructure work does not leak into neighboring domains.",
    defines: [
      "API orchestrates business execution (admission, jobs, lifecycle policy); infrastructure runs what it is handed.",
      "DSP performs processing; infrastructure supplies dispatch, isolation, and resource envelopes only.",
      "Data owns canonical persistence rules; infrastructure supplies durable media, replication, and backup primitives.",
      "Client and user interaction logic remain outside this spec tree entirely.",
    ],
    doesNotDefine: "Alternate ownership for orchestration, transforms, or lineage.",
    href: "/docs/infrastructure-layer/integration",
    linkLabel: "System Integration (this spec)",
  },
  {
    id: "infra-separation",
    title: "Separation From Business Logic",
    subtitle: "Orthogonality",
    purpose: "Reiterate that reliability and operations features must not reinterpret domain intent.",
    defines: [
      "Retries, autoscale, and poison routing change delivery attempts—not plan semantics.",
      "Telemetry attributes identify jobs and services; they do not redefine payload fields.",
      "Rollouts change binaries and configs at the edge; they do not change API route contracts.",
    ],
    doesNotDefine: "Field-level API matrices, DSP codec behavior, or DDL.",
    href: "/docs/infrastructure-layer/modules",
    linkLabel: "Internal Modules (this spec)",
  },
] as const;

export default function InfrastructureLayerSpecOverviewPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Infrastructure Layer"
        description="Entry point to the Infrastructure Layer spec: the runtime foundation—execution environment, queueing, job support, observability, reliability, and deployment—so API, DSP, Data, and Client layers can run safely and consistently without mixing business logic into operations."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Infrastructure Layer (Spec) / Overview</p>

      <DocsScopeBlocks links={INFRASTRUCTURE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="What infrastructure is, why it exists, coverage boundaries, and how this spec tree is organized.">
          <DocsOverviewBlock
            intro="The Infrastructure Layer defines the runtime foundation of the WaveQ system. It provides the execution environment, reliability mechanisms, queueing model, observability support, and operational infrastructure required for other layers to run safely and consistently—without owning API business behavior, DSP transforms, canonical persistence, or user-facing flows."
            areasTitle="What this page covers"
            areas={[
              "Definition: infrastructure as platform and execution substrate, not domain logic.",
              "Coverage: runtime, queues, jobs, observability, deployment—at spec abstraction suitable for implementation planning.",
              "Non-coverage: anything that belongs to API orchestration, DSP processing, Data ownership, or Client UX.",
              "Organization: Overview (here) → Core (behavior) → Contracts (interfaces) → Modules (components) → Integration (flows).",
            ]}
            outOfScope="Endpoint catalogs, processor internals, schema authority, and UI specs—each remains under its owning layer."
            relatedBoundaries={[
              "API orchestrates business execution; DSP performs processing; Data owns canonical persistence; Infrastructure supports runtime operations.",
              "Neighbor docs remain authoritative; this tree must stay consistent with them without redefining them.",
            ]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">
            System map:{" "}
            <Link href="/docs/system/infrastructure-layer" className="font-medium text-[var(--accent)] hover:underline">
              /docs/system/infrastructure-layer
            </Link>
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="infrastructure-layer-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Structural map from runtime through deployment. Field-level shapes live under Contracts; cross-layer sequencing under Integration. This diagram is taxonomy, not a runtime sequence chart.
          </p>
          <DocsDiagram
            mode="structure"
            root="WaveQ Infrastructure"
            groups={[
              {
                title: "Execution substrate",
                items: ["Runtime Environment", "Queue System", "Job Execution"],
              },
              {
                title: "Persistence & operations",
                items: ["Storage Infrastructure", "Observability", "Deployment Layer"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...overviewDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/system/infrastructure-layer", title: "System map — Infrastructure", description: "Cross-layer positioning within the WaveQ system diagram." },
              { href: "/docs/api-server-layer/integration", title: "API Server — System Integration", description: "Orchestration and execution handoff boundaries." },
              { href: "/docs/dsp-layer/system-integration", title: "DSP — System Integration", description: "Processing in context of upstream triggers and hosting." },
              { href: "/docs/data-layer/system-view", title: "Data Layer — System View", description: "Canonical persistence; infrastructure supports storage operations only." },
              { href: "/docs/architecture/implementation-baseline", title: "Implementation Baseline", description: "Engineering baseline aligned with platform rollout." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
