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
const canonicalEnvelope =
  '{"eventId":"...","eventType":"...","correlationId":"...","sessionId":"...","sequence":42,"timestamp":1710000000000,"payload":{},"version":"1.0"}';

const inPageLinks = [
  { title: "Overview", subtitle: "Contract scope and how to read this spec.", href: "#overview" },
  { title: "Event Contract Diagram", subtitle: "Contracts in context vs flow and errors.", href: "#event-contract-diagram" },
  { title: "Canonical Event Shape", subtitle: "Structural envelope fields.", href: "#event-contract-canonical-shape" },
  { title: "Event Categories", subtitle: "What this contract groups and names.", href: "#event-contract-categories" },
  { title: "Required vs Optional Fields", subtitle: "Envelope fields and rule participation.", href: "#event-contract-required-optional" },
  { title: "Field Semantics", subtitle: "correlationId, sequence, and identity rules.", href: "#event-contract-field-semantics" },
  { title: "Versioning & Compatibility", subtitle: "Envelope version expectations.", href: "#event-contract-versioning" },
  { title: "Client Runtime Expectations", subtitle: "Mutation, ordering, dedup, cancel, session.", href: "#event-contract-runtime-expectations" },
  { title: "Debugging & Logging Notes", subtitle: "Trace and validation hints.", href: "#event-contract-debugging" },
  { title: "Related Docs", subtitle: "Event flow, errors, runtime, state.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "event-contract-canonical-shape",
    title: "Canonical Event Shape",
    subtitle: "Structural envelope",
    purpose: "Define the canonical JSON envelope for client events consumed and emitted under this contract.",
    defines: [
      `Illustrative envelope (field names and layout per contract): ${canonicalEnvelope}`,
      "[TEXT TBD – expand Event Contract detail]",
    ],
    doesNotDefine: "Stage-by-stage event sequence across Chat, QAgent, and Canvas.",
    href: "/docs/client/event-contract",
    linkLabel: "Canonical page",
  },
  {
    id: "event-contract-categories",
    title: "Event Categories",
    subtitle: "Contract coverage areas",
    purpose: "Anchor how this specification groups rules without inventing new event type taxonomies.",
    defines: [
      "This contract specifies structural identity, correlation, ordering, deduplication, cancellation, and session isolation rules.",
      "It does not replace Event Flow (ordering of stages) or Error Model (failure shapes and policies).",
      "[TEXT TBD – expand Event Contract detail]",
    ],
    doesNotDefine: "Exhaustive enumeration of eventType string values.",
    href: "/docs/client/event-flow",
    linkLabel: "Event Flow",
  },
  {
    id: "event-contract-required-optional",
    title: "Required vs Optional Fields",
    subtitle: "Envelope fields in enforcement",
    purpose: "Relate canonical fields to the rules that consume them.",
    defines: [
      "The envelope includes eventId, eventType, correlationId, sessionId, sequence, timestamp, payload, and version.",
      "Dedup, ordering, correlation, session, and cancellation rules reference these fields as specified under Field Semantics and Client Runtime Expectations.",
      "[TEXT TBD – expand Event Contract detail]",
    ],
    doesNotDefine: "Per-field optional matrix beyond participation in those rules.",
    href: "/docs/client/contracts",
    linkLabel: "Client contracts",
  },
  {
    id: "event-contract-field-semantics",
    title: "Field Semantics",
    subtitle: "ids, timestamps, payloads",
    purpose: "Define correlationId rules and how sequence supports retries and ordering.",
    defines: [
      "All events in one user operation MUST share correlationId.",
      "Retry attempts keep correlationId and increment sequence.",
      "Cross-session reuse of correlationId is forbidden.",
      "[TEXT TBD – expand Event Contract detail]",
    ],
    doesNotDefine: "Error object shapes on failure paths.",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
  {
    id: "event-contract-versioning",
    title: "Versioning & Compatibility",
    subtitle: "Envelope version field",
    purpose: "Document the version field carried on the canonical envelope.",
    defines: [
      "Canonical shape includes a version field (for example \"1.0\") on the envelope.",
      "[TEXT TBD – expand Event Contract detail]",
    ],
    doesNotDefine: "Cross-layer schema registry and backend compatibility policy.",
    href: "/docs/client/contracts",
    linkLabel: "Client contracts",
  },
  {
    id: "event-contract-runtime-expectations",
    title: "Client Runtime Expectations",
    subtitle: "Apply, order, dedup, cancel, session",
    purpose: "Define how the client runtime must apply events under this contract.",
    defines: [
      "Events are the ONLY way to mutate state.",
      "Ordering is by (sessionId, correlationId, sequence).",
      "Out-of-order events MUST be buffered or dropped by policy.",
      "Lower sequence than applied state version MUST be ignored.",
      "Duplicate eventId MUST be ignored.",
      "Idempotent reducers MUST produce same state for repeated event payload.",
      "Cancellation emits explicit cancel event with same correlationId.",
      "Post-cancel non-terminal events for that correlationId MUST be dropped.",
      "Events MUST be applied only to matching sessionId store scope.",
      "Session switch MUST invalidate pending queue from previous session scope.",
      "[TEXT TBD – expand Event Contract detail]",
    ],
    doesNotDefine: "API Server execution lifecycle orchestration.",
    href: "/docs/client/runtime",
    linkLabel: "Client Runtime",
  },
  {
    id: "event-contract-debugging",
    title: "Debugging & Logging Notes",
    subtitle: "Operational tracing",
    purpose: "Operational guidance for tracing contract adherence and diagnosing event traces.",
    defines: ["[TEXT TBD – expand Event Contract detail]"],
    doesNotDefine: "Formal API Server logging schema.",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
] as const;

export default function EventContractPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Client Event Contract"
        description="Canonical client specification for UI-facing event shape, field semantics, ordering, deduplication, cancellation, and session isolation."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Events & Contracts / Event Contract</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What an event contract is in WaveQ Client, why it exists, and how to read this page with Event Flow and Error Model."
        >
          <DocsOverviewBlock
            intro="A Client Event Contract is the stable specification for event envelopes and the rules the Client Runtime uses to apply them: identity, correlation, ordering, deduplication, cancellation, and session scope. Events are the only way to mutate client state; the contract makes that path predictable, debuggable, and separated from ad hoc mutation."
            areasTitle="Why contracts exist"
            areas={[
              "Stability: one canonical shape and shared rules for consumers and producers inside the Client Layer.",
              "Debuggability: correlationId, sequence, and sessionId give a traceable frame for retries, ordering, and isolation.",
              "Separation of concerns: this page is the contract spec; Event Flow describes sequence across stages; Error Model describes failure shapes and policies.",
            ]}
            outOfScope="QAgent intent/planning internals, API Server execution lifecycle ownership, and non-event state mutation shortcuts."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and enforcement of this contract.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="event-contract-diagram" title="Event Contract Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client UI-facing event contracts"
            groups={[
              {
                title: "Client UI",
                items: ["Surfaces emit and consume typed events", "Stable projections driven by contracted state updates"],
              },
              {
                title: "Client Runtime",
                items: ["Validates canonical envelope", "Ordering, dedup, cancel, and session rules applied here"],
              },
              {
                title: "QAgent / API boundary",
                items: ["Cross-boundary event traffic", "Not Event Flow stage order; not Error Model shapes"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="event-contract-details" title="Event Contract Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/client/event-flow",
                title: "Client Event Flow",
                description: "Canonical sequence of stages and handoffs — not the envelope contract.",
              },
              {
                href: "/docs/client/error-model",
                title: "Error Model",
                description: "Error shapes and policies — not event envelope field rules.",
              },
              {
                href: "/docs/client/runtime",
                title: "Client Runtime",
                description: "Runtime projection and lifecycle context for applying contracted events.",
              },
              {
                href: "/docs/client/state-model",
                title: "Client State Model",
                description: "State partitions and consumption — complements event-driven mutation rules.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
