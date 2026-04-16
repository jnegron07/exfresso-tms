import { NextRequest, NextResponse } from "next/server";
import partners from "@/lib/mock-data/partners.json";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const partner = partners.find((p) => p.id === id);

  if (!partner) {
    return NextResponse.json({ error: "Partner not found" }, { status: 404 });
  }

  return NextResponse.json(partner);
}
