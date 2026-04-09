import { Resend } from "resend";

import { env } from "@/lib/env";

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export async function sendEbookEmail({ to, downloadUrl }: { to: string; downloadUrl: string }) {
  if (!resend) {
    return { ok: false, message: "Resend not configured" };
  }

  await resend.emails.send({
    from: "CardWise India <guides@cardwiseindia.com>",
    to,
    subject: "Your free CardWise India eBook is ready",
    html: `<div style="font-family:Arial,sans-serif;padding:24px;color:#0f172a"><h2>Your free CardWise India eBook is ready</h2><p>Download it instantly or save it as PDF from your browser. No payments or subscriptions are required.</p><p><a href="${downloadUrl}">${downloadUrl}</a></p><p style="margin-top:20px">Need more help choosing a card? Reply to this email or contact support@cardwiseindia.com.</p></div>`
  });

  return { ok: true };
}
