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
  { title: "Overview", subtitle: "Roles and actions.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Session and data.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Workspace-based authorization",
    purpose: "Authorization decides whether the authenticated session may perform an action in a workspace: roles (owner, member, viewer) plus action-specific gates (canvas, DSP, export).",
    defines: [
      "owner: full administrative control within workspace limits.",
      "member: standard collaborative access per mapped permissions.",
      "viewer: read-only or restricted interactions as policy defines.",
    ],
    doesNotDefine: "IdP profile fields or authentication protocol details.",
    href: "/docs/auth-security/authorization#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Permission mapping",
    purpose: "Map roles to allowed actions; evaluate action + resource + workspace together; deny by default.",
    defines: [
      "Central policy table or service used by API handlers after session decode.",
      "Elevated actions (e.g. billing, workspace delete) restricted to owner unless overridden by deployment.",
    ],
    doesNotDefine: "QAgent intent approval semantics (QAgent documentation).",
    href: "/docs/auth-security/api-protection",
    linkLabel: "API protection",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Check order",
    purpose: "Narrative; canonical gate for authorization is S07 on system-flow after S05 decodes caller context.",
    defines: [
      "Resource-level checks where IDs are workspace-scoped (see Data security and S10).",
      "403 vs not-found mapping follows error-contracts and data-security policy text.",
    ],
    doesNotDefine: "DSP pipeline stage authorization inside workers (DSP docs for processing contracts).",
    href: "/docs/auth-security/system-flow",
    linkLabel: "System flow",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Spine cross-reference",
    purpose: "Do not duplicate ordering. Authorization evaluation is step S07 only; S06 is rate limit, S08 attaches handler context.",
    defines: [
      "S07: resolve action key, workspace membership, allow matrix → permit or 403.",
      "Denials use error-contracts codes under AUTHZ_* for 403.",
    ],
    doesNotDefine: "JWT validation (S04–S05, session-spec).",
    href: "/docs/auth-security/system-flow#api-request-spine",
    linkLabel: "API request spine",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Boundary",
    purpose: "Authorization does not implement business algorithms; it only enforces allow/deny for declared actions.",
    defines: [
      "Must not embed QAgent planning rules or DSP transform selection.",
      "Must not bypass workspace isolation even for admin without explicit break-glass policy.",
    ],
    doesNotDefine: "Client UI visibility toggles unrelated to security.",
    href: "/docs/auth-security",
    linkLabel: "Auth & Security overview",
  },
] as const;

export default function AuthSecurityAuthorizationPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Authorization"
        description="Workspace roles (owner, member, viewer), permission mapping, and action-based access for canvas, DSP, and export—after session is established."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Authorization</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Authorization answers whether this session may perform this operation in this workspace. It consumes session claims and membership data; it does not re-authenticate the user. Roles compress common patterns; fine-grained actions align API routes and UI capabilities to the same matrix."
            areasTitle="Model"
            areas={["Workspace is the primary tenancy boundary for permissions.", "Actions are explicit (canvas, dsp, export) to avoid ambiguous 'logged in' checks.", "Deny by default when mapping is missing."]}
            outOfScope="Detailed matrix tables per product SKU (operational configuration)."
            relatedBoundaries={["Session supplies user and workspace context; Data security enforces workspaceId on persistence."]}
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
              { href: "/docs/auth-security/session", title: "Session", description: "Claims used for authorization." },
              { href: "/docs/auth-security/data-security", title: "Data security", description: "Workspace isolation in storage." },
              { href: "/docs/auth-security", title: "Auth & Security overview", description: "Layer entry point." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
