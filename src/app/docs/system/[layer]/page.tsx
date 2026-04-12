import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { EndToEndSequenceDiagram } from "@/components/ui/EndToEndSequenceDiagram";
import { DocsDetailsAccordion, type DocsDetailsItem } from "@/components/ui/DocsDetailsAccordion";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { systemLayerDocLinks } from "@/lib/docs-scope-links";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

const layerTitles: Record<string, string> = {
  "client-frontend-layer": "Client / Frontend Layer",
  "qagent-layer": "QAgent Layer",
  "api-server-layer": "API Server Layer",
  "dsp-processing-layer": "DSP / Processing Layer",
  "data-layer": "Data Layer",
  "infrastructure-layer": "Infrastructure Layer",
  "auth-security-layer": "Auth & Security Layer",
  "end-to-end-flow": "End-to-End Flow (cross-layer flow)",
};

const layerCanonicalLinks: Record<string, string> = {
  "client-frontend-layer": "/docs/client",
  "qagent-layer": "/docs/q-agent",
  "api-server-layer": "/docs/api",
  "dsp-processing-layer": "/docs/dsp-layer",
  "data-layer": "/docs/data-layer",
  "infrastructure-layer": "/docs/infrastructure-layer",
  "auth-security-layer": "/docs/auth-security",
  "end-to-end-flow": "/docs/system-flow",
};

/** Structure diagrams aligned with each layer's canonical /docs/* overview (system-level only). */
const layerStructureDiagrams: Record<
  string,
  { caption: string; root: string; groups: { title: string; items: string[] }[] }
> = {
  "client-frontend-layer": {
    caption:
      "Internal map mirrors /docs/client sidebar: Surfaces, Runtime & State, Events & Contracts, Validation & Tests—plus neighboring layers this Client interacts with (no persistence or planning ownership here).",
    root: "Client / Frontend Layer",
    groups: [
      { title: "Surfaces", items: ["Chat UI", "Canvas UI", "Workspace UI"] },
      { title: "Runtime & state", items: ["Client runtime", "State model", "State ownership"] },
      { title: "Events & contracts", items: ["Event flow", "Event contract", "Contracts & error model"] },
      { title: "Validation & tests", items: ["System validation", "Conformance tests", "UI plan contract"] },
      {
        title: "Neighbors (interfaces)",
        items: ["QAgent Layer (structured handoff)", "API Server Layer (status / results projection)", "Data Layer (consumption only)"],
      },
    ],
  },
  "qagent-layer": {
    caption:
      "Aligned with /docs/q-agent plus architecture modules from the QAgent sidebar: intake/analysis, planning, approval/handoff, contracts/policies, and cross-layer interfaces (not API job or DSP transform ownership).",
    root: "QAgent Layer",
    groups: [
      { title: "Intake & analysis", items: ["Intent + clarification", "Analyzer", "Files Handler"] },
      { title: "Planning & packaging", items: ["DAL", "UAgent (review surface)"] },
      { title: "Execution readiness", items: ["Approval gate", "DAgent bridge", "Execution request envelope to API"] },
      { title: "Contracts & policies", items: ["Schema registry context", "Client–QAgent ID mapping", "Control / failure policies"] },
      {
        title: "Neighbors (interfaces)",
        items: ["Client Layer (requests in)", "API Server (/run handoff)", "Data Layer (context)", "DSP (via execution path only)"],
      },
    ],
  },
  "api-server-layer": {
    caption:
      "Same three tiers as /docs/api diagram, plus explicit interfaces to QAgent, Data Layer, DSP execution, and Client projection—no payload schemas or worker internals.",
    root: "API Server Layer",
    groups: [
      { title: "Entry tier", items: ["API Gateway", "Request Handling", "Decision System"] },
      { title: "Orchestration tier", items: ["Job Orchestration", "Status Tracker", "Queue Coordination"] },
      { title: "Runtime & output tier", items: ["Execution Layer", "Versioning", "/jobs Result Projection"] },
      {
        title: "Neighbors (interfaces)",
        items: ["QAgent (approved /run intake)", "Data Layer (mediated persistence)", "DSP (processing execution)", "Client (status / results)"] },
    ],
  },
  "dsp-processing-layer": {
    caption:
      "Mirrors /docs/dsp-layer pillars (core, contracts, processing engine, integration) and the documented artifact pipeline—DSP remains a processing boundary, not orchestration or UI.",
    root: "DSP / Processing Layer",
    groups: [
      { title: "Core & execution", items: ["Core specification", "Execution semantics", "Layer constraints"] },
      { title: "Contracts", items: ["Execution contract", "Result contract", "Error & metadata contracts"] },
      { title: "Processing engine", items: ["Processor model", "Processor types", "Routing", "Engine lifecycle"] },
      { title: "Artifact pipeline", items: ["Input artifact", "Deterministic transform", "Output artifact"] },
      {
        title: "Neighbors (interfaces)",
        items: ["API Server (execution hand-in)", "Data Layer (artifact emission)", "No Client UI path"],
      },
    ],
  },
  "infrastructure-layer": {
    caption: "Platform hosting and operational support per Infrastructure Layer system view—not application contracts.",
    root: "Infrastructure Layer",
    groups: [
      { title: "Hosting", items: ["Runtime environment", "Service hosting"] },
      { title: "Operations", items: ["Scaling", "Deployment operations"] },
      { title: "Reliability", items: ["Stabilized execution conditions"] },
    ],
  },
  "auth-security-layer": {
    caption: "Identity, authorization, and isolation per Auth & Security system view—not execution or persistence logic.",
    root: "Auth & Security Layer",
    groups: [
      { title: "Identity", items: ["Authentication", "Session context"] },
      { title: "Authorization", items: ["Protected operations access"] },
      { title: "Isolation", items: ["Boundary security rules"] },
    ],
  },
};

type LayerSystemView = {
  summary: string;
  explanation: [string, string];
  responsibilities: [string, string, string];
  position: string;
};

const layerSystemViews: Record<string, LayerSystemView> = {
  "client-frontend-layer": {
    summary: "System view for the user-facing layer that captures interaction and projects runtime output.",
    explanation: [
      "Client Layer is the user-facing runtime where users interact with chat, canvas, and workspace surfaces.",
      "It translates user actions into structured requests and presents status and result updates from downstream layers.",
    ],
    responsibilities: [
      "Capture user input and interaction events.",
      "Render runtime progress and final outputs.",
      "Forward structured requests to QAgent.",
    ],
    position: "Receives input from users. Sends structured requests to QAgent and presents returned status/results.",
  },
  "qagent-layer": {
    summary: "System view for the planning and decision layer that prepares approved execution handoff.",
    explanation: [
      "QAgent Layer is the decision and planning center of WaveQ.",
      "It interprets intent, builds execution-ready plans, and enforces approval gates before execution handoff.",
    ],
    responsibilities: [
      "Resolve intent and clarification requirements.",
      "Build plan and execution handoff artifacts.",
      "Apply approval logic before API handoff.",
    ],
    position: "Receives requests from Client Layer. Sends approved execution handoff artifacts to API Server Layer.",
  },
  "api-server-layer": {
    summary: "System view for the execution orchestration layer that validates, queues, and publishes job outcomes.",
    explanation: [
      "API Server Layer is the orchestration boundary for execution requests from QAgent.",
      "It validates requests, manages asynchronous job pipelines, and publishes status and results.",
    ],
    responsibilities: [
      "Validate `/run` input contract.",
      "Create and manage queued jobs.",
      "Expose status and results through API endpoints.",
    ],
    position: "Receives approved handoff from QAgent. Sends execution outcomes back to QAgent through status/result APIs.",
  },
  "dsp-processing-layer": {
    summary: "System view for the processing layer that performs signal-level transformations in execution pipelines.",
    explanation: [
      "DSP / Processing Layer performs audio transformations and signal-level operations during execution.",
      "It provides specialized processing capabilities used by execution pipelines.",
    ],
    responsibilities: [
      "Run signal processing and audio transformations.",
      "Support execution engine with processing primitives.",
      "Produce processed audio outputs.",
    ],
    position: "Receives processing tasks from execution pipelines. Sends processed artifacts onward to output and storage flows.",
  },
  "data-layer": {
    summary: "System view for the canonical storage layer that preserves schemas, artifacts, and lineage records.",
    explanation: [
      "Data Layer provides canonical storage, schema governance, and lineage traceability for system entities.",
      "It preserves structured artifacts and historical references across system runs.",
    ],
    responsibilities: [
      "Store canonical records and artifacts.",
      "Maintain schema consistency.",
      "Track lineage and reference relationships.",
    ],
    position: "Receives entities and artifacts from runtime layers. Sends stable references for retrieval, traceability, and version linkage.",
  },
  "infrastructure-layer": {
    summary: "System view for the runtime platform layer that hosts, scales, and stabilizes system services.",
    explanation: [
      "Infrastructure Layer supplies the runtime environment that hosts and scales WaveQ services.",
      "It provides platform-level support for reliability, deployment, and operational execution.",
    ],
    responsibilities: [
      "Provide hosting and runtime environment.",
      "Support scaling and deployment operations.",
      "Stabilize execution conditions for system services.",
    ],
    position: "Receives operational requirements from all layers. Supports runtime delivery across Client, QAgent, and API services.",
  },
  "auth-security-layer": {
    summary: "System view for the security layer that enforces authentication, authorization, and isolation boundaries.",
    explanation: [
      "Auth & Security Layer enforces identity, access control, and isolation boundaries.",
      "It protects system resources and ensures secure interaction across layers.",
    ],
    responsibilities: [
      "Authenticate identities and session context.",
      "Authorize access to protected operations.",
      "Enforce isolation and boundary security rules.",
    ],
    position: "Receives access and session requests from runtime flows. Applies controls before protected operations continue.",
  },
  "end-to-end-flow": {
    summary: "System view for the cross-layer request-to-output path across Client, QAgent, API, Execution, and Versioning.",
    explanation: [
      "End-to-End Flow represents the cross-layer path from request to final output.",
      "It connects client interaction, planning, orchestration, execution, and versioning as one system journey.",
    ],
    responsibilities: [
      "Describe the cross-layer request-to-output sequence.",
      "Clarify handoff transitions between major layers.",
      "Provide a system-level reference path for navigation.",
    ],
    position: "Begins with user interaction in Client Layer. Progresses through QAgent and API execution toward versioned output.",
  },
};

function defaultSystemLayerDetails(systemView: LayerSystemView, canonicalHref: string): DocsDetailsItem[] {
  return [
    {
      id: "layer-purpose",
      title: "Layer Purpose",
      subtitle: "What this layer does",
      purpose: systemView.explanation[0],
      defines: [systemView.explanation[1], ...systemView.responsibilities],
      doesNotDefine: "ownership that belongs to adjacent layers.",
      href: canonicalHref,
      linkLabel: "Canonical page",
    },
    {
      id: "system-position",
      title: "Position in System",
      subtitle: "Before and after boundaries",
      purpose: "Defines how this layer connects to upstream and downstream stages.",
      defines: [systemView.position],
      doesNotDefine: "cross-layer ownership redefinitions.",
      href: "/docs/system-flow",
      linkLabel: "Related section",
    },
    {
      id: "ownership-boundary",
      title: "Ownership Boundary",
      subtitle: "Relation to neighboring layers",
      purpose: "Defines stable ownership boundaries in system context.",
      defines: [
        "canonical page authority for this layer",
        "system flow as transition reference",
        "layer-specific deep spec authority",
      ],
      doesNotDefine: "new architecture semantics.",
      href: canonicalHref,
      linkLabel: "Canonical page",
    },
  ];
}

const layerStructuredDetails: Record<string, DocsDetailsItem[]> = {
  "client-frontend-layer": [
    {
      id: "client-purpose",
      title: "Layer Purpose",
      subtitle: "User interaction and UI runtime authority",
      purpose: "Summarize why the Client Layer exists in WaveQ and what it owns at system level.",
      defines: [
        "User-facing capture of input and interaction across documented surfaces (chat, canvas, workspace).",
        "Projection of downstream status and results without owning API job lifecycle or canonical persistence.",
        "Client-owned UI state, events, and contracts as documented under /docs/client.",
      ],
      doesNotDefine: "QAgent planning semantics, API orchestration policy, or Data Layer persistence definitions.",
      href: "/docs/client",
      linkLabel: "Client Layer docs",
    },
    {
      id: "client-surfaces",
      title: "Surfaces",
      subtitle: "Chat, Canvas, Workspace",
      purpose: "Identify the primary UI surfaces that belong to the Client Layer documentation model.",
      defines: ["Chat UI as a documented interaction surface.", "Canvas UI as a documented workspace surface.", "Workspace UI for navigation and control events."],
      doesNotDefine: "pixel design systems or component library implementation.",
      href: "/docs/client/chat-ui",
      linkLabel: "Chat UI",
    },
    {
      id: "client-runtime-state",
      title: "Runtime & State",
      subtitle: "Projection and ownership",
      purpose: "Capture how runtime behavior and state ownership are split inside the Client docs.",
      defines: [
        "Client runtime responsibilities for status and result rendering.",
        "State model documentation for client-visible state transitions.",
        "State ownership boundaries separating Client UI state from server execution authority.",
      ],
      doesNotDefine: "canonical job state authority owned by API Server Layer.",
      href: "/docs/client/runtime",
      linkLabel: "Client Runtime",
    },
    {
      id: "client-events-contracts",
      title: "Events & Contracts",
      subtitle: "Flow, envelopes, errors",
      purpose: "Map the Client event and contract documentation set at a system summary level.",
      defines: [
        "Event flow documentation for client-visible sequencing.",
        "Event contract documentation for cross-boundary envelopes.",
        "Contracts, runtime lifecycle, and error model pages as Client-owned specification surfaces.",
      ],
      doesNotDefine: "server-side execution logging schemas or API payload field rules.",
      href: "/docs/client/event-flow",
      linkLabel: "Event Flow",
    },
    {
      id: "client-validation-tests",
      title: "Validation & Tests",
      subtitle: "Conformance and UI plan contract",
      purpose: "Point to validation and test documentation that constrains Client behavior without redefining other layers.",
      defines: [
        "System validation and conformance tests as documented Client proof surfaces.",
        "UI plan contract documentation tying UI plans to cross-layer expectations.",
        "Test report surfaces that summarize evidence without owning API execution proof.",
      ],
      doesNotDefine: "authoritative API execution conformance as defined under /docs/api.",
      href: "/docs/client/system-validation",
      linkLabel: "System Validation",
    },
    {
      id: "client-ownership-boundaries",
      title: "Ownership & Boundaries",
      subtitle: "Client vs QAgent, API, Data",
      purpose: "State cross-layer ownership for Client at system abstraction.",
      defines: [
        "Client owns interaction, UI state, and presentation contracts.",
        "QAgent owns intent and planning; Client forwards structured requests only.",
        "API Server owns job lifecycle; Client consumes status and results.",
        "Data Layer owns canonical persistence; Client does not persist governed truth.",
      ],
      doesNotDefine: "database schemas, orchestration algorithms, or DSP transform internals.",
      href: "/docs/client/state-ownership",
      linkLabel: "State Ownership",
    },
    {
      id: "client-observability",
      title: "Failure & Observability (Client view)",
      subtitle: "Errors and display boundaries",
      purpose: "High-level pointer to how Client documents error display and observability boundaries.",
      defines: [
        "Error model ownership for user-visible failure presentation.",
        "Separation between Client error display and API/QAgent error authority.",
      ],
      doesNotDefine: "distributed tracing implementation or API error code catalogs.",
      href: "/docs/client/error-model",
      linkLabel: "Error Model",
    },
  ],
  "qagent-layer": [
    {
      id: "qagent-purpose",
      title: "Layer Purpose",
      subtitle: "Intent, planning, and handoff authority",
      purpose: "Summarize QAgent as the planning and approval boundary before API execution.",
      defines: [
        "Intent-to-plan orchestration with documented gates before execution eligibility.",
        "Ownership of clarification, DAL planning artifacts, and approval semantics.",
        "Preparation of execution request envelopes toward API Server /run without owning job lifecycle.",
      ],
      doesNotDefine: "API queue orchestration, DSP transform algorithms, or Client UI state ownership.",
      href: "/docs/q-agent",
      linkLabel: "QAgent docs",
    },
    {
      id: "qagent-intake-planning",
      title: "Intent & Planning",
      subtitle: "Intake, analysis, DAL",
      purpose: "Group architecture modules that normalize intent and construct plans.",
      defines: [
        "Intent + clarification module boundary for ambiguity enforcement.",
        "Analyzer and Files Handler roles as documented under architecture modules.",
        "DAL construction as the plan composition boundary inside QAgent ownership.",
      ],
      doesNotDefine: "runtime execution of generated plans inside API Execution Layer.",
      href: "/docs/architecture/modules/intent-clarification",
      linkLabel: "Intent + Clarification",
    },
    {
      id: "qagent-tooling-handoff",
      title: "Tooling & Execution Bridge",
      subtitle: "UAgent, DAgent, envelope",
      purpose: "Summarize review surfaces and the execution bridge without duplicating API internals.",
      defines: [
        "UAgent documentation for plan review and UI-facing packaging responsibilities.",
        "DAgent as the bridge module preparing API-facing execution packaging.",
        "Execution request envelope as the documented handoff artifact toward API Server.",
      ],
      doesNotDefine: "/run validation implementation details or worker dispatch algorithms.",
      href: "/docs/architecture/modules/dagent",
      linkLabel: "DAgent",
    },
    {
      id: "qagent-approval-governance",
      title: "Governance Gates",
      subtitle: "Approval and policy surfaces",
      purpose: "Highlight approval and policy documentation that constrains progression to execution.",
      defines: [
        "Approval module as the explicit gate before execution-eligible transitions.",
        "Pointers to control policy matrix and failure policy as QAgent-adjacent governance docs.",
      ],
      doesNotDefine: "API admission policy implementation inside Decision System.",
      href: "/docs/architecture/modules/approval",
      linkLabel: "Approval",
    },
    {
      id: "qagent-contracts-lineage",
      title: "Contracts & Lineage",
      subtitle: "Schema registry and mappings",
      purpose: "Reference the contract set that QAgent documentation depends on for stable identifiers and lineage.",
      defines: [
        "Schema registry as governed contract surface referenced across planning artifacts.",
        "Client–QAgent ID mapping and lineage model documentation as cross-layer contract inputs.",
      ],
      doesNotDefine: "Data Layer physical schema enforcement or API wire formats.",
      href: "/docs/architecture/contracts/schema-registry",
      linkLabel: "Schema Registry",
    },
    {
      id: "qagent-ownership-boundaries",
      title: "Ownership & Boundaries",
      subtitle: "QAgent vs Client, API, DSP, Data",
      purpose: "Restate cross-layer ownership for QAgent at system abstraction.",
      defines: [
        "QAgent owns intent interpretation, planning artifacts, and approval gating.",
        "API Server owns execution lifecycle after handoff; QAgent does not own queues or workers.",
        "Client owns UI interaction; QAgent consumes structured requests only.",
        "DSP executes transforms inside API-orchestrated paths; QAgent does not own DSP internals.",
        "Data Layer owns persistence; QAgent consumes context but not canonical storage authority.",
      ],
      doesNotDefine: "DSP processor graphs, database DDL, or client rendering algorithms.",
      href: "/docs/q-agent",
      linkLabel: "QAgent overview",
    },
  ],
  "api-server-layer": [
    {
      id: "api-purpose",
      title: "Layer Purpose",
      subtitle: "Execution orchestration authority",
      purpose: "Summarize API Server as the validated entry, job system, and runtime publication boundary.",
      defines: [
        "Ownership of `/run` intake validation, asynchronous job orchestration, and published status/results.",
        "Separation from QAgent planning ownership and from Client presentation ownership.",
      ],
      doesNotDefine: "intent planning semantics, UI state ownership, or DSP transform mathematics.",
      href: "/docs/api",
      linkLabel: "API docs",
    },
    {
      id: "api-entry-tier",
      title: "Entry Tier",
      subtitle: "Gateway, validation, admission",
      purpose: "Mirror the Entry group from /docs/api: how requests enter and are admitted.",
      defines: [
        "API Gateway as documented entry boundary for execution requests.",
        "Request Handling for structural validation before orchestration.",
        "Decision System for admission and policy decisions before execution dispatch.",
      ],
      doesNotDefine: "QAgent envelope field semantics beyond contract references.",
      href: "/docs/api/gateway",
      linkLabel: "API Gateway",
    },
    {
      id: "api-orchestration-tier",
      title: "Orchestration Tier",
      subtitle: "Jobs, status, queue",
      purpose: "Describe the orchestration plane documented under /docs/api.",
      defines: [
        "Job Orchestration as lifecycle authority for queued work.",
        "Status Tracker and queue coordination as documented orchestration surfaces.",
      ],
      doesNotDefine: "UI progress rendering ownership in Client Layer.",
      href: "/docs/api/job-orchestration",
      linkLabel: "Job Orchestration",
    },
    {
      id: "api-runtime-output-tier",
      title: "Runtime & Output Tier",
      subtitle: "Execution, versioning, /jobs",
      purpose: "Summarize runtime execution routing and versioned outputs per API documentation.",
      defines: [
        "Execution Layer as runtime action dispatch and result collection boundary.",
        "Versioning as documented authority for stable version references.",
        "/jobs result projection responsibilities as documented API surfaces.",
      ],
      doesNotDefine: "DSP processor implementation details or Data Layer storage topology.",
      href: "/docs/api/execution",
      linkLabel: "Execution Layer",
    },
    {
      id: "api-ownership-boundaries",
      title: "Ownership & Boundaries",
      subtitle: "API vs QAgent, Client, DSP, Data",
      purpose: "Clarify what API owns versus neighboring layers at system abstraction.",
      defines: [
        "API owns execution lifecycle, job orchestration, and published runtime outcomes.",
        "QAgent owns planning and approval prior to `/run`; API mediates persistence access but does not own canonical truth.",
        "DSP executes inside orchestrated paths; API does not redefine DSP contracts.",
        "Client consumes status/results; API does not own UI state machines.",
      ],
      doesNotDefine: "canonical persistence definitions owned by Data Layer documentation.",
      href: "/docs/api/core-flow",
      linkLabel: "API Core Flow",
    },
    {
      id: "api-observability",
      title: "Failure & Observability (API view)",
      subtitle: "Decision outcomes and publication",
      purpose: "High-level reference to where API documents admission failures and published observability boundaries.",
      defines: [
        "Decision System documentation as the locus for admission-oriented failure outcomes.",
        "Separation between published API status surfaces and Client-only presentation rules.",
      ],
      doesNotDefine: "client-only error copywriting rules or DSP engine logs.",
      href: "/docs/api/decision-system",
      linkLabel: "Decision System",
    },
  ],
  "dsp-processing-layer": [
    {
      id: "dsp-purpose",
      title: "Layer Purpose",
      subtitle: "Deterministic processing execution",
      purpose: "Summarize DSP as the processing execution specialization invoked from API-orchestrated paths.",
      defines: [
        "Deterministic audio transformation responsibilities documented under DSP Layer.",
        "Artifact-oriented inputs and outputs aligned with contracts and integration pages.",
      ],
      doesNotDefine: "job queue ownership, billing policy, or client UI behavior.",
      href: "/docs/dsp-layer",
      linkLabel: "DSP docs",
    },
    {
      id: "dsp-core-tier",
      title: "Core & Execution Model",
      subtitle: "Specification and constraints",
      purpose: "Reference the core specification surface that defines DSP behavior and constraints.",
      defines: [
        "Layer definition, responsibilities, execution model, and state behavior as documented in core specification.",
        "Explicit non-ownership constraints (no UI, no orchestration authority).",
      ],
      doesNotDefine: "API worker pool sizing or infrastructure autoscaling rules.",
      href: "/docs/dsp-layer/core-specification",
      linkLabel: "Core Specification",
    },
    {
      id: "dsp-contracts-tier",
      title: "Contracts Tier",
      subtitle: "Execution, result, error, metadata",
      purpose: "Summarize contract ownership documented on DSP contracts pages.",
      defines: [
        "Execution, result, error, and metadata contract boundaries as canonical DSP contract surfaces.",
        "Compatibility declarations as documented contract scope.",
      ],
      doesNotDefine: "QAgent planning contracts or Client event envelopes.",
      href: "/docs/dsp-layer/contracts",
      linkLabel: "DSP Contracts",
    },
    {
      id: "dsp-engine-tier",
      title: "Processing Engine Tier",
      subtitle: "Processors and lifecycle",
      purpose: "Describe the processing engine documentation structure at system level.",
      defines: [
        "Processor model and processor types as documented execution primitives.",
        "Internal routing and engine lifecycle semantics as owned DSP documentation.",
      ],
      doesNotDefine: "API job state machine definitions.",
      href: "/docs/dsp-layer/processing-engine",
      linkLabel: "Processing Engine",
    },
    {
      id: "dsp-integration-tier",
      title: "System Integration",
      subtitle: "API and Data Layer interfaces",
      purpose: "Summarize DSP integration documentation for cross-layer handoffs.",
      defines: [
        "Documented hand-in from API execution paths into DSP processing.",
        "Documented output emission paths toward Data Layer artifact persistence policies.",
      ],
      doesNotDefine: "Data Layer retention implementation or API `/run` schema fields.",
      href: "/docs/dsp-layer/system-integration",
      linkLabel: "System Integration",
    },
    {
      id: "dsp-ownership-boundaries",
      title: "Ownership & Boundaries",
      subtitle: "DSP vs API, Data, Client",
      purpose: "Restate DSP ownership: processing only.",
      defines: [
        "DSP owns deterministic transform execution and documented contracts for inputs/outputs.",
        "API Server owns orchestration and job lifecycle; DSP does not own queues.",
        "Data Layer owns canonical persistence; DSP produces artifacts but not persistence policy.",
        "Client Layer is outside DSP processing boundary.",
      ],
      doesNotDefine: "UI rendering, billing enforcement, or orchestration policy.",
      href: "/docs/dsp-layer/core#10-constraints",
      linkLabel: "DSP constraints",
    },
  ],
  "auth-security-layer": [
    {
      id: "auth-security-purpose",
      title: "Layer Purpose",
      subtitle: "Enforcement boundary for identity, session, and access",
      purpose: "Summarize Auth & Security as the gate that runs before protected operations: external identity proof, WaveQ session trust, authorization, and isolation—without owning business or execution semantics.",
      defines: [
        "Authentication and user linkage via trusted IdP assertions (e.g. Clerk).",
        "WaveQ session token carrying userId, workspaceId, and plan for API authorization and limits.",
        "Workspace-scoped authorization, API protection chain, data isolation, rate limits, audit, and secrets handling as documented under /docs/auth-security.",
      ],
      doesNotDefine: "QAgent planning, API job orchestration internals, DSP transforms, or canonical persistence schemas.",
      href: "/docs/auth-security",
      linkLabel: "Auth & Security overview",
    },
    {
      id: "auth-canonical-contracts",
      title: "Canonical contracts",
      subtitle: "Spines, JWT, errors",
      purpose: "Authoritative ordering and minimum wire contracts for this layer; chapter pages defer to these paths.",
      defines: [
        "system-flow: API request spine S01–S12 and bootstrap spine B01–B06.",
        "session-spec: WaveQ session JWT claims and validation rules.",
        "error-contracts: 401 / 403 / 429 JSON envelope and stable codes.",
      ],
      doesNotDefine: "OpenAPI for every route (API product docs).",
      href: "/docs/auth-security/system-flow",
      linkLabel: "System flow",
    },
    {
      id: "auth-identity-session",
      title: "Identity & Session",
      subtitle: "External proof vs internal runtime trust",
      purpose: "Separate IdP authentication from WaveQ session issuance so APIs can revoke, scope, and audit without embedding IdP-specific logic in downstream layers.",
      defines: [
        "Identity: IdP-owned sign-in; WaveQ maps verified assertions to internal user records.",
        "Session: server-issued token after identity succeeds; carries workspace and plan context for gates.",
      ],
      doesNotDefine: "Authorization matrices or per-route handler business rules.",
      href: "/docs/auth-security/identity",
      linkLabel: "Identity",
    },
    {
      id: "auth-authorization",
      title: "Authorization",
      subtitle: "Workspace roles and action gates",
      purpose: "Document workspace-based roles and action-based checks before QAgent, DSP, or data operations proceed.",
      defines: [
        "Role + permission + workspace membership resolution for protected actions.",
        "Least privilege: default deny unless explicitly allowed.",
      ],
      doesNotDefine: "QAgent approval policy content or API payload field catalogs.",
      href: "/docs/auth-security/authorization",
      linkLabel: "Authorization",
    },
    {
      id: "auth-api-data-protection",
      title: "API protection & Data security",
      subtitle: "Request path and tenant isolation",
      purpose: "API ordering is frozen in system-flow (S02–S10); this row is a map into chapter depth, not a second chain.",
      defines: [
        "S02–S08: middleware classification, bearer, verify, decode, rate limit, authorization, attach context (see api-protection, session-spec).",
        "S10: workspace-scoped persistence predicates (see data-security); 401/403/429 shapes in error-contracts.",
      ],
      doesNotDefine: "Individual route aggregates or physical multi-tenancy topology.",
      href: "/docs/auth-security/system-flow",
      linkLabel: "System flow",
    },
    {
      id: "auth-rate-audit-secrets",
      title: "Rate limits, Audit, Secrets",
      subtitle: "Abuse control, traceability, and key hygiene",
      purpose: "Point to plan-based throttling, security-relevant logging, and server-only signing material.",
      defines: [
        "Rate limits tied to session plan context for AI and DSP protection.",
        "Audit events for authentication, DSP, and sensitive API usage with redaction rules.",
        "Secrets and JWT signing keys never exposed to the client.",
      ],
      doesNotDefine: "SIEM rule authoring or client UI copy for errors.",
      href: "/docs/auth-security/rate-limit",
      linkLabel: "Rate limit",
    },
    {
      id: "auth-ownership-boundaries",
      title: "Ownership & Boundaries",
      subtitle: "Auth vs QAgent, API, DSP, Data, Client",
      purpose: "Restate that Auth gates access only; it does not own planning, orchestration, transforms, or canonical persistence.",
      defines: [
        "QAgent owns intent and plans; API owns job lifecycle; DSP owns processing; Data owns persistence; Client owns UI state.",
        "Auth layer applies controls before those domains continue.",
      ],
      doesNotDefine: "Execution semantics, lineage DDL, or DSP processor graphs.",
      href: "/docs/auth-security",
      linkLabel: "Auth & Security overview",
    },
  ],
};

export default async function SystemLayerPage({ params }: { params: Promise<{ layer: string }> }) {
  const { layer } = await params;
  const title = layerTitles[layer];
  const canonicalHref = layerCanonicalLinks[layer];
  const systemView = layerSystemViews[layer];

  if (!title || !canonicalHref || !systemView) notFound();

  const detailsItems = layerStructuredDetails[layer] ?? defaultSystemLayerDetails(systemView, canonicalHref);

  return (
    <DocsContent>
      <PageTitle title={`${title} - System View`} description={systemView.summary} />

      <DocsScopeBlocks links={systemLayerDocLinks(canonicalHref)} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro={systemView.explanation[0]}
            areasTitle="Layer concerns"
            areas={systemView.responsibilities}
            outOfScope="semantic ownership of adjacent layers."
            relatedBoundaries={[
              "System View = layer-level orientation and ownership boundaries.",
              "Canonical page = deep specification authority for this layer.",
              "System Flow = cross-layer transition reference.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Layer scope and responsibilities.", href: "#overview" },
              { title: "Layer Structure Diagram", subtitle: "System placement and handoff model.", href: "#layer-structure-diagram" },
              { title: "Layer Details", subtitle: "Purpose, defines, boundaries.", href: "#layer-details" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="layer-structure-diagram" title="Layer Structure Diagram" body={[]}>
          {layer === "end-to-end-flow" ? (
            <EndToEndSequenceDiagram />
          ) : layerStructureDiagrams[layer] ? (
            <>
              <p className="mb-3 text-sm text-[var(--muted)]">{layerStructureDiagrams[layer].caption}</p>
              <DocsDiagram
                mode="structure"
                root={layerStructureDiagrams[layer].root}
                groups={layerStructureDiagrams[layer].groups}
              />
            </>
          ) : (
            <DocsDiagram
              mode="structure"
              root={title}
              groups={[
                { title: "Layer Role", items: [systemView.explanation[0]] },
                { title: "System Position", items: [systemView.position] },
              ]}
            />
          )}
        </SectionBlock>

        <SectionBlock id="layer-details" title="Layer Details" body={[]}>
          <DocsDetailsAccordion items={[...detailsItems]} />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
