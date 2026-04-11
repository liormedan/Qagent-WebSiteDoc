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
const EXEC_ROWS = [
  ["T-LINT-001", "pass", "npm run lint -> eslint -> exit_code 0", "2026-04-07T20:47Z"],
  ["T-BUILD-001", "pass", "npm run build -> next build -> compiled + generated docs routes", "2026-04-07T20:49Z"],
  ["T-CONFORM-001", "fail", "uiPlan/state/event conformance suite not executable (no automated harness present)", "2026-04-07T20:49Z"],
] as const;

const E2E_ROWS = [
  ["Upload -> Plan", "not executed (no runtime harness)", "not captured", "blocked"],
  ["uiPlan -> Render", "spec defined, runtime trace unavailable", "not captured", "blocked"],
  ["Runtime -> Output", "not executed (no executable scenario runner)", "not captured", "blocked"],
] as const;

const FAILURE_SIM_ROWS = [
  ["network loss", "blocked", "no simulation harness executed"],
  ["duplicate events", "blocked", "no replay runner executed"],
  ["stale uiPlan", "blocked", "schema rules documented; runtime execution not recorded"],
  ["cancellation mid-run", "blocked", "lifecycle rules documented; no live trace"],
] as const;

function TestExecutionTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">testId</th>
            <th className="px-3 py-2 font-semibold">result</th>
            <th className="px-3 py-2 font-semibold">execution trace</th>
            <th className="px-3 py-2 font-semibold">timestamp (UTC)</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {EXEC_ROWS.map(([id, result, trace, ts]) => (
            <tr key={id} className="border-t border-[var(--border)]">
              <td className="px-3 py-2 font-mono">{id}</td>
              <td className="px-3 py-2">{result}</td>
              <td className="px-3 py-2">{trace}</td>
              <td className="px-3 py-2">{ts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function E2ETraceTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">step</th>
            <th className="px-3 py-2 font-semibold">events</th>
            <th className="px-3 py-2 font-semibold">state changes</th>
            <th className="px-3 py-2 font-semibold">result</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {E2E_ROWS.map(([step, events, state, result]) => (
            <tr key={step} className="border-t border-[var(--border)]">
              <td className="px-3 py-2">{step}</td>
              <td className="px-3 py-2">{events}</td>
              <td className="px-3 py-2">{state}</td>
              <td className="px-3 py-2">{result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FailureSimulationTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full min-w-[980px] text-left text-sm">
        <thead className="bg-slate-950/60 text-slate-200">
          <tr>
            <th className="px-3 py-2 font-semibold">scenario</th>
            <th className="px-3 py-2 font-semibold">status</th>
            <th className="px-3 py-2 font-semibold">trace</th>
          </tr>
        </thead>
        <tbody className="text-slate-300">
          {FAILURE_SIM_ROWS.map(([scenario, status, trace]) => (
            <tr key={scenario} className="border-t border-[var(--border)]">
              <td className="px-3 py-2">{scenario}</td>
              <td className="px-3 py-2">{status}</td>
              <td className="px-3 py-2">{trace}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DeterminismCheckList() {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
      <li>{'Same input -> same result: blocked (no executable runner).'}</li>
      <li>No race conditions: blocked (no runtime event replay test executed).</li>
      <li>No duplicate effects: blocked (dedup scenarios defined, not executed).</li>
    </ul>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Report vs validation specs.", href: "#overview" },
  { title: "Test Report Diagram", subtitle: "Execution to report outputs.", href: "#test-report-diagram" },
  { title: "Report Purpose", subtitle: "Evidence from command runs.", href: "#test-report-purpose" },
  { title: "Report Structure", subtitle: "Tables and fields.", href: "#test-report-structure" },
  { title: "Result Categories", subtitle: "pass, fail, blocked.", href: "#test-report-results" },
  { title: "Failure Summary", subtitle: "Determinism and failure sim.", href: "#test-report-failure-summary" },
  { title: "Follow-up Use", subtitle: "Lock rule result.", href: "#test-report-follow-up" },
  { title: "Related Docs", subtitle: "Validation, conformance, errors.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "test-report-purpose",
    title: "Report Purpose",
    subtitle: "Execution evidence",
    purpose: "Summarize what the Client Test Report captures versus prescriptive validation pages.",
    defines: [
      "Execution evidence from actual command runs in this workspace.",
      "This page records outcomes and blocked traces; it does not redefine validation rules or conformance matrices.",
      "[TEXT TBD – expand Client Test Report detail]",
    ],
    doesNotDefine: "System validation pass/fail criteria definitions (see System Validation).",
    href: "/docs/client/test-report",
    linkLabel: "Canonical page",
  },
  {
    id: "test-report-structure",
    title: "Report Structure",
    subtitle: "Test execution table",
    purpose: "Preserve the test execution report table structure and sample rows.",
    defines: ["Columns: testId, result, execution trace, timestamp (UTC)."],
    supplement: <TestExecutionTable />,
    doesNotDefine: "Future automation harness API.",
    href: "/docs/client/conformance-tests",
    linkLabel: "Conformance Tests",
  },
  {
    id: "test-report-results",
    title: "Result Categories",
    subtitle: "End-to-end trace rows",
    purpose: "Show end-to-end trace steps with events, state changes, and blocked results.",
    defines: ["End-to-end trace scope: Upload -> Plan -> uiPlan -> Render -> Runtime -> Output (as documented in legacy section 2)."],
    supplement: <E2ETraceTable />,
    doesNotDefine: "Live trace capture policy for production environments.",
    href: "/docs/client/system-validation",
    linkLabel: "System Validation",
  },
  {
    id: "test-report-failure-summary",
    title: "Failure Summary",
    subtitle: "Determinism check and failure simulation",
    purpose: "Record determinism checks and failure simulation harness status from the legacy report.",
    defines: ["Determinism check list (verbatim):"],
    supplement: (
      <div className="space-y-4">
        <DeterminismCheckList />
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Failure simulation</p>
          <FailureSimulationTable />
        </div>
      </div>
    ),
    doesNotDefine: "Error Model category mapping for each scenario.",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
  {
    id: "test-report-follow-up",
    title: "Follow-up Use",
    subtitle: "Lock rule result",
    purpose: "Capture documentation lock status versus runtime conformance automation posture.",
    defines: [
      "Documentation LOCK status is MET. Runtime conformance automation remains implementation-phase validation and does not redefine architectural ownership locks.",
      "[TEXT TBD – expand Client Test Report detail]",
    ],
    doesNotDefine: "Cross-layer contract payload definitions (see Cross-Layer Contracts).",
    href: "/docs/client/conformance-tests",
    linkLabel: "Conformance Tests",
  },
] as const;

export default function TestReportPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Client Test Report"
        description="Structured reporting of Client validation command runs, end-to-end traces, determinism checks, failure simulations, and lock status."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Validation & Tests / Test Report</p>

      <DocsScopeBlocks links={CLIENT_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="How this report summarizes outcomes versus validation rules and test definitions."
        >
          <DocsOverviewBlock
            intro="The Client Test Report summarizes execution evidence from actual command runs in this workspace: lint/build results, conformance harness gaps, blocked end-to-end steps, determinism checks, and failure simulations. It differs from System Validation and Conformance Tests, which define what should pass; this page records what was run and what remained blocked."
            areasTitle="How it differs from spec pages"
            areas={[
              "System Validation: states goals, scope, and pass/fail criteria for the minimal scenario.",
              "Conformance Tests: defines suites, determinism rules, edge matrix, and lock validation rule.",
              "Test Report: tables and narrative status from concrete runs, including blocked harnesses.",
            ]}
            outOfScope="Redefining architectural ownership or replacing API Server execution evidence."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and this reporting slice.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="test-report-diagram" title="Test Report Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client test reporting"
            groups={[
              { title: "Test execution", items: ["Command runs (lint, build, conformance)", "testId, result, trace, timestamp"] },
              { title: "Result categories", items: ["pass / fail rows", "blocked end-to-end steps", "blocked determinism and simulations"] },
              { title: "Report outputs", items: ["Structured tables", "Lock rule result", "Follow-up to conformance automation"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="test-report-details" title="Client Test Report Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/client/system-validation", title: "System Validation", description: "Validation goals and scenario definition." },
              { href: "/docs/client/conformance-tests", title: "Conformance Tests", description: "Suite and determinism expectations this report exercises." },
              { href: "/docs/client/error-model", title: "Client Error Model", description: "Structured errors when runs fail or surface issues." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
