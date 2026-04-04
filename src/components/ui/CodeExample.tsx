import { Box } from "@chakra-ui/react";

type Props = {
  code: string;
};

export function CodeExample({ code }: Props) {
  return (
    <Box
      as="pre"
      mt={1}
      p={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor="border"
      bg="gray.950"
      overflowX="auto"
      fontSize="sm"
      whiteSpace="pre-wrap"
      wordBreak="break-word"
    >
      <Box as="code">{code}</Box>
    </Box>
  );
}
