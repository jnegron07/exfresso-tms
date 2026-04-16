import { NextResponse } from "next/server";
import shipments from "@/lib/mock-data/shipments.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const today = new Date("2026-04-16T00:00:00Z");
  const todayEnd = new Date("2026-04-16T23:59:59Z");

  const activeShipments = shipments.filter((s) =>
    ["booked", "in-transit", "arrived"].includes(s.status)
  ).length;

  const arrivingToday = shipments.filter((s) => {
    if (!s.legs || s.legs.length === 0) return false;
    return s.legs.some((leg) => {
      if (!leg.arrivalDate) return false;
      const arrival = new Date(leg.arrivalDate);
      return arrival >= today && arrival <= todayEnd;
    });
  }).length;

  const openQuotes = shipments.filter((s) => s.status === "quoted").length;

  const pendingDocs = shipments.filter((s) =>
    ["booked", "in-transit"].includes(s.status) &&
    (!s.documents || s.documents.length === 0)
  ).length;

  return NextResponse.json({
    activeShipments: {
      value: activeShipments,
      change: +12,
      changeLabel: "vs last month",
    },
    arrivingToday: {
      value: arrivingToday,
      change: -1,
      changeLabel: "vs yesterday",
    },
    openQuotes: {
      value: openQuotes,
      change: +2,
      changeLabel: "vs last week",
    },
    pendingActions: {
      value: pendingDocs + 3,
      change: -4,
      changeLabel: "vs yesterday",
    },
  });
}
