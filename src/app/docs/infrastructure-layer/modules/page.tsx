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
  { title: "Overview", subtitle: "Module map intent.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Internal modules.", href: "#modules-structure-diagram" },
  { title: "Details", subtitle: "Per-module summaries.", href: "#details" },
  { title: "Related Docs", subtitle: "Core and integration.", href: "#related-docs" },
];

const moduleDetails = [
  {
    id: "queue-system",
    title: "Queue System",
    subtitle: "Queueing support and delivery behavior",
    purpose: "Own broker-facing primitives: enqueue, lease, ack/nack, DLQ, and replay—without assigning business meaning to payloads.",
    defines: [
      "Configures topics/queues/streams, retention, and visibility semantics aligned with Queue Message Contract.",
      "Implements delivery guarantees advertised per deployment (at-least-once vs exactly-once where supported).",
      "Surfaces depth, age, and poison metrics for autoscale and alerting.",
      "Preserves message_id and job_id correlation across replay and DLQ moves.",
    ],
    doesNotDefine: "Business meaning of messages, API admission, or orchestration decision logic.",
    href: "/docs/infrastructure-layer/contracts",
    linkLabel: "Contracts — Queue Message (this spec)",
  },
  {
    id: "job-runner",
    title: "Job Runner",
    subtitle: "Worker and job execution responsibility",
    purpose: "Supervise claiming work, executing child processes/containers, and emitting Execution Result and retry signals.",
    defines: [
      "Implements pull/push consumers with concurrency limits and graceful drain on shutdown.",
      "Tracks run_attempt, heartbeats, and lease renewal against queue semantics.",
      "Maps Job Contract profiles to OS/container launches with injected secrets mounts.",
      "Forwards completion, failure, and resource usage upward through contract-shaped channels.",
    ],
    doesNotDefine: "DSP transform order, API validation, or domain transaction orchestration inside services.",
    href: "/docs/infrastructure-layer/core#execution-model",
    linkLabel: "Core — Execution Model (this spec)",
  },
  {
    id: "execution-environment",
    title: "Execution Environment",
    subtitle: "Runtime context and isolation",
    purpose: "Provide runtime environment and execution context support: namespaces, cgroups, seccomp-style gates, and network egress policy.",
    defines: [
      "Enforces CPU/memory/IO ceilings and ephemeral disk quotas from Job Contract tokens.",
      "Applies image/sandbox versions pinned by Deployment Runtime.",
      "Injects non-secret config and secret references without logging secret material.",
      "Separates host networking from workload networking according to policy.",
    ],
    doesNotDefine: "Workflow business rules, API authz decisions, or DSP parameter tuning.",
    href: "/docs/infrastructure-layer/core",
    linkLabel: "Core Specification (this spec)",
  },
  {
    id: "storage-infrastructure",
    title: "Storage Infrastructure",
    subtitle: "Operational storage and runtime media",
    purpose: "Provide volumes, object stores, caches, and backup targets that satisfy runtime storage needs under Data Layer governance.",
    defines: [
      "Mounts block/object tiers with encryption-at-rest and snapshot APIs where offered.",
      "Exposes performance classes (hot/warm/cold) for cache vs durable paths used during execution.",
      "Coordinates backup/restore hooks as operations primitives; does not define canonical tables.",
      "Supports large payload offload referenced by execution_payload_ref in queue contracts.",
    ],
    doesNotDefine: "Canonical data ownership, lineage truth, retention as business policy, or schema evolution.",
    href: "/docs/infrastructure-layer/contracts",
    linkLabel: "Contracts — Job / Queue (this spec)",
  },
  {
    id: "logging-monitoring",
    title: "Logging & Monitoring",
    subtitle: "Operational visibility",
    purpose: "Collect, buffer, ship, and alert on Observability Signals—operations-first, not product analytics.",
    defines: [
      "Standardizes log pipelines with redaction hooks for secrets.",
      "Scrapes or receives metrics with consistent label sets (cluster, pool, queue, service).",
      "Exports traces compatible with trace_link correlation from contracts.",
      "Raises alerts on SLO-adjacent infra signals: saturation, error storms, poison growth, unhealthy health_signal streams.",
    ],
    doesNotDefine: "Business analytics funnels, experiment assignments, or revenue reporting definitions.",
    href: "/docs/infrastructure-layer/contracts",
    linkLabel: "Contracts — Observability Signals (this spec)",
  },
  {
    id: "deployment-runtime",
    title: "Deployment Runtime",
    subtitle: "Hosting and rollout plane",
    purpose: "Define how hosting and runtime revisions land: rollouts, feature flags at infra boundary, and revisioned runtime dependencies.",
    defines: [
      "Rolling/blue-green/canary strategies with automated rollback on failing health_signal gates.",
      "Distributes runtime images, sidecars, and node agent versions tied to compatibility matrices.",
      "Manages cluster-level autoscaling for nodes and managed add-ons (ingress, DNS, CSI).",
      "Keeps config distribution separate from in-app business feature flags documented elsewhere.",
    ],
    doesNotDefine: "Application-layer HTTP routing tables, DSP processor registry contents, or API versioning policy.",
    href: "/docs/infrastructure-layer/integration",
    linkLabel: "System Integration (this spec)",
  },
] as const;

export default function InfrastructureLayerModulesPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Infrastructure Layer - Internal Modules"
        description="Implementation-oriented module map: Queue System, Job Runner, Execution Environment, Storage Infrastructure, Logging & Monitoring, and Deployment Runtime—each with purpose, defines, and explicit non-ownership."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Infrastructure Layer (Spec) / Internal Modules</p>

      <DocsScopeBlocks
        covers="named infrastructure components, their responsibilities, and how they bind to Contracts and Integration narratives in this spec tree."
        doesNotCover="API subsystem pages, DSP engine internals, SQL DDL as domain authority, or repository folder structure."
      />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Internal Modules decomposes the Infrastructure Layer into buildable components. Each module below is described with Purpose, Defines, and Does not define so engineering can map services and cloud resources without collapsing API, DSP, or Data concerns into ops code."
            areasTitle="How to use this page"
            areas={[
              "Queue System + Job Runner + Execution Environment form the execution spine.",
              "Storage Infrastructure + Logging & Monitoring supply platform capabilities consumed during runs.",
              "Deployment Runtime governs how revisions of the above land safely in production.",
            ]}
            outOfScope="Class diagrams for proprietary repos; this remains architectural, not code-navigation."
            relatedBoundaries={[
              "Contracts freeze message/result/signal shapes; Modules explain who emits/consumes them.",
              "Integration explains cross-layer triggers that exercise these modules together.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="modules-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Infrastructure Internal Modules"
            groups={[
              { title: "Work path", items: ["Queue System", "Job Runner", "Execution Environment"] },
              { title: "Platform", items: ["Storage Infrastructure", "Logging & Monitoring"] },
              { title: "Lifecycle", items: ["Deployment Runtime"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...moduleDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/infrastructure-layer/core", title: "Core Specification (this spec)", description: "Behavioral model behind these modules." },
              { href: "/docs/infrastructure-layer/contracts", title: "Contracts (this spec)", description: "Authoritative shapes exchanged by modules." },
              { href: "/docs/infrastructure-layer/integration", title: "System Integration (this spec)", description: "Cross-layer flows using this module map." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
