"use client";

import { Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation } from "@/lib/navigation";

export function DocsPager() {
  const pathname = usePathname();
  const index = docsNavigation.findIndex((item) => item.href === pathname);

  if (index < 0) {
    return null;
  }

  const previous = docsNavigation[index - 1];
  const next = docsNavigation[index + 1];

  return (
    <Flex justify="space-between" mt={10} borderTopWidth="1px" borderColor="border" pt={6} gap={4}>
      {previous ? (
        <ChakraLink asChild color="muted" _hover={{ color: "accent" }}>
          <Link href={previous.href}>? Previous: {previous.title}</Link>
        </ChakraLink>
      ) : (
        <Text color="gray.600">&nbsp;</Text>
      )}
      {next ? (
        <ChakraLink asChild color="muted" _hover={{ color: "accent" }}>
          <Link href={next.href}>Next: {next.title} ?</Link>
        </ChakraLink>
      ) : null}
    </Flex>
  );
}