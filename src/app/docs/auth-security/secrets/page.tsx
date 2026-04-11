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
  { title: "Overview", subtitle: "Server-only material.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Session and API.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Secret material",
    purpose: "Secrets include third-party API keys, JWT signing keys, database credentials, webhook signing secrets, and sensitive environment variables consumed only by server-side runtimes.",
    defines: [
      "Loaded from secure secret stores or environment at process start; never compiled into client bundles.",
      "Rotated on compromise or periodic policy; old keys rejected after cutover window.",
    ],
    doesNotDefine: "Customer-managed keys inside their cloud (enterprise variant).",
    href: "/docs/auth-security/secrets#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Platform owns",
    purpose: "Provision, rotate, scope least privilege, audit access to secrets, and ensure build pipelines strip accidental leakage.",
    defines: [
      "Separate signing keys per environment (dev/stage/prod).",
      "CI/CD injects secrets at deploy time; repositories contain placeholders only.",
    ],
    doesNotDefine: "Client-visible publishable keys (e.g. analytics) when explicitly public by design.",
    href: "/docs/auth-security/session",
    linkLabel: "Session",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Usage path",
    purpose: "Server handler or worker resolves secret from env/store → uses in outbound call or signing → never returns value in JSON or logs.",
    defines: [
      "JWT middleware loads private key material server-side only.",
      "External API keys used in gateway or worker processes, not browser.",
    ],
    doesNotDefine: "OAuth client secrets in public native or SPA clients (use PKCE patterns per IdP docs).",
    href: "/docs/auth-security/api-protection",
    linkLabel: "API protection",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Load → use → rotate",
    purpose: "Concrete ordering for secret material in a running server process (labels only).",
    defines: [
      "1 · Process start: pull secret material from env / vault / file mount",
      "2 · Hydrate server-only config object (never import graph reachable from client)",
      "3 · Hot path: JWT signer / DB driver / outbound HTTP reads bytes from that object",
      "4 · Rotation signal: load successor key into memory",
      "5 · Dual-verify window: accept tokens signed with either key id",
      "6 · Retire old key id after cutover deadline",
    ],
    doesNotDefine: "Browser bundle graph analysis.",
    href: "/docs/auth-security/secrets#runtime-behavior",
    linkLabel: "This section",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Never exposed to client",
    purpose: "No secret may ship to Next.js client bundles, localStorage, or public environment NEXT_PUBLIC_ variables.",
    defines: [
      "Code review blocks accidental import of server modules into client graphs.",
      "Error handlers strip secret-bearing upstream messages.",
    ],
    doesNotDefine: "End-user API keys for customer automation (treated as credentials with their own lifecycle).",
    href: "/docs/auth-security/audit",
    linkLabel: "Audit",
  },
] as const;

export default function AuthSecuritySecretsPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Secrets"
        description="API keys, JWT signing material, and sensitive environment variables: lifecycle, usage boundaries, and strict prohibition on client exposure."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Secrets</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Secrets are the root of trust for sessions and integrations. WaveQ keeps them on the server boundary so compromise surface stays smaller and tokens cannot be forged from the browser."
            areasTitle="Categories"
            areas={[
              "JWT signing keys for WaveQ session tokens.",
              "Upstream vendor API keys (models, webhooks, email).",
              "Datastore and queue credentials for API and workers.",
            ]}
            outOfScope="Hardware security modules and cloud KMS specifics (operations guides)."
            relatedBoundaries={["Session signing depends on secrets; Audit must not log raw secret values."]}
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
              { href: "/docs/auth-security/session", title: "Session", description: "JWT depends on signing secrets." },
              { href: "/docs/auth-security/audit", title: "Audit", description: "Redaction requirements." },
              { href: "/docs/auth-security", title: "Auth & Security overview", description: "Layer entry point." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
