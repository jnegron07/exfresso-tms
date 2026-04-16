import { NextRequest, NextResponse } from "next/server";
import rateCards from "@/lib/mock-data/rate-cards.json";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const rateCard = rateCards.find((rc) => rc.id === id);

  if (!rateCard) {
    return NextResponse.json({ error: "Rate card not found" }, { status: 404 });
  }

  return NextResponse.json(rateCard);
}
