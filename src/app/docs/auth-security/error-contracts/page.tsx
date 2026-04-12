import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  AUTH_SECURITY_ERROR_CONTRACT_VERSION,
  WAVEQ_AUTH_ERROR_CODES,
  WAVEQ_AUTH_ERROR_ENVELOPE_EXAMPLE,
} from "@/lib/auth-security-contracts";

import { AUTH_SECURITY_ERROR_CONTRACTS_SCOPE_LINKS } from "@/lib/docs-scope-links";

const envelopePretty = JSON.stringify(WAVEQ_AUTH_ERROR_ENVELOPE_EXAMPLE, null, 2);

const example401 = JSON.stringify(
  {
    error: {
      code: "AUTH_TOKEN_INVALID",
      message: "Session could not be validated",
      request_id: "7f2c1b9a-4e3d-4c1a-9b0e-1234567890ab",
    },
  },
  null,
  2,
);

const example403 = JSON.stringify(
  {
    error: {
      code: "AUTHZ_FORBIDDEN",
      message: "Action not permitted for this workspace",
      request_id: "7f2c1b9a-4e3d-4c1a-9b0e-1234567890ab",
    },
  },
  null,
  2,
);

const example429 = JSON.stringify(
  {
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Rate limit exceeded; retry after backoff",
      request_id: "7f2c1b9a-4e3d-4c1a-9b0e-1234567890ab",
      retry_after_seconds: 30,
    },
  },
  null,
  2,
);

export default function AuthSecurityErrorContractsPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Error contracts"
        description="Normative JSON error envelope for 401, 403, and 429 outcomes from the Auth stack. Stable codes for clients and logs; no stack traces or secret leakage."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Contracts</p>

      <DocsScopeBlocks links={AUTH_SECURITY_ERROR_CONTRACTS_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Maps system-flow gate failures to HTTP and payload shape.">
          <DocsOverviewBlock
            intro="All auth-layer denials from steps S03–S07 and bootstrap B02–B05 return this envelope unless a deployment explicitly documents a backward-compatible legacy shape (which MUST still include the same logical fields)."
            areasTitle="Rules"
            areas={[
              "401: authentication or token validity failed before authorization.",
              "403: valid token but action or workspace scope denied.",
              "429: authenticated context; plan or route family quota exceeded.",
              "message MUST be safe for end-user display; no internal exception text.",
            ]}
            outOfScope="Non-auth 4xx/5xx from domain handlers (use API product error catalog)."
            relatedBoundaries={["system-flow for which step emits which status.", "Audit must not log raw Authorization or secrets."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Normative role.", href: "#overview" },
              { title: "Envelope", subtitle: "Required fields.", href: "#envelope" },
              { title: "Code catalog", subtitle: "Machine codes.", href: "#code-catalog" },
              { title: "401 / 403 / 429", subtitle: "Examples.", href: "#status-examples" },
              { title: "Related Docs", subtitle: "Spine and JWT.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="envelope" title="Envelope" body={[]}>
          <p className="mb-2 text-sm text-[var(--muted)]">
            Contract version <span className="font-mono text-cyan-200/90">{AUTH_SECURITY_ERROR_CONTRACT_VERSION}</span>.
          </p>
          <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-slate-200">
            <li>
              <span className="font-mono text-cyan-100/90">error.code</span> — required; MUST be one of the catalog codes or a deployment-prefixed extension
              documented in OpenAPI.
            </li>
            <li>
              <span className="font-mono text-cyan-100/90">error.message</span> — required; human-readable; MUST NOT include stack traces, token fragments, or
              SQL.
            </li>
            <li>
              <span className="font-mono text-cyan-100/90">error.request_id</span> — required on API responses; correlates to audit and edge logs.
            </li>
            <li>
              <span className="font-mono text-cyan-100/90">error.retry_after_seconds</span> — optional; SHOULD be present on 429 when limiter supports it.
            </li>
          </ul>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{envelopePretty}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="code-catalog" title="Code catalog" body={[]}>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">code</th>
                  <th className="px-3 py-2">HTTP</th>
                  <th className="px-3 py-2">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
                {WAVEQ_AUTH_ERROR_CODES.map((row) => (
                  <tr key={row.code} className="bg-slate-950/30">
                    <td className="px-3 py-2 font-mono text-cyan-100/90">{row.code}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.http}</td>
                    <td className="px-3 py-2 text-[var(--muted)]">{row.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock id="status-examples" title="Status examples" body={[]}>
          <p className="mb-2 text-sm font-semibold text-slate-100">401 — authentication failed</p>
          <pre className="mb-6 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{example401}</code>
          </pre>
          <p className="mb-2 text-sm font-semibold text-slate-100">403 — authorization or scope denied</p>
          <pre className="mb-6 overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{example403}</code>
          </pre>
          <p className="mb-2 text-sm font-semibold text-slate-100">429 — rate limit</p>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs text-emerald-100/90">
            <code>{example429}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/auth-security/system-flow", title: "System flow", description: "Which step returns which status." },
              { href: "/docs/auth-security/session-spec", title: "Session JWT spec", description: "Validation failures map to AUTH_TOKEN_*." },
              { href: "/docs/auth-security/api-protection", title: "API protection", description: "Middleware application of this contract." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
