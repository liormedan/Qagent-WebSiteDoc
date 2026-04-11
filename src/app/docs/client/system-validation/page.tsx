import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const SCENARIO_ASCII = `Upload -> Plan -> uiPlan -> Render -> Runtime -> Output`;

function SystemValidationScenarioBlock() {
  return (
    <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{SCENARIO_ASCII}</pre>
  );
}

const inPageLinks = [
  { title: "Overview", subtitle: "Validation role in Client docs.", href: "#overview" },
  { title: "System Validation Diagram", subtitle: "Inputs, checks, outputs.", href: "#system-validation-diagram" },
  { title: "Validation Goals", subtitle: "Minimal success and lock-level intent.", href: "#system-validation-goals" },
  { title: "Validation Scope", subtitle: "Scenario and expected states.", href: "#system-validation-scope" },
  { title: "Validation Checks", subtitle: "States, pass/fail, UI expectations.", href: "#system-validation-checks" },
  { title: "Failure Conditions", subtitle: "What constitutes FAIL.", href: "#system-validation-failure" },
  { title: "Reporting Use", subtitle: "How this ties to test artifacts.", href: "#system-validation-reporting" },
  { title: "Related Docs", subtitle: "Conformance, report, errors, lifecycle.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "system-validation-goals",
    title: "Validation Goals",
    subtitle: "Minimal success scenario",
    purpose: "State the intent of system validation for Client layer integrity.",
    defines: [
      "Minimal success scenario for lock-level validation.",
      "Validation proves the happy-path chain from upload through plan, uiPlan, render, runtime, and output behaves as an integrated Client system.",
      "[TEXT TBD – expand System Validation detail]",
    ],
    doesNotDefine: "Executable test harness implementation (see Conformance Tests and Test Report).",
    href: "/docs/client/system-validation",
    linkLabel: "Canonical page",
  },
  {
    id: "system-validation-scope",
    title: "Validation Scope",
    subtitle: "Scenario line and expected states",
    purpose: "Bound the validation narrative with the canonical scenario and expected intermediate states.",
    defines: [
      "Expected states:",
      "Chat: input accepted, response with plan+uiPlan.",
      "Canvas: uiPlan validated and rendered fully.",
      "Runtime: ready -> running -> completed transitions emitted.",
      "Output: result visible and aligned with completed state.",
    ],
    supplement: <SystemValidationScenarioBlock />,
    doesNotDefine: "Event envelope field semantics (see Event Contract).",
    href: "/docs/client/conformance-tests",
    linkLabel: "Conformance Tests",
  },
  {
    id: "system-validation-checks",
    title: "Validation Checks",
    subtitle: "Pass criteria and UI expectations",
    purpose: "Consolidate pass criteria and UI expectations that validate the scenario.",
    defines: [
      "Pass/Fail criteria — PASS: no partial render, no stale state apply, deterministic final state.",
      "Pass/Fail criteria — FAIL: ghost state, mismatched status, missing output, or silent contract violation.",
      "UI expectations: immediate feedback for each step.",
      "UI expectations: visible progress while running.",
      "UI expectations: clear success/failure terminal feedback.",
    ],
    doesNotDefine: "Individual suite matrices (see Conformance Tests).",
    href: "/docs/client/conformance-tests",
    linkLabel: "Conformance Tests",
  },
  {
    id: "system-validation-failure",
    title: "Failure Conditions",
    subtitle: "FAIL line items",
    purpose: "Isolate failure signals that invalidate the minimal success scenario.",
    defines: [
      "FAIL when ghost state appears.",
      "FAIL when status is mismatched across surfaces/runtime.",
      "FAIL when output is missing despite completed expectations.",
      "FAIL on silent contract violation without surfaced error.",
    ],
    doesNotDefine: "Canonical error JSON (see Error Model).",
    href: "/docs/client/error-model",
    linkLabel: "Error Model",
  },
  {
    id: "system-validation-reporting",
    title: "Reporting Use",
    subtitle: "Conformance tests and test report",
    purpose: "Explain how system validation intent maps to conformance suites and recorded test reports.",
    defines: [
      "Conformance Tests capture executable scenarios and determinism expectations derived from these validation goals.",
      "Test Report records command-run evidence and blocked traces where automation is not yet present.",
      "[TEXT TBD – expand System Validation detail]",
    ],
    doesNotDefine: "Cross-layer bridge payload catalog (see Cross-Layer Contracts).",
    href: "/docs/client/test-report",
    linkLabel: "Test Report",
  },
] as const;

export default function SystemValidationPage() {
  return (
    <DocsContent>
      <PageTitle
        title="System Validation"
        description="How the Client layer validates end-to-end system behavior and integrity for the minimal upload-to-output success scenario."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Section Path: Client / Validation & Tests / System Validation</p>

      <DocsScopeBlocks
        covers="Client-layer validation of integrated behavior: scenario, expected states, pass/fail criteria, and UI expectations for lock-level integrity—not runtime ownership or event contract structure."
        doesNotCover="Per-event contract field rules, state ownership matrix authority, or API Server execution lifecycle."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock
          id="overview"
          title="Overview"
          body={[]}
          summaryPreview="What system validation means in Client context and how it relates to conformance tests and the test report."
        >
          <DocsOverviewBlock
            intro="System Validation defines the minimal success scenario for lock-level validation across Chat, Canvas, Runtime, and Output: what must be true when Upload leads through Plan and uiPlan to Render, Runtime, and visible Output. Minimal success scenario for lock-level validation anchors engineering judgment before declaring the Client path implementation-ready."
            areasTitle="Relation to other Validation & Tests pages"
            areas={[
              "Conformance Tests: executable suites and determinism matrices that prove contract conformance.",
              "Test Report: recorded outcomes from actual command runs and blocked traces in this workspace.",
              "This page states goals, scope, checks, and failure conditions; the others operationalize or record them.",
            ]}
            outOfScope="QAgent planning internals and API Server job lifecycle as authoritative execution truth."
            relatedBoundaries={[
              "Client Layer owns local UI/runtime behavior, projection, and validation of this scenario.",
              "QAgent owns intent and planning.",
              "API Server owns execution lifecycle.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="system-validation-diagram" title="System Validation Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Client system validation"
            groups={[
              { title: "Validation inputs", items: ["Scenario path (Upload through Output)", "Expected state checklist", "UI feedback expectations"] },
              { title: "Validation checks", items: ["Pass: no partial render, no stale apply, deterministic final state", "Fail: ghost state, mismatch, missing output, silent violation"] },
              { title: "Outputs / results", items: ["Conformance mapping", "Test report evidence", "Lock-level readiness signal"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="system-validation-details" title="System Validation Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/client/conformance-tests", title: "Conformance Tests", description: "Executable conformance and determinism expectations." },
              { href: "/docs/client/test-report", title: "Client Test Report", description: "Recorded command outcomes and traces—not the validation spec itself." },
              { href: "/docs/client/error-model", title: "Client Error Model", description: "Structured client errors when validation or runtime fails." },
              { href: "/docs/client/runtime-lifecycle", title: "Runtime Lifecycle", description: "Runtime state machine referenced by the scenario." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
