import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { CLIENT_QAGENT_ID_MAPPING_LINKS } from "@/lib/docs-scope-links";
import { QAGENT_API_HANDOFF_BRIDGE, QAGENT_API_JOB_STATUS_BRIDGE } from "@/lib/api-server-canonical";

const mappingDetails = [
  {
    id: "session-mapping",
    title: "Session Mapping",
    subtitle: "Client sessionId -> QAgent session_id",
    purpose: "Define session identity continuity between Client events and QAgent lineage.",
    defines: [
      "sessionId maps directly to session_id.",
      "Client emits sessionId on every event.",
      "QCore propagates session_id across QAgent payloads.",
    ],
    doesNotDefine: "Decision IDs or execution IDs outside session scope.",
    href: "/docs/architecture/contracts/client-qagent-id-mapping",
  },
  {
    id: "correlation-request-mapping",
    title: "Correlation Mapping",
    subtitle: "Client correlationId -> QAgent request_id linkage",
    purpose: "Define request-level traceability from client correlation to QAgent request lineage.",
    defines: [
      "QCore binds correlation_id to request_id at intake.",
      "Subsequent payloads maintain request trace continuity.",
      "Retries keep correlationId with sequence progression.",
    ],
    doesNotDefine: "Creation of downstream IDs owned by later modules.",
    href: "/docs/architecture/contracts/client-qagent-id-mapping",
  },
  {
    id: "handoff-transformation",
    title: "Handoff Transformation",
    subtitle: "Client -> QCore ingestion mapping",
    purpose: "Define the required transformation at client-to-QCore intake boundary.",
    defines: [
      "sessionId copied to session_id.",
      "correlationId copied to correlation_id.",
      "user_input_handoff_complete asserted at intake.",
    ],
    doesNotDefine: "Schema evolution rules outside this mapping boundary.",
    href: "/docs/architecture/contracts/client-qagent-id-mapping",
  },
  {
    id: "api-run-bridge",
    title: "QAgent -> API /run Bridge",
    subtitle: "Execution request envelope mapping",
    purpose: "Define canonical mapping from QAgent execution artifacts into API /run envelope.",
    defines: QAGENT_API_HANDOFF_BRIDGE.fieldMapping,
    doesNotDefine: "API-side policy ownership after handoff acceptance.",
    href: "/docs/api",
    linkLabel: "Related section",
  },
  {
    id: "api-jobs-bridge",
    title: "API /jobs -> QAgent Lineage Bridge",
    subtitle: "Status/result mapping boundary",
    purpose: "Define canonical mapping from API /jobs entities back into QAgent lineage references.",
    defines: QAGENT_API_JOB_STATUS_BRIDGE.mapping,
    doesNotDefine: "Job lifecycle ownership, which remains in API Server layer.",
    href: "/docs/api",
    linkLabel: "Related section",
  },
] as const;

export default function ClientQAgentIdMappingPage() {
  return (
    <DocsTemplatePage
      title="Client-QAgent ID Mapping"
      description="Authoritative mapping between Client identifiers and QAgent lineage identifiers for end-to-end traceability."
      sectionPath={["QAgent", "Contracts", "Client-QAgent ID Mapping"]}
      scopeLinks={CLIENT_QAGENT_ID_MAPPING_LINKS}
      overviewIntro="This page defines the canonical identifier mapping rules from Client events through QAgent lineage and API bridge surfaces."
      overviewAreasTitle="Mapping concerns"
      overviewAreas={[
        "Client session and correlation mapping into QAgent lineage.",
        "Intake transformation constraints at QCore boundary.",
        "API /run and /jobs bridge mapping references.",
      ]}
      outOfScope="Runtime orchestration semantics and non-mapping policy decisions."
      relatedBoundaries={[
        "ID Mapping page = cross-layer identifier mapping authority.",
        "Lineage Model = lifecycle ID creation authority.",
        "Schema Registry = payload contract authority.",
        "API Layer = job lifecycle/status authority.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Mapping scope and boundaries.", href: "#overview" },
        { title: "Mapping Diagram", subtitle: "ID propagation structure.", href: "#diagram" },
        { title: "Mapping Details", subtitle: "Canonical mapping rules.", href: "#details" },
        { title: "Related Docs", subtitle: "Cross-layer references.", href: "#related-docs" },
      ]}
      diagramTitle="Mapping Diagram"
      diagram={{
        mode: "flow",
        steps: ["Client Event IDs", "QCore Intake Mapping", "QAgent Lineage IDs", "API /run Envelope", "API /jobs Projection"],
      }}
      detailsTitle="Mapping Details"
      detailsItems={mappingDetails.map((d) => ({
        ...d,
        linkLabel: "linkLabel" in d ? d.linkLabel : "Canonical page",
      }))}
      relatedDocs={[
        "Client-QAgent ID Mapping = ID bridge authority.",
        "Lineage Model = ID lifecycle authority.",
        "Schema Registry = contract payload authority.",
        "API docs = status/result projection authority.",
      ]}
    />
  );
}
