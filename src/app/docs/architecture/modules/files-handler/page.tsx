import { ARCHITECTURE_MODULE_SCOPE_LINKS } from "@/lib/docs-scope-links";
import { buildModuleDetailsItems, moduleConfigs } from "@/lib/architecture-module-registry";
import { FilesHandlerModuleDiagram } from "@/components/ui/FilesHandlerModuleDiagram";
import { DocsTemplatePage } from "@/components/ui/DocsTemplatePage";

export default function FilesHandlerArchitectureModulePage() {
  const config = moduleConfigs["files-handler"];
  const detailsItems = buildModuleDetailsItems(config.details, "files-handler");

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
        { title: "Module Diagram", subtitle: "Internal module structure.", href: "#diagram" },
        { title: "Overview", subtitle: "Module scope and boundaries.", href: "#overview" },
        { title: "Module Details", subtitle: "Responsibilities and constraints.", href: "#details" },
        { title: "Related Docs", subtitle: "Canonical references.", href: "#related-docs" },
      ]}
      diagramTitle="Module Diagram"
      diagramSlot={<FilesHandlerModuleDiagram />}
      detailsTitle="Module Details"
      detailsItems={detailsItems}
      relatedDocs={config.relatedDocs}
      diagramPlacement="afterScope"
      detailsSummaryVariant="reference"
    />
  );
}
