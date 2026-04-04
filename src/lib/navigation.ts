export type DocNavItem = {
  title: string;
  description: string;
  href: string;
};

export const docsNavigation: DocNavItem[] = [
  {
    title: "Contracts",
    description: "Q input/output and planning contracts",
    href: "/docs/contracts",
  },
  {
    title: "DAL Integration",
    description: "AudioDAL v1 mapping and validation rules",
    href: "/docs/dal-integration",
  },
  {
    title: "Planning",
    description: "Planner logic, confidence, and approval triggers",
    href: "/docs/planning",
  },
  {
    title: "Intents",
    description: "Intent taxonomy and classification confidence",
    href: "/docs/intents",
  },
  {
    title: "Constraints",
    description: "Non-negotiable operational boundaries for Q",
    href: "/docs/constraints",
  },
  {
    title: "Q Agent",
    description: "Planner and orchestrator behavior",
    href: "/docs/q-agent",
  },
  {
    title: "audio.dal",
    description: "Deterministic action contract layer",
    href: "/docs/audio-dal",
  },
  {
    title: "Architecture",
    description: "System components and data flow",
    href: "/docs/architecture",
  },
  {
    title: "API Contracts",
    description: "Typed interfaces and payload models",
    href: "/docs/api",
  },
  {
    title: "Roadmap",
    description: "Planned milestones by delivery phase",
    href: "/docs/roadmap",
  },
];
