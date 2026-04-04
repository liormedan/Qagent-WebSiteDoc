export type DocsSection = "Spec" | "Design" | "Audio Sandbox" | "Audio Comparison";

export type DocNavItem = {
  title: string;
  description: string;
  href: string;
  section: DocsSection;
  icon?: string;
  legacy?: boolean;
};

export const docsNavigation: DocNavItem[] = [
  { title: "Overview", description: "Q system role and operational flow", href: "/docs/overview", section: "Spec", icon: "[S]" },
  { title: "Contracts", description: "Core contracts and runtime contract usage", href: "/docs/contracts", section: "Spec", icon: "[S]" },
  { title: "Intents", description: "Intent detection and resolution strategy", href: "/docs/intents", section: "Spec", icon: "[S]" },
  { title: "Planning", description: "Plan construction after intent resolution", href: "/docs/planning", section: "Spec", icon: "[S]" },
  { title: "Constraints", description: "Safety, determinism, and reasoning limits", href: "/docs/constraints", section: "Spec", icon: "[S]" },
  { title: "Reasoning System", description: "Reasoning loop and clarification behavior", href: "/docs/reasoning-system", section: "Spec", icon: "[S]" },
  { title: "DAL Integration", description: "DAL preconditions, mapping, and validation", href: "/docs/dal-integration", section: "Spec", icon: "[S]" },
  { title: "State Machine", description: "Allowed states and transitions", href: "/docs/state-machine", section: "Spec", icon: "[S]" },
  { title: "Decision Rules", description: "Deterministic routing rules", href: "/docs/decision-rules", section: "Spec", icon: "[S]" },
  { title: "Decision With User", description: "Shared recommendation and user approval protocol", href: "/docs/decision-with-user", section: "Spec", icon: "[S]" },
  { title: "Audio Intelligence", description: "Analysis intelligence boundaries", href: "/docs/audio-intelligence", section: "Spec", icon: "[S]" },
  { title: "Audio Memory", description: "Persistent version lineage and timeline linkage", href: "/docs/audio-memory", section: "Spec", icon: "[S]" },
  { title: "Architecture", description: "System components and data flow", href: "/docs/architecture", section: "Spec", icon: "[S]" },
  { title: "API Contracts", description: "Typed interfaces and payload models", href: "/docs/api", section: "Spec", icon: "[S]" },
  { title: "Roadmap", description: "Planned milestones", href: "/docs/roadmap", section: "Spec", icon: "[S]" },
  { title: "Q Agent", description: "Legacy summary page", href: "/docs/q-agent", section: "Spec", icon: "[S]", legacy: true },
  { title: "audio.dal", description: "Legacy DAL intro page", href: "/docs/audio-dal", section: "Spec", icon: "[S]", legacy: true },

  { title: "Implementation Map", description: "Mapping spec concepts to modules/files", href: "/docs/implementation-map", section: "Design", icon: "[D]" },
  { title: "Runtime Flow Design", description: "Future runtime branches and stop conditions", href: "/docs/runtime-flow-design", section: "Design", icon: "[D]" },
  { title: "Module Design", description: "Responsibilities, IO, dependencies, failures", href: "/docs/module-design", section: "Design", icon: "[D]" },
  { title: "Function Contracts", description: "Core function signatures and intent", href: "/docs/function-contracts", section: "Design", icon: "[D]" },
  { title: "Development Phases", description: "Build order with definition of done", href: "/docs/development-phases", section: "Design", icon: "[D]" },
  { title: "Testing Strategy", description: "Unit/flow/ambiguity/approval/DAL tests", href: "/docs/testing-strategy", section: "Design", icon: "[D]" },

  { title: "Section Home", description: "Audio sandbox section index", href: "/docs/audio-sandbox", section: "Audio Sandbox", icon: "[A]" },
  { title: "Overview", description: "Audio sandbox purpose and boundaries", href: "/docs/audio-sandbox/overview", section: "Audio Sandbox", icon: "[A]" },
  { title: "Session Model", description: "Sandbox session lifecycle contract", href: "/docs/audio-sandbox/session-model", section: "Audio Sandbox", icon: "[A]" },
  { title: "Segment Model", description: "Audio segmentation contract", href: "/docs/audio-sandbox/segment-model", section: "Audio Sandbox", icon: "[A]" },
  { title: "Transcript Index", description: "Word-level searchable transcript model", href: "/docs/audio-sandbox/transcript-index", section: "Audio Sandbox", icon: "[A]" },
  { title: "Audio Features", description: "Feature vector contract for analysis", href: "/docs/audio-sandbox/audio-features", section: "Audio Sandbox", icon: "[A]" },
  { title: "Query Operations", description: "Sandbox query contracts and match model", href: "/docs/audio-sandbox/query-operations", section: "Audio Sandbox", icon: "[A]" },
  { title: "Integration with Q", description: "Q routing and enrichment rules", href: "/docs/audio-sandbox/integration-with-q", section: "Audio Sandbox", icon: "[A]" },
  { title: "State Flow", description: "Sandbox states and transitions", href: "/docs/audio-sandbox/state-flow", section: "Audio Sandbox", icon: "[A]" },
  { title: "Scenario Examples", description: "End-to-end query and analysis scenarios", href: "/docs/audio-sandbox/scenario-examples", section: "Audio Sandbox", icon: "[A]" },

  { title: "Overview", description: "Why A/B comparison is essential for decisions and trust", href: "/docs/audio-comparison/overview", section: "Audio Comparison", icon: "[C]" },
  { title: "Versioning", description: "Version contract and lineage graph for every action", href: "/docs/audio-comparison/versioning", section: "Audio Comparison", icon: "[C]" },
  { title: "Comparison Model", description: "Base-vs-compared relationship model", href: "/docs/audio-comparison/comparison-model", section: "Audio Comparison", icon: "[C]" },
  { title: "Difference Model", description: "Typed region-level change model and impact", href: "/docs/audio-comparison/difference-model", section: "Audio Comparison", icon: "[C]" },
  { title: "Playback Modes", description: "A/B toggle, sync, instant switch, and loop compare", href: "/docs/audio-comparison/playback-modes", section: "Audio Comparison", icon: "[C]" },
  { title: "Canvas UI", description: "Waveform overlay, split view, markers, and states", href: "/docs/audio-comparison/canvas-ui", section: "Audio Comparison", icon: "[C]" },
  { title: "User Flow", description: "Upload to process to compare to decision scenarios", href: "/docs/audio-comparison/user-flow", section: "Audio Comparison", icon: "[C]" },
];

export function getNavigationBySection(section: DocsSection): DocNavItem[] {
  return docsNavigation.filter((item) => item.section === section);
}

export function getNavigationItemByHref(href: string): DocNavItem | undefined {
  return docsNavigation.find((item) => item.href === href);
}

export function getNavigationSections(): DocsSection[] {
  const ordered: DocsSection[] = [];
  for (const item of docsNavigation) {
    if (!ordered.includes(item.section)) {
      ordered.push(item.section);
    }
  }
  return ordered;
}
