"use client";

const kpiData = [
  {
    icon: "local_shipping",
    label: "Active Shipments",
    value: "1,284",
    trend: 12.5,
    trendLabel: "vs last month",
    gradient: "from-[#0D9488]/10 to-white/5",
    accentColor: "bg-[#0D9488]",
    iconColor: "text-[#0D9488]",
    iconBg: "bg-[#0D9488]/10",
  },
  {
    icon: "flight_land",
    label: "Arriving Today",
    value: "38",
    trend: 8.3,
    trendLabel: "vs yesterday",
    gradient: "from-[#b7c6ee]/10 to-white/5",
    accentColor: "bg-[#b7c6ee]",
    iconColor: "text-[#b7c6ee]",
    iconBg: "bg-[#b7c6ee]/10",
  },
  {
    icon: "request_quote",
    label: "Open Quotes",
    value: "56",
    trend: -4.2,
    trendLabel: "vs last week",
    gradient: "from-[#e7c08b]/10 to-white/5",
    accentColor: "bg-[#e7c08b]",
    iconColor: "text-[#e7c08b]",
    iconBg: "bg-[#e7c08b]/10",
  },
  {
    icon: "pending_actions",
    label: "Pending Actions",
    value: "14",
    trend: 22.0,
    trendLabel: "vs last week",
    gradient: "from-[#ffb4ab]/10 to-white/5",
    accentColor: "bg-[#ffb4ab]",
    iconColor: "text-[#ffb4ab]",
    iconBg: "bg-[#ffb4ab]/10",
  },
];

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div
          key={kpi.label}
          className={`relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br ${kpi.gradient} p-6 transition-all hover:shadow-lg hover:shadow-black/10 group`}
        >
          <div className={`absolute top-0 left-0 w-1 h-full ${kpi.accentColor}`} />

          <div className="flex items-center justify-between mb-4">
            <span
              className={`material-symbols-outlined ${kpi.iconColor} ${kpi.iconBg} p-2.5 rounded-xl text-xl`}
            >
              {kpi.icon}
            </span>
          </div>

          <h3 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface mb-1">
            {kpi.value}
          </h3>
          <p className="text-sm font-medium text-on-surface-variant mb-3">{kpi.label}</p>

          <div className="flex items-center gap-1.5">
            <span
              className={`material-symbols-outlined text-sm ${kpi.trend >= 0 ? "text-[#0D9488]" : "text-[#ffb4ab]"}`}
            >
              {kpi.trend >= 0 ? "trending_up" : "trending_down"}
            </span>
            <span
              className={`text-xs font-bold ${kpi.trend >= 0 ? "text-[#0D9488]" : "text-[#ffb4ab]"}`}
            >
              {kpi.trend >= 0 ? "+" : ""}
              {kpi.trend}%
            </span>
            <span className="text-xs text-on-surface-variant/60">{kpi.trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
