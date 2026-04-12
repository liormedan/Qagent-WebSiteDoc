/**
 * End-to-end layer: system-level invariants only (no R-step text, no contract payloads).
 * Rendered on /docs/end-to-end; bump version when any invariant wording changes.
 */

export const END_TO_END_LAYER_SPEC_VERSION = "1.0.0" as const;

export const END_TO_END_INVARIANTS: readonly { readonly id: string; readonly statement: string; readonly authority_href: string }[] = [
  {
    id: "E2E-INV-01",
    statement: "Cross-layer product ordering is defined solely by the system-runtime spine; no other page may contradict or reorder R01–R12.",
    authority_href: "/docs/system-runtime",
  },
  {
    id: "E2E-INV-02",
    statement: "Protected HTTP and bootstrap ordering is defined solely by the auth-security system-flow spine (S/B); it is parallel to R and does not replace it.",
    authority_href: "/docs/auth-security/system-flow",
  },
  {
    id: "E2E-INV-03",
    statement: "Per-domain normative definitions resolve through the authority map canonical_href; supplements cannot override canonical text.",
    authority_href: "/docs/authority-map",
  },
  {
    id: "E2E-INV-04",
    statement: "Interface identifiers and trace rows (contract_id → R → V) are authoritative only in the Contracts hub JSON and linked authority_href targets.",
    authority_href: "/docs/contracts",
  },
  {
    id: "E2E-INV-05",
    statement: "Ingress validation stages V01–V05 are authoritative only in the validation-strategy JSON on the Contracts hub.",
    authority_href: "/docs/contracts#validation-strategy",
  },
  {
    id: "E2E-INV-06",
    statement: "Event-plane phases E01–E12 align to R cuts only via the events map; they do not introduce an alternate lifecycle.",
    authority_href: "/docs/events-map",
  },
] as const;

export const END_TO_END_LAYER_EXPORT = {
  spec: "waveq.end_to_end_layer",
  version: END_TO_END_LAYER_SPEC_VERSION,
  invariants: [...END_TO_END_INVARIANTS],
} as const;
