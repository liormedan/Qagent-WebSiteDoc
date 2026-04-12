import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { CLIENT_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "State model scope and ownership.", href: "#overview" },
  { title: "State Model Diagram", subtitle: "State partitioning view.", href: "#state-model-diagram" },
  { title: "State Model Details", subtitle: "Stores, rules, and boundaries.", href: "#state-model-details" },
  { title: "Related Docs", subtitle: "Canonical client references.", href: "#related-docs" },
];

const details = [
  {
    id: "state-model-purpose",
    title: "Purpose",
    subtitle: "Client state model intent",
    purpose: "Define how state is partitioned and shared across Chat, Canvas, and Runtime in the Client Layer.",
    defines: [
      "Establish a consistent state model for client runtime behavior.",
      "Support synchronized UI/runtime projection across client surfaces.",
    ],
    doesNotDefine: "Cross-layer planning or server execution ownership.",
    href: "/docs/client/state-model",
    linkLabel: "Canonical page",
  },
  {
    id: "state-model-core-stores",
    title: "Core Stores",
    subtitle: "Primary client state partitions",
    purpose: "Define core stores used by Client Layer components.",
    defines: [
      "chatState",
      "canvasState",
      "audioState",
      "sessionState",
    ],
    doesNotDefine: "Global server-side state authority.",
    href: "/docs/client/state-ownership",
    linkLabel: "Related section",
  },
  {
    id: "state-model-partitioning",
    title: "State Partitioning Principle",
    subtitle: "Centralized model, scoped consumption",
    purpose: "Define partitioning principle for client state usage.",
    defines: [
      "State is centralized in client model but consumed by scoped surfaces.",
      "Each surface reads only the state required for its UX/runtime concerns.",
    ],
    doesNotDefine: "Single-component ownership of entire state graph.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Related section",
  },
  {
    id: "state-model-ownership-rule",
    title: "Ownership Rule",
    subtitle: "Ownership and mutation constraints",
    purpose: "Define ownership rule for mutation boundaries inside Client Layer.",
    defines: [
      "No single component owns the full state.",
      "State mutations follow explicit scoped ownership paths.",
    ],
    doesNotDefine: "Intent/planning ownership.",
    href: "/docs/client/state-ownership",
    linkLabel: "Related section",
  },
  {
    id: "state-model-boundaries",
    title: "Client Layer Boundaries",
    subtitle: "Cross-layer authority split",
    purpose: "Define Client state boundaries relative to adjacent layers.",
    defines: [
      "Client Layer owns local UI/runtime behavior and state projection.",
      "QAgent owns intent/planning decisions.",
      "API Server owns execution lifecycle state authority.",
    ],
    doesNotDefine: "Server-side orchestration or plan authority.",
    href: "/docs/client",
    linkLabel: "Client overview",
  },
] as const;

export default function ClientStateModelPage() {
  return (
    <DocsContent>
      <PageTitle title="Client State Model" description="Canonical client page for state partitioning, ownership rules, and client-layer state boundaries." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / State Model</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="State partitioning intent, ownership constraints, and client-layer boundary summary."
        >
          <DocsOverviewBlock
            intro="Client State Model defines how UI/runtime state is partitioned and consumed across Chat, Canvas, and Runtime while preserving layer ownership boundaries."
            areasTitle="State model areas"
            areas={[
              "Core state partitions for chat, canvas, audio, and session scopes.",
              "Ownership and mutation rules for deterministic client behavior.",
              "Cross-surface state consumption boundaries.",
            ]}
            outOfScope="QAgent planning state authority and API execution lifecycle ownership."
            relatedBoundaries={[
              "Client Layer = local UI/runtime behavior and state projection authority.",
              "QAgent = intent/planning authority.",
              "API Server = execution lifecycle authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="state-model-diagram" title="State Model Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client State Model"
            groups={[
              { title: "Core Stores", items: ["chatState", "canvasState", "audioState", "sessionState"] },
              { title: "Consumption Surfaces", items: ["Chat UI", "Canvas UI", "Client Runtime", "Workspace UI"] },
              { title: "Boundary Rules", items: ["Scoped ownership", "Deterministic mutation", "No full-state single owner"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="state-model-details" title="State Model Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "Client Layer = canonical parent page for client ownership boundaries.",
              "State Ownership = explicit ownership matrix and writer/reader constraints.",
              "Event Contract = event-driven mutation boundary rules.",
              "QAgent Layer = intent/planning ownership authority.",
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
