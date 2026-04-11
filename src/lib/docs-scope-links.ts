/** Shared “scope strip” navigation CTAs for `DocsScopeBlocks` (replaces generic covers/does-not-cover copy). */

export type DocsScopeLink = { readonly href: string; readonly label: string };

export function systemLayerDocLinks(fullLayerHref: string): readonly DocsScopeLink[] {
  return [
    { href: fullLayerHref, label: "Open full layer documentation" },
    { href: "/docs/system", label: "System overview" },
  ] as const;
}

export const SYSTEM_HOME_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-flow", label: "End-to-end system flow" },
  { href: "/docs/system/client-frontend-layer", label: "Layer system views (Client)" },
] as const;

export const CLIENT_LAYER_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/client-frontend-layer", label: "View System view for this layer" },
  { href: "/docs/architecture/contracts/schema-registry", label: "Schema Registry (contracts)" },
] as const;

export const CLIENT_SUBPAGE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/client", label: "Client Layer overview" },
  { href: "/docs/system/client-frontend-layer", label: "View System view for this layer" },
] as const;

export const QAGENT_LAYER_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/qagent-layer", label: "View System view for this layer" },
  { href: "/docs/architecture", label: "Architecture overview" },
] as const;

export const API_LAYER_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/api-server-layer", label: "View System view for this layer" },
  { href: "/docs/api-server-layer", label: "API Server Layer (Spec)" },
] as const;

export const DSP_LAYER_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/dsp-processing-layer", label: "View System view for this layer" },
  { href: "/docs/dsp-layer/contracts", label: "DSP contracts" },
] as const;

export const DATA_LAYER_OVERVIEW_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/data-layer/system-view", label: "Data Layer System View" },
  { href: "/docs/system/data-layer", label: "System placement (Data Layer)" },
] as const;

export const DATA_LAYER_SUBPAGE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/data-layer", label: "Data Layer overview" },
  { href: "/docs/system/data-layer", label: "System placement (Data Layer)" },
] as const;

export const INFRASTRUCTURE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/infrastructure-layer", label: "View System view for this layer" },
  { href: "/docs/infrastructure-layer", label: "Infrastructure Layer overview" },
] as const;

export const API_SERVER_SPEC_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/api-server-layer", label: "View System view for this layer" },
  { href: "/docs/api-server-layer", label: "Layer spec overview" },
] as const;

export const AUTH_SECURITY_ROOT_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/auth-security-layer", label: "System placement (Auth & Security)" },
  { href: "/docs/architecture/policies/session-isolation", label: "Session Isolation policy" },
] as const;

export const AUTH_SECURITY_SUBPAGE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/auth-security-layer", label: "View System view for this layer" },
  { href: "/docs/auth-security", label: "Auth & Security overview" },
] as const;

export const QAGENT_ARCH_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
  { href: "/docs/architecture", label: "Architecture overview" },
] as const;

export const ARCHITECTURE_MODULE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/architecture", label: "Architecture overview" },
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
] as const;

export const CONTRACTS_SCHEMA_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/architecture", label: "Architecture overview" },
  { href: "/docs/data-layer", label: "Data Layer" },
] as const;

export const CONTRACTS_LINEAGE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/architecture", label: "Architecture overview" },
  { href: "/docs/architecture/contracts/schema-registry", label: "Schema Registry" },
] as const;

export const CLIENT_QAGENT_ID_MAPPING_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/architecture/contracts/schema-registry", label: "Schema Registry" },
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
] as const;

export const MODIFY_LOOP_CONTRACT_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/architecture", label: "Architecture overview" },
  { href: "/docs/architecture/modules/approval", label: "Approval module" },
] as const;

export const ORCHESTRATION_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-flow", label: "End-to-end system flow" },
  { href: "/docs/orchestration/orchestration-flow", label: "Orchestration flow" },
] as const;

export const SYSTEM_FLOW_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system", label: "System overview" },
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
] as const;

export const CONCEPTS_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
  { href: "/docs/architecture", label: "Architecture overview" },
] as const;
