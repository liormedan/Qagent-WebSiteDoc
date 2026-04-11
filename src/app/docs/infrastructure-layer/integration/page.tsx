import { DocsContent } from "@/components/layout/DocsContent";
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
    id: "api-to-infrastructure",
    title: "API → Infrastructure",
    subtitle: "API triggers infra-managed runtime work",
    purpose: "Describe how API-orchestrated execution becomes infra-managed runtime work: materialized jobs, enqueued messages, and placed workers.",
    defines: [
      "API remains owner of when a job exists and what policy applies; infrastructure receives Job Contract-compatible materialization.",
      "Enqueue and autoscale react to orchestration signals and queue metrics without re-validating business fields.",
      "Secrets and runtime profiles are resolved from deployment metadata, not from ad-hoc API fields.",
      "Status upward from runners uses Execution Result Contract; API layers its publication model on top.",
    ],
    doesNotDefine: "HTTP route tables, auth token validation matrices, or `/run` JSON beyond what API docs specify.",
    href: "/docs/api-server-layer/integration",
    linkLabel: "API Server — System Integration",
  },
  {
    id: "infrastructure-to-dsp",
    title: "Infrastructure → DSP",
    subtitle: "Execution support and runtime dispatch",
    purpose: "Clarify how infrastructure provides execution support and runtime dispatch for DSP work after scheduling decisions are made upstream.",
    defines: [
      "DSP binaries/libraries execute inside Execution Environment boundaries with resource envelopes from Job Contract.",
      "Job Runner performs process lifecycle; DSP owns in-process transform semantics.",
      "Optional GPU/accelerator placement is an infrastructure capability exposed via profiles, not DSP logic.",
      "Completion paths emit Execution Result Contract records; DSP-specific result packaging stays in DSP documentation.",
    ],
    doesNotDefine: "Processor graphs, codec choice, or deterministic transform definitions.",
    href: "/docs/dsp-layer/system-integration",
    linkLabel: "DSP — System Integration",
  },
  {
    id: "infrastructure-to-data",
    title: "Infrastructure → Data",
    subtitle: "Runtime storage and execution outputs",
    purpose: "Explain how infrastructure supports runtime storage and execution outputs while Data Layer remains canonical persistence authority.",
    defines: [
      "Managed databases, object stores, and file services supply HA, replication, and backup primitives.",
      "Workers read/write through application DAL patterns documented under Data; infra does not reinterpret lineage.",
      "Large artifacts may land on object tiers referenced by handles; canonical ownership and retention rules stay in Data docs.",
      "Restore drills and failover exercises are operational procedures built on Storage Infrastructure capabilities.",
    ],
    doesNotDefine: "Table design, canonical vs derived definitions, or business retention law.",
    href: "/docs/data-layer/system-view",
    linkLabel: "Data Layer — System View",
  },
  {
    id: "system-reliability-flow",
    title: "System Reliability Flow",
    subtitle: "Retry, monitoring, recovery, continuity",
    purpose: "Show how infrastructure provides retry support, monitoring, recovery support, and operational continuity across the stack.",
    defines: [
      "Retry: Failure / Retry Contract drives requeue/backoff; orchestration caps attempts; poison paths surface to operators.",
      "Monitoring: Observability Signals feed SLO dashboards for infra KPIs (latency, depth, saturation) distinct from product KPIs.",
      "Recovery: node drain, AZ failover, broker repair, and snapshot restore are infra playbooks that preserve job_id correlation.",
      "Continuity: health gates block bad rollouts; cached warm pools shorten cold-start critical paths without changing API semantics.",
    ],
    doesNotDefine: "Client-visible retry UX, marketing uptime commitments, or API error code catalogs.",
    href: "/docs/infrastructure-layer/contracts",
    linkLabel: "Contracts — Failure / Retry & Observability (this spec)",
  },
] as const;

export default function InfrastructureLayerIntegrationPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Infrastructure Layer - System Integration"
        description="Cross-layer integration: API-triggered infra work, DSP hosting and dispatch, Data-aligned storage support, and system-wide reliability flows—structural framing without API or DSP logic."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Infrastructure Layer (Spec) / System Integration</p>

      <DocsScopeBlocks
        covers="API → Infrastructure triggers; Infrastructure → DSP execution support; Infrastructure → Data storage support; System Reliability Flow (retry, monitoring, recovery, continuity)."
        doesNotCover="DSP algorithms; API request handling internals; SQL schema authority; client UI flows."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="System Integration ties the Infrastructure spec to its neighbors at a flow level: who triggers work, where DSP runs, how storage is supported, and how reliability behaviors propagate. It complements the structural diagrams elsewhere with a responsibility-oriented map—not a replacement for /docs/system-flow."
            areasTitle="Integration concerns"
            areas={[
              "API triggers infra-managed runtime work after orchestration decisions.",
              "Infrastructure hosts DSP execution and supplies dispatch and resources.",
              "Infrastructure supplies durable media and ops procedures; Data defines what is canonical.",
              "Reliability flows span queues, runners, telemetry, and deployment gates end to end.",
            ]}
            outOfScope="Vendor-specific runbooks beyond named capabilities; keep those in operations playbooks external to this tree."
            relatedBoundaries={[
              "API, DSP, and Data documentation remain authoritative for their semantics.",
              "Contracts on this tree remain authoritative for infra message/signal shapes used in these flows.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="integration-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Structural integration map (responsibility buckets). For full runtime graph detail, use System Flow where applicable.
          </p>
          <DocsDiagram
            mode="structure"
            root="Infrastructure Integration (spec)"
            groups={[
              { title: "Upstream trigger", items: ["API orchestration → Job Contract", "Policy & secrets resolution"] },
              { title: "Infrastructure path", items: ["Enqueue & route", "Run & supervise", "Results & telemetry"] },
              { title: "Downstream & platform", items: ["DSP (hosted)", "Data substrates (supported)", "Reliability & continuity"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...integrationDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/infrastructure-layer/core", title: "Core Specification (this spec)", description: "Execution and state model underlying these flows." },
              { href: "/docs/infrastructure-layer/contracts", title: "Contracts (this spec)", description: "Shapes used across API, DSP, and reliability handoffs." },
              { href: "/docs/system-flow", title: "System Flow", description: "Cross-layer runtime reference." },
              { href: "/docs/infrastructure-layer", title: "Overview (this spec)", description: "Layer entry point and taxonomy diagram." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
