import { NextRequest, NextResponse } from "next/server";
import rateCards from "@/lib/mock-data/rate-cards.json";

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const result = type
    ? rateCards.filter((rc) => rc.type === type)
    : rateCards;

  return NextResponse.json(result);
}
