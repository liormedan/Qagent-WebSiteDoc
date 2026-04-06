import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { DocsContent } from "@/components/layout/DocsContent";
import { DiagramComponentsAccordion } from "@/components/ui/DiagramComponentsAccordion";
import { LlmInterfaceDiagram } from "@/components/ui/LlmInterfaceDiagram";
import { PageTitle } from "@/components/ui/PageTitle";
import { QCoreInternalDiagram } from "@/components/ui/QCoreInternalDiagram";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("qcore");

export default function QCorePage() {
  if (!page) return null;
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
              <h2 className="text-base font-semibold md:text-lg">Architecture Diagram</h2>
              <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
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
                <Image
                  src="/qcore-architecture-circle.png"
                  alt="QCore central architecture diagram"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <details className="group/details rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
                  <span>Diagram Components</span>
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open/details:rotate-180" />
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

