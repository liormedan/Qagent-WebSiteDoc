import Image from "next/image";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/layout/DocsContent";
import { DiagramComponentsAccordion } from "@/components/ui/DiagramComponentsAccordion";
import FilesHandlerDiagram from "@/components/ui/FilesHandlerDiagram";
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

const filesHandlerOverviewBody = [
  "### Overview",
  "The Files Handler is the input gateway for file-driven workflows in QAgent.",
  "It receives uploads, links, and session-based file references, then validates, normalizes, and prepares all files before analysis.",
  "This is the first operational step after QCore initialization in file-based flows.",
  "### Module Type",
  "Input Processing Layer (File Ingestion & Preparation).",
  "### Purpose",
  "Accept files from multiple sources, enforce integrity/format validation, normalize structure, organize file records, and provide clean references for downstream modules.",
  "### Position in System Flow",
  "QAgent Core -> Files Handler -> Analyzer. Files Handler is the first operational module after input.",
  "### Internal Structure",
  "Input Gateway: supports local uploads, drag & drop, external links, and previously stored files.",
  "File Validator: checks type, size, format compatibility, and integrity/corruption.",
  "File Normalizer: converts file input into internal representation, unifies metadata, and enforces consistent structure.",
  "File Metadata Extractor: extracts file name, format, size, and audio properties (duration/sample rate) when relevant.",
  "File Storage Manager: assigns file IDs, manages storage location, and creates access references.",
  "File Registry: maintains active session files, processed files, and file relationship mappings.",
  "### Flow",
  "User Input (File) -> Input Gateway -> File Validator -> File Normalizer -> Metadata Extractor -> Storage Manager -> File Registry -> QCore / Analyzer.",
  "### Inputs",
  "File upload, file link, existing file reference, and user-triggered file selection.",
  "### Outputs",
  "Validated file object, normalized file structure, extracted metadata, file reference ID, and storage location.",
  "### Control Boundary",
  "Critical boundary: Files Handler does not analyze content and does not execute processing. It only prepares files for safe system use.",
  "### System Behavior",
  "Ensures every file is validated before use, normalized into consistent format, assigned stable references, and blocked from downstream modules if invalid.",
  "### Non Responsibilities",
  "Does not perform analysis, interpret content, generate UI, execute DSP, or make decisions.",
  "### Failure Handling",
  "Invalid file -> reject. Unsupported format -> notify. Corrupted file -> block processing. Missing metadata -> fallback extraction.",
  "### Architectural Summary",
  "Files Handler is the input gateway of QAgent, responsible for receiving, validating, organizing, and preparing files for downstream processing while preserving integrity and consistency.",
  "### Validation",
  "{\"file_ingestion_defined\": true, \"validation_enforced\": true, \"normalization_complete\": true, \"metadata_extracted\": true, \"ready_for_analysis\": true}",
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
    const primarySection = page.sections.find((section) => section.title === "Main QAgent Core Structure");
    const otherSections = page.sections.filter((section) => section.title !== "Main QAgent Core Structure");

    return (
      <DocsContent>
        <PageTitle title={page.title} description={page.description} />
        <div className="flex flex-col gap-5">
          {primarySection ? (
            <SectionBlock
              key={primarySection.title}
              title={primarySection.title}
              body={primarySection.body}
              collapsible
            />
          ) : null}
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-semibold md:text-xl">Architecture Diagram</h2>
                <span className="text-slate-400 transition-transform group-open/details:rotate-180">?</span>
              </summary>
              <div className="mt-3 space-y-3">
                <p className="text-sm leading-6 text-slate-300">
                  Circle-based architecture infographic with QCore as the center node and surrounding system layers.
                </p>
                <p className="rounded-md border border-[var(--border)] bg-slate-900/50 px-3 py-2 text-xs leading-5 text-slate-300">
                  Terminology note: <span className="font-semibold text-slate-100">QAgent Core</span> is the top-level architectural scope, while
                  <span className="font-semibold text-slate-100"> QCore Engine</span> is the internal runtime component at its center.
                </p>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-slate-900/40">
                  <Image src="/qcore-architecture-circle.png" alt="QCore central architecture diagram" fill className="object-contain" priority />
                </div>
                <details className="group/details rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
                    <span>Diagram Components</span>
                    <span className="text-slate-400 transition-transform group-open/details:rotate-180">?</span>
                  </summary>
                  <div className="mt-3">
                    <DiagramComponentsAccordion />
                  </div>
                </details>
              </div>
            </details>
          </section>
          {otherSections.map((section) => (
            <SectionBlock
              key={section.title}
              title={section.title}
              body={section.body}
              childrenFirst={section.title === "QCore Engine" || section.title === "LLM Interface Layer"}
              collapsible
            >
              {section.title === "QCore Engine" ? <QCoreInternalDiagram /> : null}
              {section.title === "LLM Interface Layer" ? <LlmInterfaceDiagram /> : null}
            </SectionBlock>
          ))}
        </div>
      </DocsContent>
    );
  }

  if (module === "files-handler") {
    return (
      <DocsContent>
        <PageTitle
          title="Files Handler"
          description="Input gateway module responsible for ingestion, validation, normalization, and preparation of incoming files."
        />
        <div className="flex flex-col gap-5">
          <section className="rounded-xl bg-[var(--panel)] p-4 md:p-5">
            <details className="group/details" name="docs-primary-accordion">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
                <h2 className="text-lg font-semibold md:text-xl">Architecture Diagram</h2>
                <span className="text-slate-400 transition-transform group-open/details:rotate-180">?</span>
              </summary>
              <div className="mt-3">
                <FilesHandlerDiagram />
              </div>
            </details>
          </section>

          <SectionBlock
            title="Files Handler Overview"
            body={filesHandlerOverviewBody}
            collapsible
          />
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
