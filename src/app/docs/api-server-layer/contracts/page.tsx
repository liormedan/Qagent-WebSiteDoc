import type { DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";
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

const requestContractJson = `{
  "request_id": "string",
  "session_id": "string",
  "workspace_id": "string",
  "approved_plan": "object (plan reference + fingerprint)",
  "execution_context": "object",
  "requested_outputs": "object",
  "trace_context": "object"
}`;

const responseContractJson = `{
  "job_id": "string",
  "status": "queued | running | completed | failed",
  "progress": "object",
  "execution_id": "string | null",
  "version_id": "string | null",
  "result_refs": "object | null"
}`;

const errorContractJson = `{
  "error_code": "string",
  "message": "string",
  "trace_id": "string",
  "details": "object | null"
}`;

const jobContractJson = `{
  "job_id": "string",
  "immutable_decision_output": "object",
  "immutable_plan_intent": "object",
  "enqueue_timestamp": "string (ISO-8601)"
}`;

const authContractJson = `{
  "Authorization": "Bearer <token> | deployment-specific scheme",
  "token_claims": {
    "sub": "string",
    "session_id": "string",
    "scopes": "string[]"
  }
}`;

const preClass =
  "mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-3 text-xs text-slate-200 md:text-sm";

function buildContractDetails(): DocsDetailsItem[] {
  return [
    {
      id: "request-contract",
      title: "Request Contract",
      subtitle: "Execution Request Envelope",
      purpose: "Define the canonical intake shape for approved execution work entering the API Server Layer.",
      defines: [
        "Single normalized envelope accepted at `/run` after QAgent approval handoff.",
        "Conceptual fields align with Execution Request Envelope: identifiers, approved plan reference, execution context, requested outputs, trace context.",
      ],
      doesNotDefine: "QAgent-internal plan serialization beyond references required for execution.",
      href: "/docs/api/gateway",
      linkLabel: "API Gateway (/docs/api)",
      supplement: <pre className={preClass}>{requestContractJson}</pre>,
    },
    {
      id: "response-contract",
      title: "Response Contract",
      subtitle: "Status and result publication",
      purpose: "Describe outward-facing success shapes for job status and result references exposed to consumers.",
      defines: [
        "Job identity, lifecycle status, and progress objects owned by Status Tracker semantics.",
        "Stable references to execution and version identifiers for downstream lineage consumers.",
      ],
      doesNotDefine: "Client rendering of progress bars or UI copy.",
      href: "/docs/api/job-orchestration",
      linkLabel: "Job Orchestration (/docs/api)",
      supplement: <pre className={preClass}>{responseContractJson}</pre>,
    },
    {
      id: "error-contract",
      title: "Error Contract",
      subtitle: "Failure representation",
      purpose: "Standardize how API-visible failures are represented without leaking unsafe internals.",
      defines: [
        "Stable error codes and human-readable messages suitable for logs and clients.",
        "Trace identifiers correlating to orchestration and execution records.",
      ],
      doesNotDefine: "DSP-specific stack traces or raw persistence errors.",
      href: "/docs/api/request-handling",
      linkLabel: "Request Handling (/docs/api)",
      supplement: <pre className={preClass}>{errorContractJson}</pre>,
    },
    {
      id: "job-contract",
      title: "Job Contract",
      subtitle: "Immutable job definition",
      purpose: "Capture immutable job materialization fields enforced by orchestration documentation.",
      defines: [
        "Job identity with immutable decision output and executable plan intent references.",
        "Enqueue metadata for ordering and audit without post-materialization mutation of intent.",
      ],
      doesNotDefine: "Worker pool topology or autoscaling metrics.",
      href: "/docs/api/job-orchestration",
      linkLabel: "Job Orchestration (/docs/api)",
      supplement: <pre className={preClass}>{jobContractJson}</pre>,
    },
    {
      id: "authentication-contract",
      title: "Authentication Contract",
      subtitle: "Admission identity surface",
      purpose: "Summarize authentication data carried with API requests at contract level (not IdP configuration).",
      defines: [
        "Authorization header schemes expected at the API edge.",
        "Conceptual token claims linking identity to session and scope for admission decisions.",
      ],
      doesNotDefine: "Identity provider federation flows or refresh-token storage implementation.",
      href: "/docs/api/request-handling",
      linkLabel: "Request Handling (/docs/api)",
      supplement: <pre className={preClass}>{authContractJson}</pre>,
    },
  ];
}

const inThisPage = [
  { title: "Overview", subtitle: "Contract authority.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Contract taxonomy.", href: "#contracts-structure-diagram" },
  { title: "Details", subtitle: "Canonical summaries + shapes.", href: "#details" },
  { title: "Related Docs", subtitle: "Deep references.", href: "#related-docs" },
];

export default function ApiServerLayerContractsPage() {
  const contractDetails = buildContractDetails();

  return (
    <DocsContent>
      <ApiServerLayerSpecCanonicalNotice />
      <PageTitle
        title="API Server Layer - Contracts"
        description="Canonical interface summaries for this spec tree: request, response, error, job, and authentication contracts—schema-level clarity without operational DDL."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">API Server Layer (Spec) / Contracts</p>

      <DocsScopeBlocks
        covers="conceptual JSON shapes, field names, and contract boundaries for API ingress and publication surfaces in this spec tree."
        doesNotCover="database DDL, IdP configuration, DSP math, or full duplicate of every /docs/api validation rule."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="This page is the canonical contract source for the API Server Layer spec tree. It names the primary contract surfaces, shows conceptual shapes for each, and points to /docs/api pages for operational depth."
            areasTitle="Contract surfaces"
            areas={[
              "Request Contract (Execution Request Envelope intake).",
              "Response Contract (job status and result references).",
              "Error Contract (API-visible failure envelope).",
              "Job Contract (immutable job definition materialization).",
              "Authentication Contract (edge identity and claims).",
            ]}
            outOfScope="DSP execution contracts (see DSP contracts) and Data Layer persistence schemas."
            relatedBoundaries={[
              "Core Specification = behavioral authority in this spec tree.",
              "/docs/api = authoritative runtime documentation that must remain consistent with these summaries.",
            ]}
          />
          <div className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100 md:text-sm">
            <span className="font-semibold">Canonical ownership:</span> contract summaries on this page are authoritative for the{" "}
            <code className="text-emerald-50">/docs/api-server-layer/contracts</code> spec path; deeper evolution lives in /docs/api without
            contradicting these boundaries.
          </div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="contracts-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="API Contracts (spec tree)"
            groups={[
              { title: "Ingress contracts", items: ["Request Contract", "Authentication Contract"] },
              { title: "Lifecycle contracts", items: ["Job Contract", "Error Contract"] },
              { title: "Publication contracts", items: ["Response Contract", "Version references"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={contractDetails} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/api-server-layer/core", title: "Core Specification (this spec)", description: "Behavioral model and constraints." },
              { href: "/docs/api/gateway", title: "API Gateway (/docs/api)", description: "Operational entry boundary." },
              { href: "/docs/api/request-handling", title: "Request Handling (/docs/api)", description: "Validation and admission depth." },
              { href: "/docs/dsp-layer/contracts", title: "DSP Contracts", description: "Processing-layer payload contracts." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
