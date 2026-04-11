import Link from "next/link";
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

import { API_SERVER_SPEC_SCOPE_LINKS } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "Role of this layer spec.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Ingress, control plane, egress.", href: "#api-layer-structure-diagram" },
  { title: "Details", subtitle: "Light orientation entries.", href: "#details" },
  { title: "Core Specification", subtitle: "Behavior model.", href: "/docs/api-server-layer/core" },
  { title: "Contracts", subtitle: "Interface authority.", href: "/docs/api-server-layer/contracts" },
  { title: "Internal Modules", subtitle: "Implementation map.", href: "/docs/api-server-layer/modules" },
  { title: "System Integration", subtitle: "Cross-layer flows.", href: "/docs/api-server-layer/integration" },
  { title: "Related Docs", subtitle: "Canonical /docs/api reference.", href: "#related-docs" },
];

const overviewDetails = [
  {
    id: "api-spec-purpose",
    title: "Layer Spec Purpose",
    subtitle: "How this section relates to /docs/api",
    purpose: "Orient readers to this API Server Layer spec tree as a structured companion to the canonical runtime docs under /docs/api.",
    defines: [
      "Core, Contracts, Modules, and Integration pages summarize behavior, interfaces, structure, and cross-layer flows.",
      "Field-level and subsystem-deep rules remain on /docs/api and linked child pages.",
    ],
    doesNotDefine: "New endpoint paths, alternate ownership models, or replacements for /docs/api authority.",
    href: "/docs/api",
    linkLabel: "Canonical API docs (/docs/api)",
  },
  {
    id: "api-control-plane",
    title: "Control & Orchestration Summary",
    subtitle: "What API owns at system level",
    purpose: "State the API Server Layer as the control and orchestration boundary between approved planning artifacts and runtime outcomes.",
    defines: [
      "Receives approved execution requests (Execution Request Envelope) from QAgent and structured client traffic where applicable.",
      "Validates, admits, orchestrates jobs, triggers execution (including DSP where scheduled), and mediates Data Layer access.",
      "Publishes status, results, and version references for downstream consumers.",
    ],
    doesNotDefine: "DSP mathematics, persistence DDL, or client UI state machines.",
    href: "/docs/api/core-flow",
    linkLabel: "API Core Flow",
  },
] as const;

export default function ApiServerLayerSpecOverviewPage() {
  return (
    <DocsContent>
      <ApiServerLayerSpecCanonicalNotice />
      <PageTitle
        title="API Server Layer"
        description="Layer spec: control and orchestration boundary between Client/QAgent ingress, runtime execution (including DSP), mediated Data Layer access, and published responses."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">API Server Layer (Spec) / Overview</p>

      <DocsScopeBlocks links={API_SERVER_SPEC_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Why the API layer exists, what it controls, and how this spec is organized.">
          <DocsOverviewBlock
            intro="The API Server Layer is the WaveQ execution control plane: it accepts normalized execution requests, enforces admission and validation rules, orchestrates asynchronous jobs, triggers execution (including DSP processing where applicable), coordinates mediated persistence access, and publishes authoritative status and versioned results."
            areasTitle="What this overview highlights"
            areas={[
              "Ingress from Client and QAgent (Execution Request Envelope) versus API-owned validation and orchestration.",
              "Internal control-plane stages: authentication/admission, validation, orchestration, execution trigger, response publication.",
              "Egress toward DSP processing and Data Layer persistence without collapsing ownership.",
            ]}
            outOfScope="Processor-level DSP algorithms, canonical persistence definitions owned by Data Layer docs, and pixel-level UI work."
            relatedBoundaries={[
              "Canonical field and subsystem depth remains under /docs/api per API Server documentation source of truth.",
              "This spec tree summarizes and structures; it does not redefine canonical semantics.",
            ]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">
            Operational deep spec:{" "}
            <Link href="/docs/api" className="font-medium text-[var(--accent)] hover:underline">
              /docs/api
            </Link>
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="api-layer-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            High-level map only: shows ingress, API control-plane buckets, and egress toward DSP and Data Layer. Endpoint lists and job state machines live under /docs/api.
          </p>
          <DocsDiagram
            mode="structure"
            root="API Server Layer"
            groups={[
              {
                title: "Ingress",
                items: ["Client Layer (API consumers)", "QAgent Layer (Execution Request Envelope to /run)"],
              },
              {
                title: "Control plane",
                items: ["Auth & admission", "Validation & routing", "Orchestration (jobs / queue / status)", "Execution trigger", "Response & versioning"],
              },
              {
                title: "Egress & neighbors",
                items: ["DSP / Processing (execution invocation)", "Data Layer (mediated reads/writes)", "Published status & results to clients"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...overviewDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/api", title: "API Server (/docs/api)", description: "Canonical runtime documentation, endpoints, and subsystem depth." },
              { href: "/docs/q-agent", title: "QAgent Layer", description: "Planning, approval, and execution handoff authority." },
              { href: "/docs/data-layer", title: "Data Layer", description: "Canonical persistence and mediation boundaries." },
              { href: "/docs/dsp-layer", title: "DSP / Processing Layer", description: "Deterministic processing execution authority." },
              { href: "/docs/system-flow", title: "System Flow", description: "Cross-layer runtime reference." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
