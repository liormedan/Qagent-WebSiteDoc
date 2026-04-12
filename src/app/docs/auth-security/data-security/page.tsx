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
  { title: "Overview", subtitle: "Tenancy isolation.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Authorization and API.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Workspace isolation",
    purpose: "Data security in this layer means every persisted entity is scoped by workspaceId and queries always filter on that scope so no cross-workspace reads or writes occur.",
    defines: [
      "Canonical rule: workspaceId is mandatory on tenant-owned rows.",
      "API and workers inherit workspace from session or signed job context, never from unvalidated client-only hints.",
    ],
    doesNotDefine: "Encryption at rest configuration or key management (see Secrets).",
    href: "/docs/auth-security/data-security#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "What this boundary enforces",
    purpose: "Enforce tenant isolation at persistence boundaries; reject ambiguous queries; align ORM/query builders with session workspace.",
    defines: [
      "Repository helpers default workspace filter from req.user.workspaceId.",
      "Cross-workspace admin paths require explicit audited capability outside normal user flows.",
    ],
    doesNotDefine: "Row-level sharing inside a workspace (product feature matrix).",
    href: "/docs/auth-security/authorization",
    linkLabel: "Authorization",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Read/write path",
    purpose: "Persistence isolation is S10 in the API request spine; it runs after S08 attaches caller context and S09 handler begins domain work.",
    defines: [
      "IDs alone never imply access; workspace membership is re-checked at S07 before storage predicates in S10.",
      "Background jobs carry workspace id in signed envelopes from API origin (envelope spec is API/worker contract, not redefined here).",
    ],
    doesNotDefine: "DSP buffer memory isolation (DSP operational docs).",
    href: "/docs/auth-security/system-flow",
    linkLabel: "System flow",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Spine cross-reference",
    purpose: "Ordering for persistence touches is only S10; do not prepend authorization steps here.",
    defines: [
      "S10: bind repository/query to session or signed worker workspace; deny on mismatch (403 per policy).",
      "404/empty vs 403 mapping remains as stated in this page Overview and error-contracts.",
    ],
    doesNotDefine: "JWT validation (S04–S05).",
    href: "/docs/auth-security/system-flow#api-request-spine",
    linkLabel: "API request spine",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "No cross-workspace access",
    purpose: "Normal product paths must not join or list across workspaces; exports and search respect the active workspace only.",
    defines: [
      "No client-supplied workspaceId without server-side membership verification.",
      "Caching keys must include workspace scope to prevent bleed-through.",
    ],
    doesNotDefine: "Global system metrics aggregation across tenants (separate analytics pipeline).",
    href: "/docs/auth-security",
    linkLabel: "Auth & Security overview",
  },
] as const;

export default function AuthSecurityDataSecurityPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Data security"
        description="Workspace isolation: all tenant entities require workspaceId; queries and jobs enforce scope so cross-workspace access cannot occur on normal paths."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Data security</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="SaaS data exposure failures usually come from missing tenant predicates. WaveQ treats workspace isolation as a security property: the session establishes the active workspace, and every data touchpoint repeats that predicate so authorization and persistence stay aligned."
            areasTitle="Strategy"
            areas={[
              "Single workspace context per request in the API layer.",
              "Mandatory workspaceId on create and update paths.",
              "404/empty responses instead of revealing foreign workspace existence where policy requires.",
            ]}
            outOfScope="Physical database multi-tenancy models (shared DB vs silo); operational choice."
            relatedBoundaries={["Authorization grants actions within a workspace; Data security enforces the workspace predicate on storage."]}
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
              { href: "/docs/auth-security/authorization", title: "Authorization", description: "Roles before data access." },
              { href: "/docs/auth-security/session", title: "Session", description: "Workspace claim source." },
              { href: "/docs/architecture/policies/session-isolation", title: "Session Isolation", description: "Cross-cutting policy." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
