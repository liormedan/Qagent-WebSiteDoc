import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { AUTH_SECURITY_JWT_SPEC_VERSION, WAVEQ_SESSION_JWT_CLAIMS } from "@/lib/auth-security-contracts";

import { AUTH_SECURITY_SESSION_SPEC_SCOPE_LINKS } from "@/lib/docs-scope-links";

const jwtHeaderExample = JSON.stringify({ alg: "RS256", typ: "JWT", kid: "signing-key-id" }, null, 2);

const jwtPayloadExample = JSON.stringify(
  {
    iss: "https://auth.waveq.example",
    aud: "waveq-api",
    sub: "user_internal_uuid",
    wid: "workspace_internal_uuid",
    plan: "pro",
    sid: "session_opaque_id",
    iat: 1710000000,
    nbf: 1710000000,
    exp: 1710003600,
    jti: "token_unique_id",
  },
  null,
  2,
);

const bootstrapRequestExample = JSON.stringify(
  {
    idp_proof: "opaque-string-or-signed-assertion-per-deployment",
    requested_workspace_id: "workspace_internal_uuid",
  },
  null,
  2,
);

const bootstrapResponseExample = JSON.stringify(
  {
    access_token: "jwt-string-conforming-to-this-spec",
    token_type: "Bearer",
    expires_in: 3600,
  },
  null,
  2,
);

export default function AuthSecuritySessionSpecPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Session JWT spec"
        description="Normative WaveQ session access token: registered claims, custom claims, validation rules, and bootstrap wire examples. IdP tokens are out of scope."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Contracts</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SESSION_SPEC_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="JWT is the interchange format for S04–S05 and B05 in system-flow.">
          <DocsOverviewBlock
            intro="The WaveQ session JWT is signed by WaveQ infrastructure, consumed by API protection, and never treated as an IdP id_token. Algorithms and key rotation are deployment choices constrained by the validation rules below."
            areasTitle="Hard rules"
            areas={[
              "Verify iss, aud, exp (and optional nbf) on every protected request per S04.",
              "sub and wid MUST be internal ids, not Clerk opaque ids, unless explicitly mapped and documented as stable.",
              "Reject tokens missing any required claim.",
            ]}
            outOfScope="IdP OIDC discovery documents, Clerk SDK configuration, and browser cookie storage policies."
            relatedBoundaries={["system-flow step ids S04, S05, B05.", "error-contracts for validation failures."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Normative role.", href: "#overview" },
              { title: "Claims table", subtitle: "Required fields.", href: "#claims-table" },
              { title: "Validation rules", subtitle: "Cryptographic and time.", href: "#validation-rules" },
              { title: "Wire examples", subtitle: "Header, payload, bootstrap.", href: "#wire-examples" },
              { title: "Related Docs", subtitle: "Flow and session narrative.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="claims-table" title="Claims table" body={[]}>
          <p className="mb-2 text-sm text-[var(--muted)]">
            Spec version <span className="font-mono text-cyan-200/90">{AUTH_SECURITY_JWT_SPEC_VERSION}</span>. All listed
            claims apply to the access token issued after bootstrap.
          </p>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">Claim</th>
                  <th className="px-3 py-2">Required</th>
                  <th className="px-3 py-2">Type</th>
                  <th className="px-3 py-2">Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
                {WAVEQ_SESSION_JWT_CLAIMS.map((row) => (
                  <tr key={row.claim} className="bg-slate-950/30">
                    <td className="px-3 py-2 font-mono text-cyan-100/90">{row.claim}</td>
                    <td className="px-3 py-2">{row.required ? "yes" : "no"}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-400">{row.type}</td>
                    <td className="px-3 py-2 text-[var(--muted)]">{row.rule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock id="validation-rules" title="Validation rules" body={[]}>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-200">
            <li>Cryptographic algorithm MUST match published key for kid; reject unknown kid after rotation window rules.</li>
            <li>Clock skew: configurable positive bound; default recommendation 60 seconds unless infra policy stricter.</li>
            <li>aud MUST include the configured WaveQ API audience string; reject if missing after normalization.</li>
            <li>iss MUST equal configured issuer URI exactly (after trimming); no subdomain wildcard unless explicitly configured.</li>
            <li>wid MUST refer to a workspace the subject (sub) is authorized to access at mint time; re-validation at S07 uses current membership.</li>
            <li>plan MUST be a non-empty string key known to rate limit and quota subsystems.</li>
          </ul>
        </SectionBlock>

        <SectionBlock id="wire-examples" title="Wire examples (non-normative shape)" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Endpoint paths for bootstrap are deployment-defined; field names below are normative for documentation interchange. Implementations MAY alias
            field names if they publish an equivalent mapping table alongside their OpenAPI.
          </p>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">JWT header (example)</p>
          <pre className="mb-4 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{jwtHeaderExample}</code>
          </pre>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">JWT payload (example)</p>
          <pre className="mb-4 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{jwtPayloadExample}</code>
          </pre>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Bootstrap request body (normative field names)</p>
          <pre className="mb-4 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{bootstrapRequestExample}</code>
          </pre>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Bootstrap success response (normative field names)</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{bootstrapResponseExample}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/auth-security/system-flow", title: "System flow", description: "S04–S05 and B05 ordering authority." },
              { href: "/docs/auth-security/error-contracts", title: "Auth error contracts", description: "Codes when validation fails." },
              { href: "/docs/auth-security/session", title: "Session", description: "Narrative rationale (non-normative ordering)." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
