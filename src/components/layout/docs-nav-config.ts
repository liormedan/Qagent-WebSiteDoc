/**
 * Grouped top navigation for WaveQ docs (DocsHeader).
 * Keep route hrefs stable; adjust labels only for consistency here.
 *
 * When changing header vertical size on md+, update DocsShell
 * `md:h-[calc(100dvh-___px)]` to match (main row + context row; no strip).
 */
export type DocsNavGroupId = "core" | "execution" | "platform";

export type DocsNavItem = {
  label: string;
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
  path === "/docs" ||
  path.startsWith("/docs/system") ||
  path.startsWith("/docs/system-flow");

const matchClient = (path: string) => path === "/docs/client" || path.startsWith("/docs/client/");

const matchQAgent = (path: string) =>
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
  path === "/docs/auth-security" || path.startsWith("/docs/auth-security/");

/** Ordered groups and items: first matching item wins (path should be normalized). */
export const DOCS_NAV_GROUPS: readonly DocsNavGroup[] = [
  {
    id: "core",
    label: "Core product",
    labelShort: "Core",
    items: [
      { label: "System", href: "/docs/system", matches: matchSystem },
      { label: "Client", href: "/docs/client", matches: matchClient },
      { label: "QAgent", href: "/docs/q-agent", matches: matchQAgent },
    ],
  },
  {
    id: "execution",
    label: "Execution",
    labelShort: "Run",
    items: [
      { label: "API Server", href: "/docs/api", matches: matchApi },
      { label: "DSP", href: "/docs/dsp-layer", matches: matchDsp },
      { label: "Data Layer", href: "/docs/data-layer", matches: matchDataLayer },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    labelShort: "Ops",
    items: [
      { label: "Auth & Security", href: "/docs/auth-security", matches: matchAuthSecurity },
      { label: "Infrastructure", href: "/docs/infrastructure-layer", matches: matchInfrastructure },
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
  };
}
