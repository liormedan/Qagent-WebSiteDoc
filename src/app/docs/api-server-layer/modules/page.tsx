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
  { title: "Overview", subtitle: "Module map intent.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Internal modules.", href: "#modules-structure-diagram" },
  { title: "Details", subtitle: "Per-module summaries.", href: "#details" },
  { title: "Related Docs", subtitle: "/docs/api depth.", href: "#related-docs" },
];

const moduleDetails = [
  {
    id: "auth-module",
    title: "Auth Module",
    subtitle: "Edge admission identity",
    purpose: "Summarize authentication and authorization responsibilities at the API edge.",
    defines: [
      "Validates credentials or tokens presented with inbound requests.",
      "Feeds admission decisions into request handling without owning business planning.",
    ],
    doesNotDefine: "Client session UX or QAgent approval semantics.",
    href: "/docs/api/request-handling",
    linkLabel: "Request Handling (/docs/api)",
  },
  {
    id: "validation-layer",
    title: "Validation Layer",
    subtitle: "Structural and policy conformance",
    purpose: "Describe validation responsibilities before orchestration accepts work.",
    defines: [
      "Structural validation of envelopes and required fields.",
      "Conformance checks against documented contracts prior to job materialization.",
    ],
    doesNotDefine: "DAL planning validation owned by QAgent.",
    href: "/docs/api/request-handling",
    linkLabel: "Request Handling (/docs/api)",
  },
  {
    id: "orchestration-layer",
    title: "Orchestration Layer",
    subtitle: "Queues, jobs, status",
    purpose: "Capture orchestration modules that own asynchronous lifecycle coordination.",
    defines: [
      "Queue coordination and job creation from immutable decision outputs.",
      "Status Tracker authority for progress and completion semantics.",
      "Worker assignment without execution reinterpretation.",
    ],
    doesNotDefine: "DSP processor selection logic inside execution engines.",
    href: "/docs/api/job-orchestration",
    linkLabel: "Job Orchestration (/docs/api)",
  },
  {
    id: "job-manager",
    title: "Job Manager",
    subtitle: "Immutable job materialization",
    purpose: "Define Job Manager as the materialization boundary for runnable job context.",
    defines: [
      "Produces immutable job definitions tied to approved decision outputs.",
      "Hands runnable context to execution dispatch without mutating plan meaning.",
    ],
    doesNotDefine: "Client-visible job labels or UI mapping.",
    href: "/docs/api/job-orchestration",
    linkLabel: "Job Orchestration (/docs/api)",
  },
  {
    id: "execution-dispatcher",
    title: "Execution Dispatcher",
    subtitle: "Execution Layer interface",
    purpose: "Summarize dispatch responsibilities into Execution Layer and external executors (including DSP).",
    defines: [
      "Routes runnable contexts into Execution Layer subsystems.",
      "Coordinates runtime actions and collects the Execution Result Package boundary.",
      "Invokes DSP or other executors only through orchestrated interfaces.",
    ],
    doesNotDefine: "DSP transform implementations or Data Layer storage drivers.",
    href: "/docs/api/execution",
    linkLabel: "Execution Layer (/docs/api)",
  },
] as const;

export default function ApiServerLayerModulesPage() {
  return (
    <DocsContent>
      <ApiServerLayerSpecCanonicalNotice />
      <PageTitle
        title="API Server Layer - Internal Modules"
        description="Structural map of API internal modules: auth, validation, orchestration, job materialization, and execution dispatch—aligned with /docs/api subsystem pages."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">API Server Layer (Spec) / Internal Modules</p>

      <DocsScopeBlocks
        covers="module responsibilities at the API layer and how they connect to canonical /docs/api subsystem documentation."
        doesNotCover="implementation code, worker binaries, database drivers, or DSP algorithm internals."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Internal Modules summarizes how the API Server Layer decomposes into edge admission, validation, orchestration, immutable job creation, and execution dispatch. Names align with the /docs/api navigation model while staying at system/spec abstraction."
            areasTitle="Module map"
            areas={[
              "Auth and validation precede orchestration acceptance.",
              "Orchestration owns queues, jobs, and tracker-backed status.",
              "Execution dispatch bridges into Execution Layer and external processors such as DSP.",
            ]}
            outOfScope="Class-level code layout and repository folder structure."
            relatedBoundaries={[
              "Each module deep spec remains under its /docs/api child page.",
              "Integration page summarizes cross-layer flows using these module roles.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="modules-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="API Internal Modules"
            groups={[
              { title: "Edge", items: ["Auth Module", "Validation Layer"] },
              { title: "Orchestration", items: ["Orchestration Layer", "Job Manager", "Status Tracker (conceptual)"] },
              { title: "Execution", items: ["Execution Dispatcher", "Execution Layer interface"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...moduleDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/api/architecture", title: "API Architecture (/docs/api)", description: "Subsystem diagram and module relationships." },
              { href: "/docs/api-server-layer/core", title: "Core Specification (this spec)", description: "Behavioral model and constraints." },
              { href: "/docs/api-server-layer/integration", title: "System Integration (this spec)", description: "Cross-layer flows using these modules." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
