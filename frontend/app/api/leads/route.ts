import { NextResponse } from "next/server";

import { getAuthenticatedAppUser } from "@/lib/app-user";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  const { appUser } = await getAuthenticatedAppUser();
  const admin = createAdminClient();

  if (!appUser || !admin) {
    return NextResponse.json({ ok: false, message: "Login required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const intentType = typeof body?.intentType === "string" ? body.intentType : "callback";
  const sourcePage = typeof body?.sourcePage === "string" ? body.sourcePage : "/";
  const cardSlug = typeof body?.cardSlug === "string" ? body.cardSlug : null;
  const cardName = typeof body?.cardName === "string" ? body.cardName : null;
  const bankName = typeof body?.bankName === "string" ? body.bankName : null;
  const notes = typeof body?.notes === "string" ? body.notes : null;

  const { error } = await admin.from("leads").insert({
    user_id: appUser.id,
    source_page: sourcePage,
    intent_type: intentType,
    card_slug: cardSlug,
    card_name: cardName,
    bank_name: bankName,
    notes
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
