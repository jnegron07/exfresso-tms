"use client";

const actionItems = [
  {
    icon: "warning",
    iconColor: "text-[#ffb4ab]",
    iconBg: "bg-[#ffb4ab]/10",
    title: "Overdue milestone: SHP-092241",
    description: "Customs clearance was expected 6 hours ago at Port of Rotterdam.",
    age: "6 hours ago",
    actionLabel: "Escalate",
    actionClass: "bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20",
  },
  {
    icon: "description",
    iconColor: "text-[#e7c08b]",
    iconBg: "bg-[#e7c08b]/10",
    title: "Missing Bill of Lading",
    description: "SHP-094001 (Busan → Santos) requires BOL upload before departure.",
    age: "2 hours ago",
    actionLabel: "Upload",
    actionClass: "bg-[#e7c08b]/10 text-[#e7c08b] hover:bg-[#e7c08b]/20",
  },
  {
    icon: "timer",
    iconColor: "text-[#b7c6ee]",
    iconBg: "bg-[#b7c6ee]/10",
    title: "Rate card expiring: Trans-Pacific",
    description: "Oceanic Blue Lines contract expires in 48 hours. Renewal needed.",
    age: "1 day ago",
    actionLabel: "Renew",
    actionClass: "bg-[#b7c6ee]/10 text-[#b7c6ee] hover:bg-[#b7c6ee]/20",
  },
  {
    icon: "gavel",
    iconColor: "text-[#ffb4ab]",
    iconBg: "bg-[#ffb4ab]/10",
    title: "Customs hold: SHP-091102",
    description: "Documentation flagged at New York port. Additional invoice required.",
    age: "3 hours ago",
    actionLabel: "Resolve",
    actionClass: "bg-[#ffb4ab]/10 text-[#ffb4ab] hover:bg-[#ffb4ab]/20",
  },
  {
    icon: "local_shipping",
    iconColor: "text-[#6BD8CB]",
    iconBg: "bg-[#6BD8CB]/10",
    title: "Driver unassigned: SHP-093552",
    description: "Austin → Seattle shipment pending driver assignment for pickup.",
    age: "4 hours ago",
    actionLabel: "Assign",
    actionClass: "bg-[#6BD8CB]/10 text-[#6BD8CB] hover:bg-[#6BD8CB]/20",
  },
];

export function ActionList() {
  return (
    <div className="glass rounded-2xl flex flex-col h-full">
      <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb4ab] text-lg">priority_high</span>
          <h2 className="font-headline font-bold text-lg text-on-surface">Action Required</h2>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab]">
          {actionItems.length} items
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {actionItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-container-high/30 hover:bg-surface-container-highest/40 transition-colors group"
          >
            <div className="flex items-start gap-3">
              <span
                className={`material-symbols-outlined ${item.iconColor} ${item.iconBg} p-2 rounded-lg text-lg shrink-0`}
              >
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-sm font-semibold text-on-surface leading-tight">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-on-surface-variant/60 whitespace-nowrap shrink-0">
                    {item.age}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant/70 leading-relaxed mb-3">
                  {item.description}
                </p>
                <button
                  className={`text-[11px] font-bold px-3.5 py-1.5 rounded-lg transition-all ${item.actionClass}`}
                >
                  {item.actionLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
