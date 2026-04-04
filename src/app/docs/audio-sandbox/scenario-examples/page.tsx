import { Stack } from "@chakra-ui/react";
import { DocsContent } from "@/components/layout/DocsContent";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("audio-sandbox/scenario-examples");

export default function AudioSandboxScenarioExamplesPage() {
  if (!page) return null;
  return (
    <DocsContent>
      <PageTitle title={page.title} description={page.description} />
      <Stack gap={5}>
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body} />
        ))}
      </Stack>
    </DocsContent>
  );
}