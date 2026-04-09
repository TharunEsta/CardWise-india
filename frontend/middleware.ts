import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase-middleware";

export function middleware(request: NextRequest) {
  const response = updateSession(request);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const email = request.cookies.get("cardwise-admin-email")?.value;
    if (!email) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};
