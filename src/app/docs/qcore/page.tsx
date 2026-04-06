import Image from "next/image";
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

  return (
    <DocsContent>
      <PageTitle title={page.title} description={page.description} />

      <section className="mb-5 rounded-xl border border-[var(--border)] bg-slate-950/30 p-4 md:p-5">
        <p className="text-lg font-semibold md:text-xl">Architecture Diagram</p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          Circle-based architecture infographic with QCore as the center node and surrounding system layers.
        </p>
        <p className="mt-2 rounded-md border border-[var(--border)] bg-slate-900/50 px-3 py-2 text-xs leading-5 text-slate-300">
          Terminology note: <span className="font-semibold text-slate-100">QAgent Core</span> is the top-level architectural scope, while
          <span className="font-semibold text-slate-100"> QCore Engine</span> is the internal runtime component at its center.
        </p>
        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--border)] bg-slate-900/40">
          <Image
            src="/qcore-architecture-circle.png"
            alt="QCore central architecture diagram"
            fill
            className="object-contain"
            priority
          />
        </div>
        <details className="group/details mt-4 rounded-lg border border-[var(--border)] bg-slate-950/40 p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-slate-100 [&::-webkit-details-marker]:hidden">
            <span>Diagram Components</span>
            <span className="text-slate-400 transition-transform group-open/details:rotate-180">▾</span>
          </summary>
          <div className="mt-3">
            <DiagramComponentsAccordion />
          </div>
        </details>
      </section>

      <div className="flex flex-col gap-5">
        {page.sections.map((section) => (
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
