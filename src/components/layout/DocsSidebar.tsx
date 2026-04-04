"use client";

import { Box, Heading, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation } from "@/lib/navigation";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <Box
      as="aside"
      w={{ base: "full", md: "280px" }}
      display={{ base: "none", md: "block" }}
      borderRightWidth="1px"
      borderColor="border"
      background="panel"
      px={5}
      py={6}
      position="sticky"
      top={0}
      h="100vh"
    >
      <Stack gap={6}>
        <Box>
          <Heading size="md">WaveQ Docs</Heading>
          <Text color="muted" fontSize="sm" mt={1}>
            Q Agent + audio.dal
          </Text>
        </Box>
        <Stack gap={1}>
          <Text color="muted" fontSize="xs" textTransform="uppercase" letterSpacing="wide" mb={2}>
            Sections
          </Text>
          <ChakraLink
            asChild
            px={3}
            py={2}
            borderRadius="md"
            bg={pathname === "/docs" ? "gray.800" : "transparent"}
            _hover={{ bg: "gray.800" }}
          >
            <Link href="/docs">Overview</Link>
          </ChakraLink>
          {docsNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <ChakraLink
                asChild
                key={item.href}
                px={3}
                py={2}
                borderRadius="md"
                bg={active ? "gray.800" : "transparent"}
                _hover={{ bg: "gray.800" }}
              >
                <Link href={item.href}>{item.title}</Link>
              </ChakraLink>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
}