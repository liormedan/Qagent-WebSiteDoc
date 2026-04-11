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
  { title: "Overview", subtitle: "Cross-layer intent.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Flow topology.", href: "#integration-structure-diagram" },
  { title: "Details", subtitle: "Flow summaries.", href: "#details" },
  { title: "Related Docs", subtitle: "Canonical flows.", href: "#related-docs" },
];

const integrationDetails = [
  {
    id: "qagent-to-api",
    title: "QAgent → API Flow",
    subtitle: "Approved handoff",
    purpose: "Describe how approved planning artifacts become API-orchestrated execution requests.",
    defines: [
      "Execution Request Envelope crosses from QAgent to API `/run` as the only normalized intake contract.",
      "API validates and admits without reinterpreting approved plan semantics.",
    ],
    doesNotDefine: "QAgent intent algorithms or clarification UX.",
    href: "/docs/api/core-flow",
    linkLabel: "API Core Flow (/docs/api)",
  },
  {
    id: "api-to-dsp",
    title: "API → DSP Trigger",
    subtitle: "Execution-time processing",
    purpose: "Summarize how orchestrated execution invokes DSP without transferring orchestration ownership.",
    defines: [
      "DSP is invoked only from execution paths scheduled by API orchestration decisions.",
      "API remains owner of job lifecycle while DSP owns deterministic transform execution.",
    ],
    doesNotDefine: "DSP processor graphs or codec behavior.",
    href: "/docs/dsp-layer/system-integration",
    linkLabel: "DSP System Integration",
  },
  {
    id: "api-to-data",
    title: "API → Data Interaction",
    subtitle: "Mediated persistence",
    purpose: "Clarify mediated reads and writes against Data Layer policy without API owning canonical truth.",
    defines: [
      "API coordinates persistence operations required by execution outcomes.",
      "Identifiers, lineage, and version references align with Data Layer governance as documented.",
    ],
    doesNotDefine: "Canonical schema authority (Data Layer documentation).",
    href: "/docs/data-layer/system-view",
    linkLabel: "Data Layer System View",
  },
  {
    id: "response-lifecycle",
    title: "Response Lifecycle",
    subtitle: "Publication to consumers",
    purpose: "Outline how status and results propagate to QAgent and Client-facing projections.",
    defines: [
      "Status Tracker backs `/jobs` surfaces as the authoritative lifecycle view.",
      "Versioned execution references are published for downstream consumption without duplicate owners.",
    ],
    doesNotDefine: "Client rendering policies or websocket transport details.",
    href: "/docs/api/versioning",
    linkLabel: "Versioning (/docs/api)",
  },
] as const;

export default function ApiServerLayerIntegrationPage() {
  return (
    <DocsContent>
      <ApiServerLayerSpecCanonicalNotice />
      <PageTitle
        title="API Server Layer - System Integration"
        description="Cross-layer flows for QAgent ingress, DSP execution triggering, mediated Data Layer interaction, and response publication—without low-level worker or DSP internals."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">API Server Layer (Spec) / System Integration</p>

      <DocsScopeBlocks
        covers="QAgent to API intake, API to DSP execution trigger, API to Data mediation, and response publication lifecycle at spec abstraction."
        doesNotCover="DSP algorithms, persistence DDL, worker implementation, or client UI code paths."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="System Integration (API Server Layer spec) explains how the API sits between upstream planning and downstream processing/storage, and how published responses return across the system boundary."
            areasTitle="Integration concerns"
            areas={[
              "Approved QAgent artifacts become orchestrated API jobs.",
              "Execution triggers DSP where the plan requires processing transforms.",
              "Persistence interactions remain mediated and accountable to Data Layer rules.",
            ]}
            outOfScope="Line-by-line orchestration pseudocode and network retry matrices."
            relatedBoundaries={[
              "DSP and Data pages remain authoritative for their respective domains.",
              "/docs/api/core-flow remains the canonical detailed flow reference.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="integration-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="API Integration (spec)"
            groups={[
              { title: "Upstream", items: ["QAgent → Execution Request Envelope", "Client → authenticated API calls"] },
              { title: "API control path", items: ["Validate & admit", "Orchestrate job", "Dispatch execution", "Publish status / version"] },
              { title: "Downstream", items: ["DSP execution (when scheduled)", "Data Layer (mediated)", "Clients & QAgent (consume /jobs)"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...integrationDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/api/core-flow", title: "API Core Flow (/docs/api)", description: "Canonical detailed cross-module flow." },
              { href: "/docs/system-flow", title: "System Flow", description: "Cross-layer runtime reference for the whole system." },
              { href: "/docs/api-server-layer/contracts", title: "Contracts (this spec)", description: "Interface summaries supporting these flows." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
