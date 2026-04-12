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
  { title: "Overview", subtitle: "Runtime scope and ownership.", href: "#overview" },
  { title: "Runtime Diagram", subtitle: "Client feedback loop flow.", href: "#runtime-diagram" },
  { title: "Runtime Details", subtitle: "Responsibilities and boundaries.", href: "#runtime-details" },
  { title: "Related Docs", subtitle: "Canonical client references.", href: "#related-docs" },
];

const runtimeDetails = [
  {
    id: "runtime-responsibilities",
    title: "Responsibilities",
    subtitle: "Local behavior and feedback loop",
    purpose: "Define Client Runtime responsibilities for local execution feedback and state projection.",
    defines: [
      "Run local audio preview interactions for immediate response.",
      "Manage client-side canvas and UI runtime state transitions.",
      "Handle session/auth continuity needed by user workflows.",
      "Preserve resilient interaction behavior during async updates.",
    ],
    doesNotDefine: "Server-side execution lifecycle ownership.",
    href: "/docs/client/runtime",
    linkLabel: "Canonical page",
  },
  {
    id: "runtime-boundaries",
    title: "Boundaries",
    subtitle: "Non-ownership constraints",
    purpose: "Define what Client Runtime explicitly does not own.",
    defines: [
      "Does not replace API Server processing or exports.",
      "Does not own queue-backed execution guarantees.",
      "Does not determine intent or approval policy.",
      "Does not perform server-side orchestration.",
    ],
    doesNotDefine: "QAgent planning semantics and API execution lifecycle authority.",
    href: "/docs/api",
    linkLabel: "Related layer",
  },
  {
    id: "runtime-qagent-interaction",
    title: "Interaction with QAgent",
    subtitle: "Runtime event exchange",
    purpose: "Define runtime exchange behavior with QAgent.",
    defines: [
      "Consume QAgent outputs to update local runtime state projection.",
      "Feed user/runtime events back to QAgent in the orchestration loop.",
      "Maintain deterministic client-side feedback without taking planning ownership.",
    ],
    doesNotDefine: "QAgent internal intent-to-plan pipeline implementation.",
    href: "/docs/q-agent",
    linkLabel: "Related layer",
  },
  {
    id: "runtime-integration-note",
    title: "Integration Note",
    subtitle: "uiPlan-coupled runtime behavior",
    purpose: "Define integration expectations between runtime feedback and uiPlan-driven UI.",
    defines: [
      "Execute preview based on current uiPlan context.",
      "Reflect runtime execution state back into Canvas consistently.",
      "Keep visual feedback synchronized with client runtime transitions.",
    ],
    doesNotDefine: "Canvas rendering schema ownership.",
    href: "/docs/client/ui-plan-contract",
    linkLabel: "Related contract",
  },
  {
    id: "runtime-debug-mode",
    title: "Debug Mode",
    subtitle: "Operator observability helpers",
    purpose: "Define runtime debugging aids for validation and troubleshooting.",
    defines: [
      "Show raw uiPlan payload context.",
      "Show current execution state and transition markers.",
      "Highlight active pipeline blocks and runtime pointers.",
    ],
    doesNotDefine: "Production execution policy overrides.",
    href: "/docs/client/conformance-tests",
    linkLabel: "Related tests",
  },
] as const;

export default function ClientRuntimePage() {
  return (
    <DocsContent>
      <PageTitle title="Client Runtime" description="Canonical client page for local runtime behavior, feedback projection, and state transition visibility." />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Runtime</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Runtime feedback loop, local state projection scope, and non-ownership boundaries."
        >
          <DocsOverviewBlock
            intro="Client Runtime powers local execution feedback and state projection so user interactions stay responsive while staying aligned with QAgent and API boundaries."
            areasTitle="Client Runtime areas"
            areas={[
              "Local preview and interaction response loop.",
              "Canvas/UI runtime state transition projection.",
              "Session-bound runtime continuity.",
              "Runtime status feedback and operator observability.",
            ]}
            outOfScope="Server-side queue execution, orchestration scheduling, and intent planning decisions."
            relatedBoundaries={[
              "Client Runtime = local feedback/state projection authority.",
              "QAgent = intent and planning authority.",
              "API Server = execution lifecycle authority.",
              "Canvas UI = visual execution surface authority.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="runtime-diagram" title="Runtime Diagram" body={[]}>
          <DocsDiagram mode="flow" steps={["User Action", "Client Runtime", "QAgent Feedback", "Canvas/UI Projection", "User Visible State"]} />
        </SectionBlock>

        <SectionBlock id="runtime-details" title="Runtime Details" body={[]}>
          <LayerSpecAccordion items={[...runtimeDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            items={[
              "Client Layer = canonical parent page for client ownership boundaries.",
              "QAgent Layer = intent/planning authority.",
              "API Server Layer = execution lifecycle authority.",
              "Canvas UI = visual execution representation authority.",
              "UI Plan Contract = rendering contract authority.",
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
