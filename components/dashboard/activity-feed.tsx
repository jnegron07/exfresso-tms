"use client";

const activities = [
  {
    icon: "local_shipping",
    iconBg: "bg-[#6BD8CB]/10",
    iconColor: "text-[#6BD8CB]",
    iconBorder: "border-[#6BD8CB]/20",
    title: "Shipment",
    highlight: "#SHP-092241",
    titleEnd: " departed Shanghai",
    time: "2 mins ago",
    description: "Origin hub cleared. Vessel Ever Apex en route to Rotterdam via Suez Canal.",
    link: "/shipments/SHP-092241",
  },
  {
    icon: "confirmation_number",
    iconBg: "bg-[#b7c6ee]/10",
    iconColor: "text-[#b7c6ee]",
    iconBorder: "border-[#b7c6ee]/20",
    title: "New booking created:",
    highlight: "#SHP-094320",
    titleEnd: "",
    time: "18 mins ago",
    description: "Dubai → Mumbai, 40ft container. Carrier: Gulf Express Lines.",
    link: "/shipments/SHP-094320",
  },
  {
    icon: "gps_fixed",
    iconBg: "bg-[#6BD8CB]/10",
    iconColor: "text-[#6BD8CB]",
    iconBorder: "border-[#6BD8CB]/20",
    title: "Tracking update:",
    highlight: "#SHP-093552",
    titleEnd: " crossed Pacific",
    time: "45 mins ago",
    description: "Vessel position updated. Currently 800nm west of Hawaii. On schedule.",
    link: "/shipments/SHP-093552",
  },
  {
    icon: "handshake",
    iconBg: "bg-[#e7c08b]/10",
    iconColor: "text-[#e7c08b]",
    iconBorder: "border-[#e7c08b]/20",
    title: "Network connection:",
    highlight: "Global Logistics Partners",
    titleEnd: " verified",
    time: "1 hour ago",
    description: "Carrier compliance documentation validated for 90-day cycle.",
    link: "/network",
  },
  {
    icon: "verified",
    iconBg: "bg-[#6BD8CB]/10",
    iconColor: "text-[#6BD8CB]",
    iconBorder: "border-[#6BD8CB]/20",
    title: "Customs cleared:",
    highlight: "#SHP-090881",
    titleEnd: "",
    time: "2 hours ago",
    description: "All documentation approved at Port of Hamburg. Delivery scheduled for tomorrow.",
    link: "/shipments/SHP-090881",
  },
  {
    icon: "payments",
    iconBg: "bg-[#b7c6ee]/10",
    iconColor: "text-[#b7c6ee]",
    iconBorder: "border-[#b7c6ee]/20",
    title: "Rate card updated:",
    highlight: "Oceanic Blue Lines",
    titleEnd: "",
    time: "3 hours ago",
    description: "Trans-Pacific lane rates adjusted. New base rate: $2,140/TEU effective immediately.",
    link: "/rate-cards",
  },
];

export function ActivityFeed() {
  return (
    <div className="glass rounded-2xl flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#6BD8CB] text-lg">timeline</span>
          <h2 className="font-headline font-bold text-lg text-on-surface">Activity Feed</h2>
        </div>
        <button className="text-[11px] font-bold text-on-surface-variant hover:text-[#6BD8CB] uppercase tracking-widest transition-colors">
          View All
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1 relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-outline-variant/15" />

          {activities.map((activity, idx) => (
            <div key={idx} className="flex gap-4 relative p-2 rounded-xl hover:bg-surface-container-high/20 transition-colors group">
              <div
                className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center z-10 border ${activity.iconBorder} shrink-0`}
              >
                <span className={`material-symbols-outlined ${activity.iconColor} text-sm`}>
                  {activity.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <p className="text-sm text-on-surface font-medium leading-snug">
                    {activity.title}
                    {activity.highlight && (
                      <span className="text-[#6BD8CB] font-semibold"> {activity.highlight}</span>
                    )}
                    {activity.titleEnd}
                  </p>
                  <span className="text-[10px] text-on-surface-variant/60 whitespace-nowrap shrink-0 mt-0.5">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-1.5">
                  {activity.description}
                </p>
                <a
                  href={activity.link}
                  className="text-[10px] font-bold text-[#6BD8CB]/70 hover:text-[#6BD8CB] uppercase tracking-wider transition-colors opacity-0 group-hover:opacity-100"
                >
                  View Source →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
