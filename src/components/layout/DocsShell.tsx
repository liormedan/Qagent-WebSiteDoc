"use client";

import { Box, Flex } from "@chakra-ui/react";
import { DocsHeader } from "@/components/layout/DocsHeader";
import { DocsPager } from "@/components/layout/DocsPager";
import { DocsSidebar } from "@/components/layout/DocsSidebar";

type Props = {
  children: React.ReactNode;
};

export function DocsShell({ children }: Props) {
  return (
    <Flex minH="100vh" bg="bg" color="text">
      <DocsSidebar />
      <Flex flex="1" direction="column" minW={0}>
        <DocsHeader />
        <Box as="main" px={{ base: 4, md: 10 }} py={{ base: 6, md: 8 }}>
          {children}
          <DocsPager />
        </Box>
      </Flex>
    </Flex>
  );
}