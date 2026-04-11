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
  { title: "Overview", subtitle: "Canvas scope and ownership.", href: "#overview" },
  { title: "Canvas Diagram", subtitle: "Visual execution surface flow.", href: "#canvas-diagram" },
  { title: "Canvas Details", subtitle: "Responsibilities and rendering model.", href: "#canvas-details" },
  { title: "Related Docs", subtitle: "Canonical client references.", href: "#related-docs" },
];

const canvasDetails = [
  {
    id: "canvas-purpose",
    title: "Purpose",
    subtitle: "Visual execution interface",
    purpose: "Define Canvas UI as the client visual execution surface driven by structured UI plans.",
    defines: [
      "Provide visual execution representation for client workflows.",
      "Render dynamic UI driven by structured outputs from QAgent/UAgent.",
      "Keep visual pipeline understandable and actionable for users.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Planning or execution lifecycle ownership.",
    href: "/docs/client/canvas-ui",
    linkLabel: "Canonical page",
  },
  {
    id: "canvas-role-flow",
    title: "Role in the System / Interaction Flow",
    subtitle: "Plan-to-visual loop",
    purpose: "Define Canvas role as visual projection within the Client layer loop.",
    defines: [
      "Runs canonical loop: QAgent Plan -> Canvas UI -> User Interaction -> Client Runtime -> Visual Update.",
      "Translate structured plan outputs into visible interactive pipeline blocks.",
      "Reflect state transitions as visual runtime feedback without altering logic authority.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Intent interpretation or API job orchestration behavior.",
    href: "/docs/client/runtime",
    linkLabel: "Related runtime",
  },
  {
    id: "canvas-core-responsibilities",
    title: "Core Responsibilities",
    subtitle: "Rendering, interaction, synchronization",
    purpose: "Define Canvas UI responsibilities inside Client layer ownership boundaries.",
    defines: [
      "Render pipeline visualization including order and relationships.",
      "Render dynamic Gen UI from QAgent output while honoring uiPlan structure.",
      "Project execution states visually across idle/running/completed/failure modes.",
      "Allow user interaction with approved controls and selected pipeline blocks.",
      "Synchronize visuals with runtime feedback loop outcomes.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Business decision logic ownership.",
    href: "/docs/client",
    linkLabel: "Client overview",
  },
  {
    id: "canvas-boundaries",
    title: "Boundaries",
    subtitle: "Non-ownership constraints",
    purpose: "Define what Canvas UI must not own.",
    defines: [
      "Does not build execution plans.",
      "Does not interpret user intent.",
      "Does not execute DSP/processing logic.",
      "Does not manage queue-backed job execution.",
      "Acts as visualization/interaction surface only.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "QAgent planning and API lifecycle execution ownership.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "canvas-qagent-interaction",
    title: "Interaction with QAgent",
    subtitle: "uiPlan-driven boundary",
    purpose: "Define how Canvas consumes QAgent outputs without taking planning authority.",
    defines: [
      "Receive structured plan context and uiPlan payloads from QAgent.",
      "Render from uiPlan rather than raw execution plan semantics.",
      "Update visuals by execution state while preserving plan ownership boundaries.",
      "Prevent direct rendering decisions from execution plan internals.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "QAgent internal orchestration implementation.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "canvas-ui-plan-schema",
    title: "UI Plan Schema / Rendering Model",
    subtitle: "Schema-driven rendering contract",
    purpose: "Define schema-level rendering model used by Canvas UI.",
    defines: [
      "Use canonical uiPlan root with version, layout, blocks, and metadata sections.",
      "Render layout regions and blocks deterministically from validated schema.",
      "Treat metadata/status as projection inputs for runtime visualization.",
      "Enforce rule: rendering is driven only by uiPlan contract state.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Schema authority replacement outside dedicated contract pages.",
    href: "/docs/client/ui-plan-contract",
    linkLabel: "Related contract",
  },
  {
    id: "canvas-block-types-constraints",
    title: "Block Types / Constraints",
    subtitle: "Allowed rendering primitives",
    purpose: "Define supported block categories and rendering constraints.",
    defines: [
      "Block families include effect, control, waveform, status, and action categories.",
      "No hardcoded UI rendering paths outside schema-driven rules.",
      "No execution-plan-coupled rendering branch logic.",
      "Canvas rendering remains decoupled from direct DSP runtime internals.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Execution control authority.",
    href: "/docs/client/ui-plan-contract",
    linkLabel: "Related contract",
  },
  {
    id: "canvas-design-principles",
    title: "Design Principles",
    subtitle: "Visual interaction quality rules",
    purpose: "Define visual design principles for Canvas UX consistency.",
    defines: [
      "Visual clarity for readable pipelines at a glance.",
      "Immediate feedback for state and interaction changes.",
      "Consistency with Chat/UI workflows across Client layer.",
      "Non-destructive interaction for state-changing actions.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Cross-layer policy authority.",
    href: "/docs/client/chat-ui",
    linkLabel: "Related section",
  },
  {
    id: "canvas-capabilities",
    title: "Capabilities",
    subtitle: "Visual/runtime feature surface",
    purpose: "Define major capabilities exposed by Canvas UI.",
    defines: [
      "Visual pipeline rendering.",
      "Waveform visualization.",
      "Real-time execution feedback projection.",
      "Interactive block selection controls.",
      "Execution-state-aware visual updates.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Intent and planning authority.",
    href: "/docs/client/runtime",
    linkLabel: "Related runtime",
  },
  {
    id: "canvas-connected-components",
    title: "Connected Components",
    subtitle: "Component and layer integrations",
    purpose: "Define connected components and layer boundaries for Canvas.",
    defines: [
      "Chat UI for command/intention context exchange.",
      "QAgent/UAgent for plan and uiPlan generation.",
      "Client Runtime for playback/status synchronization.",
      "Workspace UI for placement and navigation context.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Replacement of connected component ownership boundaries.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Related section",
  },
  {
    id: "canvas-future-extensions",
    title: "Future Extensions",
    subtitle: "Planned visual evolution",
    purpose: "Define future extension directions while preserving current ownership boundaries.",
    defines: [
      "Drag-and-drop pipeline editing.",
      "Real-time parameter tuning.",
      "Multi-track editing support.",
      "Visual automation curve tooling.",
      "Collaborative canvas workflows.",
      "[TEXT TBD – expand Canvas UI detail]",
    ],
    doesNotDefine: "Current canonical responsibilities and boundaries.",
    href: "/docs/client/canvas-ui",
    linkLabel: "Canonical page",
  },
] as const;

export default function ClientCanvasUiPage() {
  return (
    <DocsContent>
      <PageTitle title="Canvas UI" description="Canonical client page for visual execution surface ownership, schema-driven rendering, and runtime feedback projection." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Canvas UI</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Canvas UI is the visual execution surface in the Client layer that renders structured plans and runtime state into interactive visual workflows."
            areasTitle="Canvas UI areas"
            areas={[
              "Pipeline and waveform visual rendering.",
              "uiPlan-driven dynamic UI composition.",
              "Execution-state visual projection.",
              "User interaction controls for visual workflow handling.",
            ]}
            outOfScope="Intent/planning ownership and server-side execution lifecycle control."
            relatedBoundaries={[
              "Canvas UI = visual execution surface authority.",
              "QAgent = intent and plan generation authority.",
              "API Server = execution lifecycle authority.",
              "Client Runtime = local runtime feedback authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="canvas-diagram" title="Canvas Diagram" body={[]}>
          <DocsDiagram mode="flow" steps={["QAgent Plan", "Canvas UI", "User Interaction", "Client Runtime", "Visual Update"]} />
        </SectionBlock>

        <SectionBlock id="canvas-details" title="Canvas Details" body={[]}>
          <LayerSpecAccordion items={[...canvasDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "Client Layer = canonical parent page for client ownership boundaries.",
              "Chat UI = conversational interaction boundary.",
              "Client Runtime = local runtime feedback authority.",
              "QAgent Layer = intent/planning authority.",
              "UI Plan Contract = schema authority for canvas rendering payloads.",
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
