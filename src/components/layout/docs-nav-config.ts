/**
 * Grouped top navigation for WaveQ docs (DocsHeader).
 * Keep route hrefs stable; adjust labels only for consistency here.
 *
 * When changing header vertical size on md+, update DocsShell
 * `md:h-[calc(100dvh-___px)]` to match (main row + context row; no strip).
 */
export type DocsNavGroupId = "core" | "execution" | "platform";

/** Icon keys mapped in `DocsNavMegaMenu` (Lucide). */
export type DocsNavIconId = "system" | "client" | "qagent" | "api" | "dsp" | "data" | "auth" | "infra" | "e2e";

export type DocsNavItem = {
  label: string;
  /** Short line shown under the title in the mega-menu (Vercel-style). */
  description: string;
  iconId: DocsNavIconId;
  href: string;
  matches: (path: string) => boolean;
};

export type DocsNavGroup = {
  id: DocsNavGroupId;
  /** Primary label shown on desktop group control */
  label: string;
  /** Shorter label when space is tight */
  labelShort: string;
  items: DocsNavItem[];
};

export function normalizeDocsPath(path: string): string {
  if (!path) return "";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

const matchSystem = (path: string) =>
  (path === "/docs" ||
    path.startsWith("/docs/system") ||
    path === "/docs/system-runtime" ||
    path === "/docs/authority-map" ||
    path === "/docs/events-map" ||
    path === "/docs/terminology" ||
    path.startsWith("/docs/system-flow")) &&
  path !== "/docs/system/auth-security-layer";

const matchClient = (path: string) => path === "/docs/client" || path.startsWith("/docs/client/");

const matchQAgent = (path: string) =>
  path === "/docs/contracts" ||
  path.startsWith("/docs/q-agent") ||
  path.startsWith("/docs/architecture") ||
  path.startsWith("/docs/orchestration") ||
  path.startsWith("/docs/qcore") ||
  path.startsWith("/docs/module-design") ||
  path.startsWith("/docs/function-contracts") ||
  path.startsWith("/docs/testing-strategy") ||
  path.startsWith("/docs/implementation-map") ||
  path.startsWith("/docs/concepts");

const matchApi = (path: string) =>
  path.startsWith("/docs/api-server-layer") ||
  (path.startsWith("/docs/api") && !path.startsWith("/docs/api-server-layer"));

const matchDsp = (path: string) =>
  path.startsWith("/docs/dsp-layer") || path.startsWith("/docs/architecture/dagent/dsp-engine-abstraction");

const matchDataLayer = (path: string) => path.startsWith("/docs/data-layer");

const matchInfrastructure = (path: string) => path.startsWith("/docs/infrastructure-layer");

const matchAuthSecurity = (path: string) =>
  path === "/docs/auth-security" ||
  path.startsWith("/docs/auth-security/") ||
  path === "/docs/system/auth-security-layer";

const matchEndToEnd = (path: string) => path === "/docs/end-to-end" || path.startsWith("/docs/end-to-end/");

/** Ordered groups and items: first matching item wins (path should be normalized). */
export const DOCS_NAV_GROUPS: readonly DocsNavGroup[] = [
  {
    id: "core",
    label: "Core product",
    labelShort: "Core",
    items: [
      {
        label: "System",
        description: "Layer map, placement chapters, and cross-layer anchors.",
        iconId: "system",
        href: "/docs/system",
        matches: matchSystem,
      },
      {
        label: "Client",
        description: "UI surfaces, runtime ownership, and workspace behavior.",
        iconId: "client",
        href: "/docs/client",
        matches: matchClient,
      },
      {
        label: "QAgent",
        description: "Planning, contracts touchpoints, and orchestration docs.",
        iconId: "qagent",
        href: "/docs/q-agent",
        matches: matchQAgent,
      },
    ],
  },
  {
    id: "execution",
    label: "Execution",
    labelShort: "Run",
    items: [
      {
        label: "API Server",
        description: "Execution lifecycle, tiers, and API-facing specifications.",
        iconId: "api",
        href: "/docs/api",
        matches: matchApi,
      },
      {
        label: "DSP",
        description: "Processing contracts and DSP engine abstraction.",
        iconId: "dsp",
        href: "/docs/dsp-layer",
        matches: matchDsp,
      },
      {
        label: "Data Layer",
        description: "Persistence model, canonical data, and system view.",
        iconId: "data",
        href: "/docs/data-layer",
        matches: matchDataLayer,
      },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    labelShort: "Ops",
    items: [
      {
        label: "Auth & Security",
        description: "Identity, session, authorization, and HTTP spine (S/B).",
        iconId: "auth",
        href: "/docs/auth-security",
        matches: matchAuthSecurity,
      },
      {
        label: "Infrastructure",
        description: "Hosting, scaling, and platform support across services.",
        iconId: "infra",
        href: "/docs/infrastructure-layer",
        matches: matchInfrastructure,
      },
      {
        label: "End to end",
        description: "Cross-layer placement, runtime truth, and invariants.",
        iconId: "e2e",
        href: "/docs/end-to-end",
        matches: matchEndToEnd,
      },
    ],
  },
] as const;

export type DocsNavActive = {
  group: DocsNavGroup;
  item: DocsNavItem;
};

export function resolveDocsNavActive(pathname: string): DocsNavActive | null {
  const path = normalizeDocsPath(pathname);
  for (const group of DOCS_NAV_GROUPS) {
    for (const item of group.items) {
      if (item.matches(path)) return { group, item };
    }
  }
  return null;
}

export function isDocsNavGroupActive(group: DocsNavGroup, pathname: string): boolean {
  const path = normalizeDocsPath(pathname);
  return group.items.some((item) => item.matches(path));
}

/** Preserves previous boolean names for header context / consumers. */
export function getDocsNavActivityFlags(pathname: string) {
  const path = normalizeDocsPath(pathname);
  return {
    systemActive: matchSystem(path),
    clientActive: matchClient(path),
    qagentActive: matchQAgent(path),
    apiActive: matchApi(path),
    dspActive: matchDsp(path),
    dataLayerActive: matchDataLayer(path),
    infrastructureActive: matchInfrastructure(path),
    authSecurityActive: matchAuthSecurity(path),
    endToEndActive: matchEndToEnd(path),
  };
}

export type DocsNavSearchItem = { href: string; title: string; subtitle: string };

/** Mega-menu hubs plus a few high-traffic targets for header search (deduped by href). */
const EXTRA_DOCS_SEARCH_ITEMS: readonly DocsNavSearchItem[] = [
  { href: "/docs", title: "Docs home", subtitle: "WaveQ documentation entry." },
  { href: "/docs/contracts", title: "Contracts hub", subtitle: "contract_id registry and contract families." },
  { href: "/docs/system-runtime", title: "System runtime", subtitle: "R01–R12 spine." },
  { href: "/docs/authority-map", title: "Authority map", subtitle: "Canonical href table." },
  { href: "/docs/events-map", title: "Events map", subtitle: "E01–E12 phases." },
  { href: "/docs/terminology", title: "Terminology", subtitle: "Glossary index (DOCS_GLOSSARY)." },
] as const;

export function getDocsNavSearchItems(): DocsNavSearchItem[] {
  const seen = new Set<string>();
  const out: DocsNavSearchItem[] = [];
  for (const item of EXTRA_DOCS_SEARCH_ITEMS) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    out.push(item);
  }
  for (const group of DOCS_NAV_GROUPS) {
    for (const item of group.items) {
      if (seen.has(item.href)) continue;
      seen.add(item.href);
      out.push({ href: item.href, title: item.label, subtitle: item.description });
    }
  }
  return out;
}
