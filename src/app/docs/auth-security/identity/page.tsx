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
  { title: "Overview", subtitle: "External identity.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Session and system.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Identity at the edge",
    purpose: "Identity is proof of who signed in via the configured external IdP (e.g. Clerk): stable user id, email or subject, and IdP-managed profile fields.",
    defines: [
      "Clerk (or equivalent) performs primary authentication; WaveQ consumes verified identity assertions.",
      "User object in WaveQ maps external subject to internal userId for session bootstrap and auditing.",
    ],
    doesNotDefine: "Workspace roles, API permissions, or session token contents.",
    href: "/docs/auth-security/identity#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "What Identity owns",
    purpose: "Own only external authentication binding: validate IdP callbacks, create or link user rows, and expose no permission decisions.",
    defines: [
      "Receive and verify IdP tokens or session cookies at the edge.",
      "Emit or update canonical user record identifiers used downstream.",
    ],
    doesNotDefine: "Authorization checks or workspace membership resolution.",
    href: "/docs/auth-security/authorization",
    linkLabel: "Authorization",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Sign-in path",
    purpose: "Narrative only; canonical ordering is bootstrap spine B01–B06 on the system-flow page.",
    defines: [
      "IdP proves identity; WaveQ consumes verified assertions and maintains minimal user linkage.",
      "Failures are authentication-class only until WaveQ session exists; envelope per error-contracts.",
    ],
    doesNotDefine: "JWT field catalog (session-spec) or per-request API spine S01–S12.",
    href: "/docs/auth-security/system-flow",
    linkLabel: "System flow (bootstrap spine)",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Bootstrap phase ids",
    purpose: "Do not duplicate step text. Identity semantics map to B01–B03; minting continues in B04–B06.",
    defines: [
      "B01–B03: receive proof, verify with IdP/JWKS, upsert user (see system-flow anchors B01–B03).",
      "B04–B06: workspace/plan resolution, JWT sign, return token (Session + session-spec).",
    ],
    doesNotDefine: "Alternate orderings or Express-specific middleware names.",
    href: "/docs/auth-security/system-flow#bootstrap-spine",
    linkLabel: "Bootstrap spine",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Explicit non-ownership",
    purpose: "No permissions here; no system access logic; no QAgent or DSP coupling.",
    defines: [
      "Must not embed role or workspace matrices in the identity handler.",
      "Must not leak IdP secrets to clients beyond what the IdP SDK requires.",
    ],
    doesNotDefine: "Business onboarding rules or billing plan selection.",
    href: "/docs/auth-security",
    linkLabel: "Auth & Security overview",
  },
] as const;

export default function AuthSecurityIdentityPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Identity"
        description="External identity provider integration (e.g. Clerk), user object shape, and authentication-only boundary—no permissions or workspace access logic."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Identity</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Identity establishes who is signing in before any WaveQ session exists. Clerk (or another IdP) performs external authentication; WaveQ trusts verified assertions and maps them to an internal user identifier. This page stops at authentication—authorization and session tokens are separate chapters."
            areasTitle="Focus"
            areas={["IdP as source of authentication truth.", "Minimal user record for linkage and audit.", "Clear handoff to session bootstrap only after identity succeeds."]}
            outOfScope="Permission matrices, API route guards, and workspace isolation (covered elsewhere in this section)."
            relatedBoundaries={["Session page: WaveQ token after identity is known.", "Authorization page: roles and actions after session exists."]}
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
              { href: "/docs/auth-security/session", title: "Session", description: "WaveQ JWT and bootstrap flow." },
              { href: "/docs/auth-security", title: "Auth & Security overview", description: "Layer entry point." },
              { href: "/docs/architecture/policies/session-isolation", title: "Session Isolation", description: "Cross-cutting policy reference." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
