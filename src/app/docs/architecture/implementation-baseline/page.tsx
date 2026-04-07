import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";

export default function ImplementationBaselinePage() {
  return (
    <DocsContent>
      <PageTitle
        title="Implementation Baseline"
        description="Authoritative baseline freeze for implementation: which pages are binding and which remain draft or future scope."
      />
      <div className="flex flex-col gap-5">
        <SectionBlock
          title="Architecture Diagram"
          body={[]}
          collapsible
        >
          <div className="rounded-xl border border-cyan-500/20 bg-slate-950/50 p-4">
            <div className="grid gap-2 md:grid-cols-3">
              {["Authoritative Baseline", "Implementation Allowed", "Draft / Non-authoritative"].map((item, index) => (
                <div key={item} className="text-center">
                  <div className={index === 0 ? "rounded-md border border-cyan-400/40 bg-cyan-500/10 px-2 py-2 text-xs font-semibold text-cyan-100" : "rounded-md border border-white/10 bg-slate-900/70 px-2 py-2 text-xs text-slate-200"}>
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionBlock>
        <SectionBlock
          title="Overview"
          body={[
            "This page freezes implementation authority boundaries for the current release cycle.",
            "Only pages listed under Authoritative Baseline may define implementation behavior.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Documentation Governance (Source of Truth)"
          body={[
            "Structural source of truth: rendered architecture docs under /src/app/docs/architecture/* plus /docs/system-flow.",
            "Secondary content source: /src/content/* is non-authoritative support content and may contain placeholders.",
            "Rule: if a statement in /src/content/* conflicts with /src/app/docs/architecture/*, the architecture page is authoritative.",
            "Future updates must modify authoritative architecture pages first; supporting content may then be synchronized.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Authoritative Baseline"
          body={[
            "/docs/architecture/modules/qagent-core",
            "/docs/architecture/modules/files-handler",
            "/docs/architecture/modules/analyzer",
            "/docs/architecture/modules/intent-clarification",
            "/docs/architecture/modules/dal",
            "/docs/architecture/modules/uagent",
            "/docs/architecture/modules/approval",
            "/docs/architecture/modules/dagent",
            "/docs/architecture/modules/versioning",
            "/docs/architecture/modules/versioning/version-manager",
            "/docs/architecture/modules/versioning/diff-engine",
            "/docs/architecture/contracts/schema-registry",
            "/docs/architecture/contracts/lineage-model",
            "/docs/architecture/contracts/client-qagent-id-mapping",
            "/docs/architecture/policies/failure-policy",
            "/docs/architecture/policies/control-policy-matrix",
            "/docs/architecture/policies/session-isolation",
            "/docs/architecture/approval/modify-loop-contract",
            "/docs/architecture/dagent/dsp-engine-abstraction",
            "/docs/architecture/implementation-baseline",
          ]}
          collapsible
        />
        <SectionBlock
          title="Non-authoritative Pages"
          body={[
            "Any page rendered through draft skeleton fallback in docs.ts.",
            "Future/optional pages without completed module template sections.",
            "Exploratory content that lacks explicit contract and control boundaries.",
          ]}
          collapsible
        />
        <SectionBlock
          title="Enforcement Rule"
          body={[
            "Implementation PRs must reference at least one baseline page section for requirement traceability.",
            "Draft pages cannot introduce binding implementation requirements until promoted to authoritative baseline.",
          ]}
          collapsible
        />
      </div>
    </DocsContent>
  );
}
