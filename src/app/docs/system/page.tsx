import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { SYSTEM_DOC_SOURCE_OF_TRUTH, SYSTEM_EDGE_CASE_HANDLING, SYSTEM_ERROR_OWNERSHIP_MODEL, SYSTEM_RUNTIME_LIFECYCLE } from "@/lib/system-canonical";

const systemTree = `WaveQ
|- 1. Client / Frontend Layer
|- 2. QAgent Layer
|- 3. API Server Layer
|- 4. DSP / Processing Layer
|- 5. Data Layer
|- 6. Infrastructure Layer
|- 7. Auth & Security Layer
|- 8. End-to-End Flow`;

const sections: Array<{ title: string; href: string; description: string }> = [
  { title: "1. Client / Frontend Layer", href: "/docs/system/client-frontend-layer", description: "User-facing surfaces, interaction patterns, and runtime UX." },
  { title: "2. QAgent Layer", href: "/docs/system/qagent-layer", description: "Core agentic orchestration and layer-level logic." },
  { title: "3. API Server Layer", href: "/docs/system/api-server-layer", description: "Server-side request, orchestration, execution, and version APIs." },
  { title: "4. DSP / Processing Layer", href: "/docs/system/dsp-processing-layer", description: "Audio processing and execution-oriented compute paths." },
  { title: "5. Data Layer", href: "/docs/system/data-layer", description: "Schemas, lineage, records, and persistence-facing structures." },
  { title: "6. Infrastructure Layer", href: "/docs/system/infrastructure-layer", description: "Runtime platform, deployment, and implementation baseline surfaces." },
  { title: "7. Auth & Security Layer", href: "/docs/system/auth-security-layer", description: "Isolation, access boundaries, and protection controls." },
  { title: "8. End-to-End Flow", href: "/docs/system/end-to-end-flow", description: "High-level cross-layer path from request to final output." },
];

export default function SystemPage() {
  return (
    <DocsContent>
      <PageTitle title="WaveQ System Structure" description="This page presents the full architecture of WaveQ as a unified system." />

      <div className="flex flex-col gap-5">
        <section className="rounded-md border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-xs leading-5 text-cyan-100 md:text-sm">
          Primary entry point: <span className="font-semibold">/docs/system</span>
          <br />
          Use this page as the single system map.
        </section>

        <section className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs leading-5 text-emerald-100 md:text-sm">
          Canonical system-level definitions are locked here.
          <br />
          Source of truth: <span className="font-semibold">{SYSTEM_DOC_SOURCE_OF_TRUTH.canonicalLocation}</span>
        </section>

        <SectionBlock title="System Tree" body={[]} collapsible>
          <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{systemTree}</pre>
        </SectionBlock>

        {sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={[section.description]} collapsible>
            <Link href={section.href} className="inline-block text-sm font-medium text-[var(--accent)] hover:underline">
              Open Layer Entry
            </Link>
          </SectionBlock>
        ))}

        <SectionBlock
          title="System Edge Case Handling"
          body={["Canonical system-level handling ownership and behavior for required edge conditions."]}
          collapsible
        >
          <div className="space-y-3">
            {SYSTEM_EDGE_CASE_HANDLING.map((item) => (
              <div key={item.edgeCase} className="rounded-md border border-[var(--border)] bg-slate-950/30 p-3 text-sm">
                <p className="font-semibold text-slate-100">{item.edgeCase}</p>
                <p className="text-[var(--muted)]">Handling layer: {item.handlingLayer}</p>
                <p className="text-[var(--muted)]">System behavior: {item.systemBehavior}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock title="System Error Ownership Model" body={["Single canonical ownership table with no duplicate authority."]} collapsible>
          <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-200">
                <tr>
                  <th className="px-3 py-2 font-semibold">Error Type</th>
                  <th className="px-3 py-2 font-semibold">Owning Layer</th>
                </tr>
              </thead>
              <tbody>
                {SYSTEM_ERROR_OWNERSHIP_MODEL.map((row) => (
                  <tr key={row.errorType} className="border-t border-[var(--border)] text-slate-300">
                    <td className="px-3 py-2">{row.errorType}</td>
                    <td className="px-3 py-2">{row.owningLayer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock title="System Runtime Lifecycle (Canonical)" body={["Defined once here and referenced elsewhere without redefinition."]} collapsible>
          <p className="rounded-md border border-[var(--border)] bg-slate-950/40 p-4 text-sm text-slate-200">{SYSTEM_RUNTIME_LIFECYCLE}</p>
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
