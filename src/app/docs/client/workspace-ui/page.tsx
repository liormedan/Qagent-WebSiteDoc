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
  { title: "Overview", subtitle: "Workspace scope and ownership.", href: "#overview" },
  { title: "Workspace Diagram", subtitle: "Structural coordination flow.", href: "#workspace-diagram" },
  { title: "Workspace Details", subtitle: "Responsibilities and references.", href: "#workspace-details" },
  { title: "Related Docs", subtitle: "Canonical client cross-references.", href: "#related-docs" },
];

const workspaceDetails = [
  {
    id: "workspace-purpose",
    title: "Purpose",
    subtitle: "Structural and organizational frontend layer",
    purpose: "Define Workspace UI as the structural and organizational layer of the Client frontend.",
    defines: [
      "Organize how Chat UI, Canvas UI, and Runtime are arranged and accessed.",
      "Provide coherent navigation structure for multi-surface interaction.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Intent/planning or server execution ownership.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Canonical page",
  },
  {
    id: "workspace-role-flow",
    title: "Role in the System / Interaction Flow",
    subtitle: "Container and coordination flow",
    purpose: "Define Workspace UI as the container/coordinator inside the Client layer.",
    defines: [
      "Run canonical flow: User Navigation -> Workspace UI -> Chat UI / Canvas UI / Runtime -> System Response -> Workspace Update.",
      "Maintain coherent and navigable environment across client surfaces.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Cross-layer execution orchestration.",
    href: "/docs/client",
    linkLabel: "Client overview",
  },
  {
    id: "workspace-responsibilities",
    title: "Core Responsibilities",
    subtitle: "Layout, navigation, session continuity",
    purpose: "Define concrete Workspace UI ownership responsibilities.",
    defines: [
      "Layout composition for Chat, Canvas, and navigation regions.",
      "Navigation management across major client surfaces.",
      "Session continuity across views.",
      "Global state awareness for active project/file/runtime context.",
      "System coordination between Chat UI, Canvas UI, and Runtime.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Business logic ownership.",
    href: "/docs/client/runtime",
    linkLabel: "Related runtime",
  },
  {
    id: "workspace-boundaries",
    title: "Boundaries",
    subtitle: "Non-ownership constraints",
    purpose: "Define what Workspace UI explicitly does not own.",
    defines: [
      "Does not interpret user intent.",
      "Does not generate dynamic UI (Canvas/uiPlan responsibility).",
      "Does not execute processing logic.",
      "Does not manage API Server jobs.",
      "Does not contain business logic or DSP behavior.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "QAgent, API Server, and DSP ownership boundaries.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "workspace-connected-components",
    title: "Connected Components",
    subtitle: "Surface integration matrix",
    purpose: "Define connected components coordinated by Workspace UI.",
    defines: [
      "Chat UI for interaction panel and conversation flow anchoring.",
      "Canvas UI for visual execution environment hosting.",
      "Client Runtime for global execution status and state reflection.",
      "QAgent indirectly through structured data-flow boundaries.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Ownership replacement for connected components.",
    href: "/docs/client/chat-ui",
    linkLabel: "Related section",
  },
  {
    id: "workspace-design-principles",
    title: "Design Principles",
    subtitle: "Workspace UX quality rules",
    purpose: "Define principles that keep Workspace behavior coherent.",
    defines: [
      "Structural clarity with predictable layout behavior.",
      "Minimal interaction friction for navigation between views.",
      "Persistent context across view transitions.",
      "Consistent behavior across all client surfaces.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Execution policy semantics.",
    href: "/docs/client",
    linkLabel: "Client overview",
  },
  {
    id: "workspace-capabilities",
    title: "Capabilities",
    subtitle: "Operational feature surface",
    purpose: "Define key capabilities exposed by Workspace UI.",
    defines: [
      "Multi-view navigation support.",
      "Session switching behavior.",
      "Layout orchestration across surfaces.",
      "Global state coordination.",
      "Unified interaction environment.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Intent/planning authority.",
    href: "/docs/client/state-model",
    linkLabel: "Related section",
  },
  {
    id: "workspace-mental-model",
    title: "Mental Model",
    subtitle: "Operating environment metaphor",
    purpose: "Define Workspace UI mental model for documentation consistency.",
    defines: [
      "Workspace UI acts as the operating environment of the Client layer.",
      "Conversations, visual workflows, and execution control coexist in one structural frame.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Plan construction ownership.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Canonical page",
  },
  {
    id: "workspace-other-layers",
    title: "Interaction with Other Layers",
    subtitle: "Cross-component coordination behavior",
    purpose: "Define Workspace-level interactions with adjacent client components.",
    defines: [
      "With Chat UI: hosts conversation panel and user action entrypoint.",
      "With Canvas UI: hosts visual execution surface and synchronization context.",
      "With Client Runtime: reflects runtime state globally across workspace surfaces.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Cross-layer authority redefinition.",
    href: "/docs/client/runtime",
    linkLabel: "Related runtime",
  },
  {
    id: "workspace-integration-note",
    title: "Integration Note",
    subtitle: "Unified interaction environment",
    purpose: "Define integration note for Chat/Canvas/Runtime coordination.",
    defines: [
      "Coordinate Chat, Canvas, and Runtime into one unified interaction environment.",
      "Preserve consistent data-flow expectations across client surfaces.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Schema or API contract ownership.",
    href: "/docs/client/contracts",
    linkLabel: "Related contracts",
  },
  {
    id: "workspace-future-extensions",
    title: "Future Extensions",
    subtitle: "Planned workspace evolution",
    purpose: "Define future extension directions while keeping current ownership unchanged.",
    defines: [
      "Multi-project workspace support.",
      "Collaborative session features.",
      "Workspace presets.",
      "Custom layout profiles.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Current canonical responsibilities.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Canonical page",
  },
  {
    id: "workspace-implementation-note",
    title: "Implementation Note",
    subtitle: "Execution boundaries in implementation",
    purpose: "Define implementation guardrails for Workspace UI code.",
    defines: [
      "No business logic embedding in workspace layer.",
      "No Gen UI generation in workspace orchestration surface.",
      "No DSP behavior ownership in workspace module.",
      "Focus implementation on layout, navigation, and orchestration glue.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Behavioral ownership of other client modules.",
    href: "/docs/client/system-validation",
    linkLabel: "Related validation",
  },
  {
    id: "workspace-frontend-reference",
    title: "Frontend Structure Reference",
    subtitle: "Workspace-related project hierarchy map",
    purpose: "Define the frontend structure reference relevant to Workspace UI organizational ownership.",
    defines: [
      "Preserve Workspace-related frontend hierarchy as documentation reference.",
      "Use project tree as structural context for workspace ownership and integration boundaries.",
      "[TEXT TBD – expand Workspace UI detail]",
    ],
    doesNotDefine: "Canonical build/runtime topology guarantees.",
    href: "/docs/client/workspace-ui",
    linkLabel: "Canonical page",
  },
] as const;

const frontendProjectTree = `WaveQ Frontend
├── app/ (Next.js App Router)
│   ├── layout.tsx
│   ├── page.tsx
│   │
│   ├── workspace/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   │
│   │   ├── chat/
│   │   │   └── page.tsx
│   │   │
│   │   ├── canvas/
│   │   │   └── page.tsx
│   │   │
│   │   ├── export/
│   │   │   └── page.tsx
│   │   │
│   │   └── settings/
│   │       └── page.tsx
│   │
│   ├── docs/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── qagent/
│   │   ├── api/
│   │   └── client/
│   │
│   └── share/
│       └── page.tsx
│
├── shared/
│   ├── components/
│   │   ├── ui/ (shadcn)
│   │   ├── layout/
│   │   │   ├── workspace-layout.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── header.tsx
│   │   │
│   │   ├── chat/
│   │   │   ├── chat.tsx
│   │   │   ├── message-list.tsx
│   │   │   ├── message-item.tsx
│   │   │   ├── chat-input.tsx
│   │   │   └── approvals-panel.tsx
│   │   │
│   │   ├── canvas/
│   │   │   ├── main-canvas.tsx
│   │   │   ├── audio-canvas-runtime.tsx
│   │   │   ├── waveform-view.tsx
│   │   │   ├── pipeline-block.tsx
│   │   │   ├── pipeline-view.tsx
│   │   │   ├── timeline.tsx
│   │   │   └── canvas-controls.tsx
│   │   │
│   │   ├── audio/
│   │   │   ├── audio-player.tsx
│   │   │   ├── transport-controls.tsx
│   │   │   └── volume-meter.tsx
│   │   │
│   │   ├── export/
│   │   │   ├── export-panel.tsx
│   │   │   └── export-status.tsx
│   │   │
│   │   └── docs/
│   │       ├── docs-header.tsx
│   │       ├── docs-sidebar.tsx
│   │       └── docs-pager.tsx
│   │
│   ├── lib/
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── api/
│   │   │   ├── qagent-client.ts
│   │   │   └── api-client.ts
│   │   │
│   │   ├── state/
│   │   │   ├── chat-store.ts
│   │   │   ├── canvas-store.ts
│   │   │   ├── audio-store.ts
│   │   │   ├── session-store.ts
│   │   │   └── ui-store.ts
│   │   │
│   │   ├── audio/
│   │   │   ├── audio-engine.ts
│   │   │   ├── audio-buffer-cache.ts
│   │   │   ├── waveform-cache.ts
│   │   │   └── audio-utils.ts
│   │   │
│   │   ├── canvas/
│   │   │   ├── canvas-engine.ts
│   │   │   ├── canvas-actions.ts
│   │   │   ├── canvas-to-dsp.ts
│   │   │   └── canvas-serializer.ts
│   │   │
│   │   ├── chat/
│   │   │   ├── chat-handler.ts
│   │   │   ├── message-parser.ts
│   │   │   └── chat-canvas-bridge.ts
│   │   │
│   │   └── runtime/
│   │       ├── execution-dispatcher.ts
│   │       ├── pipeline-runner.ts
│   │       └── status-tracker.ts
│   │
│   └── hooks/
│       ├── use-chat.ts
│       ├── use-canvas.ts
│       ├── use-audio.ts
│       ├── use-session.ts
│       └── use-execution.ts
│
├── features/
│   ├── q-agent/
│   │   ├── q-runner.ts
│   │   ├── plan-store.ts
│   │   └── approval-store.ts
│   │
│   ├── export/
│   │   ├── export-store.ts
│   │   └── export-logic.ts
│   │
│   └── audio-processing/
│       ├── processors/
│       └── dsp-preview.ts
│
├── services/
│   ├── auth/
│   │   └── clerk.ts
│   │
│   ├── firebase/
│   │   ├── firestore.ts
│   │   └── storage.ts
│   │
│   └── analytics/
│       └── tracking.ts
│
├── styles/
│   ├── globals.css
│   └── theme.css
│
├── public/
│   └── assets/
│
└── types/
    ├── chat.ts
    ├── canvas.ts
    ├── audio.ts
    ├── plan.ts
    └── session.ts`;

export default function ClientWorkspaceUiPage() {
  return (
    <DocsContent>
      <PageTitle title="Workspace UI" description="Canonical client page for workspace composition, navigation coordination, and multi-surface frontend structure ownership." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Workspace UI</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Workspace structure ownership, navigation coordination, and multi-surface client alignment."
        >
          <DocsOverviewBlock
            intro="Workspace UI is the structural and organizational layer of the Client frontend, coordinating how Chat UI, Canvas UI, and Runtime are arranged and accessed."
            areasTitle="Workspace UI areas"
            areas={[
              "Layout composition and structural surface arrangement.",
              "Cross-surface navigation management.",
              "Session continuity and global state awareness.",
              "Coordination across Chat UI, Canvas UI, and Runtime.",
            ]}
            outOfScope="Intent/planning ownership, dynamic UI generation authority, processing execution control, and API job lifecycle management."
            relatedBoundaries={[
              "Workspace UI = structural/organizational client authority.",
              "Chat UI = conversational interaction authority.",
              "Canvas UI = visual execution surface authority.",
              "Client Runtime = local runtime feedback authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="workspace-diagram" title="Workspace Diagram" body={[]}>
          <DocsDiagram mode="flow" steps={["User Navigation", "Workspace UI", "Chat UI / Canvas UI / Runtime", "System Response", "Workspace Update"]} />
        </SectionBlock>

        <SectionBlock id="workspace-details" title="Workspace Details" body={[]}>
          <LayerSpecAccordion items={[...workspaceDetails]} defaultOpenAll />
          <div className="mt-4 rounded-md border border-[var(--border)] bg-slate-950/30 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace / Frontend Structure Reference</p>
            <p className="mt-2 text-xs text-slate-300">Reference tree (rendered content):</p>
            <pre className="mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-xs leading-6 text-slate-200">
              {frontendProjectTree}
            </pre>
          </div>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <div className="rounded-md border border-[var(--border)] bg-slate-950/25 p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Client Cross-Reference Map</p>
            <p className="mt-1 text-xs text-slate-500">Canonical references for Workspace ownership boundaries and adjacent specs.</p>
            <div className="mt-3">
              <DocsRelatedDocs
                items={[
                  "Client Layer = canonical parent page for client ownership boundaries.",
                  "Chat UI = conversational interaction authority.",
                  "Canvas UI = visual execution representation authority.",
                  "Client Runtime = local runtime state/feedback authority.",
                  "Cross-Layer Contracts = boundary contract authority.",
                ]}
              />
            </div>
          </div>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
