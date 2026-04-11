import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { AUTH_SECURITY_SUBPAGE_SCOPE_LINKS } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "Edge validation.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Session and authorization.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Protected API surface",
    purpose: "API protection is the ordered middleware (or edge) pipeline that accepts credentials, validates the WaveQ session token, decodes claims, runs permission checks, and attaches req.user for handlers.",
    defines: [
      "Single entry pattern for protected routes; public routes explicitly excluded.",
      "Stable failure modes: 401 for auth, 403 for authorization, 429 for rate limits.",
    ],
    doesNotDefine: "Handler-specific input validation unrelated to security.",
    href: "/docs/auth-security/api-protection#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Middleware owns",
    purpose: "Extract Authorization header, verify signature and expiry, decode session, enforce workspace/action permission, then forward with req.user populated.",
    defines: [
      "Reject missing or malformed bearer tokens before body parsing when feasible.",
      "Attach normalized user object: ids, workspace, role snapshot, plan tier as needed by downstream.",
    ],
    doesNotDefine: "Database row loading for full domain aggregates.",
    href: "/docs/auth-security/session",
    linkLabel: "Session",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Validation chain",
    purpose: "Ordered steps: (1) read Authorization header, (2) validate token (signature, issuer, audience, expiry), (3) decode session claims, (4) permission check for route + workspace, (5) set req.user and continue.",
    defines: [
      "Short-circuit on first failure; avoid leaking which step failed beyond policy.",
      "Optional correlation id propagation for audit after success.",
    ],
    doesNotDefine: "QAgent message parsing or DSP worker ingress.",
    href: "/docs/auth-security/authorization",
    linkLabel: "Authorization",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Per-request middleware chain",
    purpose: "Concrete ordering for one inbound HTTP request through the auth stack (labels only).",
    defines: [
      "1 · Enter global middleware (protected route matcher)",
      "2 · Read `Authorization` bearer token string",
      "3 · Cryptographic verify JWT + clock skew window",
      "4 · Decode claims → normalized `req.user` candidate",
      "5 · Run workspace + action authorization hook",
      "6 · On success: attach `req.user` → `next()`; on failure: 401 / 403 / 429",
    ],
    doesNotDefine: "Route handler domain validation.",
    href: "/docs/auth-security/api-protection#runtime-behavior",
    linkLabel: "This section",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Output contract",
    purpose: "Handlers must treat req.user as the only caller identity for authorization decisions; do not re-parse raw Authorization in business code.",
    defines: [
      "req.user is required for protected handlers; absence implies misconfiguration.",
      "No bypass hooks in production builds without audited break-glass.",
    ],
    doesNotDefine: "Service-to-service auth between internal workers (separate mTLS or signed service tokens).",
    href: "/docs/auth-security",
    linkLabel: "Auth & Security overview",
  },
] as const;

export default function AuthSecurityApiProtectionPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — API protection"
        description="Middleware validation flow: Authorization header, token validation, session decode, permission check, and req.user injection for route handlers."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / API protection</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Every SaaS + API request crosses the same security boundary before business logic runs. API protection centralizes token handling and permission evaluation so handlers stay small and cannot accidentally skip checks."
            areasTitle="Pipeline"
            areas={[
              "Authorization header: bearer token carrying the WaveQ session.",
              "Validation: cryptographic and temporal checks on the JWT.",
              "Decode: userId, workspaceId, plan, and role hints for authorization.",
              "Permission check: action + workspace membership before req.user is attached.",
            ]}
            outOfScope="Per-route rate limit tuning tables (see Rate limit)."
            relatedBoundaries={["Session defines token contents; Authorization defines allowed actions."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...details]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/auth-security/session", title: "Session", description: "Token minting and claims." },
              { href: "/docs/auth-security/authorization", title: "Authorization", description: "Role and action checks." },
              { href: "/docs/auth-security/rate-limit", title: "Rate limit", description: "Plan-based throttling." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
