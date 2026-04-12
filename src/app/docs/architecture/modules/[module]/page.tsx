import { notFound } from "next/navigation";
import { ARCHITECTURE_MODULE_SCOPE_LINKS } from "@/lib/docs-scope-links";
import {
  buildModuleDetailsItems,
  moduleConfigs,
  moduleEntries,
  type ModuleKey,
} from "@/lib/architecture-module-registry";
import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

export function generateStaticParams() {
  return moduleEntries.filter(([key]) => key !== "files-handler").map(([module]) => ({ module }));
}

export default async function ArchitectureModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const config = moduleConfigs[module as ModuleKey];

  if (!config) {
    notFound();
  }

  const detailsItems = buildModuleDetailsItems(config.details, module);

  return (
    <DocsTemplatePage
      title={config.title}
      description={config.description}
      sectionPath={["QAgent", "Architecture", "Modules", config.title]}
      scopeLinks={ARCHITECTURE_MODULE_SCOPE_LINKS}
      overviewIntro={config.overviewIntro}
      overviewAreasTitle="Module areas"
      overviewAreas={config.overviewAreas}
      outOfScope={config.outOfScope}
      relatedBoundaries={config.relatedBoundaries}
      navItems={[
        { title: "Overview", subtitle: "Module scope and boundaries.", href: "#overview" },
        { title: "Module Diagram", subtitle: "Internal module structure.", href: "#diagram" },
        { title: "Module Details", subtitle: "Responsibilities and constraints.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Module Diagram"
      diagram={{
        mode: "structure",
        root: config.diagram.root,
        groups: config.diagram.groups,
      }}
      detailsTitle="Module Details"
      detailsItems={detailsItems}
      relatedDocs={config.relatedDocs}
    />
  );
}
