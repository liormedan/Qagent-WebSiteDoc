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
const transitions = [
  "idle -> ready",
  "ready -> running",
  "running -> paused",
  "paused -> running",
  "running -> completed",
  "running -> failed",
  "paused -> failed",
  "failed -> ready",
  "completed -> ready",
] as const;

const invalidTransitions = [
  "idle -> running (requires ready first)",
  "completed -> running (must reset to ready first)",
  "failed -> running (must reset to ready first)",
  "ready -> completed (requires running first)",
] as const;

function LifecycleAsciiBlock() {
  return (
    <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">
      {`idle -> ready -> running -> paused -> running -> completed
                      \\-> failed`}
    </pre>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Lifecycle scope and related docs.", href: "#overview" },
  { title: "Runtime Lifecycle Diagram", subtitle: "Phase progression overview.", href: "#runtime-lifecycle-diagram" },
  { title: "Lifecycle Phases", subtitle: "States and transition summary.", href: "#runtime-lifecycle-phases" },
  { title: "Initialization", subtitle: "idle and ready behavior.", href: "#runtime-lifecycle-initialization" },
  { title: "Runtime Handoff", subtitle: "Entering running from ready.", href: "#runtime-lifecycle-handoff" },
  { title: "Active Update Loop", subtitle: "running, paused, completion.", href: "#runtime-lifecycle-active-loop" },
  { title: "Teardown / Recovery", subtitle: "failed, completed, cancel, retry.", href: "#runtime-lifecycle-teardown" },
  { title: "Debugging Use", subtitle: "Invalid transitions reference.", href: "#runtime-lifecycle-debugging" },
  { title: "Related Docs", subtitle: "Runtime, state, errors, events.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "runtime-lifecycle-phases",
    title: "Lifecycle Phases",
    subtitle: "States and allowed transitions",
    purpose: "Summarize runtime states, the primary path diagram, and the allowed transition list.",
    defines: [
      "Allowed transitions: " + transitions.join("; ") + ".",
      "Invalid transitions (must not occur without intermediate states): " + invalidTransitions.join("; ") + ".",
    ],
    supplement: <LifecycleAsciiBlock />,
    doesNotDefine: "Event envelope structure (Event Contract) or per-store writers (State Ownership).",
    href: "/docs/client/runtime-lifecycle",
    linkLabel: "Canonical page",
  },
  {
    id: "runtime-lifecycle-initialization",
    title: "Initialization",
    subtitle: "idle and ready",
    purpose: "Define UI and control behavior for initialization states before active execution.",
    defines: [
      "idle: controls disabled except input/load actions.",
      "ready: execute controls enabled, preview allowed.",
    ],
    doesNotDefine: "Server-side job bootstrap or API execution lifecycle.",
    href: "/docs/client/runtime",
    linkLabel: "Client Runtime",
  },
  {
    id: "runtime-lifecycle-handoff",
    title: "Runtime Handoff",
    subtitle: "ready to running",
    purpose: "Define entering the active execution state from ready.",
    defines: [
      "Transition ready -> running is allowed; idle -> running is invalid (requires ready first).",
      "ready -> completed is invalid (requires running first).",
    ],
    doesNotDefine: "Cross-surface event ordering (see Event Flow).",
    href: "/docs/client/event-flow",
    linkLabel: "Event Flow",
  },
  {
    id: "runtime-lifecycle-active-loop",
    title: "Active Update Loop",
    subtitle: "running and paused",
    purpose: "Define behavior while execution is active or temporarily paused.",
    defines: [
      "running: show progress and active block, lock conflicting actions.",
      "paused: show paused badge, allow resume/cancel only.",
      "Transitions running -> paused and paused -> running are allowed.",
    ],
    doesNotDefine: "Canvas rendering pipeline internals.",
    href: "/docs/client/runtime",
    linkLabel: "Client Runtime",
  },
  {
    id: "runtime-lifecycle-teardown",
    title: "Teardown / Recovery",
    subtitle: "completed, failed, cancel, retry",
    purpose: "Define completion, failure, cancellation, and retry paths for the runtime lifecycle.",
    defines: [
      "completed: show success/output, allow restart.",
      "failed: show error context, allow retry/reset.",
      "Transitions running -> completed, running -> failed, and paused -> failed are allowed; failed -> ready and completed -> ready are allowed.",
      "Retry is allowed only from failed -> ready -> running. Retry MUST reuse the same session scope and increment runtime attempt number.",
      "Cancellation is valid only in running or paused states.",
      "Cancel emits terminal runtime event and forces transition to failed or ready (policy-defined).",
      "Post-cancel stale events MUST be ignored by state version check.",
      "Invalid: completed -> running and failed -> running without reset to ready first.",
    ],
    doesNotDefine: "Canonical error JSON (see Error Model) beyond how failures surface in failed state.",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
  {
    id: "runtime-lifecycle-debugging",
    title: "Debugging Use",
    subtitle: "Validate transitions",
    purpose: "Use allowed and invalid transition lists when diagnosing stuck or illegal runtime states.",
    defines: [
      "Cross-check observed transitions against the allowed list; any invalid pattern indicates a lifecycle bug or policy drift.",
    ],
    doesNotDefine: "Conformance test execution policy.",
    href: "/docs/client/conformance-tests",
    linkLabel: "Conformance Tests",
  },
] as const;

export default function RuntimeLifecyclePage() {
  return (
    <DocsContent>
      <PageTitle
        title="Client Runtime Lifecycle"
        description="Lifecycle of the Client runtime: states, allowed and invalid transitions, UI behavior, retry, and cancellation rules."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Events & Contracts / Runtime Lifecycle</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What the runtime lifecycle is, why it matters for UI stability, and how it ties to Runtime, State Model, Event Flow, and Error Model."
        >
          <DocsOverviewBlock
            intro="The Client Runtime Lifecycle defines legal states and transitions for the local runtime (idle through ready, running, paused, completed, and failed), how the UI must behave in each state, and how cancellation and retry re-enter the loop. It is the time-dimensional contract for runtime stability: engineers and UX can rely on the same graph for debugging stuck runtimes, invalid transitions, and recovery paths."
            areasTitle="Why lifecycle clarity matters"
            areas={[
              "UI stability: controls and feedback align with a single known state machine.",
              "Debugging: invalid transition list narrows root causes when the runtime reaches an illegal edge.",
              "Alignment: combine with Client Runtime for execution projection, State Model for stores, Event Flow for cross-surface ordering, and Error Model for failure presentation.",
            ]}
            outOfScope="QAgent planning transitions and API Server job lifecycle as the authority for server-side execution."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and this lifecycle specification.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="runtime-lifecycle-diagram" title="Runtime Lifecycle Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client Runtime Lifecycle"
            groups={[
              {
                title: "Lifecycle states",
                items: ["idle", "ready", "running", "paused", "completed", "failed"],
              },
              {
                title: "Primary progression",
                items: ["idle to ready", "ready to running", "running to paused to running", "running to completed", "completed to ready"],
              },
              {
                title: "Failure, cancel, recovery",
                items: ["running or paused to failed", "failed to ready", "Retry: failed to ready to running", "Cancel only in running or paused"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="runtime-lifecycle-details" title="Runtime Lifecycle Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              {
                href: "/docs/client/runtime",
                title: "Client Runtime",
                description: "Runtime projection and behavior — complements lifecycle states.",
              },
              {
                href: "/docs/client/state-model",
                title: "Client State Model",
                description: "State partitions consumed while lifecycle advances.",
              },
              {
                href: "/docs/client/state-ownership",
                title: "State Ownership",
                description: "Who may write each store — not lifecycle transitions themselves.",
              },
              {
                href: "/docs/client/error-model",
                title: "Client Error Model",
                description: "Canonical error shape and recovery — pairs with failed/teardown UX.",
              },
              {
                href: "/docs/client/event-flow",
                title: "Client Event Flow",
                description: "Cross-surface event sequence — not the runtime state machine.",
              },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
