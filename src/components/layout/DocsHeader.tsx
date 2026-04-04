"use client";

import { Flex, HStack, Link as ChakraLink, Text } from "@chakra-ui/react";
import Link from "next/link";

export function DocsHeader() {
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
          Internal Product Docs
        </Text>
      </HStack>
      <ChakraLink asChild fontSize="sm" color="accent">
        <Link href="/">Home</Link>
      </ChakraLink>
    </Flex>
  );
}