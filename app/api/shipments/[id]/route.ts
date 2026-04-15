import { NextRequest, NextResponse } from "next/server";
import shipments from "@/lib/mock-data/shipments.json";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const shipment = shipments.find((s) => s.id === id);

  if (!shipment) {
    return NextResponse.json({ error: "Shipment not found" }, { status: 404 });
  }

  return NextResponse.json(shipment);
}
