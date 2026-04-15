"use client";

const activities = [
  {
    icon: "local_shipping",
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    iconBorder: "border-secondary/30",
    title: "Shipment",
    highlight: "#SHP-092241",
    titleEnd: " Departed",
    time: "2 mins ago",
    description: "Origin hub reached Chicago Metro. Expected arrival in New York updated to 06:00 PM EST.",
  },
  {
    icon: "smart_toy",
    iconBg: "bg-tertiary/20",
    iconColor: "text-tertiary",
    iconBorder: "border-tertiary/30",
    title: "AI Route Optimization Triggered",
    highlight: null,
    titleEnd: "",
    time: "14 mins ago",
    description: "Predictive engine recalibrated route for 12 fleet vehicles due to weather advisory in the Mid-West.",
  },
  {
    icon: "verified",
    iconBg: "bg-primary/20",
    iconColor: "text-primary",
    iconBorder: "border-primary/30",
    title: "Carrier Compliance Verified",
    highlight: null,
    titleEnd: "",
    time: "1 hour ago",
    description: "Global Logistics Partners (GLP) documentation successfully validated for next 90-day cycle.",
  },
];

export function ActivityFeed() {
  return (
    <section className="glass rounded-xl p-8 overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-headline font-bold text-xl tracking-tight text-on-surface">
          Recent Activity Feed
        </h2>
        <button className="text-xs font-bold text-on-surface-variant hover:text-secondary uppercase tracking-widest transition-colors">
          View All Logs
        </button>
      </div>
      <div className="space-y-6 relative">
        {/* Timeline vertical line */}
        <div className="absolute left-[19px] top-2 bottom-2 w-px bg-outline-variant/20" />

        {activities.map((activity, index) => (
          <div key={index} className="flex gap-6 relative">
            <div
              className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center z-10 border ${activity.iconBorder} shrink-0`}
            >
              <span className={`material-symbols-outlined ${activity.iconColor} text-sm`}>
                {activity.icon}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <p className="text-on-surface font-semibold">
                  {activity.title}
                  {activity.highlight && (
                    <span className="text-secondary"> {activity.highlight}</span>
                  )}
                  {activity.titleEnd}
                </p>
                <span className="text-xs text-on-surface-variant whitespace-nowrap ml-4">
                  {activity.time}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
