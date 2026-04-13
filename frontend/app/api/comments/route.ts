import { NextResponse } from "next/server";

import { getAuthenticatedAppUser } from "@/lib/app-user";
import { createAdminClient } from "@/lib/supabase-admin";

export async function GET(request: Request) {
  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ comments: [] });
  }

  const { searchParams } = new URL(request.url);
  const cardSlug = searchParams.get("cardSlug");

  if (!cardSlug) {
    return NextResponse.json({ comments: [] });
  }

  const { data } = await admin
    .from("comments")
    .select("id, comment, created_at, card_slug, card_name, users(name, email)")
    .eq("card_slug", cardSlug)
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  const comments = (data ?? []).map((entry) => ({
    id: entry.id as string,
    kind: "comment" as const,
    message: entry.comment as string,
    createdAt: entry.created_at as string,
    user:
      (Array.isArray(entry.users) ? entry.users[0]?.name ?? entry.users[0]?.email : (entry.users as { name?: string; email?: string } | null)?.name ?? (entry.users as { name?: string; email?: string } | null)?.email) ??
      "CardWise user"
  }));

  return NextResponse.json({ comments });
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
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!cardSlug || !cardName || message.length < 8) {
    return NextResponse.json({ ok: false, message: "A valid card and comment are required." }, { status: 400 });
  }

  const { error } = await admin.from("comments").insert({
    user_id: appUser.id,
    card_slug: cardSlug,
    card_name: cardName,
    comment: message
  });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
