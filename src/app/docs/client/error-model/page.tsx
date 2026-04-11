import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const canonicalErrorExample = `{
  "code": "VALIDATION_ERROR",
  "category": "validation | runtime | network | desync",
  "message": "Human-readable message",
  "recoverable": true,
  "retryable": true,
  "correlationId": "...",
  "sessionId": "...",
  "details": {}
}`;

function CanonicalErrorFormatExample() {
  return (
    <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{canonicalErrorExample}</pre>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Error model scope and relationships.", href: "#overview" },
  { title: "Error Model Diagram", subtitle: "Normalization and surfacing context.", href: "#error-model-diagram" },
  { title: "Canonical Error Format", subtitle: "JSON envelope fields.", href: "#error-model-canonical-format" },
  { title: "Error Categories", subtitle: "validation, runtime, network, desync.", href: "#error-model-categories" },
  { title: "User-Visible Behavior", subtitle: "UI obligations for errors.", href: "#error-model-user-visible" },
  { title: "Recovery Rules", subtitle: "Per-category recovery.", href: "#error-model-recovery" },
  { title: "Retry Policy", subtitle: "Backoff and lineage.", href: "#error-model-retry-policy" },
  { title: "Debugging Notes", subtitle: "Tracing and diagnostics.", href: "#error-model-debugging" },
  { title: "Related Docs", subtitle: "Flow, contract, lifecycle, state.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "error-model-canonical-format",
    title: "Canonical Error Format",
    subtitle: "Single client-facing envelope",
    purpose: "Define the one canonical JSON shape for client errors and deterministic handling fields.",
    defines: [
      "Client errors use one canonical format and deterministic recovery behavior.",
      "Envelope fields: code, category, message, recoverable, retryable, correlationId, sessionId, details (see example below).",
    ],
    supplement: <CanonicalErrorFormatExample />,
    doesNotDefine: "Event envelope field rules (see Event Contract) or stage ordering (see Event Flow).",
    href: "/docs/client/error-model",
    linkLabel: "Canonical page",
  },
  {
    id: "error-model-categories",
    title: "Error Categories",
    subtitle: "validation, runtime, network, desync",
    purpose: "Classify client-facing errors for consistent handling and recovery.",
    defines: [
      "validation errors: invalid input/payload/schema.",
      "runtime errors: execution or preview failures.",
      "network errors: request timeout/disconnect/retry exhaustion.",
      "desync errors: stale state/event ordering mismatch.",
    ],
    doesNotDefine: "Backend-only error taxonomies or API execution lifecycle codes.",
    href: "/docs/client/event-contract",
    linkLabel: "Event Contract",
  },
  {
    id: "error-model-user-visible",
    title: "User-Visible Behavior",
    subtitle: "UI presentation requirements",
    purpose: "Require how errors surface to users in the Client Layer.",
    defines: [
      "All errors MUST be visible in UI with actionable status.",
      "Recoverable errors expose retry/reset actions.",
      "Non-recoverable errors expose safe fallback and diagnostics reference.",
    ],
    doesNotDefine: "Copy strings or visual design tokens for specific surfaces.",
    href: "/docs/client/chat-ui",
    linkLabel: "Chat UI",
  },
  {
    id: "error-model-recovery",
    title: "Recovery Rules",
    subtitle: "Per-category deterministic recovery",
    purpose: "Define deterministic recovery behavior for each error category.",
    defines: [
      "Validation: block transition, request correction, no partial apply.",
      "Runtime: transition to failed and allow controlled retry.",
      "Network: retry with exponential backoff; fail after max attempts.",
      "Desync: invalidate stale branch and resync from latest authoritative snapshot.",
    ],
    doesNotDefine: "Server-side retry orchestration or QAgent replanning policy.",
    href: "/docs/client/runtime-lifecycle",
    linkLabel: "Runtime Lifecycle",
  },
  {
    id: "error-model-retry-policy",
    title: "Retry Policy",
    subtitle: "Default retry bounds",
    purpose: "State default retry policy for client error handling.",
    defines: [
      "Default policy: max 3 attempts, exponential backoff, same correlationId lineage, and hard stop after terminal failure.",
    ],
    doesNotDefine: "Per-endpoint server retry budgets.",
    href: "/docs/client/event-contract",
    linkLabel: "Event Contract",
  },
  {
    id: "error-model-debugging",
    title: "Debugging Notes",
    subtitle: "Trace and validation",
    purpose: "Operational notes for correlating errors with client traces.",
    defines: [
      "Canonical format includes correlationId and sessionId for correlation with event and session traces.",
      "[TEXT TBD – expand Client Error Model detail]",
    ],
    doesNotDefine: "Formal API Server observability schema.",
    href: "/docs/client/event-flow",
    linkLabel: "Event Flow",
  },
] as const;

export default function ErrorModelPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Client Error Model"
        description="Canonical client error format, categories, user-visible behavior, recovery, retry boundaries, and debugging alignment."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Events & Contracts / Error Model</p>

      <DocsScopeBlocks
        covers="Client Layer error shape, client-facing categories, user-visible behavior, recovery expectations, and retry/error-handling boundaries for normalized client errors."
        doesNotCover="Event sequence across surfaces (Event Flow), event envelope structure (Event Contract), backend execution lifecycle ownership (API Server), or QAgent intent/planning internals."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What the Error Model is, why normalization matters, and how it fits Event Flow, Event Contract, and Runtime Lifecycle."
        >
          <DocsOverviewBlock
            intro="The Client Error Model defines how the Client Layer normalizes failures: one canonical format and deterministic recovery behavior, with explicit categories, user-visible requirements, recovery rules, and a default retry policy. Read it alongside Event Flow (stage sequence), Event Contract (event envelopes), and Runtime Lifecycle (runtime states and transitions)—not as a substitute for those specs."
            areasTitle="Why normalized client errors matter"
            areas={[
              "Predictable UI: every failure maps to visible, actionable status and the right retry or fallback path.",
              "Stable debugging: code, category, correlationId, and sessionId align errors with event and lifecycle traces.",
              "Layer clarity: client projection and handling stay in the Client Layer without redefining server execution or QAgent planning.",
            ]}
            outOfScope="API Server execution lifecycle authority and QAgent intent/planning ownership."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and client-side error normalization and surfacing.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="error-model-diagram" title="Error Model Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client error normalization"
            groups={[
              {
                title: "UI surface",
                items: ["Surfaces render actionable error status", "Recoverable vs non-recoverable UX paths"],
              },
              {
                title: "Client runtime",
                items: ["Normalize failures to canonical format", "Apply recovery and retry policy"],
              },
              {
                title: "QAgent / API inputs",
                items: ["Upstream failures enter client handling", "Not server lifecycle spec; not event sequence spec"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="error-model-details" title="Error Model Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/client/event-flow",
                title: "Client Event Flow",
                description: "Stage sequence across surfaces — not error shape or recovery policy.",
              },
              {
                href: "/docs/client/event-contract",
                title: "Client Event Contract",
                description: "Event envelope and ordering rules — not canonical error JSON.",
              },
              {
                href: "/docs/client/runtime-lifecycle",
                title: "Runtime Lifecycle",
                description: "Runtime states and transitions — complements error handling during lifecycle.",
              },
              {
                href: "/docs/client/state-model",
                title: "Client State Model",
                description: "State partitions — errors interact with declared client state scope.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
