import { NextResponse } from "next/server";
import { fetchReleases } from "@/lib/github";

export async function GET() {
  const releases = await fetchReleases(20);

  return NextResponse.json(
    { releases },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
