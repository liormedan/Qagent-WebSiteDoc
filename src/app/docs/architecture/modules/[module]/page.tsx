import Image from "next/image";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { LlmInterfaceDiagram } from "@/components/ui/LlmInterfaceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";
import { QCoreInternalDiagram } from "@/components/ui/QCoreInternalDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const architectureModuleTitles: Record<string, string> = {
  "qagent-core": "QAgent Core",
  "files-handler": "Files Handler",
  analyzer: "Analyzer",
  "intent-clarification": "Intent + Clarification",
  dal: "DAL",
  uagent: "UAgent",
  approval: "Approval (UI-triggered, Core-enforced)",
  dagent: "DAgent",
  versioning: "Versioning",
};

const placeholderSections = [
  "Overview",
  "Purpose",
  "Core Responsibilities",
  "Inputs",
  "Outputs",
  "Dependencies",
  "Control Boundaries",
  "Operational Flow",
  "Open Items",
] as const;

export function generateStaticParams() {
  return Object.keys(architectureModuleTitles).map((module) => ({ module }));
}

export default async function ArchitectureModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const title = architectureModuleTitles[module];

  if (!title) {
    return notFound();
  }

  if (module === "qagent-core") {
    const page = getDocPage("qcore");
    if (!page) return notFound();

    return (
      <DocsContent>
        <PageTitle title={page.title} description={page.description} />
        <section className="mb-5 rounded-xl border border-[var(--border)] bg-slate-950/30 p-4 md:p-5">
          <p className="text-lg font-semibold md:text-xl">Architecture Diagram</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Circle-based architecture infographic with QCore as the center node and surrounding system layers.
          </p>
          <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-slate-900/40">
            <Image src="/qcore-architecture-circle.png" alt="QCore central architecture diagram" fill className="object-contain" priority />
          </div>
        </section>
        <div className="flex flex-col gap-5">
          {page.sections.map((section) => (
            <SectionBlock
              key={section.title}
              title={section.title}
              body={section.body}
              childrenFirst={section.title === "QCore Engine" || section.title === "LLM Interface Layer"}
              collapsible
              tocHidden={section.title === "Main QAgent Core Structure"}
            >
              {section.title === "QCore Engine" ? <QCoreInternalDiagram /> : null}
              {section.title === "LLM Interface Layer" ? <LlmInterfaceDiagram /> : null}
            </SectionBlock>
          ))}
        </div>
      </DocsContent>
    );
  }

  return (
    <DocsContent>
      <PageTitle
        title={title}
        description="Architecture placeholder page. Sections are prepared for documentation authoring."
      />
      <div className="flex flex-col gap-5">
        {placeholderSections.map((sectionTitle) => (
          <SectionBlock
            key={sectionTitle}
            title={sectionTitle}
            body={["Pending documentation content for this module."]}
            collapsible
          />
        ))}
      </div>
    </DocsContent>
  );
}
