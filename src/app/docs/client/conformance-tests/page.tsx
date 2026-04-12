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
const SUITE_ROWS = [
  ["uiPlan validation", "Invalid enum/missing required field", "Reject before render, no partial UI", "Validation error emitted; rendered tree unchanged"],
  ["State ownership enforcement", "Unauthorized writer attempts mutation", "Write denied deterministically", "State snapshot unchanged + violation event logged"],
  ["Event contract compliance", "Missing correlationId/sequence/sessionId", "Event rejected, no state mutation", "Reducer not invoked + error surfaced"],
] as const;

const EVENT_ORDER_ROWS = [
  ["Duplicate events", "Same eventId delivered twice", "Second event ignored", "Exactly one state transition occurs"],
  ["Out-of-order events", "Sequence 5 arrives before 4", "Buffer or reject by policy; final state identical", "Final applied sequence is monotonic"],
  ["Delayed events", "Late arrival after terminal state", "Ignored as stale", "No rollback/ghost UI state"],
] as const;

const EDGE_ROWS = [
  ["Rapid clicks", "Debounced or deduplicated action dispatch", "Single effective execution trigger"],
  ["Network loss", "Retry policy runs, terminal error surfaced if exhausted", "No silent stall, deterministic terminal state"],
  ["Session switch mid-run", "Old session events isolated and dropped", "No cross-session state contamination"],
  ["Stale uiPlan", "Rejected by version/checksum policy", "No render mutation from stale payload"],
] as const;

function ConformanceSuiteTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">Suite</th>
            <th className="px-3 py-2 font-semibold">Scenario</th>
            <th className="px-3 py-2 font-semibold">Expected Behavior</th>
            <th className="px-3 py-2 font-semibold">Pass Criteria</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {SUITE_ROWS.map(([suite, scenario, behavior, pass]) => (
            <tr key={suite} className="border-t border-[var(--border)]">
              <td className="px-3 py-2">{suite}</td>
              <td className="px-3 py-2">{scenario}</td>
              <td className="px-3 py-2">{behavior}</td>
              <td className="px-3 py-2">{pass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EventOrderTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">Scenario</th>
            <th className="px-3 py-2 font-semibold">Input Pattern</th>
            <th className="px-3 py-2 font-semibold">Deterministic Behavior</th>
            <th className="px-3 py-2 font-semibold">Pass Criteria</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {EVENT_ORDER_ROWS.map(([scenario, pattern, behavior, pass]) => (
            <tr key={scenario} className="border-t border-[var(--border)]">
              <td className="px-3 py-2">{scenario}</td>
              <td className="px-3 py-2">{pattern}</td>
              <td className="px-3 py-2">{behavior}</td>
              <td className="px-3 py-2">{pass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EdgeCaseTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">Scenario</th>
            <th className="px-3 py-2 font-semibold">Expected Behavior</th>
            <th className="px-3 py-2 font-semibold">Pass Criteria</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {EDGE_ROWS.map(([scenario, behavior, pass]) => (
            <tr key={scenario} className="border-t border-[var(--border)]">
              <td className="px-3 py-2">{scenario}</td>
              <td className="px-3 py-2">{behavior}</td>
              <td className="px-3 py-2">{pass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Conformance and determinism role.", href: "#overview" },
  { title: "Conformance Tests Diagram", subtitle: "Input to pass/fail.", href: "#conformance-tests-diagram" },
  { title: "Test Purpose", subtitle: "Why suites exist.", href: "#conformance-purpose" },
  { title: "Conformance Checks", subtitle: "uiPlan, ownership, events.", href: "#conformance-checks" },
  { title: "Determinism Rules", subtitle: "Event order and lifecycle.", href: "#conformance-determinism" },
  { title: "Failure Signals", subtitle: "Edge case matrix.", href: "#conformance-failure-signals" },
  { title: "Debugging Use", subtitle: "Lock validation rule.", href: "#conformance-debugging" },
  { title: "Related Docs", subtitle: "Validation, report, UI plan, errors.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "conformance-purpose",
    title: "Test Purpose",
    subtitle: "Conformance and determinism",
    purpose: "Define executable validation scenarios proving implementation conformance with Client contracts.",
    defines: [
      "Executable validation scenarios proving implementation conformance with Client contracts.",
    ],
    doesNotDefine: "System validation goals narrative (see System Validation).",
    href: "/docs/client/conformance-tests",
    linkLabel: "Canonical page",
  },
  {
    id: "conformance-checks",
    title: "Conformance Checks",
    subtitle: "Suite matrix",
    purpose: "Enumerate conformance suites for uiPlan validation, state ownership, and event contract compliance.",
    defines: ["Suites and pass criteria are tabulated below verbatim from the legacy specification."],
    supplement: <ConformanceSuiteTable />,
    doesNotDefine: "Runtime lifecycle state diagram (see Runtime Lifecycle).",
    href: "/docs/client/ui-plan-contract",
    linkLabel: "UI Plan Contract",
  },
  {
    id: "conformance-determinism",
    title: "Determinism Rules",
    subtitle: "Event order and runtime lifecycle",
    purpose: "Capture deterministic event handling and runtime lifecycle test obligations.",
    defines: [
      "Event order scenarios (duplicate, out-of-order, delayed) are specified in the table below.",
      "Runtime lifecycle tests: valid transitions accepted: idle->ready->running->paused->running->completed.",
      "Invalid transitions rejected: idle->running, completed->running, failed->running.",
      "Retry behavior: failed->ready->running only, attempt counter increments.",
      "Cancellation behavior: running/paused only; stale post-cancel events ignored.",
    ],
    supplement: <EventOrderTable />,
    doesNotDefine: "API-side determinism guarantees.",
    href: "/docs/client/runtime-lifecycle",
    linkLabel: "Runtime Lifecycle",
  },
  {
    id: "conformance-failure-signals",
    title: "Failure Signals",
    subtitle: "Edge case matrix",
    purpose: "Document edge-case scenarios with expected behavior and pass criteria.",
    defines: ["Edge case matrix is reproduced below without changes."],
    supplement: <EdgeCaseTable />,
    doesNotDefine: "User-facing copy for each edge case.",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
  {
    id: "conformance-debugging",
    title: "Debugging Use",
    subtitle: "Lock validation rule",
    purpose: "State the implementation readiness lock derived from full conformance success.",
    defines: [
      "System is considered implementation-ready only if all tests pass, no undefined behavior exists, and no state divergence occurs.",
    ],
    doesNotDefine: "Architectural ownership locks beyond Client documentation scope.",
    href: "/docs/client/system-validation",
    linkLabel: "System Validation",
  },
] as const;

export default function ConformanceTestsPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Conformance & Determinism Tests"
        description="Executable validation scenarios for uiPlan, state ownership, event contracts, ordering, lifecycle, edge cases, and implementation readiness."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Validation & Tests / Conformance Tests</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="Why conformance and determinism matter for Client rendering and runtime behavior."
        >
          <DocsOverviewBlock
            intro="Conformance and determinism tests make Client contracts falsifiable: uiPlan must reject invalid payloads before render, ownership violations must not mutate state, and event ordering must yield identical final state. Executable validation scenarios proving implementation conformance with Client contracts give integrators a shared bar for implementation-ready behavior."
            areasTitle="Why this matters"
            areas={[
              "Rendering safety: invalid uiPlan and enum drift cannot silently corrupt Canvas.",
              "State integrity: writers, sequences, and session rules stay enforceable under stress.",
              "Predictability: duplicate, reordered, and late events resolve without ghost UI or rollbacks.",
            ]}
            outOfScope="QAgent intent selection tests and API orchestration conformance as defined by the API Server layer."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and these Client-layer test expectations.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="conformance-tests-diagram" title="Conformance Tests Diagram" body={[]}>
          <DocsDiagram
            mode="flow"
            steps={["Test input", "Execution", "Comparison / assertion", "Pass / Fail"]}
          />
        </SectionBlock>

        <SectionBlock id="conformance-tests-details" title="Conformance & Determinism Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/client/system-validation", title: "System Validation", description: "Minimal success scenario and validation goals." },
              { href: "/docs/client/test-report", title: "Client Test Report", description: "Recorded runs versus these expectations." },
              { href: "/docs/client/ui-plan-contract", title: "UI Plan Contract", description: "Schema rules exercised by uiPlan suites." },
              { href: "/docs/client/error-model", title: "Client Error Model", description: "Error shape when suites surface failures." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
