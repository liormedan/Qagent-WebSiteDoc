import { Button, Container, Heading, List, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxW="5xl" py={{ base: 16, md: 24 }}>
      <Stack gap={8} align="start">
        <Text color="accent" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
          WaveQ Docs
        </Text>
        <Heading size="4xl" lineHeight="1.1">
          Engineering documentation for Q Agent and audio.dal
        </Heading>
        <Text color="muted" maxW="3xl" fontSize="lg">
          Q is a planning and reasoning agent that resolves intent ambiguity, asks clarifications when needed, and generates deterministic DAL contracts for safe execution.
        </Text>

        <List.Root pl={4} gap={2}>
          <List.Item>Planner + reasoner + clarification loop before execution handoff</List.Item>
          <List.Item>Strict TypeScript contracts for intents, plans, safety, and DAL</List.Item>
          <List.Item>Design layer that maps spec directly to implementation phases</List.Item>
        </List.Root>

        <Stack direction={{ base: "column", md: "row" }} gap={3}>
          <Button asChild colorPalette="cyan" size="lg">
            <Link href="/docs">Open Docs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs/overview">Quick Start</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs/architecture">Architecture</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs/api">API</Link>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}