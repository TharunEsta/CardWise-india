import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    ok: true,
    received: body,
    message: "Wire this route to Supabase user_events and search_logs tables in production."
  });
}
