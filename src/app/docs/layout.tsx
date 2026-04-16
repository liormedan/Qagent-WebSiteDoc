import { auth, currentUser } from "@clerk/nextjs/server";
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

  const user = await currentUser();
  const adminEmail = process.env.CLERK_ADMIN_EMAIL ?? "liormedan1@gmail.com";
  const primaryEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";

  if (primaryEmail !== adminEmail.toLowerCase()) {
    redirect("/sign-in?not_admin=1");
  }

  return <DocsShell>{children}</DocsShell>;
}
