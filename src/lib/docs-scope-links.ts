/** Shared “scope strip” navigation CTAs for `DocsScopeBlocks` (replaces generic covers/does-not-cover copy). */

export type DocsScopeLink = { readonly href: string; readonly label: string };

export function systemLayerDocLinks(fullLayerHref: string): readonly DocsScopeLink[] {
  return [
    { href: fullLayerHref, label: "Open full layer documentation" },
    { href: "/docs/system", label: "System overview" },
  ] as const;
}

export const SYSTEM_HOME_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-runtime", label: "System runtime (R01–R12)" },
  { href: "/docs/events-map", label: "Events map (E01–E12)" },
  { href: "/docs/authority-map", label: "Authority map" },
  { href: "/docs/terminology", label: "Terminology" },
  { href: "/docs/end-to-end", label: "End-to-end layer" },
  { href: "/docs/system-flow", label: "End-to-end system flow" },
  { href: "/docs/system/client-frontend-layer", label: "Layer system views (Client)" },
] as const;

/** End-to-end layer overview (/docs/end-to-end): same pattern as DATA_LAYER_OVERVIEW_SCOPE_LINKS — child first, then System placement diagram. */
export const END_TO_END_OVERVIEW_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/end-to-end/system-placement", label: "System placement (this layer)" },
  { href: "/docs/system/end-to-end-flow", label: "Placement diagram (System)" },
  { href: "/docs/terminology", label: "Terminology (glossary index)" },
] as const;

/** End-to-end chapter pages: back to overview + system placement child (same pattern as DATA_LAYER_SUBPAGE_SCOPE_LINKS). */
export const END_TO_END_SUBPAGE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/end-to-end", label: "End-to-end overview" },
  { href: "/docs/end-to-end/system-placement", label: "System placement" },
] as const;

export const SYSTEM_RUNTIME_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/authority-map", label: "Authority map" },
  { href: "/docs/events-map", label: "Events map" },
  { href: "/docs/terminology", label: "Terminology" },
  { href: "/docs/contracts", label: "Contracts hub" },
  { href: "/docs/system-flow", label: "System flow (narrative)" },
  { href: "/docs/auth-security/system-flow", label: "Auth system flow" },
  { href: "/docs/system", label: "System overview" },
] as const;

export const AUTHORITY_MAP_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-runtime", label: "System runtime spine" },
  { href: "/docs/events-map", label: "Events map" },
  { href: "/docs/terminology", label: "Terminology" },
  { href: "/docs/system-flow", label: "System flow" },
  { href: "/docs/contracts", label: "Contracts hub" },
  { href: "/docs/system", label: "System overview" },
] as const;

/** Cross-layer events map (/docs/events-map). */
export const EVENTS_MAP_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-runtime", label: "System runtime spine" },
  { href: "/docs/contracts", label: "Contracts hub" },
  { href: "/docs/client/event-flow", label: "Client event flow" },
  { href: "/docs/terminology", label: "Terminology" },
] as const;

/** Shared glossary (/docs/terminology). */
export const TERMINOLOGY_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/authority-map", label: "Authority map" },
  { href: "/docs/system-runtime", label: "System runtime" },
  { href: "/docs/contracts", label: "Contracts hub" },
  { href: "/docs/events-map", label: "Events map" },
] as const;

export const CLIENT_LAYER_HUB_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/client-frontend-layer", label: "View System view for this layer" },
  { href: "/docs/architecture/contracts/schema-registry", label: "Schema Registry (contracts)" },
] as const;

export const CLIENT_SUBPAGE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/contracts", label: "Contracts Layer hub" },
  { href: "/docs/system-runtime", label: "System runtime spine" },
  { href: "/docs/authority-map", label: "Authority map" },
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

/** Canonical contracts for this layer; ordering authority lives in system-flow. */
export const AUTH_SECURITY_CANONICAL_SPEC_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/auth-security/system-flow", label: "Request spine (canonical)" },
  { href: "/docs/auth-security/session-spec", label: "Session JWT spec" },
  { href: "/docs/auth-security/error-contracts", label: "Auth error contracts" },
] as const;

export const AUTH_SECURITY_ROOT_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system/auth-security-layer", label: "System placement (Auth & Security)" },
  ...AUTH_SECURITY_CANONICAL_SPEC_LINKS,
  { href: "/docs/architecture/policies/session-isolation", label: "Session Isolation policy" },
] as const;

export const AUTH_SECURITY_SUBPAGE_SCOPE_LINKS: readonly DocsScopeLink[] = [
  ...AUTH_SECURITY_CANONICAL_SPEC_LINKS,
  { href: "/docs/system/auth-security-layer", label: "View System view for this layer" },
  { href: "/docs/auth-security", label: "Auth & Security overview" },
] as const;

export const AUTH_SECURITY_SYSTEM_FLOW_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-runtime", label: "System runtime spine" },
  { href: "/docs/authority-map", label: "Authority map" },
  { href: "/docs/auth-security/session-spec", label: "Session JWT spec" },
  { href: "/docs/auth-security/error-contracts", label: "Auth error contracts" },
  { href: "/docs/auth-security", label: "Auth & Security overview" },
  { href: "/docs/system/auth-security-layer", label: "System view" },
] as const;

export const AUTH_SECURITY_SESSION_SPEC_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/auth-security/system-flow", label: "Request spine (canonical)" },
  { href: "/docs/auth-security/error-contracts", label: "Auth error contracts" },
  { href: "/docs/auth-security", label: "Auth & Security overview" },
  { href: "/docs/system/auth-security-layer", label: "System view" },
] as const;

export const AUTH_SECURITY_ERROR_CONTRACTS_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/auth-security/system-flow", label: "Request spine (canonical)" },
  { href: "/docs/auth-security/session-spec", label: "Session JWT spec" },
  { href: "/docs/auth-security", label: "Auth & Security overview" },
  { href: "/docs/system/auth-security-layer", label: "System view" },
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
  { href: "/docs/contracts", label: "Contracts Layer hub" },
  { href: "/docs/architecture", label: "Architecture overview" },
  { href: "/docs/data-layer", label: "Data Layer" },
] as const;

/** Cross-layer contracts hub (/docs/contracts). */
export const CONTRACTS_LAYER_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/system-runtime", label: "System runtime spine" },
  { href: "/docs/events-map", label: "Events map" },
  { href: "/docs/authority-map", label: "Authority map" },
  { href: "/docs/terminology", label: "Terminology" },
  { href: "/docs/system", label: "System overview" },
  { href: "/docs/architecture/contracts/schema-registry", label: "Schema Registry" },
  { href: "/docs/q-agent", label: "QAgent Layer" },
  { href: "/docs/api", label: "API Server Layer" },
  { href: "/docs/dsp-layer/contracts", label: "DSP contracts" },
  { href: "/docs/client/event-contract", label: "Client event contract" },
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
  { href: "/docs/system-runtime", label: "System runtime spine" },
  { href: "/docs/events-map", label: "Events map" },
  { href: "/docs/authority-map", label: "Authority map" },
  { href: "/docs/terminology", label: "Terminology" },
  { href: "/docs/system", label: "System overview" },
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
] as const;

export const CONCEPTS_SCOPE_LINKS: readonly DocsScopeLink[] = [
  { href: "/docs/q-agent", label: "QAgent Layer overview" },
  { href: "/docs/architecture", label: "Architecture overview" },
] as const;
