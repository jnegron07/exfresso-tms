import { NextResponse } from "next/server";
import shipments from "@/lib/mock-data/shipments.json";

export async function GET() {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(shipments);
}
