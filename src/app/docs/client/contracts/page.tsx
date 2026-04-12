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
const CHAT_QAGENT_V1 = `// Request
{
  "version": "1.0",
  "sessionId": "...",
  "message": "...",
  "files": []
}

// Response
{
  "version": "1.0",
  "intent": "...",
  "plan": [],
  "uiPlan": {},
  "requiresApproval": true,
  "message": "..."
}`;

const CANVAS_RUNTIME_V1 = `// Canvas -> Runtime
{
  "version": "1.0",
  "sessionId": "...",
  "uiPlanVersion": "1.0",
  "action": "preview | pause | cancel",
  "correlationId": "..."
}

// Runtime -> Canvas
{
  "version": "1.0",
  "sessionId": "...",
  "status": "ready | running | paused | completed | failed",
  "activeBlockId": "...",
  "progress": 0.42,
  "correlationId": "..."
}`;

const RUNTIME_UI_FEEDBACK_V1 = `{
  "version": "1.0",
  "eventType": "runtime.status",
  "sessionId": "...",
  "correlationId": "...",
  "state": "idle | ready | running | paused | completed | failed",
  "userMessage": "...",
  "error": null
}`;

function ContractsCanonicalExamples() {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Chat ↔ QAgent (v1.0)</p>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{CHAT_QAGENT_V1}</pre>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Canvas ↔ Runtime (v1.0)</p>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{CANVAS_RUNTIME_V1}</pre>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Runtime ↔ UI Feedback (v1.0)</p>
        <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{RUNTIME_UI_FEEDBACK_V1}</pre>
      </div>
    </div>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Cross-layer contracts in Client docs.", href: "#overview" },
  { title: "Contracts Diagram", subtitle: "Client, runtime, QAgent, API edges.", href: "#client-contracts-diagram" },
  { title: "Contract Purpose", subtitle: "Why these contracts exist.", href: "#contracts-purpose" },
  { title: "Boundary Interfaces", subtitle: "Named bridge surfaces.", href: "#contracts-boundary" },
  { title: "Canonical Shapes", subtitle: "v1.0 payload examples.", href: "#contracts-canonical-shapes" },
  { title: "Validation Rules", subtitle: "Ingress validation.", href: "#contracts-validation" },
  { title: "Versioning", subtitle: "Version fields in payloads.", href: "#contracts-versioning" },
  { title: "Failure Handling", subtitle: "Boundary failure posture.", href: "#contracts-failure" },
  { title: "Related Docs", subtitle: "Event, UI plan, errors, lifecycle.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "contracts-purpose",
    title: "Contract Purpose",
    subtitle: "Cross-layer contracts on the Client boundary",
    purpose: "Anchor what Cross-Layer Contracts means in Client documentation: stable interfaces where the Client meets adjacent layers.",
    defines: [
      "Cross-Layer Contracts document Client-facing bridge contracts: request/response and status shapes at boundaries, not backend implementation internals.",
      "These contracts define stable interfaces across Client-facing boundaries so UI, runtime, and bridges interoperate predictably.",
    ],
    doesNotDefine: "QAgent intent algorithms or API Server orchestration internals.",
    href: "/docs/client/contracts",
    linkLabel: "Canonical page",
  },
  {
    id: "contracts-boundary",
    title: "Boundary Interfaces",
    subtitle: "Chat ↔ QAgent, Canvas ↔ Runtime, Runtime ↔ UI",
    purpose: "Name the three documented boundary interface pairs and their roles at v1.0.",
    defines: [
      "Chat ↔ QAgent (v1.0): request/response contract for session, message, files, intent, plan, uiPlan, requiresApproval.",
      "Canvas ↔ Runtime (v1.0): Canvas to Runtime action messages and Runtime to Canvas status and progress payloads.",
      "Runtime ↔ UI Feedback (v1.0): runtime.status style events with lifecycle state and user-facing message channel.",
    ],
    doesNotDefine: "Full server-side OpenAPI for all backend routes.",
    href: "/docs/client/event-contract",
    linkLabel: "Event Contract",
  },
  {
    id: "contracts-canonical-shapes",
    title: "Canonical Shapes",
    subtitle: "Example envelopes at v1.0",
    purpose: "Preserve canonical JSON examples for each boundary as the authoritative reference shapes.",
    defines: ["Examples below match the legacy Cross-Layer Contracts specification verbatim."],
    supplement: <ContractsCanonicalExamples />,
    doesNotDefine: "UI Plan schema field rules (see UI Plan Contract).",
    href: "/docs/client/ui-plan-contract",
    linkLabel: "UI Plan Contract",
  },
  {
    id: "contracts-validation",
    title: "Validation Rules",
    subtitle: "Ingress and contract discipline",
    purpose: "State validation expectations for contract payloads entering the Client.",
    defines: ["All contracts are versioned and must be validated at boundary ingress."],
    doesNotDefine: "Per-field JSON Schema for every bridge (see dedicated contract pages where applicable).",
    href: "/docs/client/system-validation",
    linkLabel: "System Validation",
  },
  {
    id: "contracts-versioning",
    title: "Versioning",
    subtitle: "version fields in examples",
    purpose: "Document that illustrated payloads carry an explicit contract version.",
    defines: [
      "Each illustrated payload includes a version field set to \"1.0\" for the documented v1.0 snapshots.",
    ],
    doesNotDefine: "Repository-wide semver policy for all services.",
    href: "/docs/client/event-contract",
    linkLabel: "Event Contract",
  },
  {
    id: "contracts-failure",
    title: "Failure Handling",
    subtitle: "Errors at contract edges",
    purpose: "Reserve guidance for how failures at these boundaries should be treated in Client documentation.",
    defines: [
      "Boundary failures surface through Error Model shapes; contract version mismatch rejects at ingress per System Validation.",
    ],
    doesNotDefine: "Canonical client error JSON (see Error Model).",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
] as const;

export default function ClientContractsPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Cross-Layer Contracts"
        description="Client-facing bridge contracts at Chat ↔ QAgent, Canvas ↔ Runtime, and Runtime ↔ UI Feedback boundaries (v1.0 examples)."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Events & Contracts / Contracts</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What Cross-Layer Contracts means here and how interfaces stay stable at the Client edge."
        >
          <DocsOverviewBlock
            intro="Cross-Layer Contracts in the Client docs name the versioned payloads and messages exchanged where the Client meets QAgent outputs, local runtime control, and UI feedback loops. All contracts are versioned and must be validated at boundary ingress so projections stay deterministic and debuggable."
            areasTitle="Stable interfaces"
            areas={[
              "Client-facing bridge contracts—not deep backend internals.",
              "Canonical example shapes for Chat ↔ QAgent, Canvas ↔ Runtime, and Runtime ↔ UI Feedback at v1.0.",
              "Ingress validation discipline paired with Event Contract, UI Plan Contract, and Error Model pages.",
            ]}
            outOfScope="API Server execution lifecycle authority and QAgent planning logic beyond what crosses the Client boundary."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and consumption of these contracts.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="client-contracts-diagram" title="Contracts Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Cross-layer contract edges (Client view)"
            groups={[
              {
                title: "Client UI",
                items: ["Chat surfaces (QAgent bridge ingress)", "Canvas surfaces (runtime actions)"],
              },
              {
                title: "Client Runtime",
                items: ["Canvas ↔ Runtime messages", "Runtime ↔ UI feedback events"],
              },
              {
                title: "QAgent / API-facing",
                items: ["Intent/plan/uiPlan bridge (not server lifecycle spec)", "Versioned payloads validated at ingress"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="client-contracts-details" title="Cross-Layer Contracts Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/client/event-contract", title: "Client Event Contract", description: "Event envelopes and ordering—not cross-layer bridge snapshots." },
              { href: "/docs/client/ui-plan-contract", title: "UI Plan Contract", description: "Strict uiPlan schema for Canvas—not general bridge catalog." },
              { href: "/docs/client/error-model", title: "Client Error Model", description: "Canonical client error shape and recovery." },
              { href: "/docs/client/runtime-lifecycle", title: "Runtime Lifecycle", description: "Runtime states and transitions alongside runtime-facing contracts." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
