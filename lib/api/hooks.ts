import { useQuery } from "@tanstack/react-query";

// ─── Shipments ───────────────────────────────────────────────────────────────

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

// ─── Partners ─────────────────────────────────────────────────────────────────

export const PARTNER_KEYS = {
  all: ["partners"] as const,
  details: (id: string) => ["partners", id] as const,
};

export function usePartners() {
  return useQuery({
    queryKey: PARTNER_KEYS.all,
    queryFn: async () => {
      const resp = await fetch("/api/partners");
      if (!resp.ok) throw new Error("Failed to fetch partners");
      return resp.json();
    },
  });
}

export function usePartner(id: string) {
  return useQuery({
    queryKey: PARTNER_KEYS.details(id),
    queryFn: async () => {
      const resp = await fetch(`/api/partners/${id}`);
      if (!resp.ok) throw new Error("Failed to fetch partner");
      return resp.json();
    },
    enabled: !!id,
  });
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

export const CONTACT_KEYS = {
  all: (type?: string) => type ? ["contacts", type] : ["contacts"] as const,
  details: (id: string) => ["contacts", id] as const,
};

export function useContacts(type?: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.all(type),
    queryFn: async () => {
      const url = type ? `/api/contacts?type=${type}` : "/api/contacts";
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("Failed to fetch contacts");
      return resp.json();
    },
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: CONTACT_KEYS.details(id),
    queryFn: async () => {
      const resp = await fetch(`/api/contacts/${id}`);
      if (!resp.ok) throw new Error("Failed to fetch contact");
      return resp.json();
    },
    enabled: !!id,
  });
}

// ─── Rate Cards ───────────────────────────────────────────────────────────────

export const RATE_CARD_KEYS = {
  all: (type?: string) => type ? ["rate-cards", type] : ["rate-cards"] as const,
  details: (id: string) => ["rate-cards", id] as const,
};

export function useRateCards(type?: string) {
  return useQuery({
    queryKey: RATE_CARD_KEYS.all(type),
    queryFn: async () => {
      const url = type ? `/api/rate-cards?type=${type}` : "/api/rate-cards";
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("Failed to fetch rate cards");
      return resp.json();
    },
  });
}

export function useRateCard(id: string) {
  return useQuery({
    queryKey: RATE_CARD_KEYS.details(id),
    queryFn: async () => {
      const resp = await fetch(`/api/rate-cards/${id}`);
      if (!resp.ok) throw new Error("Failed to fetch rate card");
      return resp.json();
    },
    enabled: !!id,
  });
}

// ─── Notifications ────────────────────────────────────────────────────────────

export const NOTIFICATION_KEYS = {
  all: (userId?: string, unread?: boolean) =>
    ["notifications", userId ?? "all", unread ? "unread" : "all"] as const,
};

export function useNotifications(userId?: string, unreadOnly?: boolean) {
  return useQuery({
    queryKey: NOTIFICATION_KEYS.all(userId, unreadOnly),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (userId) params.set("userId", userId);
      if (unreadOnly) params.set("unread", "true");
      const resp = await fetch(`/api/notifications?${params.toString()}`);
      if (!resp.ok) throw new Error("Failed to fetch notifications");
      return resp.json();
    },
  });
}

// ─── Users ────────────────────────────────────────────────────────────────────

export const USER_KEYS = {
  all: ["users"] as const,
  details: (id: string) => ["users", id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: USER_KEYS.all,
    queryFn: async () => {
      const resp = await fetch("/api/users");
      if (!resp.ok) throw new Error("Failed to fetch users");
      return resp.json();
    },
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: USER_KEYS.details(id),
    queryFn: async () => {
      const resp = await fetch(`/api/users/${id}`);
      if (!resp.ok) throw new Error("Failed to fetch user");
      return resp.json();
    },
    enabled: !!id,
  });
}

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────

export const DASHBOARD_KEYS = {
  kpis: ["dashboard", "kpis"] as const,
};

export function useDashboardKPIs() {
  return useQuery({
    queryKey: DASHBOARD_KEYS.kpis,
    queryFn: async () => {
      const resp = await fetch("/api/dashboard/kpis");
      if (!resp.ok) throw new Error("Failed to fetch KPIs");
      return resp.json();
    },
  });
}
