import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { DocsContent } from "@/components/layout/DocsContent";
import { NavCard } from "@/components/ui/NavCard";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getNavigationBySection, getNavigationSections } from "@/lib/navigation";

export default function DocsIndexPage() {
  const sections = getNavigationSections();

  return (
    <DocsContent>
      <PageTitle
        title="WaveQ Documentation"
        description="Spec, Design, and Audio Sandbox layers for Q engineering planning."
      />
      <SectionBlock
        title="Q Operational Flow"
        body={[
          "User Input -> Context Assembly -> Intent Detection -> Reasoning/Clarification -> Planning -> Safety -> DAL Generation -> Validation -> Execution Handoff",
          "Audio Sandbox supports query and analysis before planning or execution decisions.",
        ]}
      />

      {sections.map((section) => {
        const items = getNavigationBySection(section);
        return (
          <Stack gap={4} mt={8} key={section}>
            <Heading size="md">{section}</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              {items.map((item) => (
                <NavCard
                  key={item.href}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  section={item.section}
                  icon={item.icon}
                />
              ))}
            </SimpleGrid>
          </Stack>
        );
      })}
    </DocsContent>
  );
}