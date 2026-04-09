import { NextResponse } from "next/server";

import { getEbookHtmlDocument } from "@/lib/ebook";

const EBOOK_TITLE = "Best Credit Cards in India 2026 - Complete Comparison Guide";

export async function GET() {
  return new NextResponse(getEbookHtmlDocument(EBOOK_TITLE), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'inline; filename="cardwise-india-credit-card-guide-2026.html"',
      "Cache-Control": "no-store"
    }
  });
}
