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
  { title: "Overview", subtitle: "Scope and boundaries.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Behavior topology.", href: "#core-structure-diagram" },
  { title: "Details", subtitle: "Layer definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Contracts and integration.", href: "#related-docs" },
];

const coreDetails = [
  {
    id: "layer-definition",
    title: "Layer Definition",
    subtitle: "Identity and system position",
    purpose: "Define Infrastructure as the runtime support layer for execution, scheduling, reliability, and operational continuity.",
    defines: [
      "Sits below API orchestration and DSP execution adapters: supplies hosts, clusters, queues, workers, and ops hooks.",
      "Enables infra-managed execution: placement, supervision, restart policy, and capacity envelopes—not semantic validation of plans.",
      "Maps physical and virtual resources (CPU, memory, IO, network, disk classes) to the Job and Queue contracts in this spec tree.",
      "Bridges deployment profiles (regions, pools, tiers) to runnable units without encoding product policy.",
    ],
    doesNotDefine: "API business behavior, DSP semantics, canonical schemas, or client flows.",
    href: "/docs/infrastructure-layer/core#layer-definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "What infrastructure must guarantee",
    purpose: "Enumerate obligations at the substrate: runtime, queued work, reliability, and operational visibility.",
    defines: [
      "Providing execution runtime: isolation primitives, resource limits, and safe process/container lifecycle.",
      "Supporting queued and triggered work: durable ingress, routing hints, consumer scaling, and acknowledgment semantics.",
      "Supporting reliability and recoverability: redelivery rules, backoff coordination, poison paths, and health-driven failover hooks.",
      "Exposing operational visibility: structured logs, metrics, traces, and health endpoints aligned with Observability Signals.",
    ],
    doesNotDefine: "Admission rules for HTTP APIs, DSP algorithm choice, or retention semantics owned by Data documentation.",
    href: "/docs/infrastructure-layer/core#responsibilities",
    linkLabel: "This section",
  },
  {
    id: "execution-model",
    title: "Execution Model",
    subtitle: "From handoff to completion",
    purpose:
      "Separate execution responsibilities: Infrastructure owns the execution environment and execution handling (where and how a runnable runs). The API decides what should be executed (orchestration, admission, job materialization). DSP defines how processing is performed inside a runner once infrastructure has placed work.",
    defines: [
      "Infrastructure is responsible for execution environment and execution handling: isolation, scheduling onto workers, lifecycle (start/stop/restart), resource enforcement, queue leases, and completion signaling at the substrate.",
      "It does not decide what should be executed: which jobs exist, when they are admitted, and what immutable intent they carry remain API orchestration responsibilities—infra consumes Job Contract-shaped handoffs.",
      "It does not define how processing is performed: algorithms, transforms, graphs, and deterministic processing semantics are DSP (and related) responsibilities—infra supplies the host, dispatch path, and envelopes only.",
      "Routing: queue producers publish messages; routers/partitions apply delivery rules; consumers (Job Runners) claim work under visibility contracts.",
      "Downstream: DSP and other executors run inside the Execution Environment module; results exit via Execution Result Contract channels; semantic packaging stays with DSP/API docs.",
    ],
    doesNotDefine: "Orchestration policy (what runs), DSP processing semantics (how transforms run), per-field REST validation, or SQL transaction semantics inside domain services.",
    href: "/docs/infrastructure-layer/core#execution-model",
    linkLabel: "This section",
  },
  {
    id: "state-behavior",
    title: "State & Behavior",
    subtitle: "Operational state vs business truth",
    purpose: "Clarify what state infrastructure may hold and how it behaves without owning canonical business truth.",
    defines: [
      "May maintain operational/runtime state: queue depth, in-flight leases, worker heartbeats, cold/warm pool sizes, rollout revision markers.",
      "Does not own business truth: no authoritative plan, result, or lineage semantics—those remain API/DSP/Data concerns.",
      "Operational state is disposable or rebuildable under documented SLAs; rebuild must not imply reinterpretation of domain payloads.",
      "Redelivery and duplicate delivery are expected behaviors; upper layers tolerate them per Failure / Retry Contract and idempotency patterns they own.",
    ],
    doesNotDefine: "Canonical persistence records, client session UX state, or QAgent planning artifacts.",
    href: "/docs/infrastructure-layer/core#state-behavior",
    linkLabel: "This section",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Explicit non-ownership",
    purpose: "Lock boundaries so implementation cannot smuggle domain logic into the platform layer.",
    defines: [
      "No API business logic: no reinterpretation of execution intent, no alternate admission matrix, no user-facing policy inside infra code paths.",
      "No DSP semantics: no transform selection, no graph evaluation, no numeric processing ownership.",
      "No canonical data ownership: no schema authority, no lineage truth, no business retention rules—only operational storage support.",
      "No client logic: no UI routing, no session presentation, no product analytics definitions.",
    ],
    doesNotDefine: "Application service code inside repos—that is implementation detail governed outside this spec’s scope.",
    href: "/docs/infrastructure-layer/core#constraints",
    linkLabel: "This section",
  },
] as const;

export default function InfrastructureLayerCorePage() {
  return (
    <DocsContent>
      <PageTitle
        title="Infrastructure Layer - Core Specification"
        description="Behavioral model with clear execution split: Infrastructure owns execution environment and handling; API orchestrates what runs; DSP defines how processing runs inside infra-provided runtimes—plus responsibilities, state, and constraints."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Infrastructure Layer (Spec) / Core Specification</p>

      <DocsScopeBlocks
        covers="layer definition; responsibilities (runtime, queues, reliability, visibility); execution model; operational state and behavior; explicit constraints."
        doesNotCover="API business behavior; DSP processing semantics; canonical persistence rules; client or user interaction logic; duplicate orchestration definitions from /docs/api."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Core Specification is the behavioral authority for this Infrastructure spec tree. It defines how execution is hosted and scheduled, how reliability behaviors present at the substrate, and which invariants must hold so API, DSP, and Data docs remain the single owners of their domains."
            areasTitle="Core concerns"
            areas={[
              "Layer definition: infrastructure as runtime support, not domain orchestration.",
              "Responsibilities: runtime, queued/triggered work, recoverability, operational telemetry.",
              "Execution model: API decides what runs; Infrastructure runs it; DSP performs processing inside the provided environment—see Execution Model details.",
              "State & behavior: operational state only; no canonical business truth.",
              "Constraints: explicit bans on API, DSP, Data, and Client ownership inside this layer.",
            ]}
            outOfScope="Wire JSON in Contracts; cross-layer sequencing diagrams in Integration."
            relatedBoundaries={[
              "Contracts name field-level shapes for jobs, messages, results, retries, and signals.",
              "Modules map these behaviors onto named platform components.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="core-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Infrastructure Core Specification"
            groups={[
              { title: "Identity", items: ["Layer Definition", "Responsibilities"] },
              { title: "Runtime model", items: ["Execution Model", "State & Behavior"] },
              { title: "Boundaries", items: ["Constraints", "Neighbor interfaces (API, DSP, Data, Client)"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...coreDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/infrastructure-layer/contracts", title: "Contracts (this spec)", description: "Job, queue, result, retry, observability—canonical field shapes." },
              { href: "/docs/infrastructure-layer/modules", title: "Internal Modules (this spec)", description: "Queue, runner, environment, storage, monitoring, deployment." },
              { href: "/docs/infrastructure-layer/integration", title: "System Integration (this spec)", description: "API trigger, DSP hosting, Data support, reliability flow." },
              { href: "/docs/infrastructure-layer", title: "Overview (this spec)", description: "Layer entry point and structure map." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
