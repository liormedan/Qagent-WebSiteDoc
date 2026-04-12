import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  AUTH_SECURITY_BOOTSTRAP_SPINE,
  AUTH_SECURITY_BOOTSTRAP_SPINE_EXPORT,
  AUTH_SECURITY_REQUEST_SPINE,
  AUTH_SECURITY_REQUEST_SPINE_EXPORT,
} from "@/lib/auth-security-contracts";

import { AUTH_SECURITY_SYSTEM_FLOW_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(
  { request: AUTH_SECURITY_REQUEST_SPINE_EXPORT, bootstrap: AUTH_SECURITY_BOOTSTRAP_SPINE_EXPORT },
  null,
  2,
);

export default function AuthSecuritySystemFlowPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — System flow"
        description="Canonical ordered spines: per-request API security lifecycle and session bootstrap lifecycle. All other Auth pages defer ordering here."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Contracts</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SYSTEM_FLOW_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Single source of truth for control order; no duplicate runtime chains elsewhere.">
          <DocsOverviewBlock
            intro="This page freezes ordering. Implementations MUST follow the API request spine for inbound protected HTTP traffic, and the bootstrap spine when minting a WaveQ session JWT. Chapter pages elaborate semantics; they MUST NOT redefine step order except to cite step ids from this page."
            areasTitle="Normative rules"
            areas={[
              "Request spine: S01–S12; failures at gate steps use error-contracts.",
              "Bootstrap spine: B01–B06; failures before mint return 401 per error-contracts.",
              "Runtime Behavior sections on other pages summarize or deep-link; they do not introduce alternate sequences.",
            ]}
            outOfScope="QAgent planning order, DSP graph execution, and UI routing."
            relatedBoundaries={[
              "session-spec: JWT shape for S04–S05 and B05.",
              "error-contracts: response envelope for 401 / 403 / 429 from this spine.",
              "/docs/system-runtime: product cross-layer spine (R ids); orthogonal to S/B.",
              "/docs/system-flow: narrative diagram; does not assign S or R ids.",
            ]}
          />
        </SectionBlock>

        <SectionBlock
          id="abstraction-levels"
          title="Abstraction levels (no conflict)"
          body={[
            "S and B ids: only on this page; govern protected HTTP and bootstrap.",
            "R ids: only on /docs/system-runtime; govern Client→QAgent→API→DSP→Data→Client projection path.",
            "/docs/system-flow: qualitative diagram + accordion; must not contradict S/B or R ordering when cited.",
            "/docs/authority-map: resolves which href is canonical when domains overlap.",
          ]}
        />

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Normative role.", href: "#overview" },
              { title: "Abstraction levels", subtitle: "R vs S vs narrative.", href: "#abstraction-levels" },
              { title: "API request spine", subtitle: "S01–S12.", href: "#api-request-spine" },
              { title: "Bootstrap spine", subtitle: "B01–B06.", href: "#bootstrap-spine" },
              { title: "Machine export", subtitle: "JSON bundle.", href: "#machine-export" },
              { title: "Related Docs", subtitle: "Contracts and chapters.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="api-request-spine" title="API request spine (protected routes)" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Ordered steps for one inbound HTTP request on a protected route. Step ids are stable identifiers for cross-doc references.
          </p>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-200">
            {AUTH_SECURITY_REQUEST_SPINE.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28">
                <span className="font-mono text-xs text-cyan-200/90">{s.id}</span>
                <span className="text-slate-400"> · </span>
                <span className="text-[var(--muted)]">{s.phase}</span>
                <p className="mt-1 text-slate-100">{s.summary}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Authoritative detail: <span className="font-mono">{s.authoritative_doc}</span> · Gate failure:{" "}
                  <span className="font-mono">{s.on_failure}</span>
                </p>
              </li>
            ))}
          </ol>
        </SectionBlock>

        <SectionBlock id="bootstrap-spine" title="Bootstrap spine (session mint)" body={[]}>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Ordered steps from IdP proof to WaveQ session JWT issuance. Distinct from per-request spine; after B06, clients use S03 onward on API calls.
          </p>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-200">
            {AUTH_SECURITY_BOOTSTRAP_SPINE.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28">
                <span className="font-mono text-xs text-cyan-200/90">{s.id}</span>
                <p className="mt-1 text-slate-100">{s.summary}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Authoritative detail: <span className="font-mono">{s.authoritative_doc}</span> · Gate failure:{" "}
                  <span className="font-mono">{s.on_failure}</span>
                </p>
              </li>
            ))}
          </ol>
        </SectionBlock>

        <SectionBlock id="machine-export" title="Machine export" body={[]}>
          <p className="mb-2 text-sm text-[var(--muted)]">
            Combined JSON export for tooling (diff-friendly). Version bumps when any step order or id changes.
          </p>
          <pre className="max-h-[min(70vh,520px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{machineExport}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related Docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/system-runtime", title: "System runtime", description: "R01–R12 product spine." },
              { href: "/docs/authority-map", title: "Authority map", description: "Canonical href per domain." },
              { href: "/docs/auth-security/session-spec", title: "Session JWT spec", description: "Claims and validation referenced by S04–S05 and B05." },
              { href: "/docs/auth-security/error-contracts", title: "Auth error contracts", description: "401 / 403 / 429 envelopes for gate failures." },
              { href: "/docs/auth-security/api-protection", title: "API protection", description: "Middleware semantics for S02–S03 and S08." },
              { href: "/docs/auth-security/session", title: "Session", description: "Rationale and bootstrap narrative (non-ordering)." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
