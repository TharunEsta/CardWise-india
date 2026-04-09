import { NextResponse } from "next/server";

import { sendEbookEmail } from "@/lib/email";
import { getEbookDownloadUrl } from "@/lib/ebook";

export async function POST(request: Request) {
  const body = await request.json();
  const action = body?.action as "download" | "email";

  if (action === "email" && body?.email) {
    const result = await sendEbookEmail({
      to: body.email,
      downloadUrl: getEbookDownloadUrl()
    });

    return NextResponse.json(result);
  }

  return NextResponse.json({
    ok: true,
    downloadUrl: getEbookDownloadUrl()
  });
}
