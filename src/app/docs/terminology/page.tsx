import Link from "next/link";
import { TerminologyGlossaryEntriesList } from "@/components/docs/TerminologyGlossaryEntriesList";
import { TerminologyLocalSearch } from "@/components/docs/TerminologyLocalSearch";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  DOCS_GLOSSARY,
  terminologyEndToEndLayerEntries,
  terminologyEntriesForScopeSection,
  terminologySystemEntries,
  type GlossaryScope,
} from "@/lib/docs-glossary";
import { TERMINOLOGY_ENTRIES, TERMINOLOGY_REGISTRY_EXPORT, TERMINOLOGY_REGISTRY_VERSION } from "@/lib/terminology-registry";

import { TERMINOLOGY_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(TERMINOLOGY_REGISTRY_EXPORT, null, 2);

const SCOPE_SECTION_TITLES: Record<GlossaryScope, string> = {
  system: "System-level concepts",
  "end-to-end": "End-to-end layer concepts",
  client: "Client concepts",
  contracts: "Contracts & schemas",
  qagent: "QAgent concepts",
  other: "Other",
};

const EXTRA_SCOPE_ORDER: readonly Exclude<GlossaryScope, "system" | "end-to-end">[] = ["client", "contracts", "qagent", "other"] as const;

export default function TerminologyPage() {
  const systemEntries = terminologySystemEntries();
  const e2eEntries = terminologyEndToEndLayerEntries();
  const extraScopeSections = EXTRA_SCOPE_ORDER.filter((s) => terminologyEntriesForScopeSection(s).length > 0).map((scope) => ({
    scope,
    entries: terminologyEntriesForScopeSection(scope),
  }));

  const inPageItems = [
    { title: "Search this glossary", subtitle: "Find rows on this page.", href: "#local-glossary-search" },
    { title: "Overview", subtitle: "What this page is.", href: "#overview" },
    { title: SCOPE_SECTION_TITLES.system, subtitle: `${systemEntries.length} entries.`, href: "#system" },
    { title: SCOPE_SECTION_TITLES["end-to-end"], subtitle: `${e2eEntries.length} entries.`, href: "#end-to-end" },
    ...extraScopeSections.map(({ scope, entries }) => ({
      title: SCOPE_SECTION_TITLES[scope],
      subtitle: `${entries.length} entries.`,
      href: `#${scope}`,
    })),
    { title: "Sentence registry", subtitle: "Short definitions table.", href: "#sentence-registry" },
    { title: "Machine export", subtitle: "JSON.", href: "#machine-export" },
    { title: "Related docs", subtitle: "Hubs.", href: "#related-docs" },
  ];

  return (
    <DocsContent>
      <PageTitle
        title="Terminology"
        description="Canonical index of doc glossary terms: labels, aliases, kinds, scopes, and authority hrefs from DOCS_GLOSSARY. Sentence-level rows remain in the registry table below."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Cross-layer</p>

      <section
        id="local-glossary-search"
        className="mt-5 scroll-mt-[5.5rem]"
        aria-labelledby="terminology-local-search-heading"
      >
        <TerminologyLocalSearch pool={DOCS_GLOSSARY} />
      </section>

      <DocsScopeBlocks links={TERMINOLOGY_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Index + registry; normative prose stays on targets.">
          <DocsOverviewBlock
            intro="This page lists every entry in src/lib/docs-glossary.ts (DOCS_GLOSSARY): the canonical href for inline autolinking, optional Sources (where prose defines or evidences the term), Related cross-links, and the scopes that activate each phrase. System-level lists all global pilot terms; End-to-end lists only layer-native E2E chapters. It is not a full prose dictionary—open the linked pages for full rules."
            areasTitle="How to use"
            areas={[
              "Use Search this glossary to jump to a row by label, alias, tag, or description snippet.",
              "Each row has a stable id term-{entry.id} for in-page anchors (e.g. #term-system-runtime).",
              "Aliases are alternate surface strings matched by AutoLinkedText (first mention, longest phrase, no backticks).",
            ]}
            outOfScope="Long definitions and API field catalogs (see target docs)."
            relatedBoundaries={["authority-map: href conflicts.", "contracts hub: contract_id registry."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav items={inPageItems} />
        </SectionBlock>

        <SectionBlock id="system" title={SCOPE_SECTION_TITLES.system} body={[]} summaryPreview={`${systemEntries.length} glossary entries (A–Z).`}>
          <TerminologyGlossaryEntriesList entries={systemEntries} />
        </SectionBlock>

        <SectionBlock id="end-to-end" title={SCOPE_SECTION_TITLES["end-to-end"]} body={[]} summaryPreview={`${e2eEntries.length} glossary entries (A–Z).`}>
          <TerminologyGlossaryEntriesList entries={e2eEntries} />
        </SectionBlock>

        {extraScopeSections.map(({ scope, entries }) => (
          <SectionBlock key={scope} id={scope} title={SCOPE_SECTION_TITLES[scope]} body={[]} summaryPreview={`${entries.length} glossary entries (A–Z).`}>
            <TerminologyGlossaryEntriesList entries={entries} />
          </SectionBlock>
        ))}

        <SectionBlock id="sentence-registry" title="Sentence registry" body={[]} summaryPreview="TERMINOLOGY_ENTRIES (orienting one-liners).">
          <p className="mb-2 text-xs font-mono text-slate-500">registry_version={TERMINOLOGY_REGISTRY_VERSION}</p>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[780px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">term</th>
                  <th className="px-3 py-2">definition</th>
                  <th className="px-3 py-2">authority_href</th>
                  <th className="px-3 py-2">glossary row</th>
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
                    <td className="px-3 py-2 font-mono text-[11px] text-slate-400">
                      {row.glossaryEntryId ? (
                        <Link className="text-emerald-200/85 hover:underline" href={`/docs/terminology#term-${row.glossaryEntryId}`}>
                          #term-{row.glossaryEntryId}
                        </Link>
                      ) : (
                        "—"
                      )}
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
