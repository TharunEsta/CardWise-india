import { NextResponse } from "next/server";

import { getAuthenticatedAppUser } from "@/lib/app-user";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const eventName = typeof body?.eventName === "string" ? body.eventName : null;
  const properties = typeof body?.properties === "object" && body.properties ? body.properties as Record<string, unknown> : {};
  const sessionId = typeof body?.sessionId === "string" ? body.sessionId : crypto.randomUUID();
  const admin = createAdminClient();
  const { appUser } = await getAuthenticatedAppUser();

  if (!eventName || !admin) {
    return NextResponse.json({ ok: false, message: "Event name is required." }, { status: 400 });
  }

  await admin.from("user_events").insert({
    user_id: appUser?.id ?? null,
    session_id: sessionId,
    event_name: eventName,
    card_slug: typeof properties.card_slug === "string" ? properties.card_slug : null,
    bank_slug: typeof properties.bank_slug === "string" ? properties.bank_slug : null,
    metadata: properties
  });

  if (eventName === "search_performed" || eventName === "search_result_clicked") {
    await admin.from("search_logs").insert({
      user_id: appUser?.id ?? null,
      session_id: sessionId,
      search_term: typeof properties.search_term === "string" ? properties.search_term : "",
      result_clicked_type: typeof properties.result_clicked_type === "string" ? properties.result_clicked_type : null,
      result_clicked_id: typeof properties.result_clicked_id === "string" ? properties.result_clicked_id : null,
      result_clicked_slug: typeof properties.result_clicked_slug === "string" ? properties.result_clicked_slug : null,
      result_clicked_title: typeof properties.result_clicked_title === "string" ? properties.result_clicked_title : null
    });
  }

  return NextResponse.json({
    ok: true,
    received: body
  });
}
