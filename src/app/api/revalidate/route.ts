import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

import { CACHE_TAGS, type CacheTag } from "@/lib/constants";

const VALID_TAGS = new Set<string>(Object.values(CACHE_TAGS));

/**
 * On-demand cache invalidation, called by the admin after content changes.
 *
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "tag": "experiences" }
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { revalidated: false, error: "REVALIDATE_SECRET is not configured" },
      { status: 503 },
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json(
      { revalidated: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const tag =
    body && typeof body === "object" && "tag" in body
      ? String((body as { tag: unknown }).tag)
      : null;

  if (!tag || !VALID_TAGS.has(tag)) {
    return NextResponse.json(
      {
        revalidated: false,
        error: `Unknown tag. Expected one of: ${[...VALID_TAGS].join(", ")}`,
      },
      { status: 400 },
    );
  }

  revalidateTag(tag as CacheTag, "max");

  return NextResponse.json({ revalidated: true, tag });
}
