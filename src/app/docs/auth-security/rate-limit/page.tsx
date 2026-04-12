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
  { title: "Overview", subtitle: "Plan tiers.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "Session and API.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Plan-based throttling",
    purpose: "Rate limiting caps request volume and expensive operations per workspace or user based on plan tier, protecting AI and DSP endpoints from abuse and runaway cost.",
    defines: [
      "Counters keyed by userId, workspaceId, and sometimes route family.",
      "429 responses with retry guidance where clients support backoff.",
    ],
    doesNotDefine: "Model pricing tables or invoice generation.",
    href: "/docs/auth-security/rate-limit#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Limiter owns",
    purpose: "Apply plan-derived quotas after authentication; separate burst vs sustained limits; integrate with observability for limit hits.",
    defines: [
      "Read plan from session claims or authoritative billing service when stricter than claim.",
      "Stricter limits on AI completion and DSP job submission routes.",
    ],
    doesNotDefine: "Fair scheduling inside a single DSP graph (DSP docs).",
    href: "/docs/auth-security/session",
    linkLabel: "Session",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Request evaluation",
    purpose: "Rate limiting is S06 only, after S05 decodes caller context and before S07 authorization.",
    defines: [
      "429 responses use error-contracts (RATE_LIMIT_EXCEEDED) with optional retry_after_seconds.",
      "Plan ceilings may be stricter than session claim if billing authority overrides (documented operationally).",
    ],
    doesNotDefine: "Per-model token accounting inside providers.",
    href: "/docs/auth-security/system-flow",
    linkLabel: "System flow",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Spine id S06",
    purpose: "Do not move limiter before S05 or after S07; canonical position is fixed in system-flow.",
    defines: [
      "S06: build limit key from decoded claims, compare to plan ceiling, short-circuit 429 or continue.",
    ],
    doesNotDefine: "Limiter algorithm (token bucket vs sliding window) — implementation choice.",
    href: "/docs/auth-security/system-flow#api-request-spine",
    linkLabel: "API request spine",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Boundary",
    purpose: "Limits are security and stability controls, not product feature toggles; feature gating remains authorization.",
    defines: [
      "Do not leak competitor-sensitive limit numbers in error strings if policy forbids.",
      "Avoid double billing: limiter should not replace usage metering where both exist.",
    ],
    doesNotDefine: "Client-side-only throttles as sole protection.",
    href: "/docs/auth-security",
    linkLabel: "Auth & Security overview",
  },
] as const;

export default function AuthSecurityRateLimitPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Rate limit"
        description="Plan-based request and operation limits, with emphasis on protecting AI and DSP surfaces; example contrast between free and pro tiers."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Rate limit</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="Rate limiting complements authentication: even legitimate users can overwhelm shared infrastructure. Plans map to numeric ceilings so the edge can reject overload early and protect downstream AI and DSP capacity."
            areasTitle="Examples (illustrative)"
            areas={[
              "Free: lower requests per minute on model routes; fewer concurrent DSP jobs.",
              "Pro: higher RPM and job concurrency; same auth and isolation rules apply.",
            ]}
            outOfScope="Exact production numbers; those live in configuration and monitoring."
            relatedBoundaries={["Session carries plan; API protection runs auth before limiter in the documented pipeline."]}
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
              { href: "/docs/auth-security/session", title: "Session", description: "Plan in token claims." },
              { href: "/docs/auth-security/api-protection", title: "API protection", description: "Where limits attach." },
              { href: "/docs/auth-security/audit", title: "Audit", description: "Limit denials as events." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
