import { DocsContent } from "@/components/layout/DocsContent";
import { ApiServerLayerSpecCanonicalNotice } from "@/components/ui/ApiDocsCanonicalNotices";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const inThisPage = [
  { title: "Overview", subtitle: "Scope and boundaries.", href: "#overview" },
  { title: "Core Structure Diagram", subtitle: "Behavior topology.", href: "#core-structure-diagram" },
  { title: "Details", subtitle: "Layer definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
];

const coreDetails = [
  {
    id: "layer-definition",
    title: "Layer Definition",
    subtitle: "Identity and system position",
    purpose: "Define the API Server Layer as the execution orchestration and publication boundary in WaveQ.",
    defines: [
      "API Server Layer sits between approved QAgent artifacts and runtime execution outcomes.",
      "Owns `/run` intake, job lifecycle authority, execution dispatch coordination, and `/jobs` publication surfaces.",
      "Mediates access to persistence without becoming the Data Layer canonical owner.",
    ],
    doesNotDefine: "UI interaction ownership (Client) or intent/planning ownership (QAgent).",
    href: "/docs/api-server-layer/core#layer-definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "What API must guarantee",
    purpose: "Enumerate orchestration responsibilities owned exclusively by the API layer at system abstraction.",
    defines: [
      "Validate and admit execution requests against documented contracts.",
      "Create immutable job definitions and coordinate queue, worker assignment, and status tracking authority.",
      "Trigger execution (including DSP) only through orchestrated, decision-backed paths.",
      "Publish versioned execution results and authoritative job status.",
    ],
    doesNotDefine: "DSP transform semantics or persistence schema DDL.",
    href: "/docs/api-server-layer/core#responsibilities",
    linkLabel: "This section",
  },
  {
    id: "execution-model",
    title: "Execution Model",
    subtitle: "Request to published outcome",
    purpose: "Describe the conceptual execution model from intake through execution trigger to outward publication.",
    defines: [
      "Ingress: Execution Request Envelope is the normalized handoff artifact from QAgent.",
      "Orchestration: Decision output feeds immutable job materialization and worker assignment without policy drift.",
      "Execution: Runnable context is interpreted and dispatched; DSP participates only as an execution adapter when scheduled.",
      "Publication: Execution Result Package and tracker-backed status feed versioning and `/jobs` surfaces.",
    ],
    doesNotDefine: "Per-field payload validation matrices (see Contracts and /docs/api/request-handling).",
    href: "/docs/api-server-layer/core#execution-model",
    linkLabel: "This section",
  },
  {
    id: "state-behavior",
    title: "State & Behavior",
    subtitle: "Authority and immutability",
    purpose: "Capture state ownership and behavioral invariants that must hold across API processing.",
    defines: [
      "Status Tracker is the single authority for job status and progress; no duplicate lifecycle owners.",
      "Job definitions and approved execution intent remain immutable after materialization within orchestration rules.",
      "Execution Layer emits a single canonical Execution Result Package per execution boundary.",
    ],
    doesNotDefine: "Client-side optimistic UI state or QAgent planning revisions post-approval.",
    href: "/docs/api-server-layer/core#state-behavior",
    linkLabel: "This section",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Non-ownership boundaries",
    purpose: "List constraints that keep API focused on control and orchestration rather than other layers’ work.",
    defines: [
      "Must not reinterpret QAgent-approved plan semantics inside execution.",
      "Must not implement DSP algorithms or own canonical persistence truth.",
      "Must not own client presentation policy beyond published API projections.",
    ],
    doesNotDefine: "DSP processor registry internals or Data Layer retention policies.",
    href: "/docs/api-server-layer/core#constraints",
    linkLabel: "This section",
  },
] as const;

export default function ApiServerLayerCorePage() {
  return (
    <DocsContent>
      <ApiServerLayerSpecCanonicalNotice />
      <PageTitle
        title="API Server Layer - Core Specification"
        description="Behavioral model for the API control plane: responsibilities, execution semantics, state authority, and constraints—without DSP internals or persistence DDL."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">API Server Layer (Spec) / Core Specification</p>

      <DocsScopeBlocks
        covers="layer definition, responsibilities, execution model, state authority, and API-layer constraints."
        doesNotCover="DSP processing internals, database schemas, client UI logic, or duplicate redefinitions of /docs/api subsystem pages."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Core Specification (API Server Layer spec) states the behavioral invariants of the control plane: what the API must enforce, how execution is triggered and bounded, and which responsibilities must not leak into DSP, Data, Client, or QAgent ownership."
            areasTitle="Core concerns"
            areas={[
              "Layer definition and orchestration authority versus neighboring layers.",
              "Execution model from approved intake through execution trigger to publication.",
              "State guarantees around immutability, tracker authority, and single canonical execution outputs.",
            ]}
            outOfScope="Field-by-field wire formats (see Contracts page) and worker implementation code paths."
            relatedBoundaries={[
              "Contracts page = interface summaries for this spec tree.",
              "Modules page = structural map of internal modules.",
              "Integration page = cross-layer flow summaries.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="core-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="API Core Specification"
            groups={[
              { title: "Identity", items: ["Layer Definition", "Responsibilities"] },
              { title: "Runtime model", items: ["Execution Model", "State & Behavior"] },
              { title: "Boundaries", items: ["Constraints", "Neighbor interfaces (DSP, Data, Client, QAgent)"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...coreDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/api-server-layer/contracts", title: "Contracts (this spec)", description: "Request, response, error, job, and authentication contract summaries." },
              { href: "/docs/api/core-flow", title: "API Core Flow (/docs/api)", description: "Canonical detailed runtime flow." },
              { href: "/docs/api/architecture", title: "API Architecture (/docs/api)", description: "Subsystem architecture reference." },
              { href: "/docs/api-server-layer/integration", title: "System Integration (this spec)", description: "Cross-layer ingress, DSP trigger, and Data interaction summaries." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
