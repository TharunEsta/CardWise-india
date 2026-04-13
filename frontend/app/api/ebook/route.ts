import { NextResponse } from "next/server";

import { getAuthenticatedAppUser } from "@/lib/app-user";
import { createAdminClient } from "@/lib/supabase-admin";
import { sendEbookEmail } from "@/lib/email";
import { getEbookDownloadUrl } from "@/lib/ebook";

export async function POST(request: Request) {
  const body = await request.json();
  const action = body?.action as "download" | "email";
  const title = typeof body?.title === "string" ? body.title : "CardWise India eBook";
  const sourcePage = typeof body?.sourcePage === "string" ? body.sourcePage : "/";
  const admin = createAdminClient();
  const { appUser } = await getAuthenticatedAppUser();

  if (action === "email" && body?.email) {
    const result = await sendEbookEmail({
      to: body.email,
      downloadUrl: getEbookDownloadUrl()
    });

    if (admin && appUser && result.ok) {
      await admin.from("ebook_email_logs").insert({
        user_id: appUser.id,
        email: body.email,
        ebook_slug: title
      });

      await admin.from("user_events").insert({
        user_id: appUser.id,
        session_id: crypto.randomUUID(),
        event_name: "ebook_emailed",
        metadata: {
          title,
          source_page: sourcePage
        }
      });
    }

    return NextResponse.json(result);
  }

  if (admin && appUser) {
    await admin.from("downloads").insert({
      user_id: appUser.id,
      ebook_name: title,
      ebook_slug: title
    });

    await admin.from("user_events").insert({
      user_id: appUser.id,
      session_id: crypto.randomUUID(),
      event_name: "ebook_download_requested",
      metadata: {
        title,
        source_page: sourcePage
      }
    });
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: getEbookDownloadUrl()
  });
}
