import { NextRequest, NextResponse } from "next/server";
import { getGalleryItems } from "@/lib/notion/gallery";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor") || undefined;
  const limit = parseInt(searchParams.get("limit") || "9");

  try {
    const data = await getGalleryItems(cursor, limit);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
