import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DocsShell } from "@/components/layout/DocsShell";
import { isUserApproved } from "@/lib/approval";

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  if (!isUserApproved(user)) {
    redirect("/pending-approval");
  }

  return <DocsShell>{children}</DocsShell>;
}
