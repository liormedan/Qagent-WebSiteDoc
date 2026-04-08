import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { QAGENT_CANONICAL_FLOW } from "@/lib/qagent-canonical";
import { QAGENT_API_HANDOFF_BRIDGE, QAGENT_API_JOB_STATUS_BRIDGE } from "@/lib/api-server-canonical";

export default function ClientQAgentIdMappingPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Client–QAgent ID Mapping"
        description="Authoritative mapping between Client-layer identifiers and QAgent lineage identifiers for end-to-end traceability."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock title="Canonical QAgent flow (reference)" body={[QAGENT_CANONICAL_FLOW]} collapsible />
        <SectionBlock
          title="Client–QAgent ID Mapping"
          body={[
            "sessionId (Client) maps to session_id (QAgent): same string value, same active workspace/session scope. Client MUST emit sessionId on every event; QCore MUST attach session_id at intake and propagate it on every QAgent payload per lineage rules.",
            "correlationId (Client) binds to request_id (QAgent): at User Input (handoff complete), QCore assigns request_id and records correlation_id equal to the Client correlationId for that operation. All subsequent QAgent schemas carrying request_id remain traceable to that correlationId.",
            "sequence (Client): monotonic per (sessionId, correlationId). It orders Client emissions only; it does not replace request_id or downstream lineage IDs. Retries keep correlationId and increment sequence; QCore correlates to the same request_id unless a new intake explicitly creates a new request_id.",
            "eventId (Client): Client-only deduplication key; not equivalent to request_id, decision_id, plan_id, approval_id, execution_id, or version_id.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Transformation (handoff)"
          body={[
            "On Client to QCore handoff: sessionId is copied to session_id; correlationId is copied to correlation_id and bound to the new request_id created by QCore; user_input_handoff_complete is set true per schema qcore_to_files_handler_v1.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Propagation across flow"
          body={[
            "session_id and request_id are required on every inter-module contract listed in the Schema Registry from intake through persistence, as defined jointly with the Lineage Model.",
            "decision_id, plan_id, approval_id, execution_id, and version_id are created only at their owning stages; each new ID references the required upstream IDs per linkage rules in the Lineage Model.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Summary"
          body={[
            "Client correlationId/sessionId and QAgent request_id/session_id form one continuous traceability chain when the handoff transformation is applied at intake.",
          ]}
          collapsible
        />
        <SectionBlock title="QAgent -> API /run Handoff (Canonical Bridge)" body={[QAGENT_API_HANDOFF_BRIDGE.purpose, ...QAGENT_API_HANDOFF_BRIDGE.fieldMapping, QAGENT_API_HANDOFF_BRIDGE.rule]} collapsible />
        <SectionBlock title="API /jobs -> QAgent Lineage Bridge" body={[QAGENT_API_JOB_STATUS_BRIDGE.purpose, ...QAGENT_API_JOB_STATUS_BRIDGE.mapping, QAGENT_API_JOB_STATUS_BRIDGE.rule]} collapsible />
      </div>
    </DocsContent>
  );
}
