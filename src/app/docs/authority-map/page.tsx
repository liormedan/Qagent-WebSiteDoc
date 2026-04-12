import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  AUTHORITY_MAP_CANONICAL_VS_SUPPLEMENT,
  AUTHORITY_MAP_ENTRIES,
  AUTHORITY_MAP_EXPORT,
  AUTHORITY_MAP_MUST_USE,
  AUTHORITY_MAP_VERSION,
} from "@/lib/authority-map";

import { AUTHORITY_MAP_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(AUTHORITY_MAP_EXPORT, null, 2);

export default function AuthorityMapPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Authority map"
        description="Single canonical href per documentation domain; supplements are non-authoritative. Resolves API narrative vs API spec tree and flow vs runtime spine."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Cross-layer</p>

      <DocsScopeBlocks links={AUTHORITY_MAP_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Eliminates dual-authority confusion without merging pages.">
          <DocsOverviewBlock
            intro="When two doc trees cover adjacent concerns, this map names exactly one canonical_href per domain. supplement hrefs are readers-only context and MUST NOT redefine ordering or payloads owned by canonical targets."
            areasTitle="Rules"
            areas={[
              "canonical_href wins for normative definitions in that domain.",
              "supplements[].href MUST defer to canonical_href for overlapping claims.",
              "Version bumps in AUTHORITY_MAP_VERSION when any canonical_href changes.",
            ]}
            outOfScope="OpenAPI generation and repository folder layout."
            relatedBoundaries={["system-runtime: R01–R12 ordering.", "auth-security/system-flow: S and B ordering."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Rules.", href: "#overview" },
              { title: "Must-use", subtitle: "Normative discipline.", href: "#must-use" },
              { title: "Canonical vs supplement", subtitle: "Definitions.", href: "#canonical-vs-supplement" },
              { title: "Table", subtitle: "Domains.", href: "#authority-table" },
              { title: "Machine export", subtitle: "JSON.", href: "#machine-export" },
              { title: "Related docs", subtitle: "Spines.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="must-use" title="Must-use rules" body={[]}>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-200">
            <li>
              <span className="font-semibold text-slate-100">resolve_canonical_first:</span>{" "}
              <span className="text-[var(--muted)]">{AUTHORITY_MAP_MUST_USE.resolve_canonical_first}</span>
            </li>
            <li>
              <span className="font-semibold text-slate-100">supplements_subordinate:</span>{" "}
              <span className="text-[var(--muted)]">{AUTHORITY_MAP_MUST_USE.supplements_subordinate}</span>
            </li>
            <li>
              <span className="font-semibold text-slate-100">global_ordering:</span>{" "}
              <span className="text-[var(--muted)]">{AUTHORITY_MAP_MUST_USE.global_ordering}</span>
            </li>
          </ul>
        </SectionBlock>

        <SectionBlock id="canonical-vs-supplement" title="Canonical vs supplement" body={[]}>
          <dl className="space-y-3 text-sm text-slate-200">
            <div>
              <dt className="font-semibold text-slate-100">canonical_href</dt>
              <dd className="mt-1 text-[var(--muted)]">{AUTHORITY_MAP_CANONICAL_VS_SUPPLEMENT.canonical_href}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-100">supplement href</dt>
              <dd className="mt-1 text-[var(--muted)]">{AUTHORITY_MAP_CANONICAL_VS_SUPPLEMENT.supplement_href}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-100">overlap_policy</dt>
              <dd className="mt-1 text-[var(--muted)]">{AUTHORITY_MAP_CANONICAL_VS_SUPPLEMENT.overlap_policy}</dd>
            </div>
          </dl>
        </SectionBlock>

        <SectionBlock id="authority-table" title="Authority table" body={[]}>
          <p className="mb-2 text-xs font-mono text-slate-500">map_version={AUTHORITY_MAP_VERSION}</p>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">domain</th>
                  <th className="px-3 py-2">canonical_href</th>
                  <th className="px-3 py-2">supplements</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
                {AUTHORITY_MAP_ENTRIES.map((row) => (
                  <tr key={row.domain} className="bg-slate-950/30">
                    <td className="px-3 py-2 font-mono text-xs text-cyan-100/90">{row.domain}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-300">{row.canonical_href}</td>
                    <td className="px-3 py-2 text-xs text-[var(--muted)]">
                      {row.supplements.length === 0
                        ? "—"
                        : row.supplements.map((s) => `${s.href} (${s.role})`).join("; ")}
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
              { href: "/docs/system-runtime", title: "System runtime", description: "R01–R12 spine." },
              { href: "/docs/system-flow", title: "System flow", description: "Narrative flow." },
              { href: "/docs/auth-security/system-flow", title: "Auth system flow", description: "Security spine." },
              { href: "/docs/contracts", title: "Contracts hub", description: "Interface registry and traceability." },
              { href: "/docs/events-map", title: "Events map", description: "E01–E12 phases." },
              { href: "/docs/terminology", title: "Terminology", description: "Glossary." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
