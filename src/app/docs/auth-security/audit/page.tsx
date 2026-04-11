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
  { title: "Overview", subtitle: "Traceability.", href: "#overview" },
  { title: "Details", subtitle: "Definition through constraints.", href: "#details" },
  { title: "Related Docs", subtitle: "API and data.", href: "#related-docs" },
] as const;

const details = [
  {
    id: "definition",
    title: "Definition",
    subtitle: "Security-relevant events",
    purpose: "Audit logging records who did what, when, and in which workspace for security-sensitive actions: DSP execution, login and session events, and material API usage.",
    defines: [
      "Structured events with actor ids, workspace, route or action name, outcome, correlation id.",
      "Retention policy separate from application debug logs.",
    ],
    doesNotDefine: "Full payload capture of secrets or PII beyond policy.",
    href: "/docs/auth-security/audit#definition",
    linkLabel: "This section",
  },
  {
    id: "responsibilities",
    title: "Responsibilities",
    subtitle: "Audit pipeline owns",
    purpose: "Emit append-only events from API and workers; protect log sinks from tampering; enable investigations without exposing customer data unnecessarily.",
    defines: [
      "Login success and failure; session bootstrap; permission denials at high value.",
      "DSP job start/finish with job id and workspace; API usage aggregates for anomaly hints.",
    ],
    doesNotDefine: "QAgent chain-of-thought content logging.",
    href: "/docs/auth-security/api-protection",
    linkLabel: "API protection",
  },
  {
    id: "flow",
    title: "Flow / Execution",
    subtitle: "Event path",
    purpose: "Middleware and handlers call audit helper after decision → async ship to sink → dashboards/alerts on patterns (spike in denials, unusual workspace).",
    defines: [
      "Correlation id threaded from edge through QAgent/DSP boundaries where supported.",
      "Sampling only for high-volume read paths when policy allows; never sample auth failures blindly without risk review.",
    ],
    doesNotDefine: "Real-time SIEM rule authoring.",
    href: "/docs/auth-security/identity",
    linkLabel: "Identity",
  },
  {
    id: "runtime-behavior",
    title: "Runtime Behavior",
    subtitle: "Emit path (non-blocking)",
    purpose: "Concrete ordering when a security-relevant event is recorded (labels only).",
    defines: [
      "1 · Decision completes at edge or handler (allow / deny / job id)",
      "2 · Build redacted event struct (actor, workspace, action, outcome, correlation id)",
      "3 · Push to in-memory / disk buffer or async queue",
      "4 · Background flusher batches to configured sink",
      "5 · Request thread continues without waiting on sink ACK",
    ],
    doesNotDefine: "Log query UI.",
    href: "/docs/auth-security/audit#runtime-behavior",
    linkLabel: "This section",
  },
  {
    id: "constraints",
    title: "Constraints",
    subtitle: "Traceability vs privacy",
    purpose: "Audit supports debugging and accountability; it must not become a secret exfiltration channel.",
    defines: [
      "Redact tokens, API keys, and raw Authorization headers.",
      "Separate operational debug logs from compliance-grade audit trails when required.",
    ],
    doesNotDefine: "End-user activity analytics product features.",
    href: "/docs/auth-security/secrets",
    linkLabel: "Secrets",
  },
] as const;

export default function AuthSecurityAuditPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Auth & Security — Audit"
        description="Logging of security-relevant actions—DSP execution, authentication events, API usage—for traceability, incident response, and debugging."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">Auth & Security Layer / Audit</p>

      <DocsScopeBlocks links={AUTH_SECURITY_SUBPAGE_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]}>
          <DocsOverviewBlock
            intro="When something breaks or is abused, audit trails answer whether credentials were used correctly and which workspace initiated work. This layer documents the minimum event set and how it ties identities to actions without duplicating QAgent or DSP internals."
            areasTitle="Why audit belongs here"
            areas={[
              "Links session identity to API and job outcomes.",
              "Supports debugging permission and limit issues with less guesswork.",
              "Feeds security monitoring without replacing product metrics.",
            ]}
            outOfScope="Log storage vendor selection and legal hold procedures."
            relatedBoundaries={["API protection produces allow/deny decisions worth logging; Data security scope appears in workspace fields on events."]}
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
              { href: "/docs/auth-security/api-protection", title: "API protection", description: "Where denials occur." },
              { href: "/docs/auth-security/session", title: "Session", description: "Actor context for events." },
              { href: "/docs/auth-security", title: "Auth & Security overview", description: "Layer entry point." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
