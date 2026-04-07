import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";

const groups = [
  {
    title: "Architecture",
    description: "System blueprint, core boundaries, and high-level module topology.",
    links: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "System Flow", href: "/docs/system-flow" },
      { label: "Terminology", href: "/docs/terminology" },
      { label: "System Map", href: "/docs/architecture" },
      { label: "Main QAgent Core Structure", href: "/docs/qcore" },
      { label: "Q Agent", href: "/docs/q-agent" },
      { label: "Schema Registry", href: "/docs/architecture/contracts/schema-registry" },
      { label: "Lineage Model", href: "/docs/architecture/contracts/lineage-model" },
    ],
  },
  {
    title: "Core Flow",
    description: "Ordered module pipeline from QCore through execution and versioning.",
    links: [
      { label: "QCore Engine", href: "/docs/architecture/modules/qagent-core" },
      { label: "Files Handler", href: "/docs/architecture/modules/files-handler" },
      { label: "Analyzer", href: "/docs/architecture/modules/analyzer" },
      { label: "Intent + Clarification", href: "/docs/architecture/modules/intent-clarification" },
      { label: "DAL", href: "/docs/architecture/modules/dal" },
      { label: "UAgent", href: "/docs/architecture/modules/uagent" },
      { label: "Approval", href: "/docs/architecture/modules/approval" },
      { label: "DAgent", href: "/docs/architecture/modules/dagent" },
      { label: "Versioning", href: "/docs/architecture/modules/versioning" },
    ],
  },
  {
    title: "Decision System",
    description: "Routing, orchestration, and state transition governance.",
    links: [
      { label: "Orchestration Overview", href: "/docs/orchestration/overview" },
      { label: "Routing Logic", href: "/docs/orchestration/routing-logic" },
      { label: "State Machine", href: "/docs/orchestration/state-machine" },
      { label: "Failure Handling", href: "/docs/orchestration/failure-handling" },
      { label: "Control Policy Matrix", href: "/docs/architecture/policies/control-policy-matrix" },
      { label: "Approval Modify Loop", href: "/docs/architecture/approval/modify-loop-contract" },
    ],
  },
  {
    title: "Audio System",
    description: "Audio analysis, comparison, memory, and audio-specific planning.",
    links: [
      { label: "Audio Sandbox", href: "/docs/audio-sandbox/overview" },
      { label: "Audio Comparison", href: "/docs/audio-comparison/overview" },
      { label: "Audio Memory", href: "/docs/audio-memory" },
      { label: "Audio DAL", href: "/docs/audio-dal" },
    ],
  },
  {
    title: "Execution",
    description: "Runtime execution states, progress behavior, and operational safeguards.",
    links: [
      { label: "Execution Runtime", href: "/docs/execution-runtime/overview" },
      { label: "Runtime Error Handling", href: "/docs/execution-runtime/error-handling" },
      { label: "Cancellation and Retry", href: "/docs/execution-runtime/cancellation-and-retry" },
      { label: "DSP Engine Abstraction", href: "/docs/architecture/dagent/dsp-engine-abstraction" },
      { label: "Session Isolation", href: "/docs/architecture/policies/session-isolation" },
    ],
  },
  {
    title: "Versioning",
    description: "Version lifecycle, traceability, restore, and output persistence.",
    links: [
      { label: "Versioning Module", href: "/docs/architecture/modules/versioning" },
      { label: "Version Manager", href: "/docs/architecture/modules/versioning/version-manager" },
      { label: "Diff Engine", href: "/docs/architecture/modules/versioning/diff-engine" },
      { label: "Output Versioning", href: "/docs/execution-runtime/output-versioning" },
      { label: "Lifecycle Version Lifecycle", href: "/docs/lifecycle/version-lifecycle" },
      { label: "Failure Policy", href: "/docs/architecture/policies/failure-policy" },
    ],
  },
  {
    title: "Implementation",
    description: "Implementation planning, contracts, API, and validation strategy.",
    links: [
      { label: "Implementation Map", href: "/docs/implementation-map" },
      { label: "Module Design", href: "/docs/module-design" },
      { label: "Function Contracts", href: "/docs/function-contracts" },
      { label: "Testing Strategy", href: "/docs/testing-strategy" },
      { label: "API", href: "/docs/api" },
      { label: "Implementation Baseline", href: "/docs/architecture/implementation-baseline" },
    ],
  },
];

export default function DocsIndexPage() {
  return (
    <DocsContent>
      <PageTitle
        title="QAgent Documentation"
        description="Explore architecture, flow, execution, and implementation references through grouped system hubs."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-4">
            <h2 className="text-lg font-semibold text-slate-100">{group.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{group.description}</p>
            <ul className="mt-3 space-y-1.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-cyan-300 hover:text-cyan-200 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </DocsContent>
  );
}
