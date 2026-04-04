import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container maxW="4xl" py={{ base: 20, md: 28 }}>
      <Stack gap={8} align="start">
        <Text color="accent" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">
          WaveQ Docs
        </Text>
        <Heading size="4xl" lineHeight="1.1">
          Documentation workspace for Q Agent and audio.dal
        </Heading>
        <Text color="muted" maxW="2xl" fontSize="lg">
          This project provides a clean, TypeScript-first documentation foundation built with Next.js App Router and Chakra UI.
        </Text>
        <Button asChild colorPalette="cyan" size="lg">
          <Link href="/docs">Open Docs</Link>
        </Button>
      </Stack>
    </Container>
  );
}