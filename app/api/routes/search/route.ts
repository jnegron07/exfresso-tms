import { NextRequest, NextResponse } from "next/server";
import allRoutes from "@/lib/mock-data/routes.json";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originCode, destinationCode } = body;

    // SIMULATED "BLACK BOX" PROCESSING DELAY
    // As requested: "estado de carga de búsqueda de 7 segundos"
    await new Promise((resolve) => setTimeout(resolve, 7000));

    // Simple lookup based on origin-destination code combination
    const key = `${originCode}-${destinationCode}`;
    const routes = (allRoutes as any)[key] || [];

    // If no specific routes found, return a generic list or empty
    if (routes.length === 0) {
      // Return a simulated default set for demonstration if codes are missing
      const defaultKey = "CNSHA-USLAX";
      return NextResponse.json((allRoutes as any)[defaultKey] || []);
    }

    return NextResponse.json(routes);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
