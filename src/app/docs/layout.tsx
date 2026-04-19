import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DocsShell } from "@/components/layout/DocsShell";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return <DocsShell>{children}</DocsShell>;
}
