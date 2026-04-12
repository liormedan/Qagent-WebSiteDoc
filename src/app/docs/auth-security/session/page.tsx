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
    purpose: "WaveQ session is a server-issued JWT minted after identity is established, carrying userId, workspaceId, and plan tier for downstream authorization and rate limiting.",
    defines: [
      "Issued at end of bootstrap spine B05–B06 after B01–B04 succeed (see system-flow).",
      "Claim names, validation, and wire field names are normative in session-spec.",
    ],
    doesNotDefine: "Clerk session cookie internals or IdP refresh token storage.",
    href: "/docs/auth-security/session-spec",
    linkLabel: "Session JWT spec",
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
    purpose: "Narrative summary only; canonical ordering is B01–B06 on system-flow.",
    defines: [
      "Bootstrap is the only path that bridges external identity to internal session.",
      "Per-request API behavior after mint is S03 onward on system-flow (no IdP hop on hot path).",
    ],
    doesNotDefine: "JWT claim table (session-spec) or error JSON (error-contracts).",
    href: "/docs/auth-security/system-flow",
    linkLabel: "System flow",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Bootstrap spine ids",
    purpose: "Ordering is authoritative only on system-flow; this row lists spine cross-refs.",
    defines: [
      "B01–B06 cover mint path end-to-end; do not insert steps between B04 and B05.",
      "S03–S05 cover bearer extraction, verify, decode on each protected API request.",
    ],
    doesNotDefine: "Framework middleware hook names.",
    href: "/docs/auth-security/system-flow#bootstrap-spine",
    linkLabel: "Bootstrap spine",
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
              { href: "/docs/auth-security/system-flow", title: "System flow", description: "Bootstrap B01–B06 and API spine S01–S12." },
              { href: "/docs/auth-security/session-spec", title: "Session JWT spec", description: "Normative claims and wire examples." },
              { href: "/docs/auth-security/identity", title: "Identity", description: "External authentication only." },
              { href: "/docs/auth-security/api-protection", title: "API protection", description: "Where S03–S08 attach in the stack." },
              { href: "/docs/auth-security", title: "Auth & Security overview", description: "Layer entry point." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
