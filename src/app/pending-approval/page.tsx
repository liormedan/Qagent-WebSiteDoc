import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function PendingApprovalPage() {
  return (
    <main className="min-h-screen bg-[#020817] px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-700/70 bg-slate-950/70 p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.85)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold">החשבון ממתין לאישור מנהל</h1>
          <UserButton />
        </div>
        <p className="text-sm leading-7 text-slate-300">
          ההרשמה נקלטה בהצלחה. ברגע שמנהל המערכת יאשר את המשתמש, תקבלו הודעה במייל ותוכלו להיכנס לדוקומנטציה.
        </p>
        <div className="mt-6">
          <Link
            href="/sign-in"
            className="inline-flex items-center rounded-md border border-cyan-400/50 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/20"
          >
            חזרה למסך התחברות
          </Link>
        </div>
      </div>
    </main>
  );
}
