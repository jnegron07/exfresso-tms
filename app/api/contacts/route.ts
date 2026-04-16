import { NextRequest, NextResponse } from "next/server";
import contacts from "@/lib/mock-data/contacts.json";

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  const result = type
    ? contacts.filter((c) => c.type === type)
    : contacts;

  return NextResponse.json(result);
}
