import Link from "next/link";
import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";
import { CANONICAL_CONCEPT_REGISTRY } from "@/lib/docs/concept-registry";

const systemConcepts = CANONICAL_CONCEPT_REGISTRY.filter((item) => item.owned_by === "System");
const qagentConcepts = CANONICAL_CONCEPT_REGISTRY.filter((item) => item.owned_by === "QAgent Layer");
const apiConcepts = CANONICAL_CONCEPT_REGISTRY.filter((item) => item.owned_by === "API Server Layer");

const conceptDetails = [
  {
    id: "registry-purpose",
    title: "Registry Purpose",
    subtitle: "Canonical concept ownership",
    purpose: "Define one canonical location and one owner for each system concept.",
    defines: ["single source-of-truth per concept", "ownership clarity by layer", "cross-page terminology consistency"],
    doesNotDefine: "new architecture modules or runtime behavior changes.",
    href: "/docs/concepts",
    linkLabel: "Canonical page",
  },
  {
    id: "qagent-concepts",
    title: "QAgent Concept Set",
    subtitle: "Reasoning and planning vocabulary",
    purpose: "Define canonical terms used by QAgent pages and subpages.",
    defines: qagentConcepts.slice(0, 4).map((item) => `${item.concept}: ${item.description}`),
    doesNotDefine: "API execution contract semantics.",
    href: "/docs/q-agent",
    linkLabel: "Related section",
  },
  {
    id: "api-concepts",
    title: "API Concept Set",
    subtitle: "Execution and lifecycle vocabulary",
    purpose: "Define canonical terms used for API runtime and lifecycle pages.",
    defines: apiConcepts.slice(0, 4).map((item) => `${item.concept}: ${item.description}`),
    doesNotDefine: "QAgent intent-to-plan semantics.",
    href: "/docs/api",
    linkLabel: "Related section",
  },
  {
    id: "system-concepts",
    title: "System Concept Set",
    subtitle: "Cross-layer system vocabulary",
    purpose: "Define canonical cross-layer terminology used throughout system-level docs.",
    defines: systemConcepts.slice(0, 3).map((item) => `${item.concept}: ${item.description}`),
    doesNotDefine: "deep module-level implementation details.",
    href: "/docs/system",
    linkLabel: "Related section",
  },
];

export default function ConceptsPage() {
  return (
    <DocsTemplatePage
      title="Concept Registry"
      description="Canonical concept map for WaveQ terminology ownership and source-of-truth routing."
      sectionPath={["QAgent", "Concept Registry"]}
      covers="canonical concept names, ownership boundaries, and authoritative concept locations."
      doesNotCover="module implementation logic or runtime execution behavior."
      overviewIntro="Concept Registry is the terminology authority layer that prevents naming drift across the WaveQ documentation system."
      overviewAreasTitle="Registry areas"
      overviewAreas={["system-level vocabulary", "QAgent term ownership", "API term ownership", "canonical page mapping"]}
      outOfScope="Creating new architectural semantics outside existing canonical pages."
      relatedBoundaries={[
        "Concept Registry = terminology authority.",
        "QAgent pages = reasoning/planning definitions.",
        "API pages = execution/lifecycle definitions.",
        "System page = cross-layer structure definitions.",
      ]}
      navItems={[
        { title: "Overview", subtitle: "Registry role and boundaries.", href: "#overview" },
        { title: "Concept Diagram", subtitle: "Ownership groups.", href: "#diagram" },
        { title: "Concept Details", subtitle: "Canonical concept sets.", href: "#details" },
        { title: "Related Docs", subtitle: "Concept source pages.", href: "#related-docs" },
      ]}
      diagramTitle="Concept Diagram"
      diagram={{
        mode: "structure",
        root: "WaveQ Concepts",
        groups: [
          { title: "System", items: systemConcepts.slice(0, 4).map((item) => item.concept) },
          { title: "QAgent", items: qagentConcepts.slice(0, 6).map((item) => item.concept) },
          { title: "API", items: apiConcepts.slice(0, 5).map((item) => item.concept) },
        ],
      }}
      detailsTitle="Concept Details"
      detailsItems={conceptDetails}
      relatedDocs={[
        "Concept Registry = canonical naming authority.",
        "QAgent Layer = intent/plan vocabulary authority.",
        "API Server Layer = execution/job vocabulary authority.",
        "System Structure = cross-layer terminology context.",
      ]}
      relatedFooter={
        <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
          <table className="w-full min-w-[860px] text-left text-xs md:text-sm">
            <thead className="bg-slate-950/60 text-slate-200">
              <tr>
                <th className="px-3 py-2 font-semibold">Concept</th>
                <th className="px-3 py-2 font-semibold">Canonical Location</th>
                <th className="px-3 py-2 font-semibold">Owned By</th>
              </tr>
            </thead>
            <tbody>
              {CANONICAL_CONCEPT_REGISTRY.slice(0, 24).map((item) => (
                <tr key={item.concept} className="border-t border-[var(--border)] text-slate-300">
                  <td className="px-3 py-2 font-medium text-slate-100">{item.concept}</td>
                  <td className="px-3 py-2">
                    <Link href={item.canonical_page} className="text-[var(--accent)] hover:underline">
                      {item.canonical_page}
                    </Link>
                  </td>
                  <td className="px-3 py-2">{item.owned_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    />
  );
}
