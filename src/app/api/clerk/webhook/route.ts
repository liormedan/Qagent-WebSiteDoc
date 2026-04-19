import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs/server";
import { getAdminEmail, isAdminEmail } from "@/lib/approval";

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ id: string; email_address: string }>;
    primary_email_address_id?: string | null;
  };
};

function getEmailFromEvent(event: ClerkWebhookEvent) {
  const primaryId = event.data.primary_email_address_id;
  const addresses = event.data.email_addresses ?? [];
  if (!primaryId) return addresses[0]?.email_address?.toLowerCase() ?? "";
  const primary = addresses.find((a) => a.id === primaryId);
  return primary?.email_address?.toLowerCase() ?? addresses[0]?.email_address?.toLowerCase() ?? "";
}

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!secret) {
    return new Response("Missing CLERK_WEBHOOK_SIGNING_SECRET", { status: 500 });
  }

  const h = await headers();
  const svixId = h.get("svix-id");
  const svixTimestamp = h.get("svix-timestamp");
  const svixSignature = h.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(secret);

  let evt: ClerkWebhookEvent;
  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type !== "user.created") {
    return new Response("ok", { status: 200 });
  }

  const userId = evt.data.id;
  const email = getEmailFromEvent(evt);
  const client = await clerkClient();

  if (email && isAdminEmail(email)) {
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        approved: true,
        approvedAt: new Date().toISOString(),
        approvedBy: getAdminEmail(),
      },
    });
    return new Response("ok", { status: 200 });
  }

  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      approved: true,
      approvedAt: new Date().toISOString(),
      approvedBy: "auto",
    },
  });

  return new Response("ok", { status: 200 });
}
