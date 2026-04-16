"use client";

const marketIndex = {
  value: "$2,842.50",
  trend: "3.2%",
  isUp: false,
};

const laneEfficiency = [
  { lane: "SHN > LAX", value: "98%", color: "bg-secondary/40", hover: "hover:scale-[1.02]" },
  { lane: "HKG > LON", value: "72%", color: "bg-secondary/20", hover: "hover:scale-[1.02]" },
  { lane: "SIN > NYK", value: "84%", color: "bg-secondary/30", hover: "hover:scale-[1.02]" },
  { lane: "HAM > DUB", value: "31%", color: "bg-error/30", hover: "hover:scale-[1.02]", text: "text-error" },
  { isCluster: true, title: "High Stability Cluster", main: "SE Asia", note: "Average lane efficiency maintains 82.5% through peak season volatility.", span: "col-span-2 row-span-2" },
  { lane: "PUS > OAK", value: "76%", color: "bg-secondary/25" },
  { lane: "TKO > VAN", value: "--", color: "bg-surface-container-highest" },
  { lane: "XMN > SAV", value: "100%", color: "bg-secondary/60" },
  { lane: "SGN > ROT", value: "64%", color: "bg-secondary/15" },
];

const carriers = [
  { name: "Oceanic Blue Lines", rate: "$2,140", surcharge: "+$145", surType: "BAF", time: "18 Days", reliability: 4, isSmart: true },
  { name: "Trans-Continental Exp.", rate: "$2,380", surcharge: "+$120", surType: "PSS", time: "14 Days", reliability: 5, isSmart: false },
  { name: "Global Swift Cargo", rate: "$1,950", surcharge: "+$210", surType: "SUR", time: "24 Days", reliability: 2, isSmart: false, warning: "Congestion Warning" },
];

export default function RateCardsPage() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto w-full relative overflow-hidden">
      {/* Background Ethereal Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">Market Architect | Rate Intelligence</h2>
        <p className="text-on-surface-variant mt-1">Multi-modal AI pathfinding with real-time risk assessment.</p>
      </div>

      {/* 1. Market Index Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-sm font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-2">Global Aggregate Index</h2>
              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-extrabold tracking-tighter text-on-surface">{marketIndex.value}</span>
                <span className="flex items-center text-secondary font-bold">
                  <span className="material-symbols-outlined">{marketIndex.isUp ? "trending_up" : "trending_down"}</span>
                  {marketIndex.trend}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="px-4 py-1.5 rounded-full bg-surface-container-highest text-xs font-bold text-secondary">OCEAN</span>
              <span className="px-4 py-1.5 rounded-full bg-surface-container-low text-xs font-bold text-on-surface-variant">AIR</span>
            </div>
          </div>
          {/* Chart Container */}
          <div className="h-[320px] w-full bg-surface-container-low/60 backdrop-blur-md rounded-2xl overflow-hidden relative p-8 group border border-white/5">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6bd8cb 1px, transparent 0)", backgroundSize: "24px 24px" }} />
            <div className="w-full h-full flex items-end justify-between gap-1">
              {[60, 65, 55, 70, 85, 75, 60, 50, 45, 40, 35, 30].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-full rounded-t-lg transition-all duration-300 ${i === 5 ? "bg-secondary/40 shadow-[0_0_20px_rgba(107,216,203,0.2)]" : "bg-surface-variant/20 hover:bg-secondary/20"}`} 
                  style={{ height: `${h}%` }}
                >
                  {i === 5 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] font-bold text-secondary bg-surface-container-highest px-2 py-1 rounded shadow-xl whitespace-nowrap">
                      Current: 2.8k
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-8 right-8 flex justify-between text-[10px] font-bold text-on-surface-variant/40 tracking-widest uppercase">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl relative overflow-hidden border-l-4 border-tertiary bg-surface-container-low/60 backdrop-blur-md border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <h3 className="font-bold text-tertiary uppercase tracking-wider text-xs">AI Prediction Tag</h3>
            </div>
            <p className="text-xl font-bold text-on-surface leading-tight mb-4">Anticipated 5% decrease in trans-pacific lanes</p>
            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span>Projected for Q3 2024</span>
            </div>
          </div>
          <div className="bg-surface-container-high/60 backdrop-blur-md rounded-2xl p-6 border border-white/5">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Market Sentiment</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-surface-container-lowest h-2 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[72%] rounded-full shadow-[0_0_8px_rgba(107,216,203,0.4)]" />
              </div>
              <span className="text-sm font-bold text-secondary">Bullish</span>
            </div>
            <p className="mt-4 text-xs text-on-surface-variant/70 leading-relaxed italic">
              "Inventory replenishment cycles in North America are stabilizing, leading to increased demand in secondary lanes."
            </p>
          </div>
        </div>
      </section>

      {/* 2. Carrier Quote Benchmarking */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface italic">Active Benchmarking Comparison</h2>
          <button className="text-secondary text-xs font-bold flex items-center gap-2 hover:bg-secondary/10 px-4 py-2 rounded-lg transition-all uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">filter_list</span> Filter View
          </button>
        </div>
        <div className="grid grid-cols-1 gap-px bg-outline-variant/10 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
          {/* Header */}
          <div className="grid grid-cols-6 px-8 py-4 bg-surface-container-lowest text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] opacity-50">
            <div className="col-span-2">Carrier Entity</div>
            <div>Base Rate</div>
            <div>Surcharges</div>
            <div>Transit Time</div>
            <div className="text-right">Reliability</div>
          </div>
          {/* rows */}
          {carriers.map((carrier, i) => (
            <div 
              key={i} 
              className={`grid grid-cols-6 px-8 py-6 items-center transition-all bg-surface-container/80 hover:bg-surface-container-high relative group cursor-pointer`}
            >
              {carrier.isSmart && <div className="absolute inset-y-0 left-0 w-1 bg-secondary shadow-[0_0_12px_rgba(107,216,203,0.4)]" />}
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center p-2 border border-white/5">
                  <span className="material-symbols-outlined text-secondary text-2xl">local_shipping</span>
                </div>
                <div>
                  <div className="font-bold text-lg text-on-surface">{carrier.name}</div>
                  <div className={`text-[10px] font-bold flex items-center gap-1 uppercase tracking-tight ${carrier.isSmart ? "text-secondary" : carrier.warning ? "text-error" : "text-on-surface-variant opacity-60"}`}>
                    {carrier.isSmart && <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>}
                    {carrier.isSmart ? "Smart Choice" : carrier.warning ? carrier.warning : "Premium Tier"}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-headline font-black text-on-surface">{carrier.rate}</div>
              <div className="text-sm text-on-surface-variant font-medium">
                {carrier.surcharge} <span className="text-[10px] font-bold opacity-40 ml-1">{carrier.surType}</span>
              </div>
              <div className="text-sm font-bold text-on-surface">{carrier.time}</div>
              <div className="flex justify-end gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <span 
                    key={star} 
                    className={`w-1.5 h-5 rounded-full ${star <= carrier.reliability ? "bg-secondary shadow-[0_0_8px_rgba(107,216,203,0.3)]" : "bg-surface-container-highest opacity-30"}`} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Matrix & Volatility */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface italic">Lane Efficiency Matrix</h2>
          <div className="grid grid-cols-4 grid-rows-4 gap-3 bg-surface-container-low/40 p-4 rounded-3xl border border-white/5 aspect-[16/9] shadow-inner">
            {laneEfficiency.map((item, i) => (
              item.isCluster ? (
                <div key={i} className={`bg-secondary/10 rounded-2xl ${item.span} p-6 flex flex-col justify-between border border-secondary/10 shadow-lg`}>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary opacity-80">{item.title}</div>
                  <div className="text-5xl font-black text-on-surface tracking-tighter">{item.main}</div>
                  <p className="text-[10px] text-on-surface-variant font-medium leading-relaxed">{item.note}</p>
                </div>
              ) : (
                <div 
                  key={i} 
                  className={`${item.color} rounded-xl flex flex-col justify-end p-4 transition-all duration-300 cursor-pointer ${item.hover || ""}`}
                >
                  <span className={`text-[10px] font-black uppercase tracking-tight ${item.text || "text-on-surface-variant opacity-60"}`}>
                    {item.lane}
                  </span>
                  <span className={`text-xl font-black ${item.text || "text-on-surface"}`}>{item.value}</span>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-on-surface italic">Recent Volatility</h2>
          <div className="space-y-3">
            {[
              { color: "bg-error", title: "Suez Canal Delay", note: "Impacting Mediterranean Lanes" },
              { color: "bg-secondary", title: "West Coast Fluidity", note: "Rail dwell times decreased 14%" },
              { color: "bg-tertiary", title: "GRI Notification", note: "Multiple carriers announce Feb 1st rate hikes" },
            ].map((v, i) => (
              <div key={i} className="bg-surface-container/60 hover:bg-surface-container-high p-4 rounded-xl flex items-center justify-between group cursor-pointer border border-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${v.color} shadow-lg`} />
                  <div>
                    <div className="text-sm font-bold text-on-surface">{v.title}</div>
                    <div className="text-[10px] text-on-surface-variant font-medium opacity-60">{v.note}</div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">chevron_right</span>
              </div>
            ))}
          </div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-surface-container-high to-surface-container border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
            <div className="text-xs font-black text-on-surface-variant mb-4 uppercase tracking-[0.2em] opacity-40">Carrier Reliability Index</div>
            <div className="text-6xl font-black text-secondary tracking-tighter mb-1">84.2</div>
            <div className="text-xs font-bold text-on-surface-variant opacity-60">+2.1 pts vs previous month</div>
          </div>
        </div>
      </section>

      {/* Floating AI Assistant */}
      <div className="fixed bottom-10 right-10 z-[100] w-96 transform hover:-translate-y-2 transition-transform duration-500">
        <div className="glass-panel shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden flex flex-col border border-secondary/20 scale-95 hover:scale-100 transition-all">
          <div className="bg-surface-container-highest px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_#6bd8cb]" />
              <span className="text-sm font-black tracking-tight text-on-surface uppercase">Architect Assistant</span>
            </div>
            <button className="text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <div className="p-6 space-y-6 bg-[#0b1326]/80 backdrop-blur-3xl">
            <div className="bg-surface-container-low/80 rounded-2xl p-4 text-sm leading-relaxed border-l-4 border-secondary shadow-inner font-medium text-on-surface-variant italic">
              "I've analyzed the SHN-LAX market. Target rates should be below <strong className="text-secondary">$2,080</strong> for the next 48 hours to capitalize on the current capacity surplus."
            </div>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-secondary to-secondary-container text-on-secondary py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                <span className="material-symbols-outlined text-lg">rocket_launch</span> Apply Target Rate
              </button>
              <button className="w-full bg-surface-variant/20 hover:bg-surface-variant/40 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-on-surface-variant transition-all border border-white/5">
                Generate Negotiation Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
