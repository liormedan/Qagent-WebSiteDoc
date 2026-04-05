import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleAccordion } from "@/components/ui/ModuleAccordion";
import { cn } from "@/lib/utils";

type LifecycleNode = {
  id: string;
  name: string;
  type: "Core" | "Flow" | "Integration" | "UI" | "UI Gated" | "Execution" | "State";
};

type ModuleCard = {
  id: string;
  anchorId: string;
  name: string;
  type: LifecycleNode["type"];
  purpose: string;
  inputs: string;
  outputs: string;
  dependsOn: string;
};

const lifecycleNodes: LifecycleNode[] = [
  { id: "01", name: "QAgent Core", type: "Core" },
  { id: "02", name: "Files Handler", type: "Flow" },
  { id: "03", name: "Analyzer", type: "Flow" },
  { id: "04", name: "Intent + Clarification", type: "Flow" },
  { id: "05", name: "DAL", type: "Integration" },
  { id: "06", name: "UAgent", type: "UI" },
  { id: "07", name: "Approval", type: "UI Gated" },
  { id: "08", name: "DAgent", type: "Execution" },
  { id: "09", name: "Versioning", type: "State" },
];

const moduleCards: ModuleCard[] = [
  {
    id: "01",
    anchorId: "01-qagent-core",
    name: "QAgent Core",
    type: "Core",
    purpose: "Controls ordered module execution and enforces deterministic system rules.",
    inputs: "User request context, session state, module responses.",
    outputs: "Validated next-module command and runtime state updates.",
    dependsOn: "All downstream modules for execution results.",
  },
  {
    id: "02",
    anchorId: "02-files-handler",
    name: "Files Handler",
    type: "Flow",
    purpose: "Loads, validates, and indexes user-provided files for analysis.",
    inputs: "Uploaded files and metadata.",
    outputs: "Normalized file references and access-safe handles.",
    dependsOn: "QAgent Core request scope.",
  },
  {
    id: "03",
    anchorId: "03-analyzer",
    name: "Analyzer",
    type: "Flow",
    purpose: "Extracts audio evidence and structured signal features for decision layers.",
    inputs: "File handles and analysis directives.",
    outputs: "Feature vectors, detected events, confidence metadata.",
    dependsOn: "Files Handler output.",
  },
  {
    id: "04",
    anchorId: "04-intent-clarification",
    name: "Intent + Clarification",
    type: "Flow",
    purpose: "Resolves user intent and blocks ambiguous actions until clarified.",
    inputs: "User language intent and analyzer evidence.",
    outputs: "Confirmed intent state with explicit constraints.",
    dependsOn: "QAgent Core and Analyzer evidence.",
  },
  {
    id: "05",
    anchorId: "05-dal",
    name: "DAL",
    type: "Integration",
    purpose: "Builds executable action plan aligned to approved intent boundaries.",
    inputs: "Confirmed intent, constraints, and module context.",
    outputs: "Deterministic action graph for execution modules.",
    dependsOn: "Intent + Clarification result.",
  },
  {
    id: "06",
    anchorId: "06-uagent",
    name: "UAgent",
    type: "UI",
    purpose: "Generates user-facing plan view and review controls before execution.",
    inputs: "DAL action graph and current session state.",
    outputs: "UI-ready action summary and approval prompts.",
    dependsOn: "DAL output.",
  },
  {
    id: "07",
    anchorId: "07-approval-ui-triggered-core-enforced",
    name: "Approval (UI-triggered, Core-enforced)",
    type: "UI Gated",
    purpose: "Prevents execution until explicit user approval is captured and verified.",
    inputs: "User approval signal and DAL plan fingerprint.",
    outputs: "Approved or rejected execution gate state.",
    dependsOn: "UAgent prompt delivery and QAgent Core validation.",
  },
  {
    id: "08",
    anchorId: "08-dagent",
    name: "DAgent",
    type: "Execution",
    purpose: "Executes approved DSP operations exactly as defined by the DAL plan.",
    inputs: "Approved execution graph and media context.",
    outputs: "Processed artifacts, logs, and status outcomes.",
    dependsOn: "Approval gate and DAL integrity.",
  },
  {
    id: "09",
    anchorId: "09-versioning",
    name: "Versioning",
    type: "State",
    purpose: "Persists final outputs as traceable versions for compare/revert workflows.",
    inputs: "Execution artifacts and session lineage data.",
    outputs: "Version snapshots and lifecycle transition records.",
    dependsOn: "DAgent execution result.",
  },
];

function toneClass(type: LifecycleNode["type"]): string {
  if (type === "UI Gated") return "bg-amber-400/15 text-amber-200 border-amber-400/35";
  if (type === "Core") return "bg-cyan-400/15 text-cyan-200 border-cyan-400/35";
  if (type === "Execution") return "bg-indigo-400/15 text-indigo-200 border-indigo-400/35";
  if (type === "State") return "bg-emerald-400/15 text-emerald-200 border-emerald-400/35";
  if (type === "Integration") return "bg-violet-400/15 text-violet-200 border-violet-400/35";
  if (type === "UI") return "bg-sky-400/15 text-sky-200 border-sky-400/35";
  return "bg-slate-800 text-slate-100 border-[var(--border)]";
}

export default function ArchitecturePage() {
  return (
    <DocsContent>
      <div className="space-y-6 pb-4">
        <section className="rounded-xl border border-[var(--border)] bg-slate-950/30 p-5 md:p-6">
          <h1 className="text-3xl font-semibold leading-tight md:text-[2.1rem]">Architecture</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
            AgentQ runs an ordered modular flow for audio requests with deterministic routing, UI-gated approval, and versioned outputs.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="border border-[var(--border)] bg-slate-900 text-slate-100">9 modules</Badge>
            <Badge className="border border-[var(--border)] bg-slate-900 text-slate-100">Request lifecycle</Badge>
            <Badge className="border border-amber-400/35 bg-amber-400/15 text-amber-200">UI approvals</Badge>
          </div>
        </section>

        <section id="request-lifecycle" className="space-y-2">
          <h2 className="text-xl font-semibold">Request Lifecycle</h2>
          <p className="text-sm text-[var(--muted)]">Ordered execution path from intake to versioned output.</p>

          <Card className="border border-[var(--border)] bg-slate-950/35">
            <CardContent className="p-4 md:p-5">
              <div className="space-y-2 border-s border-[var(--border)] ps-4">
                {lifecycleNodes.map((node) => (
                  <div key={node.id} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] bg-slate-900/70 p-3">
                    <p className="text-sm font-medium text-slate-100">{node.name}</p>
                    <Badge className={cn("shrink-0 border text-[10px]", toneClass(node.type))}>{node.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="core-components" className="space-y-2">
          <h2 className="text-xl font-semibold">Core Components</h2>
          <p className="text-sm text-[var(--muted)]">
            Format per module: Purpose, Inputs, Outputs, and Depends on.
          </p>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            {moduleCards.map((module) => (
              <ModuleAccordion
                key={module.id}
                anchorId={module.anchorId}
                number={module.id}
                name={module.name}
                role={module.type}
                purpose={module.purpose}
                inputs={module.inputs}
                outputs={module.outputs}
                dependsOn={module.dependsOn}
                isPrimary={module.id === "01"}
              />
            ))}
          </div>
        </section>

        <section id="recommended-reading" className="space-y-2">
          <h2 className="text-xl font-semibold">Recommended Reading Order</h2>
          <p className="text-sm text-[var(--muted)]">Start here if this is your first pass through the system docs.</p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              { step: "1", title: "System Overview", href: "/docs/overview", summary: "Understand system scope and request lifecycle." },
              { step: "2", title: "Architecture", href: "/docs/architecture", summary: "Map module order, constraints, and approval gate." },
              { step: "3", title: "One Request Journey", href: "/docs/orchestration/orchestration-flow", summary: "See end-to-end execution in one concrete flow." },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="rounded-lg border border-[var(--border)] bg-slate-950/25 p-4 transition-colors hover:bg-slate-950/50"
              >
                <p className="text-xs text-slate-400">Step {item.step}</p>
                <p className="mt-1 text-sm font-semibold text-slate-100">{item.title}</p>
                <p className="mt-1 text-sm text-slate-300">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </DocsContent>
  );
}
