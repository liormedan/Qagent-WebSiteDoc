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
const canonicalFlow = "User types -> Chat -> QAgent -> uiPlan -> Canvas -> Runtime -> Audio -> UI update";

const inPageLinks = [
  { title: "Overview", subtitle: "Event flow scope and purpose.", href: "#overview" },
  { title: "Event Flow Diagram", subtitle: "Canonical sequence view.", href: "#event-flow-diagram" },
  { title: "Event Flow Details", subtitle: "Sequence, handoff, and debug use.", href: "#event-flow-details" },
  { title: "Related Docs", subtitle: "Canonical client references.", href: "#related-docs" },
];

const details = [
  {
    id: "event-flow-canonical",
    title: "Canonical Flow",
    subtitle: "Reference sequence",
    purpose: "Define the canonical client-side event flow reference sequence.",
    defines: [
      canonicalFlow,
      "Use this sequence as the baseline reference for client debugging and integration behavior.",
      "[TEXT TBD – expand Client Event Flow detail]",
    ],
    doesNotDefine: "Execution lifecycle ownership.",
    href: "/docs/client/event-flow",
    linkLabel: "Canonical page",
  },
  {
    id: "event-flow-sequence",
    title: "Interaction Sequence",
    subtitle: "User-to-UI update transition path",
    purpose: "Define stage-to-stage interaction ordering in client event flow.",
    defines: [
      "User interaction originates in Chat UI.",
      "QAgent returns structured outputs that drive uiPlan and downstream client behavior.",
      "Canvas and Runtime project event-driven state updates back to UI.",
      "[TEXT TBD – expand Client Event Flow detail]",
    ],
    doesNotDefine: "Intent decision internals.",
    href: "/docs/client/chat-ui",
    linkLabel: "Related section",
  },
  {
    id: "event-flow-runtime-handoff",
    title: "Client Runtime Handoff",
    subtitle: "Canvas to runtime execution projection",
    purpose: "Define handoff expectations between visual surfaces and local runtime loop.",
    defines: [
      "uiPlan-driven events reach Canvas before runtime status projection.",
      "Runtime transitions drive audio/playback and UI feedback visibility.",
      "[TEXT TBD – expand Client Event Flow detail]",
    ],
    doesNotDefine: "API queue orchestration.",
    href: "/docs/client/runtime",
    linkLabel: "Related runtime",
  },
  {
    id: "event-flow-ui-update-loop",
    title: "UI Update Loop",
    subtitle: "State-to-UI projection cycle",
    purpose: "Define UI update cycle after runtime and event transitions.",
    defines: [
      "Client updates visible UI from runtime/event state outputs.",
      "State projection remains deterministic for user feedback continuity.",
      "[TEXT TBD – expand Client Event Flow detail]",
    ],
    doesNotDefine: "Server execution ownership.",
    href: "/docs/client/state-model",
    linkLabel: "Related model",
  },
  {
    id: "event-flow-debugging",
    title: "Debugging Use",
    subtitle: "Operational reference",
    purpose: "Define how canonical flow is used for debugging and integration validation.",
    defines: [
      "Use canonical sequence to trace where event or state drift occurs.",
      "Validate stage ordering against expected client transition path.",
      "[TEXT TBD – expand Client Event Flow detail]",
    ],
    doesNotDefine: "Formal conformance test execution policy.",
    href: "/docs/client/conformance-tests",
    linkLabel: "Related tests",
  },
] as const;

export default function ClientEventFlowPage() {
  return (
    <DocsContent>
      <PageTitle title="Client Event Flow" description="Canonical client page for event sequence, runtime handoff, and UI update loop behavior." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Event Flow</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Canonical event sequence and client-side handoff/update loop summary."
        >
          <DocsOverviewBlock
            intro="Client Event Flow defines the canonical event transition path across Chat, QAgent outputs, uiPlan projection, Canvas, Runtime, and UI updates."
            areasTitle="Event flow areas"
            areas={[
              "Canonical event sequence definition.",
              "Runtime handoff and projection boundaries.",
              "UI update loop and debugging reference behavior.",
            ]}
            outOfScope="Intent/planning authority and API execution lifecycle ownership."
            relatedBoundaries={[
              "Client Layer = local event handling and UI/runtime projection authority.",
              "QAgent = intent/planning authority.",
              "API Server = execution lifecycle authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="event-flow-diagram" title="Event Flow Diagram" body={[]}>
          <DocsDiagram mode="flow" steps={["User types", "Chat", "QAgent", "uiPlan", "Canvas", "Runtime", "Audio", "UI update"]} />
        </SectionBlock>

        <SectionBlock id="event-flow-details" title="Event Flow Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "Client Layer = canonical parent page for client ownership boundaries.",
              "Event Contract = canonical event shape and ordering rules.",
              "Client Runtime = runtime lifecycle projection authority.",
              "QAgent Layer = intent/planning authority.",
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
