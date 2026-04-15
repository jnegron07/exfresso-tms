import Link from "next/link";

const shipmentSteps = [
  { label: "Booked", icon: "check", done: true, active: false },
  { label: "Picked up", icon: "check", done: true, active: false },
  { label: "In Transit", icon: "local_shipping", done: false, active: true },
  { label: "Customs", icon: "gavel", done: false, active: false },
  { label: "Delivered", icon: "home", done: false, active: false },
];

const timelineItems = [
  {
    active: true,
    time: "10:15 AM · AI Prediction",
    title: "Potential 2h delay at Port of Singapore",
    description: "Congestion level 8/10 detected via satellite telemetry. Re-routing optimized for current speed.",
    icon: "psychology",
    isFeatured: true,
  },
  {
    active: false,
    time: "14:20 PM · System Event",
    title: "Departed Port of Shanghai",
    description: null,
    icon: null,
    isFeatured: false,
  },
  {
    active: false,
    time: "Yesterday · Documentation",
    title: "Electronic Bill of Lading Verified",
    description: null,
    icon: null,
    isFeatured: false,
  },
];

const documents = [
  { icon: "description", name: "Bill of Lading", meta: "BOL-99284-A · PDF · 2.4MB", status: "ai-verify" },
  { icon: "receipt_long", name: "Commercial Invoice", meta: "INV-SH-ROT-442 · PDF · 1.1MB", status: "verified" },
  { icon: "inventory_2", name: "Packing List", meta: "PL-99284 · XLSX · 450KB", status: "ai-verify" },
];

export default async function ShipmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-8 space-y-12">
      {/* Shipment Header */}
      <section className="mt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                IN TRANSIT
              </span>
              <span className="text-on-surface-variant/60 font-mono text-sm">#{id || "SHIP-99284"}</span>
            </div>
            <h1 className="text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-2">
              Shanghai{" "}
              <span className="text-primary-container text-3xl mx-2">→</span>{" "}
              Rotterdam
            </h1>
            <p className="text-on-surface-variant max-w-2xl leading-relaxed">
              Vessel: <span className="text-on-surface font-semibold">Ever Apex</span> | Expected Arrival:{" "}
              <span className="text-on-surface font-semibold">Oct 24, 2024</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl bg-surface-container-high text-on-surface text-sm font-medium hover:bg-surface-variant transition-colors">
              Route Map
            </button>
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-bold shadow-lg">
              Action Intel
            </button>
          </div>
        </div>
      </section>

      {/* Progress Milestone Bar */}
      <section className="relative">
        <div
          className="p-8 rounded-xl relative overflow-hidden"
          style={{ backdropFilter: "blur(20px)", background: "rgba(45, 52, 73, 0.6)" }}
        >
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-outline-variant/20 -translate-y-1/2" />
          <div className="absolute top-1/2 left-8 w-[40%] h-0.5 bg-secondary -translate-y-1/2" />
          <div className="flex justify-between relative z-10">
            {shipmentSteps.map((step, i) => (
              <div key={i} className={`flex flex-col items-center gap-4 ${!step.done && !step.active ? "opacity-50" : ""}`}>
                <div
                  className={`flex items-center justify-center font-bold text-xs rounded-full
                    ${step.active
                      ? "w-12 h-12 border-4 border-secondary/20 bg-secondary text-on-secondary animate-pulse"
                      : step.done
                      ? "w-10 h-10 bg-secondary text-on-secondary"
                      : "w-10 h-10 bg-surface-container-highest text-on-surface-variant"
                    }
                  `}
                >
                  <span
                    className="material-symbols-outlined text-sm"
                    style={step.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {step.icon}
                  </span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-bold
                    ${step.active ? "text-secondary" : step.done ? "text-on-surface" : "text-on-surface-variant"}
                  `}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
        {/* Live Intelligence Timeline */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-headline font-bold text-xl text-on-surface">Live Intelligence</h3>
            <span className="text-[10px] text-secondary font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Live Sync
            </span>
          </div>
          <div className="space-y-0 border-l-2 border-outline-variant/10 ml-3">
            {timelineItems.map((item, i) => (
              <div key={i} className="relative pl-10 pb-12">
                {item.active ? (
                  <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-secondary shadow-[0_0_12px_#0D9488]" />
                ) : (
                  <div className="absolute left-[-7px] top-0 w-3 h-3 rounded-full bg-outline-variant" />
                )}
                {item.isFeatured ? (
                  <div
                    className="p-5 rounded-xl border-l-4 border-secondary"
                    style={{ backdropFilter: "blur(20px)", background: "rgba(45, 52, 73, 0.6)" }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-tighter">
                        {item.time}
                      </span>
                      <span className="material-symbols-outlined text-secondary text-sm">{item.icon}</span>
                    </div>
                    <p className="text-sm font-medium text-on-surface">{item.title}</p>
                    <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{item.description}</p>
                  </div>
                ) : (
                  <div className="bg-surface-container-low p-5 rounded-xl">
                    <span className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-tighter">
                      {item.time}
                    </span>
                    <p className="text-sm font-medium text-on-surface/80">{item.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mini Map */}
          <div className="rounded-xl overflow-hidden h-64 relative bg-surface-container-low">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <rect width="400" height="200" fill="#0b1326" />
                <line x1="50" y1="100" x2="350" y2="100" stroke="#6BD8CB" strokeWidth="1.5" strokeDasharray="8,4" opacity="0.5" />
                <circle cx="200" cy="100" r="8" fill="#6BD8CB" opacity="0.9"/>
                <circle cx="200" cy="100" r="16" fill="none" stroke="#6BD8CB" strokeWidth="1" opacity="0.4"/>
              </svg>
              <div className="absolute bottom-8 text-center">
                <div className="bg-surface px-2 py-1 rounded text-[10px] font-bold text-secondary">
                  EVER APEX · 18.2 kn
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-on-surface hover:text-secondary">
                <span className="material-symbols-outlined text-sm">fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Financial Ledger & Documents */}
        <div className="lg:col-span-6 space-y-12">
          {/* Financials */}
          <div className="space-y-6">
            <h3 className="font-headline font-bold text-xl text-on-surface">Financial Ledger</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-surface-container-low p-6 rounded-xl border-b-2 border-primary-container">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Expected Revenue</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-2xl font-headline font-bold text-on-surface">$14,820</h4>
                  <span className="text-secondary text-[10px] font-bold">+2.4%</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl border-b-2 border-outline-variant/30">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Actual Cost</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-2xl font-headline font-bold text-on-surface">$8,450</h4>
                  <span className="text-error text-[10px] font-bold">-$120</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl border-b-2 border-secondary/40">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4">Net Margin</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-2xl font-headline font-bold text-secondary">$6,370</h4>
                  <div className="h-6 w-16 bg-secondary/10 rounded overflow-hidden">
                    <div className="w-full h-full flex items-end gap-[1px] px-1">
                      <div className="bg-secondary/40 h-[30%] w-full" />
                      <div className="bg-secondary/40 h-[50%] w-full" />
                      <div className="bg-secondary/40 h-[40%] w-full" />
                      <div className="bg-secondary/40 h-[80%] w-full" />
                      <div className="bg-secondary h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-xl text-on-surface">Shipment Dossier</h3>
              <button className="text-sm font-medium text-primary hover:text-secondary transition-colors">
                Manage All
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between p-5 rounded-xl border border-outline-variant/10 hover:bg-surface-container-low transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">{doc.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{doc.name}</p>
                      <p className="text-xs text-on-surface-variant">{doc.meta}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {doc.status === "verified" ? (
                      <div className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest bg-secondary/10 text-secondary flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">check_circle</span>
                        Verified
                      </div>
                    ) : (
                      <button className="px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-secondary/30 text-secondary hover:bg-secondary/10 transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        AI Verify
                      </button>
                    )}
                    <button className="w-10 h-10 rounded-lg glass flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">visibility</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
