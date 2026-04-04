export type DocsNavGroup =
  | "Start Here"
  | "Main Flow"
  | "Decision System"
  | "Audio Intelligence"
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

const orderedGroups: DocsNavGroup[] = ["Start Here", "Main Flow", "Decision System", "Audio Intelligence", "Implementation"];
const groupSlugs: Record<DocsNavGroup, string> = {
  "Start Here": "start-here",
  "Main Flow": "main-flow",
  "Decision System": "decision-system",
  "Audio Intelligence": "audio-intelligence",
  Implementation: "implementation",
};

export const docsNavigation: DocNavItem[] = [
  { title: "System Overview", description: "Understand the system mission and request lifecycle before technical details.", href: "/docs/overview", group: "Start Here", recommendedFirst: true },
  { title: "System Map", description: "See how Q, orchestration, runtime, and memory connect as one system.", href: "/docs/architecture", group: "Start Here" },
  { title: "One Request Journey", description: "Follow one complete request from input to versioned output and review.", href: "/docs/orchestration/orchestration-flow", group: "Start Here" },
  { title: "Core Concepts", description: "Learn the contracts and terms that make the rest of the docs deterministic.", href: "/docs/contracts", group: "Start Here" },

  {
    title: "Input / Intent",
    description: "Understand how Q classifies requests and chooses the first system route.",
    href: "/docs/intents",
    group: "Main Flow",
    flowStep: 1,
    flowTotal: 6,
    flowHelper: "Identify user intent and route the request into the correct operational path.",
  },
  {
    title: "Audio Sandbox Analysis",
    description: "Understand how sandbox analysis builds evidence before any irreversible action.",
    href: "/docs/audio-sandbox/overview",
    group: "Main Flow",
    flowStep: 2,
    flowTotal: 6,
    flowHelper: "Analyze loaded audio context and extract query/feature evidence for decisions.",
  },
  {
    title: "Audio Comparison",
    description: "Understand how Q quantifies before/after differences for safe decision-making.",
    href: "/docs/audio-comparison/overview",
    group: "Main Flow",
    flowStep: 3,
    flowTotal: 6,
    flowHelper: "Compare candidate audio against the current version before recommending changes.",
  },
  {
    title: "Recommendation",
    description: "Understand how Q turns evidence into ranked, explainable action suggestions.",
    href: "/docs/recommendation-engine/overview",
    group: "Main Flow",
    flowStep: 4,
    flowTotal: 6,
    flowHelper: "Recommend next actions with confidence and tradeoffs before approval.",
  },
  {
    title: "Execution",
    description: "Understand how approved decisions become runtime execution and new output versions.",
    href: "/docs/execution-runtime/overview",
    group: "Main Flow",
    flowStep: 5,
    flowTotal: 6,
    flowHelper: "Execute approved DAL actions and return result status plus output version links.",
  },
  {
    title: "Lifecycle",
    description: "Understand how sessions continue across repeated analyze-decide-execute cycles.",
    href: "/docs/lifecycle/overview",
    group: "Main Flow",
    flowStep: 6,
    flowTotal: 6,
    flowHelper: "Continue, review, and persist the session state across multiple iterations.",
  },

  { title: "Orchestration Overview", description: "Understand how orchestration unifies all subsystem actions into one control loop.", href: "/docs/orchestration/overview", group: "Decision System" },
  { title: "Agent Roles", description: "Understand which component owns each decision and handoff.", href: "/docs/orchestration/agent-roles", group: "Decision System" },
  { title: "Communication Model", description: "Understand the typed request/response contracts between agents.", href: "/docs/orchestration/communication-model", group: "Decision System" },
  { title: "Routing Logic", description: "Understand exactly how intent maps to subsystem routing decisions.", href: "/docs/orchestration/routing-logic", group: "Decision System" },
  { title: "Shared State", description: "Understand what shared state keeps all agents synchronized.", href: "/docs/orchestration/shared-state", group: "Decision System" },
  { title: "Orchestration Flow", description: "Understand how evidence aggregates into one decision packet.", href: "/docs/orchestration/orchestration-flow", group: "Decision System" },
  { title: "State Machine", description: "Understand allowed orchestration states and transition limits.", href: "/docs/orchestration/state-machine", group: "Decision System" },
  { title: "Conflict Resolution", description: "Understand how the system resolves conflicting user/system signals.", href: "/docs/orchestration/conflict-resolution", group: "Decision System" },
  { title: "Failure Handling", description: "Understand fallback behavior when one subsystem fails.", href: "/docs/orchestration/failure-handling", group: "Decision System" },
  { title: "UI Reflection", description: "Understand how orchestration state appears in chat and canvas.", href: "/docs/orchestration/ui-reflection", group: "Decision System" },

  { title: "Comparison Overview", description: "Understand why comparison evidence is central to trustworthy recommendations.", href: "/docs/audio-comparison/overview", group: "Audio Intelligence" },
  { title: "Versioning", description: "Understand how new outputs become traceable, comparable candidates.", href: "/docs/audio-comparison/versioning", group: "Audio Intelligence" },
  { title: "Comparison Model", description: "Understand the exact fields used to bind A/B comparison records.", href: "/docs/audio-comparison/comparison-model", group: "Audio Intelligence" },
  { title: "Difference Model", description: "Understand the exact metrics used to quantify audio changes.", href: "/docs/audio-comparison/difference-model", group: "Audio Intelligence" },
  { title: "Playback Modes", description: "Understand how A/B playback exposes differences without bias.", href: "/docs/audio-comparison/playback-modes", group: "Audio Intelligence" },
  { title: "Canvas UI", description: "Understand how comparison evidence is visualized for user review.", href: "/docs/audio-comparison/canvas-ui", group: "Audio Intelligence" },
  { title: "User Flow", description: "Understand the comparison journey from upload to accept/revert.", href: "/docs/audio-comparison/user-flow", group: "Audio Intelligence" },

  { title: "Implementation Map", description: "Understand where each spec concept lands in implementation modules.", href: "/docs/implementation-map", group: "Implementation" },
  { title: "Runtime Flow Design", description: "Understand runtime branch behavior before writing production code.", href: "/docs/runtime-flow-design", group: "Implementation" },
  { title: "Module Design", description: "Understand module ownership, IO, and failure boundaries.", href: "/docs/module-design", group: "Implementation" },
  { title: "Function Contracts", description: "Understand the callable contract surface needed by developers.", href: "/docs/function-contracts", group: "Implementation" },
  { title: "Development Phases", description: "Understand implementation sequencing and delivery checkpoints.", href: "/docs/development-phases", group: "Implementation" },
  { title: "Testing Strategy", description: "Understand how to validate correctness across flows and edge cases.", href: "/docs/testing-strategy", group: "Implementation" },
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
  if (!item || item.group !== "Main Flow" || !item.flowStep || !item.flowTotal) {
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
  const flowItems = getNavigationByGroup("Main Flow");
  const index = flowItems.findIndex((item) => item.href === href);
  if (index < 0) {
    return {};
  }
  return {
    previous: flowItems[index - 1],
    next: flowItems[index + 1],
  };
}
