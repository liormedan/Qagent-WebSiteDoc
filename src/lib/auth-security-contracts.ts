/**
 * Canonical machine-readable artifacts for Auth & Security docs.
 * Source of truth for request spine ordering; pages render these verbatim.
 */

export const AUTH_SECURITY_REQUEST_SPINE_VERSION = "1.0.0" as const;

export type AuthSecuritySpineStep = {
  readonly id: string;
  readonly order: number;
  readonly phase: "edge" | "token" | "abuse" | "access" | "handler" | "observability" | "persistence";
  readonly summary: string;
  readonly authoritative_doc: string;
  readonly on_failure: "401" | "403" | "429" | "400" | "continue";
};

/** Ordered HTTP request lifecycle for protected API routes. Do not reorder without bumping AUTH_SECURITY_REQUEST_SPINE_VERSION. */
export const AUTH_SECURITY_REQUEST_SPINE: readonly AuthSecuritySpineStep[] = [
  {
    id: "S01",
    order: 1,
    phase: "edge",
    summary: "Accept connection; terminate TLS at platform edge (deployment-owned).",
    authoritative_doc: "/docs/infrastructure-layer",
    on_failure: "continue",
  },
  {
    id: "S02",
    order: 2,
    phase: "edge",
    summary: "Classify route as public vs protected; only protected routes enter the auth stack.",
    authoritative_doc: "/docs/auth-security/api-protection",
    on_failure: "continue",
  },
  {
    id: "S03",
    order: 3,
    phase: "token",
    summary: "Extract bearer credential from Authorization header (or deployment-equivalent single header contract).",
    authoritative_doc: "/docs/auth-security/api-protection",
    on_failure: "401",
  },
  {
    id: "S04",
    order: 4,
    phase: "token",
    summary: "Cryptographically verify WaveQ session JWT per session-spec (signature, iss, aud, exp, clock skew).",
    authoritative_doc: "/docs/auth-security/session-spec",
    on_failure: "401",
  },
  {
    id: "S05",
    order: 5,
    phase: "token",
    summary: "Decode claims to normalized runtime caller context (user id, workspace id, plan, optional session id).",
    authoritative_doc: "/docs/auth-security/session-spec",
    on_failure: "401",
  },
  {
    id: "S06",
    order: 6,
    phase: "abuse",
    summary: "Evaluate plan-scoped rate and concurrency limits before expensive handler work.",
    authoritative_doc: "/docs/auth-security/rate-limit",
    on_failure: "429",
  },
  {
    id: "S07",
    order: 7,
    phase: "access",
    summary: "Resolve declared action key and target workspace; load membership; evaluate allow matrix.",
    authoritative_doc: "/docs/auth-security/authorization",
    on_failure: "403",
  },
  {
    id: "S08",
    order: 8,
    phase: "access",
    summary: "Attach immutable caller context to the request scope for handlers (no re-parsing raw Authorization in business code).",
    authoritative_doc: "/docs/auth-security/api-protection",
    on_failure: "continue",
  },
  {
    id: "S09",
    order: 9,
    phase: "handler",
    summary: "Execute route handler and domain validation (non-security validation and 4xx shapes are API domain; out of scope for this spine).",
    authoritative_doc: "/docs/api",
    on_failure: "continue",
  },
  {
    id: "S10",
    order: 10,
    phase: "persistence",
    summary: "On storage paths, bind repository scope to session or signed worker workspace id per data-security; violations are deny (403) or not-found mapping per policy.",
    authoritative_doc: "/docs/auth-security/data-security",
    on_failure: "403",
  },
  {
    id: "S11",
    order: 11,
    phase: "observability",
    summary: "Emit security-relevant audit event (async, non-blocking); redact per audit constraints.",
    authoritative_doc: "/docs/auth-security/audit",
    on_failure: "continue",
  },
  {
    id: "S12",
    order: 12,
    phase: "observability",
    summary: "Return response; error bodies conform to error-contracts.",
    authoritative_doc: "/docs/auth-security/error-contracts",
    on_failure: "continue",
  },
] as const;

export const AUTH_SECURITY_REQUEST_SPINE_EXPORT = {
  spec: "auth-security.request-spine",
  version: AUTH_SECURITY_REQUEST_SPINE_VERSION,
  steps: [...AUTH_SECURITY_REQUEST_SPINE],
} as const;

export const AUTH_SECURITY_BOOTSTRAP_SPINE_VERSION = "1.0.0" as const;

export type AuthSecurityBootstrapStep = {
  readonly id: string;
  readonly order: number;
  readonly summary: string;
  readonly authoritative_doc: string;
  readonly on_failure: "401" | "continue";
};

/** Ordered lifecycle for WaveQ session minting (bridges external IdP proof to internal JWT). Distinct from per-request API spine. */
export const AUTH_SECURITY_BOOTSTRAP_SPINE: readonly AuthSecurityBootstrapStep[] = [
  {
    id: "B01",
    order: 1,
    summary: "Receive bootstrap request carrying IdP proof (opaque token exchange shape or validated assertion per deployment).",
    authoritative_doc: "/docs/auth-security/identity",
    on_failure: "continue",
  },
  {
    id: "B02",
    order: 2,
    summary: "Verify proof with IdP (JWKS signature, nonce, expiry) or delegate to IdP introspection where contractually allowed.",
    authoritative_doc: "/docs/auth-security/identity",
    on_failure: "401",
  },
  {
    id: "B03",
    order: 3,
    summary: "Upsert WaveQ user row from stable external subject mapping.",
    authoritative_doc: "/docs/auth-security/identity",
    on_failure: "401",
  },
  {
    id: "B04",
    order: 4,
    summary: "Resolve active workspace id and plan tier from authoritative persistence (not from unvalidated client-only hints).",
    authoritative_doc: "/docs/auth-security/session",
    on_failure: "401",
  },
  {
    id: "B05",
    order: 5,
    summary: "Sign WaveQ session JWT using server-only signing material; claims MUST conform to session-spec.",
    authoritative_doc: "/docs/auth-security/session-spec",
    on_failure: "401",
  },
  {
    id: "B06",
    order: 6,
    summary: "Return token envelope to caller; subsequent requests use API request spine starting at S03.",
    authoritative_doc: "/docs/auth-security/session",
    on_failure: "continue",
  },
] as const;

export const AUTH_SECURITY_BOOTSTRAP_SPINE_EXPORT = {
  spec: "auth-security.bootstrap-spine",
  version: AUTH_SECURITY_BOOTSTRAP_SPINE_VERSION,
  steps: [...AUTH_SECURITY_BOOTSTRAP_SPINE],
} as const;

export const AUTH_SECURITY_JWT_SPEC_VERSION = "1.0.0" as const;

/** Registered JWT access token for WaveQ runtime (not IdP id_token). */
export const WAVEQ_SESSION_JWT_CLAIMS = [
  { claim: "iss", required: true, type: "string", rule: "Issuer URI registered for this deployment; verify equals configured allow-list." },
  { claim: "aud", required: true, type: "string|string[]", rule: "Must include deployment audience identifier for WaveQ APIs." },
  { claim: "sub", required: true, type: "string", rule: "Internal user id (stable WaveQ user row key)." },
  { claim: "wid", required: true, type: "string", rule: "Active workspace id for this session context." },
  { claim: "plan", required: true, type: "string", rule: "Plan tier key used for rate limits and quotas (opaque to clients beyond presence)." },
  { claim: "sid", required: false, type: "string", rule: "Session id for revocation and audit correlation when issued." },
  { claim: "iat", required: true, type: "number", rule: "Unix seconds; reject if clock skew outside configured window vs server time." },
  { claim: "nbf", required: false, type: "number", rule: "If present, now must be >= nbf - skew." },
  { claim: "exp", required: true, type: "number", rule: "Unix seconds; reject if now >= exp + skew." },
  { claim: "jti", required: false, type: "string", rule: "Unique token id when replay or denylist tracking is enabled." },
] as const;

export const AUTH_SECURITY_ERROR_CONTRACT_VERSION = "1.0.0" as const;

/** Stable machine codes for auth-layer failures (HTTP status maps below). */
export const WAVEQ_AUTH_ERROR_CODES = [
  { code: "AUTH_TOKEN_MISSING", http: 401, when: "Protected route; no bearer credential." },
  { code: "AUTH_TOKEN_MALFORMED", http: 401, when: "Bearer present but not parseable as expected JWT shape." },
  { code: "AUTH_TOKEN_INVALID", http: 401, when: "Signature, iss, aud, exp/nbf/iat, or skew validation failed." },
  { code: "AUTH_SESSION_REVOKED", http: 401, when: "sid/jti matches revocation denylist when enabled." },
  { code: "AUTHZ_FORBIDDEN", http: 403, when: "Valid token; action or workspace membership denies access." },
  { code: "AUTHZ_WORKSPACE_SCOPE", http: 403, when: "Storage or resource scope violates workspace binding." },
  { code: "RATE_LIMIT_EXCEEDED", http: 429, when: "Authenticated context; plan-scoped limit exceeded." },
] as const;

export const WAVEQ_AUTH_ERROR_ENVELOPE_EXAMPLE = {
  error: {
    code: "AUTH_TOKEN_INVALID",
    message: "human-readable summary safe for clients",
    request_id: "uuid-or-trace-id",
  },
} as const;
