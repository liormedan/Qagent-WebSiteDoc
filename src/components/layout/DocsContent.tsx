import { Box } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export function DocsContent({ children }: Props) {
  return (
    <Box maxW="5xl" mx="auto" w="full">
      {children}
    </Box>
  );
}