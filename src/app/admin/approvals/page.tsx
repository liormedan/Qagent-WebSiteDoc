import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPrimaryEmail, isAdminEmail } from "@/lib/approval";

type RegisteredUser = {
  id: string;
  email: string;
  createdAt?: string;
  approved?: boolean;
};

export default async function AdminApprovalsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const current = await client.users.getUser(userId);
  if (!isAdminEmail(getPrimaryEmail(current))) {
    redirect("/docs");
  }

  const list = await client.users.getUserList({ limit: 100 });
  const users = Array.isArray(list) ? list : list.data;

  const registeredUsers: RegisteredUser[] = users
    .map((u) => ({
      id: u.id,
      email: u.primaryEmailAddress?.emailAddress ?? "",
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : undefined,
      approved: u.publicMetadata?.approved === true,
    }))
    .filter((u) => u.email && !isAdminEmail(u.email))
    .map(({ id, email, createdAt, approved }) => ({ id, email, createdAt, approved }));

  return (
    <main className="min-h-screen bg-[#020817] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="text-2xl font-semibold">Registered Users</h1>
        <p className="text-sm text-slate-300">List of users who registered to the system.</p>

        <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-950/70">
          {registeredUsers.length === 0 ? (
            <div className="p-6 text-sm text-slate-300">No registered users yet.</div>
          ) : (
            <ul className="divide-y divide-slate-800">
              {registeredUsers.map((u) => (
                <li key={u.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{u.email}</p>
                    <p className="text-xs text-slate-400">User ID: {u.id}</p>
                    {u.createdAt ? <p className="text-xs text-slate-500">Created: {u.createdAt}</p> : null}
                    <p className="text-xs text-slate-500">Access: {u.approved ? "approved" : "pending"}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
