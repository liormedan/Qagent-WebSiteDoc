import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { TERMINOLOGY_ENTRIES, TERMINOLOGY_REGISTRY_EXPORT, TERMINOLOGY_REGISTRY_VERSION } from "@/lib/terminology-registry";

import { TERMINOLOGY_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(TERMINOLOGY_REGISTRY_EXPORT, null, 2);

export default function TerminologyPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Terminology"
        description="Single glossary of system terms. Each row is one sentence plus an authority href; normative text stays on the target pages."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Cross-layer</p>

      <DocsScopeBlocks links={TERMINOLOGY_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Disambiguation without duplicating specs.">
          <DocsOverviewBlock
            intro="Use this page to resolve vocabulary only. Definitions here are orienting; authority_href on each row is the normative source for full rules."
            areasTitle="Rules"
            areas={[
              "Do not copy long spec fragments into this table; extend TERMINOLOGY_ENTRIES in src/lib/terminology-registry.ts instead.",
              "When a term appears in multiple domains, authority_href points at the winning canonical page per authority-map.",
            ]}
            outOfScope="API path lists, database DDL, and UI component naming."
            relatedBoundaries={["authority-map: canonical vs supplement.", "contracts: contract_id registry."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Rules.", href: "#overview" },
              { title: "Glossary", subtitle: "Terms.", href: "#glossary-table" },
              { title: "Machine export", subtitle: "JSON.", href: "#machine-export" },
              { title: "Related docs", subtitle: "Hubs.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="glossary-table" title="Glossary" body={[]}>
          <p className="mb-2 text-xs font-mono text-slate-500">registry_version={TERMINOLOGY_REGISTRY_VERSION}</p>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">term</th>
                  <th className="px-3 py-2">definition</th>
                  <th className="px-3 py-2">authority_href</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
                {TERMINOLOGY_ENTRIES.map((row) => (
                  <tr key={row.term} className="bg-slate-950/30">
                    <td className="px-3 py-2 font-medium text-slate-100">{row.term}</td>
                    <td className="px-3 py-2 text-xs leading-6 text-[var(--muted)]">{row.definition}</td>
                    <td className="px-3 py-2 font-mono text-[11px]">
                      <Link className="text-[var(--accent)] hover:underline" href={row.authority_href}>
                        {row.authority_href}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionBlock>

        <SectionBlock id="machine-export" title="Machine export" body={[]}>
          <pre className="max-h-[min(70vh,520px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{machineExport}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/authority-map", title: "Authority map", description: "Canonical href per domain." },
              { href: "/docs/system-runtime", title: "System runtime", description: "R spine." },
              { href: "/docs/contracts", title: "Contracts hub", description: "contract_id registry." },
              { href: "/docs/events-map", title: "Events map", description: "E01–E12 phases." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
