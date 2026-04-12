import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { CLIENT_LAYER_CANONICAL_NAME, CLIENT_LAYER_DOC_SOURCE_OF_TRUTH } from "@/lib/client-canonical";

import { CLIENT_LAYER_HUB_LINKS } from "@/lib/docs-scope-links";
const clientAreas = [
  "user interaction surfaces",
  "runtime status/result projection",
  "UI state and event ownership",
  "handoff signaling to QAgent",
];

const relatedBoundaries = [
  "Client Layer = user interaction and UI state authority",
  "QAgent Layer = intent and planning authority",
  "API Server Layer = job lifecycle and execution authority",
  "Versioning = canonical output history authority",
];

const inPageLinks = [
  { title: "Overview", subtitle: "Scope and ownership boundaries.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "UI surfaces and runtime flow.", href: "#layer-structure-diagram" },
  { title: "Layer Details", subtitle: "Responsibilities and boundaries.", href: "#layer-details" },
  { title: "Related Docs", subtitle: "Canonical cross-layer references.", href: "#related-docs" },
];

const clientDetails = [
  {
    id: "interaction-surfaces",
    title: "Interaction Surfaces",
    subtitle: "Chat, Canvas, Workspace",
    purpose: "Define user-facing interaction boundaries.",
    defines: [
      "chat and prompt interaction",
      "canvas workspace interaction",
      "workspace navigation and control events",
    ],
    doesNotDefine: "intent policy decisions.",
    href: "/docs/client/chat-ui",
    linkLabel: "Related section",
  },
  {
    id: "runtime-projection",
    title: "Runtime Projection",
    subtitle: "Status and result rendering",
    purpose: "Define projection of progress and outcomes to UI.",
    defines: [
      "status rendering",
      "result projection",
      "error display boundaries",
    ],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/client/runtime",
    linkLabel: "Related section",
  },
  {
    id: "state-ownership",
    title: "State Ownership",
    subtitle: "Client-owned state boundary",
    purpose: "Define UI state ownership within Client Layer.",
    defines: [
      "local UI state",
      "interaction event state",
      "view state transitions",
    ],
    doesNotDefine: "global API job status authority.",
    href: "/docs/client/state-ownership",
    linkLabel: "Related section",
  },
  {
    id: "qagent-handoff",
    title: "QAgent Handoff",
    subtitle: "Structured request emission",
    purpose: "Define how Client emits structured requests into QAgent.",
    defines: [
      "request event emission",
      "payload shaping for QAgent",
      "handoff trigger boundaries",
    ],
    doesNotDefine: "QAgent planning semantics.",
    href: "/docs/q-agent",
    linkLabel: "Canonical page",
  },
] as const;

const relatedDocs = [
  "Client Layer = user interaction and UI runtime authority.",
  "QAgent Layer = intent and planning authority.",
  "API Server Layer = execution and job lifecycle authority.",
  "System Flow = cross-layer transition authority.",
];

export default function ClientOverviewPage() {
  return (
    <DocsContent>
      <PageTitle title={CLIENT_LAYER_CANONICAL_NAME} description="Canonical layer page for user interaction boundaries, UI runtime ownership, and request handoff semantics." />

      <DocsScopeBlocks links={CLIENT_LAYER_HUB_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Client Layer ownership summary, scope boundaries, and cross-layer alignment."
        >
          <DocsOverviewBlock
            intro="Client Layer is the user-facing boundary that captures interaction, projects runtime state, and presents final outputs."
            areasTitle="Client areas"
            areas={clientAreas}
            outOfScope="intent interpretation and API runtime orchestration decisions."
            relatedBoundaries={relatedBoundaries}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="layer-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram mode="flow" steps={["User", "Client Layer", "QAgent Layer", "API Server Layer", "Result Projection"]} />
        </SectionBlock>

        <SectionBlock id="layer-details" title="Layer Details" body={[]}>
          <LayerSpecAccordion items={[...clientDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={relatedDocs} />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{CLIENT_LAYER_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
