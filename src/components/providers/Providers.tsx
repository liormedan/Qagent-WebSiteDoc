"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <CacheProvider>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </CacheProvider>
  );
}