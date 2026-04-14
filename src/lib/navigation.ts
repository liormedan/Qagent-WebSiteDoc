export type DocsNavGroup =
  | "Architecture"
  | "Core Flow"
  | "Decision System"
  | "Audio System"
  | "Execution"
  | "Versioning"
  | "Implementation";

export type DocNavItem = {
  title: string;
  description: string;
  href: string;
  group: DocsNavGroup;
  recommendedFirst?: boolean;
  flowStep?: number;
  flowTotal?: number;
  flowHelper?: string;
};

const orderedGroups: DocsNavGroup[] = ["Architecture", "Core Flow", "Decision System", "Audio System", "Execution", "Versioning", "Implementation"];

const groupSlugs: Record<DocsNavGroup, string> = {
  Architecture: "architecture",
  "Core Flow": "core-flow",
  "Decision System": "decision-system",
  "Audio System": "audio-system",
  Execution: "execution",
  Versioning: "versioning",
  Implementation: "implementation",
};

export const docsNavigation: DocNavItem[] = [
  {
    title: "Docs Home",
    description: "Entry point for exploring architecture, flows, execution, and implementation.",
    href: "/docs",
    group: "Architecture",
    recommendedFirst: true,
  },
  {
    title: "Getting Started",
    description: "Non-technical onboarding to understand QAgent quickly.",
    href: "/docs/getting-started",
    group: "Architecture",
  },
  {
    title: "Media Kit",
    description: "Video explanations, slide structure, and delivery assets for system walkthroughs.",
    href: "/docs/presentation-kit",
    group: "Architecture",
  },
  {
    title: "QAgent Flow",
    description: "QAgent-layer flow from request to output.",
    href: "/docs/system-flow",
    group: "Architecture",
  },
  {
    title: "Terminology",
    description: "Canonical terms used across architecture and implementation docs.",
    href: "/docs/terminology",
    group: "Architecture",
  },
  {
    title: "System Structure",
    description: "Primary WaveQ system entry and full layer map.",
    href: "/docs/system",
    group: "Architecture",
  },
  {
    title: "Main QCore Structure",
    description: "Authoritative definition of QCore as runtime orchestrator and control center.",
    href: "/docs/qcore",
    group: "Architecture",
  },
  {
    title: "QAgent Layer",
    description: "QAgent layer reference page.",
    href: "/docs/q-agent",
    group: "Architecture",
  },
  {
    title: "Schema Registry",
    description: "Canonical schema contracts for inter-module transitions.",
    href: "/docs/architecture/contracts/schema-registry",
    group: "Architecture",
  },
  {
    title: "Lineage Model",
    description: "End-to-end correlation IDs across request lifecycle.",
    href: "/docs/architecture/contracts/lineage-model",
    group: "Architecture",
  },
  {
    title: "Client-QAgent ID Mapping",
    description: "Mapping rules between Client correlation/session IDs and QAgent lineage IDs.",
    href: "/docs/architecture/contracts/client-qagent-id-mapping",
    group: "Architecture",
  },

  {
    title: "QCore",
    description: "Core orchestration runtime loop and control authority.",
    href: "/docs/architecture/modules/qagent-core",
    group: "Core Flow",
    flowStep: 1,
    flowTotal: 8,
    flowHelper: "Start with runtime control and orchestration.",
  },
  {
    title: "Files Handler",
    description: "Input ingestion, validation, and normalization layer.",
    href: "/docs/architecture/modules/files-handler",
    group: "Core Flow",
    flowStep: 2,
    flowTotal: 8,
    flowHelper: "Prepare files into stable normalized representations.",
  },
  {
    title: "Analyzer",
    description: "Interpretation layer that extracts structure and features.",
    href: "/docs/architecture/modules/analyzer",
    group: "Core Flow",
    flowStep: 3,
    flowTotal: 8,
    flowHelper: "Transform normalized input into analysis-ready output.",
  },
  {
    title: "Intent + Clarification",
    description: "Resolve intent and remove ambiguity before planning.",
    href: "/docs/architecture/modules/intent-clarification",
    group: "Core Flow",
    flowStep: 4,
    flowTotal: 8,
    flowHelper: "Validate actionable intent before DAL planning.",
  },
  {
    title: "DAL",
    description: "Decision abstraction and plan synthesis layer.",
    href: "/docs/architecture/modules/dal",
    group: "Core Flow",
    flowStep: 5,
    flowTotal: 8,
    flowHelper: "Convert intent into executable and UI plans.",
  },
  {
    title: "UAgent",
    description: "UI runtime that presents and mediates plan interaction.",
    href: "/docs/architecture/modules/uagent",
    group: "Core Flow",
    flowStep: 6,
    flowTotal: 8,
    flowHelper: "Render plan state and capture user interaction.",
  },
  {
    title: "Approval",
    description: "User-gated checkpoint enforced by QCore.",
    href: "/docs/architecture/modules/approval",
    group: "Core Flow",
    flowStep: 7,
    flowTotal: 8,
    flowHelper: "Gate execution through explicit approval.",
  },
  {
    title: "DAgent",
    description: "Execution module for approved operational graphs.",
    href: "/docs/architecture/modules/dagent",
    group: "Core Flow",
    flowStep: 8,
    flowTotal: 8,
    flowHelper: "Run approved operations and produce output artifacts.",
  },

  {
    title: "Orchestration Overview",
    description: "Control loop, routing, and cross-module coordination.",
    href: "/docs/orchestration/overview",
    group: "Decision System",
  },
  {
    title: "Routing Logic",
    description: "How requests map to system paths and execution branches.",
    href: "/docs/orchestration/routing-logic",
    group: "Decision System",
  },
  {
    title: "State Machine",
    description: "Allowed transitions and guardrails.",
    href: "/docs/orchestration/state-machine",
    group: "Decision System",
  },
  {
    title: "Failure Handling",
    description: "Fallback and recovery behavior at orchestration level.",
    href: "/docs/orchestration/failure-handling",
    group: "Decision System",
  },
  {
    title: "Control Policy Matrix",
    description: "Authority matrix for trigger, validation, enforcement, and execution.",
    href: "/docs/architecture/policies/control-policy-matrix",
    group: "Decision System",
  },
  {
    title: "Approval Modify Loop Contract",
    description: "Deterministic loopback behavior for approval modify actions.",
    href: "/docs/architecture/approval/modify-loop-contract",
    group: "Decision System",
  },

  {
    title: "Audio Sandbox",
    description: "Audio context indexing, retrieval, and query operations.",
    href: "/docs/audio-sandbox/overview",
    group: "Audio System",
  },
  {
    title: "Audio Comparison",
    description: "Difference modeling and A/B review workflows.",
    href: "/docs/audio-comparison/overview",
    group: "Audio System",
  },
  {
    title: "Audio Memory",
    description: "Timeline and historical audio context continuity.",
    href: "/docs/audio-memory",
    group: "Audio System",
  },
  {
    title: "Audio DAL",
    description: "Planning model for audio-specific action orchestration.",
    href: "/docs/audio-dal",
    group: "Audio System",
  },

  {
    title: "Execution Runtime",
    description: "Runtime lifecycle, progress, and execution contracts.",
    href: "/docs/execution-runtime/overview",
    group: "Execution",
  },
  {
    title: "Runtime Error Handling",
    description: "Execution-level error taxonomy and handling path.",
    href: "/docs/execution-runtime/error-handling",
    group: "Execution",
  },
  {
    title: "Cancellation and Retry",
    description: "Operational controls for execution interruption and rerun.",
    href: "/docs/execution-runtime/cancellation-and-retry",
    group: "Execution",
  },
  {
    title: "DSP Engine Abstraction",
    description: "WebAudio baseline and future WASM/C++ engine abstraction contract.",
    href: "/docs/architecture/dagent/dsp-engine-abstraction",
    group: "Execution",
  },
  {
    title: "Session Isolation Policy",
    description: "Multi-user tenant/session isolation and ownership rules.",
    href: "/docs/architecture/policies/session-isolation",
    group: "Execution",
  },

  {
    title: "Versioning Module",
    description: "Versioning layer for snapshots, history, restore, and traceability.",
    href: "/docs/architecture/modules/versioning",
    group: "Versioning",
  },
  {
    title: "Version Manager",
    description: "Lifecycle manager for version entity creation and state transitions.",
    href: "/docs/architecture/modules/versioning/version-manager",
    group: "Versioning",
  },
  {
    title: "Diff Engine",
    description: "Optional comparison engine for parameter, chain, and output deltas.",
    href: "/docs/architecture/modules/versioning/diff-engine",
    group: "Versioning",
  },
  {
    title: "Execution Output Versioning",
    description: "Runtime output to version lifecycle bridge.",
    href: "/docs/execution-runtime/output-versioning",
    group: "Versioning",
  },
  {
    title: "Lifecycle Version States",
    description: "Session-level version transitions and end-state handling.",
    href: "/docs/lifecycle/version-lifecycle",
    group: "Versioning",
  },
  {
    title: "Failure Policy",
    description: "Unified taxonomy, retry budgets, and fallback matrix.",
    href: "/docs/architecture/policies/failure-policy",
    group: "Versioning",
  },

  {
    title: "Implementation Map",
    description: "Concept-to-code implementation guidance.",
    href: "/docs/implementation-map",
    group: "Implementation",
  },
  {
    title: "Module Design",
    description: "Module boundaries, ownership, and IO contracts.",
    href: "/docs/module-design",
    group: "Implementation",
  },
  {
    title: "Function Contracts",
    description: "Callable interfaces and expected behaviors.",
    href: "/docs/function-contracts",
    group: "Implementation",
  },
  {
    title: "Testing Strategy",
    description: "Validation strategy for architecture and flow correctness.",
    href: "/docs/testing-strategy",
    group: "Implementation",
  },
  {
    title: "API",
    description: "API-oriented documentation references.",
    href: "/docs/api",
    group: "Implementation",
  },
  {
    title: "Implementation Baseline",
    description: "Authoritative baseline freeze for implementation scope.",
    href: "/docs/architecture/implementation-baseline",
    group: "Implementation",
  },
];

export function getNavigationByGroup(group: DocsNavGroup): DocNavItem[] {
  return docsNavigation.filter((item) => item.group === group);
}

export function getNavigationItemByHref(href: string): DocNavItem | undefined {
  return docsNavigation.find((item) => item.href === href);
}

export function getNavigationGroups(): DocsNavGroup[] {
  return orderedGroups;
}

export function getGroupSlug(group: DocsNavGroup): string {
  return groupSlugs[group];
}

export function getGroupBySlug(slug: string): DocsNavGroup | undefined {
  return (Object.entries(groupSlugs).find(([, value]) => value === slug)?.[0] as DocsNavGroup | undefined);
}

export function getGroupHubHref(group: DocsNavGroup): string {
  return `/docs/sections/${getGroupSlug(group)}`;
}

export function getGroupNeighbors(group: DocsNavGroup): { previous?: DocsNavGroup; next?: DocsNavGroup } {
  const index = orderedGroups.indexOf(group);
  if (index < 0) return {};
  return {
    previous: orderedGroups[index - 1],
    next: orderedGroups[index + 1],
  };
}

export function getFlowProgressByHref(href: string): { group: DocsNavGroup; step: number; total: number } | undefined {
  const item = getNavigationItemByHref(href);
  if (!item || item.group !== "Core Flow" || !item.flowStep || !item.flowTotal) {
    return undefined;
  }
  return { group: item.group, step: item.flowStep, total: item.flowTotal };
}

export function getFlowOrderedNavigation(): DocNavItem[] {
  const seen = new Set<string>();
  const ordered: DocNavItem[] = [];
  for (const item of docsNavigation) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    ordered.push(item);
  }
  return ordered;
}

export function getFlowNeighborsByHref(href: string): { previous?: DocNavItem; next?: DocNavItem } {
  const flowItems = getNavigationByGroup("Core Flow");
  const index = flowItems.findIndex((item) => item.href === href);
  if (index < 0) {
    return {};
  }
  return {
    previous: flowItems[index - 1],
    next: flowItems[index + 1],
  };
}

