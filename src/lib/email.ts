import { getAdminEmail, getAppBaseUrl } from "@/lib/approval";

type SendEmailArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

async function sendEmail({ to, subject, html, text }: SendEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    return { ok: false, reason: "missing_email_env" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
    }),
  });

  return { ok: response.ok, status: response.status };
}

export async function sendAdminApprovalRequestEmail({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const adminEmail = process.env.ADMIN_APPROVAL_EMAIL ?? getAdminEmail();
  const approvalUrl = `${getAppBaseUrl()}/admin/approvals?userId=${encodeURIComponent(userId)}`;
  return sendEmail({
    to: adminEmail,
    subject: "WaveQ: New user pending approval",
    text: `A new user registered: ${email} (id: ${userId}). Approve here: ${approvalUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>New user pending approval</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>User ID:</strong> ${userId}</p>
        <p><a href="${approvalUrl}">Open approvals dashboard</a></p>
      </div>
    `,
  });
}

export async function sendUserApprovedEmail({
  to,
}: {
  to: string;
}) {
  const docsUrl = `${getAppBaseUrl()}/docs`;
  return sendEmail({
    to,
    subject: "WaveQ access approved",
    text: `Your WaveQ account is approved. You can now access the docs here: ${docsUrl}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>Your access was approved</h2>
        <p>You can now access WaveQ docs.</p>
        <p><a href="${docsUrl}">Open WaveQ Docs</a></p>
      </div>
    `,
  });
}
