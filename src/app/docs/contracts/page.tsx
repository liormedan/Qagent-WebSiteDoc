import { DocsContent } from "@/components/layout/DocsContent";
import { DocsInThisPageNav } from "@/components/ui/DocsInThisPageNav";
import { DocsOverviewBlock } from "@/components/ui/DocsOverviewBlock";
import { DocsRelatedDocs } from "@/components/ui/DocsRelatedDocs";
import { DocsScopeBlocks } from "@/components/ui/DocsScopeBlocks";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import {
  CONTRACTS_EVENT_ENVELOPE_SCHEMA,
  CONTRACTS_LAYER_SPEC_VERSION,
  CONTRACTS_TYPES_REGISTRY,
  CONTRACTS_VALIDATION_STRATEGY,
  CONTRACTS_VERSIONING_RULES,
} from "@/lib/contracts-layer-spec";
import { CONTRACT_RUNTIME_TRACE_EXPORT, CONTRACT_RUNTIME_TRACE_ROWS, contractTraceDomId } from "@/lib/contract-runtime-trace";
import { CONTRACTS_LAYER_SCOPE_LINKS } from "@/lib/docs-scope-links";

const typesJson = JSON.stringify(CONTRACTS_TYPES_REGISTRY, null, 2);
const eventJson = JSON.stringify(CONTRACTS_EVENT_ENVELOPE_SCHEMA, null, 2);
const versioningJson = JSON.stringify(CONTRACTS_VERSIONING_RULES, null, 2);
const validationJson = JSON.stringify(CONTRACTS_VALIDATION_STRATEGY, null, 2);
const traceJson = JSON.stringify(CONTRACT_RUNTIME_TRACE_EXPORT, null, 2);

export default function ContractsLayerPage() {
  return (
    <DocsContent>
      <PageTitle
        title="Contracts Layer"
        description="Cross-layer interface index: contract ids, event envelope schema, versioning rules, validation gates, and machine-derived contract_id→R→V traceability. Authoritative payloads remain in linked layer specs."
      />
      <p className="mt-2 text-xs uppercase tracking-[0.08em] text-slate-400">WaveQ / Cross-layer</p>

      <DocsScopeBlocks links={CONTRACTS_LAYER_SCOPE_LINKS} />

      <div className="mt-5 flex flex-col gap-5">
        <SectionBlock id="overview" title="Overview" body={[]} summaryPreview="Registry and schemas only; no runtime behavior.">
          <DocsOverviewBlock
            intro="This hub lists interface identifiers and JSON artifacts consumed by validators. Semantics and ownership live at the authority_href targets; this page does not redefine them."
            areasTitle="Scope"
            areas={[
              "Maps Client, QAgent, API, and DSP boundaries to contract_id keys.",
              "Pins envelope and versioning JSON for tooling; drift requires bumping CONTRACTS_LAYER_SPEC_VERSION in src/lib/contracts-layer-spec.ts.",
              "Registry lists allowed_direction_values (closed set) and optional authority_section hints for navigation inside authority pages—sections are doc anchors, not executable routes.",
            ]}
            outOfScope="Business rules, orchestration algorithms, UI flows, and persistence DDL."
            relatedBoundaries={["Schema Registry = registered artifact types.", "Layer pages = payload authority for each contract_id."]}
          />
        </SectionBlock>

        <SectionBlock id="in-this-page" title="In this page" body={[]}>
          <DocsInThisPageNav
            items={[
              { title: "Overview", subtitle: "Hub role.", href: "#overview" },
              { title: "Contract types", subtitle: "Registry JSON.", href: "#contract-types" },
              { title: "Event contracts", subtitle: "Envelope schema.", href: "#event-contracts" },
              { title: "Versioning rules", subtitle: "Compatibility JSON.", href: "#versioning-rules" },
              { title: "Validation strategy", subtitle: "Stage gates JSON.", href: "#validation-strategy" },
              { title: "Contract traceability", subtitle: "contract_id → R → V.", href: "#contract-traceability" },
              { title: "Related docs", subtitle: "Authorities.", href: "#related-docs" },
            ]}
          />
        </SectionBlock>

        <SectionBlock id="contract-types" title="Contract types" body={[]}>
          <p className="mb-2 text-xs font-mono text-slate-500">spec_version={CONTRACTS_LAYER_SPEC_VERSION}</p>
          <pre className="max-h-[min(70vh,480px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{typesJson}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="event-contracts" title="Event contracts" body={[]}>
          <pre className="max-h-[min(70vh,520px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{eventJson}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="versioning-rules" title="Versioning rules" body={[]}>
          <pre className="max-h-[min(70vh,420px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{versioningJson}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="validation-strategy" title="Validation strategy" body={[]}>
          <pre className="max-h-[min(70vh,480px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{validationJson}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="contract-traceability" title="Contract traceability" body={[]}>
          <p className="mb-3 text-sm leading-6 text-[var(--muted)]">
            Each registry <span className="font-mono text-slate-200">contract_id</span> maps to the R steps where the spine lists it, and to validation stages{" "}
            <span className="font-mono text-slate-200">V01–V05</span> defined in the JSON above. Stage semantics are authoritative only in{" "}
            <span className="font-mono text-xs text-slate-400">CONTRACTS_VALIDATION_STRATEGY</span>.
          </p>
          <div className="overflow-x-auto rounded-md border border-[var(--border)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-[var(--border)] bg-slate-950/60 text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">contract_id</th>
                  <th className="px-3 py-2">runtime_steps (R)</th>
                  <th className="px-3 py-2">validation_stages (V)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]/80 text-slate-200">
                {CONTRACT_RUNTIME_TRACE_ROWS.map((row) => (
                  <tr key={row.contract_id} id={contractTraceDomId(row.contract_id)} className="scroll-mt-28 bg-slate-950/30">
                    <td className="px-3 py-2 font-mono text-xs text-emerald-100/90">{row.contract_id}</td>
                    <td className="px-3 py-2 font-mono text-xs text-cyan-100/90">{row.runtime_steps.join(", ")}</td>
                    <td className="px-3 py-2 font-mono text-xs text-slate-300">{row.validation_stages.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs font-mono text-slate-500">machine: contract_runtime_trace</p>
          <pre className="mt-2 max-h-[min(50vh,360px)] overflow-auto rounded-md border border-[var(--border)] bg-slate-950/80 p-3 text-xs leading-relaxed text-emerald-100/90">
            <code>{traceJson}</code>
          </pre>
        </SectionBlock>

        <SectionBlock id="related-docs" title="Related docs" body={[]}>
          <DocsRelatedDocs
            links={[
              { href: "/docs/system-runtime", title: "System runtime", description: "R spine (contract_ids per step)." },
              { href: "/docs/events-map", title: "Events map", description: "E01–E12 vs R." },
              { href: "/docs/system", title: "System overview", description: "Layer placement." },
              { href: "/docs/architecture/contracts/schema-registry", title: "Schema Registry", description: "Registered types authority." },
              { href: "/docs/client/event-contract", title: "Client event contract", description: "Envelope consumer rules." },
              { href: "/docs/api", title: "API Server Layer", description: "Execution ingress contracts." },
              { href: "/docs/dsp-layer/contracts", title: "DSP contracts", description: "Processing handoff payloads." },
              { href: "/docs/q-agent", title: "QAgent Layer", description: "Planning-side interfaces." },
            ]}
          />
        </SectionBlock>
      </div>
    </DocsContent>
  );
}
