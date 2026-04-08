import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { QAGENT_CANONICAL_FLOW } from "@/lib/qagent-canonical";

type HubLink = { label: string; href: string };
type Hub = {
  title: string;
  description: string;
  featured: HubLink[];
  secondary: HubLink[];
};

const hubs: Hub[] = [
  {
    title: "Architecture",
    description: "System blueprint, core boundaries, and high-level module topology.",
    featured: [
      { label: "Getting Started", href: "/docs/getting-started" },
      { label: "System Flow", href: "/docs/system-flow" },
      { label: "System Map", href: "/docs/architecture" },
    ],
    secondary: [
      { label: "Terminology", href: "/docs/terminology" },
      { label: "Main QCore Structure", href: "/docs/qcore" },
      { label: "QAgent", href: "/docs/q-agent" },
      { label: "Schema Registry", href: "/docs/architecture/contracts/schema-registry" },
      { label: "Lineage Model", href: "/docs/architecture/contracts/lineage-model" },
    ],
  },
  {
    title: "Core Flow",
    description: "Ordered module pipeline from QCore through execution and versioning.",
    featured: [
      { label: "QCore", href: "/docs/architecture/modules/qagent-core" },
      { label: "Approval", href: "/docs/architecture/modules/approval" },
    ],
    secondary: [
      { label: "Files Handler", href: "/docs/architecture/modules/files-handler" },
      { label: "Analyzer", href: "/docs/architecture/modules/analyzer" },
      { label: "Intent + Clarification", href: "/docs/architecture/modules/intent-clarification" },
      { label: "DAL", href: "/docs/architecture/modules/dal" },
      { label: "UAgent", href: "/docs/architecture/modules/uagent" },
      { label: "DAgent", href: "/docs/architecture/modules/dagent" },
      { label: "Versioning", href: "/docs/architecture/modules/versioning" },
    ],
  },
  {
    title: "Decision System",
    description: "Routing, orchestration, and state transition governance.",
    featured: [
      { label: "Routing Logic", href: "/docs/orchestration/routing-logic" },
      { label: "State Machine", href: "/docs/orchestration/state-machine" },
    ],
    secondary: [
      { label: "Orchestration Overview", href: "/docs/orchestration/overview" },
      { label: "Failure Handling", href: "/docs/orchestration/failure-handling" },
      { label: "Control Policy Matrix", href: "/docs/architecture/policies/control-policy-matrix" },
      { label: "Approval Modify Loop", href: "/docs/architecture/approval/modify-loop-contract" },
    ],
  },
  {
    title: "Audio System",
    description: "Audio analysis, comparison, memory, and audio-specific planning.",
    featured: [
      { label: "Audio Sandbox", href: "/docs/audio-sandbox/overview" },
      { label: "Audio Comparison", href: "/docs/audio-comparison/overview" },
    ],
    secondary: [
      { label: "Audio Memory", href: "/docs/audio-memory" },
      { label: "Audio DAL", href: "/docs/audio-dal" },
    ],
  },
  {
    title: "Execution",
    description: "Runtime execution states, progress behavior, and operational safeguards.",
    featured: [
      { label: "Execution Runtime", href: "/docs/execution-runtime/overview" },
      { label: "Runtime Error Handling", href: "/docs/execution-runtime/error-handling" },
    ],
    secondary: [
      { label: "Cancellation and Retry", href: "/docs/execution-runtime/cancellation-and-retry" },
      { label: "DSP Engine Abstraction", href: "/docs/architecture/dagent/dsp-engine-abstraction" },
      { label: "Session Isolation", href: "/docs/architecture/policies/session-isolation" },
    ],
  },
  {
    title: "Versioning",
    description: "Version lifecycle, traceability, restore, and output persistence.",
    featured: [
      { label: "Version Manager", href: "/docs/architecture/modules/versioning/version-manager" },
      { label: "Execution Output Versioning", href: "/docs/execution-runtime/output-versioning" },
    ],
    secondary: [
      { label: "Versioning Module", href: "/docs/architecture/modules/versioning" },
      { label: "Diff Engine", href: "/docs/architecture/modules/versioning/diff-engine" },
      { label: "Lifecycle Version States", href: "/docs/lifecycle/version-lifecycle" },
      { label: "Failure Policy", href: "/docs/architecture/policies/failure-policy" },
    ],
  },
  {
    title: "Implementation",
    description: "Implementation planning, contracts, API, and validation strategy.",
    featured: [
      { label: "Function Contracts", href: "/docs/function-contracts" },
      { label: "Testing Strategy", href: "/docs/testing-strategy" },
    ],
    secondary: [
      { label: "Implementation Map", href: "/docs/implementation-map" },
      { label: "Module Design", href: "/docs/module-design" },
      { label: "API", href: "/docs/api" },
      { label: "Implementation Baseline", href: "/docs/architecture/implementation-baseline" },
    ],
  },
];

const onboardingSteps = [
  {
    step: "01",
    title: "Getting Started",
    description: "Quick orientation for first-time readers.",
    href: "/docs/getting-started",
  },
  {
    step: "02",
    title: "System Flow",
    description: "Follow one request from input to runtime output.",
    href: "/docs/system-flow",
  },
  {
    step: "03",
    title: "Architecture",
    description: "Understand module boundaries and system contracts.",
    href: "/docs/architecture",
  },
];

const commonPaths = [
  {
    title: "Learn the architecture",
    links: [
      { label: "System Map", href: "/docs/architecture" },
      { label: "Main QCore Structure", href: "/docs/qcore" },
    ],
  },
  {
    title: "Follow execution flow",
    links: [
      { label: "System Flow", href: "/docs/system-flow" },
      { label: "Execution Runtime", href: "/docs/execution-runtime/overview" },
    ],
  },
  {
    title: "Understand approval and control",
    links: [
      { label: "Approval Module", href: "/docs/architecture/modules/approval" },
      { label: "Routing Logic", href: "/docs/orchestration/routing-logic" },
      { label: "State Machine", href: "/docs/orchestration/state-machine" },
    ],
  },
  {
    title: "Jump to implementation",
    links: [
      { label: "Implementation Map", href: "/docs/implementation-map" },
      { label: "Function Contracts", href: "/docs/function-contracts" },
      { label: "Testing Strategy", href: "/docs/testing-strategy" },
    ],
  },
];

export default function DocsIndexPage() {
  return (
    <DocsContent>
      <div className="space-y-6">
        <section className="rounded-xl border border-[var(--border)] bg-slate-950/30 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="border border-emerald-400/30 bg-emerald-500/10 text-emerald-200">Ready for Implementation</Badge>
          </div>

          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-[2.15rem]">QAgent Documentation</h1>
          <p className="mt-3 rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
            QAgent Layer — LOCKED
            <br />
            Version: v1.0
            <br />
            Status: Production-ready (documentation)
          </p>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300 md:text-base">
            Explore architecture, orchestration, execution runtime, audio intelligence, and implementation references across one structured documentation system.
          </p>
          <p className="mt-2 max-w-4xl rounded-md border border-[var(--border)] bg-slate-900/40 px-3 py-2 text-xs leading-5 text-slate-300 md:text-sm">
            Canonical flow: {QAGENT_CANONICAL_FLOW}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge className="border border-[var(--border)] bg-slate-900 text-slate-100">7 system hubs</Badge>
            <Badge className="border border-[var(--border)] bg-slate-900 text-slate-100">Implementation-ready</Badge>
            <Badge className="border border-[var(--border)] bg-slate-900 text-slate-100">Architecture to runtime coverage</Badge>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
            {[
              { title: "Start here", href: "/docs/getting-started", description: "Get oriented fast." },
              { title: "Understand the system", href: "/docs/system-flow", description: "See end-to-end flow." },
              { title: "Explore the blueprint", href: "/docs/architecture", description: "Open architecture map." },
            ].map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="rounded-lg border border-[var(--border)] bg-slate-950/20 px-3 py-3 transition-colors hover:bg-slate-950/50"
              >
                <p className="text-sm font-semibold text-slate-100">{action.title}</p>
                <p className="mt-1 text-xs text-slate-400">{action.description}</p>
              </Link>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Use the top search bar to jump directly to pages, or use <span className="font-semibold text-slate-300">Ask Q</span> for guided navigation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">New Here?</h2>
          <p className="text-sm text-[var(--muted)]">Recommended path for first-time readers.</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {onboardingSteps.map((step) => (
              <Card key={step.step} className="border border-[var(--border)] bg-slate-950/25">
                <CardHeader className="space-y-1 pb-1">
                  <p className="text-xs text-slate-400">Step {step.step}</p>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-300">{step.description}</p>
                  <Link href={step.href} className="mt-3 inline-block text-sm font-medium text-[var(--accent)] hover:underline">
                    Open page
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Documentation Hubs</h2>
          <p className="text-sm text-[var(--muted)]">Curated by domain: featured links first, then supporting references.</p>

          <div className="space-y-3">
            {hubs.map((hub) => (
              <Card key={hub.title} className="border border-[var(--border)] bg-slate-950/20">
                <CardHeader className="space-y-1 pb-1">
                  <h3 className="text-lg font-semibold">{hub.title}</h3>
                  <p className="text-sm text-slate-300">{hub.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {hub.featured.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-lg border border-[var(--border)] bg-slate-900/50 px-3 py-2 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-900"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {hub.secondary.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm text-slate-400 transition-colors hover:text-[var(--accent)] hover:underline">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-semibold">Explore By Goal</h2>
          <p className="text-sm text-[var(--muted)]">Common paths for new and returning readers.</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {commonPaths.map((path) => (
              <Card key={path.title} className="border border-[var(--border)] bg-slate-950/20">
                <CardHeader className="pb-1">
                  <h3 className="text-base font-semibold">{path.title}</h3>
                </CardHeader>
                <CardContent className="space-y-1">
                  {path.links.map((link) => (
                    <Link key={link.href} href={link.href} className="block text-sm text-slate-300 transition-colors hover:text-[var(--accent)] hover:underline">
                      {link.label}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DocsContent>
  );
}

