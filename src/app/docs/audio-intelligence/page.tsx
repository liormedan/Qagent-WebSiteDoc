import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("audio-intelligence");

export default function AudioIntelligencePage() {
  if (!page) return null;
  return (
    <DocsContent>
      <PageTitle title={page.title} description={page.description} />
      <div className="flex flex-col gap-5">
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body} />
        ))}
      </div>
    </DocsContent>
  );
}

