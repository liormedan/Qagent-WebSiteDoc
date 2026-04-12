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
      "HTTP statuses and JSON envelope for failures: error-contracts (codes AUTH_*, AUTHZ_*, RATE_LIMIT_*).",
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
    purpose: "Narrative alignment with spine S02–S08; numeric order is only on system-flow.",
    defines: [
      "S02 public/protected classification; S03 bearer extract; S04–S05 verify+decode per session-spec.",
      "S06 rate limit; S07 authorization; S08 attach runtime caller context to request scope.",
      "Failures: 401/403/429 per error-contracts; do not leak gate-specific strings beyond catalog rules.",
    ],
    doesNotDefine: "QAgent message parsing or DSP worker ingress.",
    href: "/docs/auth-security/system-flow",
    linkLabel: "System flow",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Spine ids (no alternate chain)",
    purpose: "Per-request ordering is S01–S12; middleware implementation maps hooks to S02–S08 without inserting steps between S05 and S06.",
    defines: [
      "Reference only: S03 token string, S04 verify, S05 decode, S06 limits, S07 authz, S08 attach context.",
      "Illustrative handler stacks may use `req.user` naming; binding occurs at S08.",
    ],
    doesNotDefine: "Alternate sequencing (e.g. authz before rate limit).",
    href: "/docs/auth-security/system-flow#api-request-spine",
    linkLabel: "API request spine",
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
    href: "/docs/auth-security/error-contracts",
    linkLabel: "Auth error contracts",
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
              { href: "/docs/auth-security/system-flow", title: "System flow", description: "Canonical S02–S08 ordering." },
              { href: "/docs/auth-security/session-spec", title: "Session JWT spec", description: "S04–S05 validation source." },
              { href: "/docs/auth-security/error-contracts", title: "Auth error contracts", description: "Failure envelopes." },
              { href: "/docs/auth-security/session", title: "Session", description: "Bootstrap narrative." },
              { href: "/docs/auth-security/authorization", title: "Authorization", description: "S07 semantics." },
              { href: "/docs/auth-security/rate-limit", title: "Rate limit", description: "S06 semantics." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
