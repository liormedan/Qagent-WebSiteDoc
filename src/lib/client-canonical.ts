export const CLIENT_LAYER_CANONICAL_NAME = "Client Layer";

export const CLIENT_LAYER_DOC_SOURCE_OF_TRUTH = {
  canonicalLocation: "/docs/client",
  rule:
    "Definitions in /docs/client are authoritative for client-side boundaries, UI/runtime state ownership, and client-facing contracts. Secondary pages may reference but must not redefine these rules.",
} as const;
