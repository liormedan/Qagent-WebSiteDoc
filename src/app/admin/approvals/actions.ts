"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getAdminEmail, getPrimaryEmail, isAdminEmail } from "@/lib/approval";
import { sendUserApprovedEmail } from "@/lib/email";

async function assertAdmin() {
  const { userId } = await auth();
  if (!userId) return null;
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = getPrimaryEmail(user);
  if (!isAdminEmail(email)) return null;
  return { adminEmail: getAdminEmail(), client };
}

export async function approveUserAction(formData: FormData): Promise<void> {
  const admin = await assertAdmin();
  if (!admin) return;

  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;

  await admin.client.users.updateUserMetadata(userId, {
    publicMetadata: {
      approved: true,
      approvedAt: new Date().toISOString(),
      approvedBy: admin.adminEmail,
    },
  });

  const approvedUser = await admin.client.users.getUser(userId);
  const approvedUserEmail = getPrimaryEmail(approvedUser);
  if (approvedUserEmail) {
    await sendUserApprovedEmail({ to: approvedUserEmail });
  }

  revalidatePath("/admin/approvals");
}
