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
  { title: "Overview", subtitle: "Scope and layer role.", href: "#overview" },
  { title: "Chat UI Diagram", subtitle: "Conversation interaction flow.", href: "#chat-ui-diagram" },
  { title: "Chat UI Details", subtitle: "Responsibilities and boundaries.", href: "#chat-ui-details" },
  { title: "Related Docs", subtitle: "Canonical client cross-references.", href: "#related-docs" },
];

const chatDetails = [
  {
    id: "chat-purpose",
    title: "Purpose",
    subtitle: "Conversational interaction boundary",
    purpose: "Enable natural-language interaction for initiating, refining, and approving actions.",
    defines: [
      "Serves as the primary conversational interface for user intent.",
      "Provides structured conversational guidance for user actions.",
      "Keeps interaction understandable and controllable from chat context.",
    ],
    doesNotDefine: "Intent interpretation or execution planning semantics.",
    href: "/docs/client/chat-ui",
    linkLabel: "Canonical page",
  },
  {
    id: "chat-role-flow",
    title: "Role in the System / Interaction Flow",
    subtitle: "Entry point and exchange loop",
    purpose: "Define Chat UI as the entry point for user intent and the interaction loop with QAgent.",
    defines: [
      "Runs a client interaction loop: User Input -> Chat UI -> QAgent -> Response -> Chat UI -> User.",
      "Translates interaction into a structured conversational flow processable by QAgent.",
      "Maintains continuity between user actions and system responses in the chat timeline.",
    ],
    doesNotDefine: "Runtime job orchestration or API execution behavior.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "chat-core-responsibilities",
    title: "Core Responsibilities",
    subtitle: "Interaction, rendering, approvals, feedback",
    purpose: "Define concrete Chat UI responsibilities inside the Client layer.",
    defines: [
      "Handle user input, file attachments, and command-triggered actions.",
      "Render the conversation timeline clearly and consistently.",
      "Present approval requests and reflect approval state in real time.",
      "Expose relevant session/workflow context for interaction continuity.",
      "Display processing, waiting, and completed feedback states.",
    ],
    doesNotDefine: "Business decision logic ownership.",
    href: "/docs/client",
    linkLabel: "Client overview",
  },
  {
    id: "chat-boundaries",
    title: "Boundaries (Does Not Do)",
    subtitle: "Delegation boundaries",
    purpose: "Define what Chat UI explicitly does not own.",
    defines: [
      "Does not perform intent detection or request classification.",
      "Does not build execution plans.",
      "Does not dispatch API Server execution jobs.",
      "Delegates logic authority to QAgent and downstream execution layers.",
    ],
    doesNotDefine: "QAgent planning and API runtime ownership boundaries.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "chat-qagent-interaction",
    title: "Interaction with QAgent",
    subtitle: "Input/output contract behavior",
    purpose: "Define the Chat UI exchange boundary with QAgent.",
    defines: [
      "Sends structured message, file, and session context to QAgent.",
      "Receives structured responses including intent, plan, and approval requirements.",
      "Renders clarifications, plan summaries, approvals, and status updates from QAgent outputs.",
      "Reflects uiPlan-driven responses as part of the client conversation loop.",
    ],
    doesNotDefine: "QAgent internal decision pipeline implementation.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "chat-design-principles",
    title: "Design Principles",
    subtitle: "Interaction quality rules",
    purpose: "Define design principles for consistent chat experience.",
    defines: [
      "Conversational clarity: actions remain explainable in chat.",
      "Stateless UI, stateful system: UI reflects state without owning logic.",
      "Guided interaction: users are led through explicit steps.",
      "Immediate feedback: every action has visible response.",
    ],
    doesNotDefine: "Execution policy semantics.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Related section",
  },
  {
    id: "chat-capabilities",
    title: "Capabilities",
    subtitle: "User-facing features",
    purpose: "Define key capabilities exposed by Chat UI.",
    defines: [
      "Natural-language interaction.",
      "Approval-based workflow control.",
      "Session-aware conversation continuity.",
      "Real-time system feedback rendering.",
      "Structured AI communication boundary.",
    ],
    doesNotDefine: "Canvas visualization ownership.",
    href: "/docs/client/canvas-ui",
    linkLabel: "Related section",
  },
  {
    id: "chat-connected-components",
    title: "Connected Components",
    subtitle: "Layer connections",
    purpose: "Define connected components and their relationship to Chat UI.",
    defines: [
      "QAgent for intent and planning exchange.",
      "Canvas UI for visual execution representation.",
      "Client Runtime for state and execution feedback projection.",
    ],
    doesNotDefine: "Cross-layer ownership replacement.",
    href: "/docs/client/runtime",
    linkLabel: "Related section",
  },
  {
    id: "chat-future-extensions",
    title: "Future Extensions",
    subtitle: "Planned interaction evolution",
    purpose: "Define forward-compatible extension directions without changing current ownership.",
    defines: [
      "Voice-based interaction support.",
      "Multi-turn intelligent clarification support.",
      "Context-aware suggestions.",
      "Action shortcuts for common commands.",
    ],
    doesNotDefine: "Current canonical ownership boundaries.",
    href: "/docs/client/chat-ui",
    linkLabel: "Canonical page",
  },
] as const;

export default function ClientChatUiPage() {
  return (
    <DocsContent>
      <PageTitle title="Chat UI" description="Canonical client page for conversational interaction boundaries, approval presentation, and QAgent exchange behavior." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Chat UI</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Chat UI role, ownership scope, and conversational boundary summary."
        >
          <DocsOverviewBlock
            intro="Chat UI is the primary conversational interface of WaveQ and the entry point for user intent in the Client layer."
            areasTitle="Chat UI areas"
            areas={[
              "Natural-language user input and conversational interaction.",
              "Conversation timeline rendering and clarity.",
              "Approval request presentation and decision feedback.",
              "Session context projection and workflow continuity.",
              "Immediate processing/status response visibility.",
            ]}
            outOfScope="Intent classification, plan construction, and API execution orchestration."
            relatedBoundaries={[
              "Chat UI = interaction and conversation authority.",
              "QAgent = intent and planning authority.",
              "API Server = execution lifecycle authority.",
              "Canvas UI = visual execution representation authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="chat-ui-diagram" title="Chat UI Diagram" body={[]}>
          <DocsDiagram mode="flow" steps={["User Input", "Chat UI", "QAgent", "Structured Response", "Chat UI Rendering", "User Feedback"]} />
        </SectionBlock>

        <SectionBlock id="chat-ui-details" title="Chat UI Details" body={[]}>
          <LayerSpecAccordion items={[...chatDetails]} defaultOpenAll />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "Client Layer = canonical parent page for client ownership boundaries.",
              "QAgent Layer = intent and planning authority.",
              "Canvas UI = visual execution representation authority.",
              "Client Runtime = local runtime state and feedback authority.",
              "UI Plan Contract = schema authority for client-side rendering payloads.",
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
