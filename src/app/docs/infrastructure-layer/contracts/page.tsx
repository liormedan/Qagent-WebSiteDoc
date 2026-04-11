import type { DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";
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
const jobContractJson = `{
  "job_id": "string",
  "execution_profile": "string",
  "priority": "number | null",
  "resource_limits": { "cpu": "string", "memory": "string", "ephemeral_disk_gb": "number | null" },
  "payload_ref": "string (opaque handle to orchestration-owned blob)",
  "deadline_at": "string (ISO-8601) | null",
  "created_at": "string (ISO-8601)",
  "trace_context": { "trace_id": "string", "span_id": "string | null" }
}`;

const queueMessageContractJson = `{
  "message_id": "string",
  "job_id": "string",
  "attempt": "number",
  "execution_payload_ref": "string | null (opaque; transport handle to payload slice or external store)",
  "visibility_timeout_sec": "number",
  "enqueue_timestamp": "string (ISO-8601)",
  "delivery_timestamp": "string (ISO-8601) | null",
  "routing_key": "string | null",
  "dedupe_key": "string | null"
}`;

const executionResultContractJson = `{
  "job_id": "string",
  "worker_id": "string",
  "run_attempt": "number",
  "status": "succeeded | failed | canceled | unknown",
  "exit_code": "number",
  "finished_at": "string (ISO-8601)",
  "resource_usage": { "cpu_ms": "number", "peak_memory_mb": "number", "io_read_mb": "number | null", "io_write_mb": "number | null" },
  "result_handle": "string | null (opaque; API/DSP interpret)",
  "infra_reason_code": "string | null (substrate-only, e.g. OOM, timeout)"
}`;

const failureRetryContractJson = `{
  "job_id": "string",
  "message_id": "string | null",
  "failure_class": "transient | quota | poison | unknown",
  "retry_eligible": "boolean",
  "retry_intent": "immediate | delayed | none",
  "retry_policy_ref": "string | null (opaque handle to orchestration-owned policy blob)",
  "next_attempt_at": "string (ISO-8601) | null",
  "attempts_consumed": "number",
  "max_attempts": "number",
  "reason_code": "string",
  "safe_message": "string"
}`;

const observabilitySignalsJson = `{
  "log_record": {
    "timestamp": "string (ISO-8601)",
    "severity": "debug | info | warn | error",
    "service": "string",
    "job_id": "string | null",
    "message": "string",
    "attributes": "object"
  },
  "metric_sample": {
    "name": "string",
    "value": "number",
    "labels": "object",
    "timestamp": "string (ISO-8601)"
  },
  "trace_link": {
    "trace_id": "string",
    "span_name": "string",
    "status": "ok | error"
  },
  "health_signal": {
    "component": "string",
    "status": "up | degraded | down",
    "checked_at": "string (ISO-8601)",
    "detail": "string | null"
  }
}`;

const preClass =
  "mt-2 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-3 text-xs text-slate-200 md:text-sm";

function buildContractDetails(): DocsDetailsItem[] {
  return [
    {
      id: "job-contract",
      title: "Job Contract",
      subtitle: "Infra-managed unit of work",
      purpose: "Define the infra-managed unit of work: the envelope orchestration hands to infrastructure so a runnable can be placed, queued, and observed.",
      defines: [
        "job_id is stable across queues, runners, logs, metrics, and traces for one logical run unit.",
        "execution_profile and resource_limits are opaque tokens interpreted by deployment policy, not by DSP math.",
        "payload_ref is an opaque handle to orchestration-owned immutable context; infrastructure stores/transports, not interprets.",
        "priority and deadline_at are optional scheduling hints; semantics for business priority remain with API orchestration docs.",
        "trace_context seeds correlation for downstream spans without embedding API headers.",
      ],
      doesNotDefine: "API Execution Request Envelope fields, QAgent approval artifacts, or DSP input tensors.",
      href: "/docs/infrastructure-layer/core#execution-model",
      linkLabel: "Core — Execution Model (this spec)",
      supplement: <pre className={preClass}>{jobContractJson}</pre>,
    },
    {
      id: "queue-message-contract",
      title: "Queue Message Contract",
      subtitle: "Execution payload at queue boundaries",
      purpose: "Define the execution payload as it crosses infra queueing boundaries: durable envelope plus references, not business decoding rules.",
      defines: [
        "message_id supports deduplication, DLQ correlation, and replay audit when the broker allows.",
        "attempt aligns with Failure / Retry Contract for the same delivery lineage.",
        "execution_payload_ref optionally points at a slice or external object when the body is too large for inline transport.",
        "visibility_timeout_sec and timestamps define lease semantics and when redelivery may occur.",
        "routing_key and dedupe_key are transport hints; they do not encode DSP or API semantics.",
      ],
      doesNotDefine: "Broker admin APIs, partition rebalance algorithms, or message body schemas owned by API/DSP.",
      href: "/docs/infrastructure-layer/modules",
      linkLabel: "Internal Modules — Queue System (this spec)",
      supplement: <pre className={preClass}>{queueMessageContractJson}</pre>,
    },
    {
      id: "execution-result-contract",
      title: "Execution Result Contract",
      subtitle: "Infrastructure-facing completion signal",
      purpose: "Define the infrastructure-facing completion signal: status, substrate metadata, and opaque handles—so orchestration can merge with API/DSP result models.",
      defines: [
        "status and exit_code discriminate success vs failure at the runner boundary before domain interpretation.",
        "run_attempt ties this record to the same logical try counter used in retry policy.",
        "resource_usage captures capacity signals for autoscale and chargeback hooks at ops level.",
        "result_handle remains opaque; versioned business payloads stay defined outside this page.",
        "infra_reason_code captures substrate-only causes (OOM, timeout, eviction) without duplicating API error catalogs.",
      ],
      doesNotDefine: "REST response JSON, user-visible error strings, or DSP Execution Result Package internals.",
      href: "/docs/infrastructure-layer/integration",
      linkLabel: "System Integration (this spec)",
      supplement: <pre className={preClass}>{executionResultContractJson}</pre>,
    },
    {
      id: "failure-retry-contract",
      title: "Failure / Retry Contract",
      subtitle: "Signaling, retry intent, and policy representation",
      purpose: "Define failure signaling, retry intent, and how retry policy is referenced without infrastructure owning business retry rules.",
      defines: [
        "failure_class drives routing among requeue, delayed retry, poison, or operator escalation paths.",
        "retry_intent states what infrastructure will attempt next; orchestration may still veto via max_attempts.",
        "retry_policy_ref is an opaque handle when policy blobs live outside the message to keep payloads small.",
        "attempts_consumed and max_attempts align counters with orchestration-owned caps.",
        "safe_message is suitable for dashboards; secrets and raw stack traces stay out of this envelope.",
      ],
      doesNotDefine: "HTTP status codes, client retry UX, or DSP-specific failure taxonomies.",
      href: "/docs/infrastructure-layer/core#state-behavior",
      linkLabel: "Core — State & Behavior (this spec)",
      supplement: <pre className={preClass}>{failureRetryContractJson}</pre>,
    },
    {
      id: "observability-signals",
      title: "Observability Signals",
      subtitle: "Logs, metrics, traces, health",
      purpose: "Define operational visibility outputs so every subsystem emits correlatable, filterable signals without becoming product analytics.",
      defines: [
        "log_record: timestamped, severity-graded records with service identity, optional job_id, and structured attributes.",
        "metric_sample: labeled counters/gauges/histograms for queue depth, latency, saturation, and error budgets.",
        "trace_link: span naming conventions that stitch enqueue, run, storage, and completion across services.",
        "health_signal: liveness/readiness style status for components (brokers, runners, volume providers) independent of business SLO dashboards.",
      ],
      doesNotDefine: "Funnel metrics, A/B experiment definitions, or billing invoice line items.",
      href: "/docs/infrastructure-layer/modules",
      linkLabel: "Internal Modules — Logging & Monitoring (this spec)",
      supplement: <pre className={preClass}>{observabilitySignalsJson}</pre>,
    },
  ];
}

const inThisPage = [
  { title: "Overview", subtitle: "Contract authority.", href: "#overview" },
  { title: "Layer Structure Diagram", subtitle: "Contract taxonomy.", href: "#contracts-structure-diagram" },
  { title: "Details", subtitle: "Canonical summaries + shapes.", href: "#details" },
  { title: "Related Docs", subtitle: "Neighbor contracts.", href: "#related-docs" },
];

export default function InfrastructureLayerContractsPage() {
  const contractDetails = buildContractDetails();

  return (
    <DocsContent>
      <PageTitle
        title="Infrastructure Layer - Contracts"
        description="Canonical contract source for this spec tree: Job, Queue Message, Execution Result, Failure/Retry, and Observability Signals—field-level shapes for infrastructure transport and ops, not API or DSP semantic authority."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Infrastructure Layer (Spec) / Contracts</p>

      <DocsScopeBlocks links={INFRASTRUCTURE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="This page remains the canonical infra contract source inside the Infrastructure Layer spec. Each accordion entry states purpose, defines transport-level rules, shows a reference JSON shape, and links for deeper behavior—not as navigation-only stubs."
            areasTitle="Contract surfaces (authoritative here)"
            areas={[
              "Job Contract — infra-managed unit of work handed from orchestration.",
              "Queue Message Contract — durable envelope and execution payload references at queue boundaries.",
              "Execution Result Contract — completion signal, substrate status, resource usage, opaque result handle.",
              "Failure / Retry Contract — failure classification, retry intent, policy reference, counters.",
              "Observability Signals — logs, metrics, traces, health outputs for operations.",
            ]}
            outOfScope="API and DSP canonical payload definitions; those docs must stay consistent without being re-authored here."
            relatedBoundaries={[
              "Core Specification = behavioral authority; Contracts = interface authority for this tree.",
              "Integration = how these contracts appear in cross-layer flows.",
            ]}
          />
          <div className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-100 md:text-sm">
            <span className="font-semibold">Canonical ownership:</span> field summaries and JSON shapes on this page are authoritative for{" "}
            <code className="text-emerald-50">/docs/infrastructure-layer/contracts</code>. API, DSP, and Data contracts remain authoritative in their
            trees; cross-reference when evolving any shared identifiers (e.g. job_id) without merging ownership.
          </div>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inThisPage} />
        </SectionBlock>

        <SectionBlock id="contracts-structure-diagram" title="Layer Structure Diagram" body={[]}>
          <DocsDiagram
            mode="structure"
            root="Infrastructure Contracts (spec tree)"
            groups={[
              { title: "Work contracts", items: ["Job Contract", "Queue Message Contract"] },
              { title: "Lifecycle contracts", items: ["Execution Result Contract", "Failure / Retry Contract"] },
              { title: "Operations contracts", items: ["Observability Signals"] },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={contractDetails} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/infrastructure-layer/core", title: "Core Specification (this spec)", description: "Behavioral model aligned with these contracts." },
              { href: "/docs/api-server-layer/contracts", title: "API Server — Contracts", description: "Distinct authority for API ingress and publication shapes." },
              { href: "/docs/dsp-layer/contracts", title: "DSP — Contracts", description: "Processing-layer payload authority." },
              { href: "/docs/infrastructure-layer/integration", title: "System Integration (this spec)", description: "Where contracts meet API, DSP, and Data flows." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
