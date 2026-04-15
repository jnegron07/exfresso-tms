import { useQuery } from "@tanstack/react-query";

export const SHIPMENT_KEYS = {
  all: ["shipments"] as const,
  details: (id: string) => ["shipments", id] as const,
};

export function useShipments() {
  return useQuery({
    queryKey: SHIPMENT_KEYS.all,
    queryFn: async () => {
      const resp = await fetch("/api/shipments");
      if (!resp.ok) throw new Error("Failed to fetch shipments");
      return resp.json();
    },
  });
}

export function useShipment(id: string) {
  return useQuery({
    queryKey: SHIPMENT_KEYS.details(id),
    queryFn: async () => {
      const resp = await fetch(`/api/shipments/${id}`);
      if (!resp.ok) throw new Error("Failed to fetch shipment");
      return resp.json();
    },
    enabled: !!id,
  });
}
