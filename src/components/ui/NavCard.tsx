import { Card, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  href: string;
};

export function NavCard({ title, description, href }: Props) {
  return (
    <Card.Root
      asChild
      bg="panel"
      borderColor="border"
      borderWidth="1px"
      _hover={{ borderColor: "accent", transform: "translateY(-1px)" }}
      transition="all 0.2s ease"
    >
      <Link href={href}>
        <Card.Body>
          <Heading size="sm" mb={2}>
            {title}
          </Heading>
          <Text color="muted">{description}</Text>
        </Card.Body>
      </Link>
    </Card.Root>
  );
}