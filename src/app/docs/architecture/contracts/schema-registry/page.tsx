import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const contracts = [
  {
    title: "Files Handler -> Analyzer",
    body: [
      "Schema Name: file_analysis_input_v1",
      "Schema Purpose: transfer validated normalized file context into Analyzer.",
      "Required Fields: request_id, session_id, file_id, normalized_format, metadata, source_type.",
      "Optional Fields: preprocessing_flags, user_notes, prior_version_id.",
      "Validation Rules: file_id must exist, normalized_format must be supported, metadata must include size and mime.",
      "Producer Module: Files Handler.",
      "Consumer Module: Analyzer.",
      "Schema Version ID: REG-FH-ANL-1.0.0.",
    ],
  },
  {
    title: "Analyzer -> Intent + Clarification",
    body: [
      "Schema Name: analyzer_intent_signal_v1",
      "Schema Purpose: provide structured interpretation for intent resolution.",
      "Required Fields: request_id, session_id, analysis_id, entities, features, structure.",
      "Optional Fields: confidence_scores, ambiguity_signals, enrichment_context.",
      "Validation Rules: entities array cannot be null, structure must be normalized object, analysis_id must be unique per request.",
      "Producer Module: Analyzer.",
      "Consumer Module: Intent + Clarification.",
      "Schema Version ID: REG-ANL-INT-1.0.0.",
    ],
  },
  {
    title: "Intent -> DAL",
    body: [
      "Schema Name: structured_intent_plan_input_v1",
      "Schema Purpose: hand off validated intent for planning.",
      "Required Fields: request_id, session_id, decision_id, goal, required_parameters, intent_type.",
      "Optional Fields: clarification_history, preference_hints, confidence.",
      "Validation Rules: goal cannot be empty, required_parameters must pass completeness check, decision_id must be traceable to request.",
      "Producer Module: Intent + Clarification.",
      "Consumer Module: DAL.",
      "Schema Version ID: REG-INT-DAL-1.0.0.",
    ],
  },
  {
    title: "DAL -> UAgent",
    body: [
      "Schema Name: ui_plan_contract_v1",
      "Schema Purpose: define UI-renderable plan blocks and interactions.",
      "Required Fields: plan_id, request_id, execution_graph, ui_blocks, approval_required.",
      "Optional Fields: ui_hints, grouping, default_controls.",
      "Validation Rules: plan_id must be unique, ui_blocks must map to known components, execution_graph references must resolve.",
      "Producer Module: DAL.",
      "Consumer Module: UAgent.",
      "Schema Version ID: REG-DAL-UAG-1.0.0.",
    ],
  },
  {
    title: "DAL -> Approval",
    body: [
      "Schema Name: approval_request_contract_v1",
      "Schema Purpose: provide approval gate payload for user confirmation.",
      "Required Fields: approval_id, plan_id, request_id, action_summary, fingerprint.",
      "Optional Fields: risk_level, change_preview, rollback_hint.",
      "Validation Rules: fingerprint must be deterministic, action_summary cannot be empty, plan_id must exist.",
      "Producer Module: DAL.",
      "Consumer Module: Approval.",
      "Schema Version ID: REG-DAL-APP-1.0.0.",
    ],
  },
  {
    title: "DAL -> DAgent",
    body: [
      "Schema Name: execution_plan_contract_v1",
      "Schema Purpose: define executable action graph for runtime execution.",
      "Required Fields: execution_id, plan_id, request_id, tool_mapping, dsp_chain, constraints.",
      "Optional Fields: fallback_chain, execution_mode, audit_context.",
      "Validation Rules: tool_mapping actions must exist in graph, dsp_chain node types must be supported, execution_id must be unique.",
      "Producer Module: DAL.",
      "Consumer Module: DAgent.",
      "Schema Version ID: REG-DAL-DAG-1.0.0.",
    ],
  },
  {
    title: "DAgent -> Versioning",
    body: [
      "Schema Name: execution_result_version_input_v1",
      "Schema Purpose: persist execution outputs into version lifecycle.",
      "Required Fields: execution_id, version_id, request_id, output_artifact_ref, applied_parameters, dsp_chain.",
      "Optional Fields: logs_ref, warnings, quality_metrics.",
      "Validation Rules: output_artifact_ref must be resolvable, version_id must be immutable, execution_id must match runtime record.",
      "Producer Module: DAgent.",
      "Consumer Module: Versioning.",
      "Schema Version ID: REG-DAG-VER-1.0.0.",
    ],
  },
  {
    title: "Versioning -> Restore",
    body: [
      "Schema Name: restore_request_contract_v1",
      "Schema Purpose: restore a prior version into active system state.",
      "Required Fields: restore_id, session_id, target_version_id, requester_id, restore_scope.",
      "Optional Fields: include_ui_state, include_audio_blob, comparison_base_version.",
      "Validation Rules: target_version_id must exist, requester must own session scope, restore_scope must be one of full/partial.",
      "Producer Module: Versioning.",
      "Consumer Module: Restore Engine.",
      "Schema Version ID: REG-VER-RST-1.0.0.",
    ],
  },
];

export default function SchemaRegistryPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Global Schema Registry"
        description="Canonical contract registry for all major inter-module transitions in QAgent architecture."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-4">
              {["Producer", "Schema Registry", "Validation Rules", "Consumer"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 1 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                  {index < 3 ? <div className="pt-1 text-cyan-300/80">→</div> : null}
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "This page defines authoritative schema contracts for cross-module boundaries.",
            "Every producer/consumer handoff must reference a schema version ID listed in this registry.",
          ]}
          collapsible
        />
        {contracts.map((contract) => (
          <SectionBlock key={contract.title} title={contract.title} body={contract.body} collapsible />
        ))}
        <SectionBlock
          title="Summary"
          body={[
            "Schema Registry is the canonical source of truth for inter-module contracts.",
            "Implementation must reject payloads that do not match registered schema versions.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
