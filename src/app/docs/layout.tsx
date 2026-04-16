import { auth } from "@clerk/nextjs/server";
import { DocsShell } from "@/components/layout/DocsShell";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await auth();
  return <DocsShell>{children}</DocsShell>;
}
