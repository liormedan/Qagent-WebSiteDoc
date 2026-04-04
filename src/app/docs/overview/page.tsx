import { Link as ChakraLink, List, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { DocsContent } from "@/components/layout/DocsContent";
import { CodeExample } from "@/components/ui/CodeExample";
import { PageTitle } from "@/components/ui/PageTitle";
import { SectionBlock } from "@/components/ui/SectionBlock";
import { getDocPage } from "@/lib/docs";

const page = getDocPage("overview");

export default function OverviewPage() {
  if (!page) {
    return null;
  }

  return (
    <DocsContent>
      <PageTitle title={page.title} description={page.description} />
      <Stack gap={5}>
        {page.sections.map((section) => (
          <SectionBlock key={section.title} title={section.title} body={section.body}>
            {section.code ? <CodeExample code={section.code} /> : null}
          </SectionBlock>
        ))}

        <SectionBlock
          title="Recommended Read Order"
          body={["Read in this order to move from conceptual spec to implementation planning."]}
        >
          <List.Root as="ol" ps={5} gap={1}>
            <List.Item>
              <ChakraLink asChild color="accent">
                <Link href="/docs/contracts">/docs/contracts</Link>
              </ChakraLink>
            </List.Item>
            <List.Item>
              <ChakraLink asChild color="accent">
                <Link href="/docs/reasoning-system">/docs/reasoning-system</Link>
              </ChakraLink>
            </List.Item>
            <List.Item>
              <ChakraLink asChild color="accent">
                <Link href="/docs/state-machine">/docs/state-machine</Link>
              </ChakraLink>
            </List.Item>
            <List.Item>
              <ChakraLink asChild color="accent">
                <Link href="/docs/implementation-map">/docs/implementation-map</Link>
              </ChakraLink>
            </List.Item>
            <List.Item>
              <ChakraLink asChild color="accent">
                <Link href="/docs/function-contracts">/docs/function-contracts</Link>
              </ChakraLink>
            </List.Item>
          </List.Root>
        </SectionBlock>
      </Stack>
    </DocsContent>
  );
}