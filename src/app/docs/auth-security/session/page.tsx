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
  { title: "Overview", subtitle: "WaveQ session vs IdP.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Identity and API.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Internal session token",
    purpose: "WaveQ session is a server-issued JWT (or equivalent signed token) minted after identity is established, carrying userId, workspaceId, and plan tier for downstream authorization and rate limiting.",
    defines: [
      "Issued via `/api/session/bootstrap` (or equivalent) after IdP session is validated.",
      "Short-lived access semantics with refresh strategy as deployment policy dictates.",
    ],
    doesNotDefine: "Clerk session cookie internals or IdP refresh token storage.",
    href: "/docs/auth-security/session#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Session service owns",
    purpose: "Mint, validate, rotate, and revoke WaveQ tokens; bind active workspace; attach plan context for limits.",
    defines: [
      "Encode only claims required for API gates (user, workspace, plan, optional session id).",
      "Reject tampered or expired tokens before route logic runs.",
    ],
    doesNotDefine: "Business feature flags unrelated to security or limits.",
    href: "/docs/auth-security/api-protection",
    linkLabel: "API protection",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Bootstrap flow",
    purpose: "Client completes IdP sign-in → client calls bootstrap with IdP proof → API validates IdP → issues WaveQ JWT → subsequent API calls send Authorization Bearer with the WaveQ token.",
    defines: [
      "Bootstrap is the only path that bridges external identity to internal session.",
      "Middleware decodes JWT on each request; no per-request IdP round-trip when token valid.",
    ],
    doesNotDefine: "QAgent handoff payloads or DSP job creation.",
    href: "/docs/auth-security/identity",
    linkLabel: "Identity",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Bootstrap path ordering",
    purpose: "Concrete ordering when `/api/session/bootstrap` (or equivalent) runs (labels only).",
    defines: [
      "1 · Receive bootstrap request + IdP proof payload",
      "2 · Validate proof against IdP (or cached validation policy)",
      "3 · Load userId + active workspaceId + plan from persistence",
      "4 · Sign WaveQ JWT with server signing material",
      "5 · Return JWT + metadata to caller",
      "6 · Subsequent requests: middleware decodes JWT only (no IdP hop)",
    ],
    doesNotDefine: "IdP hosted UI rendering.",
    href: "/docs/auth-security/session#runtime-behavior",
    linkLabel: "This section",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Separation from Clerk",
    purpose: "Clerk proves identity; WaveQ session proves authorization context inside the product. Do not conflate the two tokens in application code.",
    defines: [
      "API handlers must rely on WaveQ session claims, not raw Clerk JWT, for workspace and role.",
      "Never expose signing secrets to the client; delivery via secure cookie or header policy per environment.",
    ],
    doesNotDefine: "Client-side storage of long-lived secrets.",
    href: "/docs/auth-security/secrets",
    linkLabel: "Secrets",
  },
] as const;

export default function AuthSecuritySessionPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Session"
        description="WaveQ session token (JWT), bootstrap flow, and separation from external IdP session—why an internal session is required and what claims it carries."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Session</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="An internal session is required so WaveQ APIs can authorize and rate-limit in product terms (workspace, plan) without forwarding every request to the IdP and without embedding IdP-specific fields in QAgent or Data code. The JWT carries a minimal, stable claim set: userId, workspaceId, and plan."
            areasTitle="Why internal session"
            areas={[
              "Decouple runtime trust from IdP vendor SDK details.",
              "Enable fast rejection at the edge and consistent audit identity.",
              "Keep workspace and plan context explicit in every protected call.",
            ]}
            outOfScope="Full JWT field catalog for each environment (operational runbooks)."
            relatedBoundaries={["Identity establishes user; Session establishes WaveQ runtime caller context."]}
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
              { href: "/docs/auth-security/identity", title: "Identity", description: "External authentication only." },
              { href: "/docs/auth-security/api-protection", title: "API protection", description: "Where the token is validated." },
              { href: "/docs/auth-security", title: "Auth & Security overview", description: "Layer entry point." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
