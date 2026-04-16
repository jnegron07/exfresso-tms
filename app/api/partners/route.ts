import { NextResponse } from "next/server";
import partners from "@/lib/mock-data/partners.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(partners);
}
