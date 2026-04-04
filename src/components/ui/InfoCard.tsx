import { Card, Heading, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  description: string;
};

export function InfoCard({ title, description }: Props) {
  return (
    <Card.Root flex="1" bg="panel" borderColor="border" borderWidth="1px">
      <Card.Body>
        <Heading size="sm" mb={2}>
          {title}
        </Heading>
        <Text color="muted">{description}</Text>
      </Card.Body>
    </Card.Root>
  );
}