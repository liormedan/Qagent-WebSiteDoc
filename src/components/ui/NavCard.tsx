import { Badge, Card, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { DocsSection } from "@/lib/navigation";

type Props = {
  title: string;
  description: string;
  href: string;
  section?: DocsSection;
  icon?: string;
};

export function NavCard({ title, description, href, section = "Spec", icon }: Props) {
  const isDesign = section === "Design";
  const isAudioSandbox = section === "Audio Sandbox";
  const isAudioComparison = section === "Audio Comparison";

  return (
    <Card.Root
      asChild
      bg={isDesign ? "gray.900" : isAudioSandbox ? "gray.950" : isAudioComparison ? "gray.900" : "panel"}
      borderColor={isDesign ? "cyan.700" : isAudioSandbox ? "teal.700" : isAudioComparison ? "orange.700" : "border"}
      borderWidth="1px"
      _hover={{ borderColor: "accent", transform: "translateY(-1px)" }}
      transition="all 0.2s ease"
    >
      <Link href={href}>
        <Card.Body>
          <HStack justify="space-between" mb={2}>
            <Heading size="sm">
              {icon ? `${icon} ` : ""}
              {title}
            </Heading>
            <Badge colorPalette={isDesign ? "cyan" : isAudioSandbox ? "teal" : isAudioComparison ? "orange" : "gray"}>
              {section}
            </Badge>
          </HStack>
          <Text color="muted">{description}</Text>
        </Card.Body>
      </Link>
    </Card.Root>
  );
}
