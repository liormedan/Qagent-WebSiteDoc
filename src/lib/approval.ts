import type { User } from "@clerk/nextjs/server";

const DEFAULT_ADMIN_EMAIL = "liormedan1@gmail.com";

export function getAdminEmail() {
  return (process.env.CLERK_ADMIN_EMAIL ?? DEFAULT_ADMIN_EMAIL).toLowerCase();
}

export function getPrimaryEmail(user: Pick<User, "primaryEmailAddress"> | null | undefined) {
  return user?.primaryEmailAddress?.emailAddress?.toLowerCase() ?? "";
}

export function isAdminEmail(email: string) {
  return email.toLowerCase() === getAdminEmail();
}

export function isUserApproved(user: Pick<User, "publicMetadata" | "primaryEmailAddress"> | null | undefined) {
  const primaryEmail = getPrimaryEmail(user);
  if (!primaryEmail) return false;
  if (isAdminEmail(primaryEmail)) return true;
  return user?.publicMetadata?.approved === true;
}

export function getAppBaseUrl() {
  return process.env.APP_BASE_URL ?? "https://qagent-web-site-doc.vercel.app";
}
