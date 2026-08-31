import { NextResponse } from "next/server";
import { brand } from "@/lib/brand";
import { fetchLatestRelease } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const release = await fetchLatestRelease();

  if (release?.dmgUrl) {
    return NextResponse.redirect(release.dmgUrl, {
      status: 302,
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  }

  return NextResponse.redirect(`${brand.repositoryUrl}/releases`, {
    status: 302,
    headers: {
      "Cache-Control": "public, max-age=60, s-maxage=60",
    },
  });
}
