import { Box, Heading, Stack, Text } from "@chakra-ui/react";

type Props = {
  id?: string;
  title: string;
  body: readonly string[];
  children?: React.ReactNode;
};

export function SectionBlock({ id, title, body, children }: Props) {
  return (
    <Box id={id} borderWidth="1px" borderColor="border" bg="panel" borderRadius="xl" p={{ base: 5, md: 6 }}>
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
