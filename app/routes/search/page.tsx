"use client";

import { useState } from "react";

const routeResults = [
  {
    carrier: "Maersk Line Alpha",
    badge: "AI Top Match",
    badgeClass: "bg-secondary/10 text-secondary border-secondary/20",
    price: "$4,200",
    priceClass: "text-secondary",
    modes: [
      { icon: "local_shipping", label: "Road", isMain: false },
      { icon: "directions_boat", label: "Sea (Main)", isMain: true, activeClass: "bg-secondary ring-secondary/20 shadow-[0_0_15px_rgba(107,216,203,0.3)]", textClass: "text-on-secondary", labelClass: "text-secondary" },
      { icon: "local_shipping", label: "Road", isMain: false },
    ],
    duration: "18 Days",
    confidence: "98%",
    ecoLabel: "Eco-Impact",
    ecoNote: "Carbon Neutral Cert.",
    ecoColor: "text-green-400",
    ecoIcon: "eco",
  },
  {
    carrier: "SwiftAir Cargo",
    badge: "Fastest Route",
    badgeClass: "bg-primary/10 text-primary border-primary/20",
    price: "$8,950",
    priceClass: "text-primary",
    modes: [
      { icon: "local_shipping", label: "Road", isMain: false },
      { icon: "flight", label: "Air Direct", isMain: true, activeClass: "bg-primary ring-primary/20 shadow-[0_0_15px_rgba(183,198,238,0.3)]", textClass: "text-on-primary", labelClass: "text-primary" },
      { icon: "local_shipping", label: "Road", isMain: false },
    ],
    duration: "3 Days",
    confidence: "92%",
    ecoLabel: "High Emission",
    ecoNote: "+140% CO2 vs Sea",
    ecoColor: "text-on-surface-variant",
    ecoIcon: "factory",
  },
  {
    carrier: "Intermodal Euro Express",
    badge: "Cost Efficient",
    badgeClass: "bg-white/5 text-on-surface-variant border-white/10",
    price: "$3,150",
    priceClass: "text-on-surface",
    modes: [
      { icon: "train", label: "Rail", isMain: false },
      { icon: "directions_boat", label: "Sea", isMain: false },
      { icon: "local_shipping", label: "Road", isMain: false },
    ],
    duration: "24 Days",
    confidence: "85%",
    ecoLabel: "Eco-Impact",
    ecoNote: "Low Impact Mode",
    ecoColor: "text-green-400",
    ecoIcon: "eco",
  },
];

export default function RoutesSearchPage() {
  const [origin, setOrigin] = useState("Port of Singapore (SGP)");
  const [destination, setDestination] = useState("Berlin Logistics Hub (GER)");
  const [prioritizeSpeed, setPrioritizeSpeed] = useState(true);
  const [prioritizeCost, setPrioritizeCost] = useState(false);
  const [prioritizeSustainability, setPrioritizeSustainability] = useState(true);

  return (
    <div className="px-8 pb-12 min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-8 pt-8">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Predictive Logistics Engine
        </h2>
        <p className="text-on-surface-variant mt-1">
          Multi-modal AI pathfinding with real-time risk assessment.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Panel: Route Parameters */}
        <section className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6">
          <div
            className="p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/5 relative overflow-hidden"
            style={{ background: "rgba(19,27,46,0.6)", backdropFilter: "blur(40px)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 blur-[60px] pointer-events-none" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              Route Parameters
            </h3>
            <div className="space-y-5">
              {/* Origin */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-on-surface-variant/80 uppercase tracking-wider ml-1">
                  Origin
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-secondary">
                    location_on
                  </span>
                  <input
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-surface-container-highest/60 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                    type="text"
                  />
                </div>
              </div>
              {/* Destination */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-on-surface-variant/80 uppercase tracking-wider ml-1">
                  Destination
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-error">
                    flag
                  </span>
                  <input
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-surface-container-highest/60 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                    type="text"
                  />
                </div>
              </div>
              {/* Load Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-on-surface-variant/80 uppercase tracking-wider ml-1">
                  Load Type
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant/60">
                    inventory_2
                  </span>
                  <select className="w-full bg-surface-container-highest/60 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 appearance-none">
                    <option>Hazardous Chemical Drums</option>
                    <option>Refrigerated Medical</option>
                    <option>Standard Freight</option>
                  </select>
                </div>
              </div>
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-on-surface-variant/80 uppercase tracking-wider ml-1">
                  Expected Delivery
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant/60">
                    calendar_today
                  </span>
                  <input
                    className="w-full bg-surface-container-highest/60 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/50 transition-all"
                    type="date"
                  />
                </div>
              </div>
              <button className="w-full mt-4 py-4 rounded-xl bg-secondary hover:bg-secondary-container text-on-secondary font-headline font-bold text-sm tracking-wide transition-all shadow-[0_10px_20px_rgba(107,216,203,0.3)] hover:shadow-[0_15px_30px_rgba(107,216,203,0.4)] active:scale-[0.97]">
                Calculate Optimized Routes
              </button>
            </div>
          </div>

          {/* Neural Weighting */}
          <div
            className="p-6 rounded-3xl border border-white/5 space-y-4"
            style={{ background: "rgba(19,27,46,0.4)" }}
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              Neural Weighting
            </h3>
            {[
              { label: "Prioritize Speed", value: prioritizeSpeed, set: setPrioritizeSpeed },
              { label: "Prioritize Cost", value: prioritizeCost, set: setPrioritizeCost },
              { label: "Prioritize Sustainability", value: prioritizeSustainability, set: setPrioritizeSustainability },
            ].map((toggle) => (
              <label key={toggle.label} className="flex items-center justify-between group cursor-pointer">
                <span className="text-sm font-medium text-on-surface/80 group-hover:text-on-surface transition-colors">
                  {toggle.label}
                </span>
                <div className="relative inline-flex items-center cursor-pointer" onClick={() => toggle.set(!toggle.value)}>
                  <div className={`w-11 h-6 rounded-full transition-colors ${toggle.value ? "bg-secondary" : "bg-surface-container-highest"} relative`}>
                    <div className={`absolute top-[2px] w-5 h-5 bg-white rounded-full transition-transform ${toggle.value ? "translate-x-5" : "translate-x-0.5"}`} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Right Panel: AI & Results */}
        <section className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-8">
          {/* AI Processing State */}
          <div
            className="relative rounded-3xl p-12 overflow-hidden border border-white/5 flex flex-col items-center justify-center text-center"
            style={{ background: "rgba(45,52,73,0.2)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
              <div className="w-48 h-48 bg-primary/10 rounded-full blur-[60px] animate-pulse" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-highest mb-6 ring-1 ring-secondary/30">
                <span
                  className="material-symbols-outlined text-4xl text-secondary animate-pulse"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  generating_tokens
                </span>
              </div>
              <h4 className="text-xl font-headline font-bold text-on-surface mb-2">
                AI Normalizing Rates &amp; Predicting Delays...
              </h4>
              <div className="flex items-center justify-center gap-6 mt-4">
                {["Analyzing Red Sea Risk Levels", "Cross-referencing Carrier Availability"].map((text) => (
                  <div key={text} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-xs text-on-surface-variant font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route Result Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {routeResults.map((route) => (
              <div
                key={route.carrier}
                className="group p-6 rounded-3xl border border-white/5 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-surface-container-highest/40"
                style={{ background: "rgba(19,27,46,0.6)" }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-secondary">{route.modes[1].icon}</span>
                    </div>
                    <div>
                      <h5 className="text-lg font-headline font-bold text-on-surface">{route.carrier}</h5>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-tighter ${route.badgeClass}`}>
                        {route.badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-headline font-extrabold ${route.priceClass}`}>{route.price}</p>
                    <p className="text-xs text-on-surface-variant font-medium">Total Cost Est.</p>
                  </div>
                </div>

                {/* Multi-modal Path */}
                <div className="flex items-center gap-4 mb-8 relative">
                  <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-px bg-white/10 border-dashed border-t border-white/20 -z-0" />
                  {route.modes.map((mode, i) => (
                    <div key={i} className={`flex flex-col items-center gap-1 z-10 bg-surface-container-low px-2 ${mode.isMain ? "flex-1" : ""}`}>
                      {mode.isMain ? (
                        <div className="flex justify-center items-center gap-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ${mode.activeClass}`}>
                            <span
                              className={`material-symbols-outlined text-sm ${mode.textClass}`}
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {mode.icon}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center ring-2 ring-white/5">
                          <span className="material-symbols-outlined text-sm">{mode.icon}</span>
                        </div>
                      )}
                      <span className={`text-[9px] font-bold uppercase ${mode.isMain && mode.labelClass ? mode.labelClass : "text-on-surface-variant"}`}>
                        {mode.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Duration</p>
                    <p className="text-sm font-bold text-on-surface">{route.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-medium">Confidence</p>
                    <p className="text-sm font-bold text-secondary">{route.confidence}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${route.ecoColor}`}>
                      <span className="material-symbols-outlined text-sm">{route.ecoIcon}</span>
                      {route.ecoLabel}
                    </span>
                    <p className="text-[10px] text-on-surface-variant font-medium">{route.ecoNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
