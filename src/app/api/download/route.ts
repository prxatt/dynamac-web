import { NextResponse } from "next/server";
import { fetchLatestRelease } from "@/lib/github";

export const dynamic = "force-dynamic";

/**
 * Hands off to the release asset URL. The browser downloads the .dmg directly
 * (no GitHub UI). Full proxy streaming would exceed serverless time limits
 * for typical installer sizes.
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
