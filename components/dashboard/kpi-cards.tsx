"use client";

import { useShipments } from "@/lib/api/hooks";

const kpiData = [
  {
    icon: "local_shipping",
    badge: "+12.5%",
    label: "Active Shipments",
    value: "1,284",
    accentColor: "bg-secondary",
    iconColor: "text-secondary",
    iconBg: "bg-secondary/10",
    badgeColor: "text-secondary bg-secondary/10",
  },
  {
    icon: "timer",
    badge: "98.2%",
    label: "On-time Delivery",
    value: "96.8%",
    accentColor: "bg-primary",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
    badgeColor: "text-primary bg-primary/10",
  },
  {
    icon: "payments",
    badge: "+$42k",
    label: "Weekly Revenue",
    value: "$482.5k",
    accentColor: "bg-tertiary",
    iconColor: "text-tertiary",
    iconBg: "bg-tertiary/10",
    badgeColor: "text-tertiary bg-tertiary/10",
  },
  {
    icon: "warning",
    badge: "High",
    label: "Critical Alerts",
    value: "14",
    accentColor: "bg-error",
    iconColor: "text-error",
    iconBg: "bg-error/10",
    badgeColor: "text-error bg-error/10",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div key={kpi.label} className="glass p-6 rounded-xl relative overflow-hidden group">
          <div className={`absolute top-0 left-0 w-1 h-full ${kpi.accentColor}`} />
          <div className="flex justify-between items-start mb-4">
            <span className={`material-symbols-outlined ${kpi.iconColor} ${kpi.iconBg} p-2 rounded-lg`}>
              {kpi.icon}
            </span>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.badgeColor}`}>
              {kpi.badge}
            </span>
          </div>
          <p className="text-on-surface-variant text-sm font-medium mb-1">{kpi.label}</p>
          <h3 className="text-3xl font-bold font-headline text-on-surface">{kpi.value}</h3>
        </div>
      ))}
    </div>
  );
}
