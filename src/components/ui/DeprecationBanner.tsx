import { Alert } from "@chakra-ui/react";
import Link from "next/link";

type Props = {
  replacementHref: string;
  replacementLabel: string;
};

export function DeprecationBanner({ replacementHref, replacementLabel }: Props) {
  return (
    <Alert.Root status="warning" mb={6} borderRadius="md" borderWidth="1px" borderColor="orange.500">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Deprecated Page</Alert.Title>
        <Alert.Description>
          This page is maintained for backward reference. Use <Link href={replacementHref}>{replacementLabel}</Link> for current guidance.
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}