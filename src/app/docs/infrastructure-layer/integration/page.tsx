import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { INFRASTRUCTURE_SCOPE_LINKS } from "@/lib/docs-scope-links";
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
    subtitle: "API orchestrates; Infrastructure executes",
    purpose:
      "State the split clearly: the API triggers and orchestrates execution (what runs, when, under which orchestration policy). Infrastructure owns the execution runtime and manages how work is executed (placement, queues, workers, lifecycle, substrate completion).",
    defines: [
      "API triggers and orchestrates execution: admission, job creation, orchestration policy, and handoff of a Job Contract-compatible unit—infra does not originate that decision.",
      "Infrastructure owns execution runtime and manages how work is executed: enqueue, route, claim, supervise processes/containers, apply resource limits, emit Execution Result Contract at the runner boundary.",
      "Enqueue and autoscale react to orchestration signals and queue metrics without re-validating business meaning of payloads.",
      "Secrets and runtime profiles are resolved from deployment metadata, not from ad-hoc reinterpretation of API semantics inside infra.",
      "Status upward from runners uses Execution Result Contract; API layers publication and user-facing job semantics on top.",
    ],
    doesNotDefine: "HTTP route tables, auth token validation matrices, or `/run` JSON beyond what API docs specify.",
    href: "/docs/api-server-layer/integration",
    linkLabel: "API Server — System Integration",
  },
  {
    id: "infrastructure-to-dsp",
    title: "Infrastructure → DSP",
    subtitle: "Execution support and runtime dispatch",
    purpose:
      "DSP performs processing within the execution environment provided by Infrastructure: infra supplies the runtime, dispatch, and resource envelope; DSP owns all processing semantics inside that boundary.",
    defines: [
      "DSP performs processing inside Infrastructure’s Execution Environment—hosts, containers, sandboxes, and resource ceilings are infra-owned.",
      "Infrastructure provides execution support and runtime dispatch (claim work, start/stop runner, attach storage/network policy); DSP does not own queue or node placement.",
      "Job Runner performs OS-level process lifecycle; DSP owns in-process transform semantics, graphs, and deterministic processing rules.",
      "Optional GPU/accelerator placement is an infrastructure capability exposed via profiles, not DSP orchestration logic.",
      "Completion paths emit Execution Result Contract records at the substrate; DSP-specific result packaging and transform outputs stay in DSP documentation.",
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
        description="Orchestration (API) vs execution (Infrastructure) vs processing (DSP): API triggers and orchestrates execution; Infrastructure owns runtime and how work runs; DSP performs processing inside Infrastructure’s execution environment—plus Data support and reliability flows."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Infrastructure Layer (Spec) / System Integration</p>

      <DocsScopeBlocks links={INFRASTRUCTURE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="System Integration states execution responsibility in one line: API triggers and orchestrates execution; Infrastructure owns the execution runtime and manages how work is executed; DSP performs processing inside the execution environment Infrastructure provides. Data and reliability flows attach without blurring those three roles."
            areasTitle="Integration concerns"
            areas={[
              "Orchestration (API): triggers execution, decides what runs and under which policy, materializes jobs—does not replace infra queues or worker lifecycles.",
              "Execution (Infrastructure): owns runtime, placement, supervision, and substrate completion—does not decide business “what” or DSP “how”.",
              "Processing (DSP): runs inside infra-provided environments; owns transforms and processing semantics—not queue placement or orchestration.",
              "Data: canonical persistence; Infrastructure supplies durable execution of storage operations only.",
              "Reliability: spans queues, runners, telemetry, and deployment gates without merging orchestration into ops code.",
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
              { title: "Orchestration (API)", items: ["Triggers & orchestrates execution", "Job materialization → handoff"] },
              { title: "Execution (Infrastructure)", items: ["Runtime ownership", "How work runs: enqueue, run, supervise"] },
              { title: "Processing & platform", items: ["DSP (processing inside infra environment)", "Data substrates", "Reliability & continuity"] },
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
