import { NextResponse } from "next/server";

import { isAdminEmail } from "@/lib/auth";

const ADMIN_COOKIE_NAME = "cardwise-admin-email";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : null;
  const response = NextResponse.json({ ok: true, isAdmin: isAdminEmail(email) });

  if (isAdminEmail(email)) {
    response.cookies.set(ADMIN_COOKIE_NAME, email, {
      path: "/",
      sameSite: "lax"
    });
  } else {
    response.cookies.delete(ADMIN_COOKIE_NAME);
  }

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(ADMIN_COOKIE_NAME);
  return response;
}
