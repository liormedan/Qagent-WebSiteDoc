import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { approveUserAction } from "@/app/admin/approvals/actions";
import { getPrimaryEmail, isAdminEmail } from "@/lib/approval";

type PendingUser = {
  id: string;
  email: string;
  createdAt?: string;
};

export default async function AdminApprovalsPage() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const client = await clerkClient();
  const current = await client.users.getUser(userId);
  if (!isAdminEmail(getPrimaryEmail(current))) {
    redirect("/pending-approval");
  }

  const list = await client.users.getUserList({ limit: 100 });
  const users = Array.isArray(list) ? list : list.data;

  const pendingUsers: PendingUser[] = users
    .map((u) => ({
      id: u.id,
      email: u.primaryEmailAddress?.emailAddress ?? "",
      createdAt: u.createdAt ? new Date(u.createdAt).toISOString() : undefined,
      approved: u.publicMetadata?.approved === true,
    }))
    .filter((u) => u.email && !isAdminEmail(u.email) && !u.approved)
    .map(({ id, email, createdAt }) => ({ id, email, createdAt }));

  return (
    <main className="min-h-screen bg-[#020817] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="text-2xl font-semibold">Admin Approvals</h1>
        <p className="text-sm text-slate-300">Approve newly registered users. Once approved, an email notification is sent automatically.</p>

        <div className="overflow-hidden rounded-xl border border-slate-700/70 bg-slate-950/70">
          {pendingUsers.length === 0 ? (
            <div className="p-6 text-sm text-slate-300">No pending users.</div>
          ) : (
            <ul className="divide-y divide-slate-800">
              {pendingUsers.map((u) => (
                <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{u.email}</p>
                    <p className="text-xs text-slate-400">User ID: {u.id}</p>
                    {u.createdAt ? <p className="text-xs text-slate-500">Created: {u.createdAt}</p> : null}
                  </div>
                  <form action={approveUserAction}>
                    <input type="hidden" name="userId" value={u.id} />
                    <button
                      type="submit"
                      className="rounded-md border border-cyan-400/50 bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/25"
                    >
                      Approve
                    </button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
