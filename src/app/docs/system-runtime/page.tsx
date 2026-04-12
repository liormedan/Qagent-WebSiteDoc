import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { contractTraceDomId } from "@/lib/contract-runtime-trace";
import { SYSTEM_RUNTIME_SPINE, SYSTEM_RUNTIME_SPINE_EXPORT } from "@/lib/system-runtime-spine";

import { SYSTEM_RUNTIME_SCOPE_LINKS } from "@/lib/docs-scope-links";

const machineExport = JSON.stringify(SYSTEM_RUNTIME_SPINE_EXPORT, null, 2);

export default function SystemRuntimePage() {
  return (
    <DocsContent>
      <PageTitle
        title="System runtime"
        description="Numbered cross-layer product runtime spine (R01–R12). Step bodies are anchors and authority hrefs only; semantics live at targets."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Cross-layer</p>

      <DocsScopeBlocks links={SYSTEM_RUNTIME_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Abstraction level: full product path, not HTTP security micro-order.">
          <DocsOverviewBlock
            intro="This page is the sole numbered authority for cross-layer product runtime order from Client through persistence and back. It does not replace the Auth HTTP spine (parallel invariant below) or the narrative system-flow diagram page."
            areasTitle="Abstraction boundaries"
            areas={[
              "R01–R12: product lifecycle across Client, QAgent, API, DSP, Data, Versioning.",
              "Auth spine (S/B ids): applies only to protected HTTP and bootstrap; see /docs/auth-security/system-flow.",
              "/docs/system-flow: narrative and diagram; does not assign R ids.",
            ]}
            outOfScope="Module algorithms, UI layout, and infrastructure tuning."
            relatedBoundaries={[
              "authority-map: which href wins when domains overlap.",
              "contracts hub: interface registry + contract→R→V trace table, not this ordering.",
            ]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Abstraction levels.", href: "#overview" },
              { title: "Runtime spine", subtitle: "R01–R12, authority + contract_id links.", href: "#runtime-spine" },
              { title: "Machine export", subtitle: "JSON.", href: "#machine-export" },
              { title: "Related docs", subtitle: "Authorities.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="runtime-spine" title="Runtime spine" body={[]}>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-6 text-slate-200">
            {SYSTEM_RUNTIME_SPINE.map((s) => (
              <li key={s.id} id={s.id} className="scroll-mt-28">
                <span className="font-mono text-xs text-cyan-200/90">{s.id}</span>
                <p className="mt-1 font-medium text-slate-100">{s.anchor}</p>
                <p className="mt-1 text-xs text-slate-400">
                  authority:{" "}
                  <Link className="font-mono text-[var(--accent)] hover:underline" href={s.authority_href}>
                    {s.authority_href}
                  </Link>
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  contracts:{" "}
                  {s.contract_ids.map((cid, i) => (
                    <span key={cid}>
                      {i > 0 ? " · " : null}
                      <Link className="font-mono text-[var(--accent)] hover:underline" href={`/docs/contracts#${contractTraceDomId(cid)}`}>
                        {cid}
                      </Link>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs font-mono text-slate-500">
            parallel_invariant: {SYSTEM_RUNTIME_SPINE_EXPORT.parallel_invariant.id} ·{" "}
            <Link className="text-[var(--accent)] hover:underline" href={SYSTEM_RUNTIME_SPINE_EXPORT.parallel_invariant.href}>
              {SYSTEM_RUNTIME_SPINE_EXPORT.parallel_invariant.href}
            </Link>
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Full contract_id → R → V matrix:{" "}
            <Link className="text-[var(--accent)] hover:underline" href="/docs/contracts#contract-traceability">
              /docs/contracts#contract-traceability
            </Link>
            . Event-plane alignment:{" "}
            <Link className="text-[var(--accent)] hover:underline" href="/docs/events-map">
              /docs/events-map
            </Link>
            .
          </p>
        </SectionBlock>

        <SectionBlock id="machine-export" title="Machine export" body={[]}>
          <pre className="max-h-[min(70vh,480px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{machineExport}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/authority-map", title: "Authority map", description: "Canonical href per domain." },
              { href: "/docs/system-flow", title: "End-to-end system flow", description: "Narrative and diagram." },
              { href: "/docs/auth-security/system-flow", title: "Auth system flow", description: "S and B spine ids." },
              { href: "/docs/contracts", title: "Contracts Layer", description: "Interface registry and traceability." },
              { href: "/docs/events-map", title: "Events map", description: "E01–E12 vs R spine." },
              { href: "/docs/terminology", title: "Terminology", description: "Glossary." },
              { href: "/docs/system", title: "System overview", description: "Layer map." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
