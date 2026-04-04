import { Box, Heading, Stack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  body: string[];
  children?: React.ReactNode;
};

export function SectionBlock({ title, body, children }: Props) {
  return (
    <Box borderWidth="1px" borderColor="border" bg="panel" borderRadius="xl" p={{ base: 5, md: 6 }}>
      <Stack gap={4}>
        <Heading size="md">{title}</Heading>
        {body.map((line) => (
          <Text key={line} color="gray.200" lineHeight="1.8">
            {line}
          </Text>
        ))}
        {children}
      </Stack>
    </Box>
  );
}