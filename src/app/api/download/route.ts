import { NextResponse } from "next/server";
import { fetchLatestRelease } from "@/lib/github";

export const dynamic = "force-dynamic";

function dmgFilename(tagName: string): string {
  const version = tagName.replace(/^v/i, "");
  return `DynaMac-${version}.dmg`;
}

/**
 * Proxies the latest .dmg so the browser downloads from dynamac.com —
 * no visible redirect to GitHub (source URL stays server-side only).
 */
export async function GET() {
  const release = await fetchLatestRelease();

  if (!release?.dmgUrl) {
    return NextResponse.json(
      { error: "Download is temporarily unavailable. Try again shortly." },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(release.dmgUrl, {
      headers: { "User-Agent": "dynamac-web-download" },
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { error: "Could not fetch the installer. Try again shortly." },
        { status: 502 },
      );
    }

    const filename = dmgFilename(release.tagName);
    const contentLength = upstream.headers.get("content-length");

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Download failed. Try again shortly." },
      { status: 502 },
    );
  }
}
