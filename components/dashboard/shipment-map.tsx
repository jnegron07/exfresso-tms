"use client";

export function ShipmentMap() {
  return (
    <div className="h-[500px] glass rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-surface">
        {/* Dark world map background */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full opacity-30"
          style={{ filter: "drop-shadow(0 0 8px rgba(107,216,203,0.3))" }}
        >
          {/* Simplified world map paths in teal */}
          <path d="M150 150 L200 120 L280 130 L300 160 L260 180 L200 175 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M300 120 L400 100 L450 130 L420 160 L360 155 L310 145 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M460 110 L560 95 L600 125 L580 155 L500 150 L465 135 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M170 200 L230 190 L250 240 L220 280 L170 260 L155 230 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M450 170 L560 155 L580 220 L540 260 L460 245 L440 210 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M590 140 L680 130 L720 170 L700 210 L630 205 L595 175 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M350 280 L430 270 L450 330 L420 370 L360 355 L340 310 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          <path d="M700 200 L800 185 L840 230 L810 275 L730 265 L695 235 Z" fill="#1e4a4a" stroke="#6BD8CB" strokeWidth="0.5"/>
          {/* Route lines */}
          <path d="M 200 200 Q 400 150 600 220" fill="none" stroke="#6BD8CB" strokeDasharray="6,4" strokeWidth="1.5" opacity="0.7"/>
          <path d="M 600 220 Q 750 180 870 210" fill="none" stroke="#6BD8CB" strokeDasharray="6,4" strokeWidth="1.5" opacity="0.7"/>
          {/* Pulse markers */}
          <circle cx="300" cy="195" r="5" fill="#6BD8CB" opacity="0.9"/>
          <circle cx="300" cy="195" r="12" fill="none" stroke="#6BD8CB" strokeWidth="1" opacity="0.4"/>
          <circle cx="570" cy="218" r="5" fill="#6BD8CB" opacity="0.9"/>
          <circle cx="570" cy="218" r="12" fill="none" stroke="#6BD8CB" strokeWidth="1" opacity="0.4"/>
          <circle cx="800" cy="205" r="5" fill="#6BD8CB" opacity="0.9"/>
          <circle cx="800" cy="205" r="12" fill="none" stroke="#6BD8CB" strokeWidth="1" opacity="0.4"/>
        </svg>
      </div>

      {/* Live Tracking Badge */}
      <div className="absolute top-6 left-6 flex flex-col gap-2">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-on-surface">Live Tracking Active</span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex gap-2">
        <button className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>
        </button>
        <button className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined text-sm">remove</span>
        </button>
        <button className="glass w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 text-on-surface-variant transition-colors">
          <span className="material-symbols-outlined text-sm">layers</span>
        </button>
      </div>
    </div>
  );
}
