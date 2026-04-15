"use client";

const urgentShipments = [
  {
    id: "SHP-092241",
    route: "Chicago → New York",
    status: "In Transit",
    statusClass: "bg-secondary/10 text-secondary",
    alertIcon: "bolt",
    alertColor: "text-secondary",
    alertText: "Estimated delay: 14 mins",
    actions: [
      { label: "Re-route", className: "flex-1 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-all" },
      { icon: "mail", className: "w-10 h-8 flex items-center justify-center bg-outline-variant/10 rounded-lg" },
    ],
  },
  {
    id: "SHP-093552",
    route: "Austin → Seattle",
    status: "Pending",
    statusClass: "bg-tertiary/10 text-tertiary",
    alertIcon: "schedule",
    alertColor: "text-tertiary",
    alertText: "Awaiting driver assignment",
    actions: [
      { label: "Assign Now", className: "flex-1 py-2 bg-secondary/10 text-secondary text-xs font-semibold rounded-lg hover:bg-secondary/20 transition-all" },
      { icon: "call", className: "w-10 h-8 flex items-center justify-center bg-outline-variant/10 rounded-lg" },
    ],
  },
  {
    id: "SHP-091102",
    route: "Miami → Atlanta",
    status: "Arrived",
    statusClass: "bg-secondary/10 text-secondary",
    alertIcon: "check_circle",
    alertColor: "text-secondary",
    alertText: "Confirmed at hub A4",
    actions: [
      { label: "Confirm Delivery", className: "flex-1 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-all" },
    ],
  },
];

export function ActionList() {
  return (
    <div className="glass rounded-xl flex flex-col h-[500px]">
      <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center">
        <h2 className="font-headline font-bold text-lg text-on-surface">Urgent Shipments</h2>
        <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-secondary transition-colors">
          more_vert
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {urgentShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="p-4 rounded-xl bg-surface-container-high/40 hover:bg-surface-container-highest/60 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-headline font-semibold text-on-surface">{shipment.id}</h4>
                <p className="text-xs text-on-surface-variant">{shipment.route}</p>
              </div>
              <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${shipment.statusClass}`}>
                {shipment.status}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`material-symbols-outlined text-xs ${shipment.alertColor}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {shipment.alertIcon}
              </span>
              <p className={`text-xs font-medium italic ${shipment.alertColor}`}>{shipment.alertText}</p>
            </div>
            <div className="flex gap-2">
              {shipment.actions.map((action, i) =>
                action.label ? (
                  <button key={i} className={action.className}>{action.label}</button>
                ) : (
                  <button key={i} className={action.className}>
                    <span className="material-symbols-outlined text-sm text-on-surface-variant">{action.icon}</span>
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
