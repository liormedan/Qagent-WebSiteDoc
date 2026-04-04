"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { system } from "@/theme";

type Props = {
  children: React.ReactNode;
};

export function Providers({ children }: Props) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
