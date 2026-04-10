import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { API_SERVER_CANONICAL_NAME, API_SERVER_DOC_SOURCE_OF_TRUTH } from "@/lib/api-server-canonical";

const inPageLinks = [
  { title: "Overview", subtitle: "Scope and ownership boundaries.", href: "#overview" },
  { title: "API Structure Diagram", subtitle: "Entry, orchestration, and runtime flow.", href: "#api-structure-diagram" },
  { title: "API Details", subtitle: "Subsystem-by-subsystem definitions.", href: "#api-details" },
  { title: "Related Docs", subtitle: "Canonical cross-layer references.", href: "#related-docs" },
];

const apiAreas = [
  "request intake and validation",
  "job orchestration and lifecycle",
  "execution routing and result publication",
  "versioning and status projection",
];

const relatedBoundaries = [
  "API Server Layer = execution orchestration authority",
  "QAgent Layer = intent and plan authority",
  "Execution Layer = runtime action execution",
  "Versioning = version history authority",
];

const apiDetails = [
  {
    id: "api-gateway",
    title: "API Gateway",
    subtitle: "Entry boundary",
    purpose: "Define how execution requests enter API Server Layer.",
    defines: ["`/run` intake boundary", "entry route ownership", "request handoff toward validation"],
    doesNotDefine: "plan semantics or policy decisions.",
    href: "/docs/api/gateway",
  },
  {
    id: "request-handling",
    title: "Request Handling",
    subtitle: "Validation boundary",
    purpose: "Define structural validation before orchestration.",
    defines: ["input validation", "contract conformance checks", "rejection of invalid requests"],
    doesNotDefine: "runtime execution behavior.",
    href: "/docs/api/request-handling",
  },
  {
    id: "job-orchestration",
    title: "Job Orchestration",
    subtitle: "Lifecycle authority",
    purpose: "Define queueing and job lifecycle coordination.",
    defines: ["job creation", "queue orchestration", "status/progress authority"],
    doesNotDefine: "decision policy reinterpretation.",
    href: "/docs/api/job-orchestration",
  },
  {
    id: "execution-layer",
    title: "Execution Layer",
    subtitle: "Runtime execution",
    purpose: "Define plan execution routing and action dispatch.",
    defines: ["plan interpretation", "action dispatch", "result collection"],
    doesNotDefine: "job lifecycle ownership.",
    href: "/docs/api/execution",
  },
  {
    id: "decision-system",
    title: "Decision System",
    subtitle: "Policy decision authority",
    purpose: "Define admission and policy decisions before execution.",
    defines: ["policy decisions", "admission outcomes", "retry/policy ownership"],
    doesNotDefine: "runtime action execution.",
    href: "/docs/api/decision-system",
  },
  {
    id: "versioning",
    title: "Versioning",
    subtitle: "Version record authority",
    purpose: "Define version storage and versioned result references.",
    defines: ["version record creation", "reference stability", "version retrieval boundaries"],
    doesNotDefine: "execution runtime behavior.",
    href: "/docs/api/versioning",
  },
] as const;

const relatedDocs = [
  "API Server Layer = execution orchestration authority.",
  "QAgent Layer = intent and planning authority.",
  "Client Layer = user interaction and UI state authority.",
  "DSP Layer = processing execution specialization.",
];

export default function ApiPage() {
  return (
    <DocsContent>
      <PageTitle
        title={API_SERVER_CANONICAL_NAME}
        description="Execution orchestration layer that receives approved requests, manages jobs, and publishes runtime outcomes."
      />

      <DocsScopeBlocks
        covers="API entry, request validation, job orchestration, execution routing, and versioned output publication."
        doesNotCover="QAgent intent planning logic, client UI state ownership, and DSP internal processor implementation."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="API Server Layer is the execution orchestration boundary between approved planning artifacts and runtime execution outcomes."
            areasTitle="API areas"
            areas={apiAreas}
            outOfScope="plan interpretation ownership in QAgent and UI/runtime ownership in Client Layer."
            relatedBoundaries={relatedBoundaries}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageLinks} />
        </SectionBlock>

        <SectionBlock id="api-structure-diagram" title="API Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="API Server Layer"
            groups={[
              { title: "Entry", items: ["API Gateway", "Request Handling", "Decision System"] },
              { title: "Orchestration", items: ["Job Orchestration", "Status Tracker", "Queue Coordination"] },
              { title: "Runtime & Output", items: ["Execution Layer", "Versioning", "/jobs Result Projection"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="api-details" title="API Details" body={[]}>
          <LayerSpecAccordion items={[...apiDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs items={relatedDocs} />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Canonical location: <span className="font-semibold text-slate-100">{API_SERVER_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
          </p>
          <p className="text-sm text-[var(--muted)]">{API_SERVER_DOC_SOURCE_OF_TRUTH.rule}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
