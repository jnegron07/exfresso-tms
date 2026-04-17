"use client";

import dynamic from "next/dynamic";

export const ShipmentMap = dynamic(
  () => import("./shipment-map").then((mod) => mod.ShipmentMap),
  { ssr: false }
);
