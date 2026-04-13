import { NextResponse } from "next/server";

import { getAuthenticatedAppUser } from "@/lib/app-user";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  const { appUser } = await getAuthenticatedAppUser();
  const admin = createAdminClient();

  if (!appUser || !admin) {
    return NextResponse.json({ savedCards: [] });
  }

  const { data } = await admin
    .from("saved_cards")
    .select("card_slug, card_name, bank_name, created_at")
    .eq("user_id", appUser.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ savedCards: data ?? [] });
}

export async function POST(request: Request) {
  const { appUser } = await getAuthenticatedAppUser();
  const admin = createAdminClient();

  if (!appUser || !admin) {
    return NextResponse.json({ ok: false, message: "Login required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const cardSlug = typeof body?.cardSlug === "string" ? body.cardSlug : null;
  const cardName = typeof body?.cardName === "string" ? body.cardName : null;
  const bankName = typeof body?.bankName === "string" ? body.bankName : null;

  if (!cardSlug || !cardName) {
    return NextResponse.json({ ok: false, message: "Card details are required." }, { status: 400 });
  }

  const { error } = await admin.from("saved_cards").upsert(
    {
      user_id: appUser.id,
      card_slug: cardSlug,
      card_name: cardName,
      bank_name: bankName
    },
    {
      onConflict: "user_id,card_slug"
    }
  );

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { appUser } = await getAuthenticatedAppUser();
  const admin = createAdminClient();

  if (!appUser || !admin) {
    return NextResponse.json({ ok: false, message: "Login required." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const cardSlug = typeof body?.cardSlug === "string" ? body.cardSlug : null;

  if (!cardSlug) {
    return NextResponse.json({ ok: false, message: "Card slug is required." }, { status: 400 });
  }

  const { error } = await admin.from("saved_cards").delete().eq("user_id", appUser.id).eq("card_slug", cardSlug);

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
