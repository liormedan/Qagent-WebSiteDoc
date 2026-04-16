"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { getAdminEmail, getPrimaryEmail, isAdminEmail } from "@/lib/approval";
import { sendUserApprovedEmail } from "@/lib/email";

async function assertAdmin() {
  const { userId } = await auth();
  if (!userId) return { ok: false as const };
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = getPrimaryEmail(user);
  return { ok: isAdminEmail(email), adminEmail: getAdminEmail(), client };
}

export async function approveUserAction(formData: FormData) {
  const admin = await assertAdmin();
  if (!admin.ok) return { ok: false as const, error: "unauthorized" };

  const userId = String(formData.get("userId") ?? "");
  if (!userId) return { ok: false as const, error: "missing_user_id" };

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
  return { ok: true as const };
}
