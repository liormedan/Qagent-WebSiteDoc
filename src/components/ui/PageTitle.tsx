import { Heading, Stack, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  description: string;
};

export function PageTitle({ title, description }: Props) {
  return (
    <Stack gap={3} mb={8}>
      <Heading size="2xl">{title}</Heading>
      <Text color="muted" fontSize="lg" maxW="3xl">
        {description}
      </Text>
    </Stack>
  );
}