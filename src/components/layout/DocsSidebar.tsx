"use client";

import { Box, Input, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { getNavigationBySection, getNavigationItemByHref, getNavigationSections } from "@/lib/navigation";

export function DocsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const activeSection = getNavigationItemByHref(pathname)?.section ?? "Spec";
  const sections = getNavigationSections();

  const normalizedQuery = query.trim().toLowerCase();

  const visibleBySection = useMemo(() => {
    return sections.reduce<Record<string, ReturnType<typeof getNavigationBySection>>>(
      (acc, section) => {
        const items = getNavigationBySection(section);
        acc[section] = normalizedQuery
          ? items.filter(
              (item) =>
                item.title.toLowerCase().includes(normalizedQuery) ||
                item.description.toLowerCase().includes(normalizedQuery),
            )
          : items;
        return acc;
      },
      {},
    );
  }, [sections, normalizedQuery]);

  return (
    <Box
      as="aside"
      w={{ base: "full", md: "320px" }}
      display={{ base: "none", md: "block" }}
      borderRightWidth="1px"
      borderColor="border"
      background="panel"
      px={5}
      py={6}
      position="sticky"
      top={0}
      h="100vh"
      overflowY="auto"
      css={{
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { width: "8px" },
        "&::-webkit-scrollbar-thumb": { background: "#2d3748", borderRadius: "8px" },
      }}
    >
      <Stack gap={4}>
        <Text fontWeight="bold">WaveQ Docs</Text>
        <Input
          size="sm"
          placeholder="Search docs..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          bg="gray.900"
          borderColor="border"
        />

        {sections.map((section) => {
          const items = visibleBySection[section] ?? [];
          const shouldOpen = normalizedQuery.length > 0 || section === activeSection;

          return (
            <details key={section} open={shouldOpen}>
              <summary style={{ cursor: "pointer", listStyleType: "none", paddingTop: "8px", paddingBottom: "8px" }}>
                <Text color="muted" fontSize="xs" textTransform="uppercase" letterSpacing="wide">
                  {section}
                </Text>
              </summary>
              <Stack gap={1} mt={2}>
                {items.map((item) => {
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
                      <Link href={item.href}>
                        {item.icon ? `${item.icon} ` : ""}
                        {item.title}
                      </Link>
                    </ChakraLink>
                  );
                })}
                {items.length === 0 ? (
                  <Text fontSize="sm" color="muted" px={3} py={2}>
                    No results in {section}
                  </Text>
                ) : null}
              </Stack>
            </details>
          );
        })}
      </Stack>
    </Box>
  );
}