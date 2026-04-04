"use client";

import { Flex, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavigationItemByHref } from "@/lib/navigation";

export function DocsHeader() {
  const pathname = usePathname();
  const item = getNavigationItemByHref(pathname);
  const breadcrumb = item
    ? `Q Documentation > ${item.section} > ${item.title}`
    : pathname === "/docs"
      ? "Q Documentation > Docs Index"
      : "Q Documentation";

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      borderColor="border"
      background="rgba(11,16,32,0.85)"
      backdropFilter="blur(6px)"
      px={{ base: 4, md: 10 }}
      h="64px"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <HStack gap={3}>
        <Text fontWeight="bold">Q Documentation</Text>
        <Text color="muted" fontSize="sm">
          {breadcrumb}
        </Text>
      </HStack>
      <ChakraLink asChild fontSize="sm" color="accent">
        <Link href="/docs">Home</Link>
      </ChakraLink>
    </Flex>
  );
}