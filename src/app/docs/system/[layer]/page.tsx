import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { EndToEndSequenceDiagram } from "@/components/ui/EndToEndSequenceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";

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

export default async function SystemLayerPage({ params }: { params: Promise<{ layer: string }> }) {
  const { layer } = await params;
  const title = layerTitles[layer];
  const canonicalHref = layerCanonicalLinks[layer];
  const systemView = layerSystemViews[layer];

  if (!title || !canonicalHref || !systemView) {
    notFound();
  }

  return (
    <DocsContent>
      <PageTitle title={`${title} - System View`} description={systemView.summary} />

      <div className="mt-4 space-y-4 rounded-md border border-[var(--border)] bg-slate-900/30 p-4 text-sm text-slate-300">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-100">What this layer does</h2>
          <p>{systemView.explanation[0]}</p>
          <p>{systemView.explanation[1]}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-100">Responsibilities</h2>
          <ul className="list-disc space-y-1 pl-5">
            {systemView.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-100">Position in the system</h2>
          <p>{systemView.position}</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-slate-100">Canonical page</h2>
          <Link href={canonicalHref} className="inline-block font-medium text-[var(--accent)] hover:underline">
            Explore in detail
          </Link>
        </section>

        {layer === "end-to-end-flow" ? (
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-slate-100">End-to-End Sequence Diagram</h2>
            <EndToEndSequenceDiagram />
          </section>
        ) : null}
      </div>
    </DocsContent>
  );
}
