import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsDiagram } from "@/components/ui/DocsDiagram";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { LayerSpecAccordion } from "@/components/ui/LayerSpecAccordion";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

import { AUTH_SECURITY_ROOT_SCOPE_LINKS } from "@/lib/docs-scope-links";
const inPageLinks = [
  { title: "Overview", subtitle: "Role and boundaries.", href: "#overview" },
  {
    title: "Layer Structure Diagram",
    subtitle: "Identity, authorization, isolation.",
    href: "#auth-security-layer-diagram",
  },
  { title: "Chapter index", subtitle: "Deep-dive topics.", href: "#auth-security-chapters" },
  { title: "Details", subtitle: "Layer model in brief.", href: "#details" },
  { title: "Related Docs", subtitle: "System and policies.", href: "#related-docs" },
] as const;

const chapterLinks = [
  { href: "/docs/auth-security/system-flow", title: "System flow", description: "Canonical API request and bootstrap spines (S01–S12, B01–B06)." },
  { href: "/docs/auth-security/session-spec", title: "Session JWT spec", description: "Claims, validation rules, bootstrap wire field names." },
  { href: "/docs/auth-security/error-contracts", title: "Auth error contracts", description: "401 / 403 / 429 JSON envelope and stable codes." },
  { href: "/docs/auth-security/identity", title: "Identity", description: "External identity provider (e.g. Clerk); user object; no permissions." },
  { href: "/docs/auth-security/session", title: "Session", description: "WaveQ session token; bootstrap flow; separation from IdP session." },
  { href: "/docs/auth-security/authorization", title: "Authorization", description: "Workspace roles; action-based access." },
  { href: "/docs/auth-security/api-protection", title: "API protection", description: "Middleware validation chain; req.user." },
  { href: "/docs/auth-security/data-security", title: "Data security", description: "Workspace isolation; workspaceId on entities." },
  { href: "/docs/auth-security/rate-limit", title: "Rate limit", description: "Plan-based limits; AI and DSP protection." },
  { href: "/docs/auth-security/audit", title: "Audit", description: "Action logging; traceability." },
  { href: "/docs/auth-security/secrets", title: "Secrets", description: "Keys, JWT signing, environment variables; never client-exposed." },
] as const;

const overviewDetails = [
  {
    id: "layer-definition",
    title: "Layer Definition",
    subtitle: "Auth & Security as system boundary",
    purpose: "Define this layer as the enforcement surface for who is authenticated, which session applies, and what operations are allowed—without owning business outcomes.",
    defines: [
      "Authentication: establishing identity via trusted external IdP (e.g. Clerk) and mapping to WaveQ user records.",
      "Session: WaveQ-issued token binding userId, workspaceId, and plan context for API requests.",
      "Authorization: workspace-scoped roles and permission checks before QAgent, DSP, or data operations proceed.",
    ],
    doesNotDefine: "Intent planning, job orchestration semantics, or DSP transforms.",
    href: "/docs/auth-security#layer-definition",
    linkLabel: "This section",
  },
  {
    id: "identity-vs-session",
    title: "Identity vs Session separation",
    subtitle: "External vs internal trust",
    purpose: "Keep IdP identity proof separate from WaveQ runtime session so APIs can revoke, scope, and audit without mirroring IdP internals.",
    defines: [
      "Identity proves the human (or machine principal) at the edge; Clerk (or equivalent) remains the source of external authentication.",
      "Session proves the caller inside WaveQ APIs after bootstrap; carries workspace and plan for authorization and rate limits.",
    ],
    doesNotDefine: "Clerk dashboard configuration or custom OAuth UI flows beyond contract boundaries.",
    href: "/docs/auth-security/identity",
    linkLabel: "Identity",
  },
  {
    id: "authorization-model",
    title: "Authorization model",
    subtitle: "Workspace roles",
    purpose: "Summarize workspace-based roles (owner, member, viewer) and action-based gates (canvas, DSP, export) as documented on the Authorization page.",
    defines: [
      "Every protected action resolves role + permission + workspace membership before execution layers run.",
      "Least privilege: defaults deny unless explicitly allowed by role matrix.",
    ],
    doesNotDefine: "QAgent approval policy content or API job payload shapes.",
    href: "/docs/auth-security/authorization",
    linkLabel: "Authorization",
  },
  {
    id: "api-protection-model",
    title: "API protection model",
    subtitle: "Request path",
    purpose: "State the ordered checks: Authorization header, token validation, session decode, permission check, then attachment of req.user.",
    defines: [
      "Middleware or edge handler validates bearer token before route handlers execute.",
      "Failed checks return stable error envelopes without leaking internal reasons.",
    ],
    doesNotDefine: "Individual route handler business validation.",
    href: "/docs/auth-security/api-protection",
    linkLabel: "API protection",
  },
  {
    id: "data-isolation",
    title: "Data isolation strategy",
    subtitle: "Workspace boundary",
    purpose: "Require workspaceId on persisted entities and queries so no cross-tenant or cross-workspace reads or writes occur at the data access layer.",
    defines: [
      "Row- or scope-level filters derived from session workspaceId.",
      "API and workers reject requests missing workspace context when resource is workspace-scoped.",
    ],
    doesNotDefine: "Canonical schema definitions (Data Layer documentation).",
    href: "/docs/auth-security/data-security",
    linkLabel: "Data security",
  },
  {
    id: "security-boundaries",
    title: "Security boundaries",
    subtitle: "Non-leakage rules",
    purpose: "List hard boundaries: no QAgent logic, no DSP execution semantics, no client UI behavior, no secrets to browser.",
    defines: [
      "Auth layer gates access; it does not reinterpret QAgent plans or DSP graphs.",
      "Secrets and signing keys live server-side only; clients receive session tokens under httpOnly / secure rules as deployment dictates.",
    ],
    doesNotDefine: "Product marketing copy or client component styling.",
    href: "/docs/auth-security/secrets",
    linkLabel: "Secrets",
  },
] as const;

export default function AuthSecurityLayerPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security Layer"
        description="Authentication, session, authorization, API protection, data isolation, rate limits, audit, and secrets management for WaveQ as a SaaS and API-backed system—enforcement only, not business logic."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Overview</p>

      <DocsScopeBlocks links={AUTH_SECURITY_ROOT_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Why this layer exists, IdP vs WaveQ session, workspace model, and enforcement role.">
          <DocsOverviewBlock
            intro="The Auth & Security Layer exists so every WaveQ surface—SaaS UI and API—shares one enforcement model: who is authenticated, which workspace and plan apply, and whether an action is allowed. External identity (e.g. Clerk) proves the user at sign-in; WaveQ issues its own session token so APIs can authorize, rate-limit, and audit without embedding IdP-specific logic in QAgent, DSP, or Data layers."
            areasTitle="Core ideas"
            areas={[
              "Separation: external IdP handles authentication; WaveQ session carries runtime trust for APIs.",
              "Workspace-based access: roles and permissions are evaluated in workspace context.",
              "Security as boundary enforcement: gates run before business code; they do not replace domain rules owned elsewhere.",
            ]}
            outOfScope="Execution orchestration, transform pipelines, and persistence schema authority."
            relatedBoundaries={[
              "QAgent owns planning semantics; DSP owns processing; Data owns canonical persistence; Auth gates access to those layers.",
            ]}
          />
          <p className="mt-3 text-sm text-[var(--muted)]">
            System placement:{" "}
            <Link href="/docs/system/auth-security-layer" className="font-medium text-[var(--accent)] hover:underline">
              Auth & Security (system map)
            </Link>
          </p>
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={[...inPageLinks]} />
        </SectionBlock>

        <SectionBlock
          id="auth-security-layer-diagram"
          title="Layer Structure Diagram"
          body={[]}
          summaryPreview="Identity, authorization, and isolation per Auth & Security system view—not execution or persistence logic."
        >
          <DocsDiagram
            mode="structure"
            root="Auth & Security Layer"
            groups={[
              {
                title: "Identity",
                items: ["Authentication", "Session context"],
              },
              {
                title: "Authorization",
                items: ["Protected operations access"],
              },
              {
                title: "Isolation",
                items: ["Boundary security rules"],
              },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="auth-security-chapters" title="Chapter index" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">Each chapter expands one concern; read in any order by integration need.</p>
          <ul className="space-y-2 text-sm">
            {chapterLinks.map((ch) => (
              <li key={ch.href}>
                <Link href={ch.href} className="font-medium text-[var(--accent)] hover:underline">
                  {ch.title}
                </Link>
                <span className="text-[var(--muted)]"> — {ch.description}</span>
              </li>
            ))}
          </ul>
        </SectionBlock>

        <SectionBlock id="details" title="Details" body={[]}>
          <LayerSpecAccordion items={[...overviewDetails]} />
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/auth-security/system-flow", title: "System flow (canonical)", description: "Single ordering authority for request and bootstrap lifecycles." },
              { href: "/docs/system/auth-security-layer", title: "System map — Auth & Security", description: "Cross-layer placement." },
              { href: "/docs/architecture/policies/session-isolation", title: "Session Isolation (policy)", description: "Architecture policy complement." },
              { href: "/docs/api", title: "API Server Layer", description: "Execution and mediation after auth gates." },
              { href: "/docs/client", title: "Client Layer", description: "UI and client-side concerns outside this layer’s authority." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
