import { NextResponse } from "next/server";
import { fetchLatestRelease } from "@/lib/github";

export const dynamic = "force-dynamic";

/**
 * Website download endpoint. Resolves the latest installer and redirects the
 * browser to the asset URL so the user starts from dynamac.com/api/download.
 * Upstream hosting is an implementation detail — never surface it in marketing.
 */
export async function GET() {
  const release = await fetchLatestRelease();

  if (!release?.dmgUrl) {
    return NextResponse.json(
      { error: "Download is temporarily unavailable. Try again shortly." },
      { status: 503 },
    );
  }

  return NextResponse.redirect(release.dmgUrl, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
