"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ─────────────────────────────────────────────────────────────────────

type SearchState = "idle" | "loading" | "results" | "empty";
type SortKey = "price" | "time" | "legs";
type TransportMode = "air" | "ocean" | "multimodal" | "any";

// ─── Port Data ─────────────────────────────────────────────────────────────────

const PORTS = [
  { code: "SGSIN", city: "Singapore",   country: "Singapore",     flag: "🇸🇬" },
  { code: "CNSHA", city: "Shanghai",    country: "China",         flag: "🇨🇳" },
  { code: "NLRTM", city: "Rotterdam",   country: "Netherlands",   flag: "🇳🇱" },
  { code: "USNYC", city: "New York",    country: "United States", flag: "🇺🇸" },
  { code: "DEHAM", city: "Hamburg",     country: "Germany",       flag: "🇩🇪" },
  { code: "AEDXB", city: "Dubai",       country: "UAE",           flag: "🇦🇪" },
  { code: "JPTYO", city: "Tokyo",       country: "Japan",         flag: "🇯🇵" },
  { code: "GBFXT", city: "Felixstowe",  country: "United Kingdom",flag: "🇬🇧" },
  { code: "KRPUS", city: "Busan",       country: "South Korea",   flag: "🇰🇷" },
  { code: "INMAA", city: "Mumbai",      country: "India",         flag: "🇮🇳" },
  { code: "BRSNT", city: "Santos",      country: "Brazil",        flag: "🇧🇷" },
  { code: "FRPAR", city: "Paris CDG",   country: "France",        flag: "🇫🇷" },
  { code: "CAVAN", city: "Vancouver",   country: "Canada",        flag: "🇨🇦" },
  { code: "CNNGB", city: "Ningbo",      country: "China",         flag: "🇨🇳" },
  { code: "ESPMI", city: "Barcelona",   country: "Spain",         flag: "🇪🇸" },
];

type Port = (typeof PORTS)[0];

// ─── Mock Route Results ────────────────────────────────────────────────────────

const MOCK_RESULTS = [
  {
    id: "r1",
    legs: [
      { icon: "local_shipping", label: "Road",  portCode: "SGSIN" },
      { icon: "directions_boat",label: "Sea",   portCode: "CNSHA" },
      { icon: "local_shipping", label: "Road",  portCode: "NLRTM" },
    ],
    transitDays: 18,
    legCount: 3,
    carriers: ["Maersk Line", "DHL Express"],
    totalPrice: 4200,
    currency: "USD",
    badge: { label: "Cheapest",    color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
    breakdown: [
      { label: "Ocean Freight",         amount: 2800 },
      { label: "Origin Trucking",       amount: 450  },
      { label: "Destination Trucking",  amount: 520  },
      { label: "Port Fees",             amount: 280  },
      { label: "Documentation",         amount: 150  },
    ],
  },
  {
    id: "r2",
    legs: [
      { icon: "local_shipping", label: "Road", portCode: "SGSIN" },
      { icon: "flight",         label: "Air",  portCode: "USNYC" },
      { icon: "local_shipping", label: "Road", portCode: "NLRTM" },
    ],
    transitDays: 3,
    legCount: 3,
    carriers: ["SQ Cargo", "Lufthansa Cargo"],
    totalPrice: 8950,
    currency: "USD",
    badge: { label: "Fastest",     color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/20" },
    breakdown: [
      { label: "Air Freight",           amount: 6800 },
      { label: "Origin Handling",       amount: 600  },
      { label: "Destination Handling",  amount: 850  },
      { label: "Security Surcharge",    amount: 400  },
      { label: "Documentation",         amount: 300  },
    ],
  },
  {
    id: "r3",
    legs: [
      { icon: "directions_boat", label: "Sea", portCode: "SGSIN" },
      { icon: "directions_boat", label: "Sea", portCode: "NLRTM" },
    ],
    transitDays: 22,
    legCount: 1,
    carriers: ["CMA CGM"],
    totalPrice: 3600,
    currency: "USD",
    badge: { label: "Most Direct", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
    breakdown: [
      { label: "Ocean Freight",  amount: 2600 },
      { label: "Port Fees",      amount: 560  },
      { label: "Fuel Surcharge", amount: 290  },
      { label: "Documentation",  amount: 150  },
    ],
  },
  {
    id: "r4",
    legs: [
      { icon: "train",           label: "Rail", portCode: "SGSIN" },
      { icon: "directions_boat", label: "Sea",  portCode: "DEHAM" },
      { icon: "local_shipping",  label: "Road", portCode: "NLRTM" },
    ],
    transitDays: 26,
    legCount: 3,
    carriers: ["DB Cargo", "Hapag-Lloyd"],
    totalPrice: 3150,
    currency: "USD",
    breakdown: [
      { label: "Rail Freight",          amount: 1200 },
      { label: "Ocean Freight",         amount: 1400 },
      { label: "Destination Trucking",  amount: 380  },
      { label: "Port Fees",             amount: 170  },
    ],
  },
];

type RouteResult = (typeof MOCK_RESULTS)[0];

// ─── Port Autocomplete Input ────────────────────────────────────────────────────

function PortInput({
  value,
  onChange,
  placeholder,
  icon,
  iconColor,
}: {
  value: string;
  onChange: (port: Port | null, text: string) => void;
  placeholder: string;
  icon: string;
  iconColor: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync with external value (e.g. swap button)
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const filtered = query.trim().length > 0
    ? PORTS.filter(
        (p) =>
          p.code.toLowerCase().includes(query.toLowerCase()) ||
          p.city.toLowerCase().includes(query.toLowerCase()) ||
          p.country.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : PORTS.slice(0, 6);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative flex-1 min-w-0">
      <span
        className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-base ${iconColor} pointer-events-none z-10 select-none`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(null, e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="w-full h-14 bg-surface-container-highest/50 border border-white/8 rounded-2xl pl-12 pr-4 text-sm font-semibold text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/40 transition-all"
      />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/8 shadow-2xl shadow-black/50 z-50 overflow-hidden"
            style={{ background: "rgba(15,22,42,0.98)", backdropFilter: "blur(40px)" }}
          >
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-on-surface-variant/60">No ports found</p>
            ) : (
              filtered.map((port) => (
                <button
                  key={port.code}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const display = `${port.code} — ${port.city}`;
                    setQuery(display);
                    onChange(port, display);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/4 last:border-0"
                >
                  <span className="text-xl w-7 flex-shrink-0 leading-none">{port.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-secondary tracking-widest">{port.code}</span>
                      <span className="text-sm font-semibold text-on-surface truncate">{port.city}</span>
                    </div>
                    <span className="text-xs text-on-surface-variant/50">{port.country}</span>
                  </div>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Loading State ──────────────────────────────────────────────────────────────

const LOADING_DURATION = 7000;

const LOADING_STEPS = [
  "Analyzing global vessel positions...",
  "Evaluating carrier availability across 34 networks...",
  "Calculating customs & compliance requirements...",
  "Optimizing for cost, speed and sustainability...",
  "Finalizing route recommendations...",
];

function LoadingState({ onDone }: { onDone: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const ms = Date.now() - start;
      const capped = Math.min(ms, LOADING_DURATION);
      setElapsed(capped);
      setStepIndex(Math.min(Math.floor((ms / LOADING_DURATION) * LOADING_STEPS.length), LOADING_STEPS.length - 1));
      if (ms >= LOADING_DURATION) {
        clearInterval(interval);
        onDoneRef.current();
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const progress  = elapsed / LOADING_DURATION;
  const seconds   = (elapsed / 1000).toFixed(1);
  const routeCalc = Math.floor(progress * 823 + 14);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0  }}
      exit={{   opacity: 0, y: -16 }}
      className="mt-6 relative rounded-3xl border border-white/5 overflow-hidden flex flex-col items-center justify-center py-20 px-8"
      style={{ background: "rgba(19,27,46,0.6)", backdropFilter: "blur(40px)" }}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-96 h-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(107,216,203,0.08) 0%, transparent 70%)" }}
        />
      </div>

      {/* Globe + orbiting dot */}
      <div className="relative flex items-center justify-center mb-10">
        {/* Outer pulse rings */}
        {[160, 200, 240].map((size, i) => (
          <motion.div
            key={size}
            animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.04, 0.12] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
            className="absolute rounded-full border border-secondary/30"
            style={{ width: size, height: size }}
          />
        ))}

        {/* Globe */}
        <div className="relative w-28 h-28 rounded-full bg-surface-container-highest flex items-center justify-center ring-1 ring-secondary/25 shadow-[0_0_60px_rgba(107,216,203,0.12)]">
          <span
            className="material-symbols-outlined text-6xl text-secondary select-none"
            style={{ fontVariationSettings: "'FILL' 1", animation: "pulse 3s ease-in-out infinite" }}
          >
            public
          </span>

          {/* Orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-18px]"
          >
            <div
              className="absolute w-3.5 h-3.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(107,216,203,0.9)]"
              style={{ top: "0%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
          </motion.div>

          {/* Counter-orbit dot */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px]"
          >
            <div
              className="absolute w-2 h-2 rounded-full bg-primary/60"
              style={{ bottom: "0%", left: "50%", transform: "translate(-50%, 50%)" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Message */}
      <h3 className="text-xl font-headline font-bold text-on-surface mb-2 text-center">
        Calculating all possible routes...
      </h3>
      <AnimatePresence mode="wait">
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, y: 6  }}
          animate={{ opacity: 1, y: 0  }}
          exit={{   opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-on-surface-variant text-center mb-2"
        >
          {LOADING_STEPS[stepIndex]}
        </motion.p>
      </AnimatePresence>
      <p className="text-xs text-secondary/70 font-mono mb-6">
        {routeCalc} route combinations evaluated
      </p>

      {/* Progress bar */}
      <div className="w-72 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-secondary shadow-[0_0_8px_rgba(107,216,203,0.6)]"
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.08 }}
        />
      </div>

      {/* Timer */}
      <p className="mt-2 text-xs font-mono text-on-surface-variant/30 tabular-nums">
        {seconds}s
      </p>
    </motion.div>
  );
}

// ─── Result Card ───────────────────────────────────────────────────────────────

function ResultCard({
  result,
  expanded,
  onToggleBreakdown,
}: {
  result: RouteResult;
  expanded: boolean;
  onToggleBreakdown: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0  }}
      className="rounded-3xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
      style={{ background: "rgba(19,27,46,0.65)", backdropFilter: "blur(20px)" }}
    >
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">

          {/* ── Left: Route diagram ── */}
          <div className="lg:w-64 xl:w-72 flex-shrink-0 flex flex-col gap-3">
            {result.badge ? (
              <span
                className={`self-start text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-widest ${result.badge.color} ${result.badge.bg}`}
              >
                {result.badge.label}
              </span>
            ) : (
              <div className="h-6" />
            )}

            {/* Mode icons + connecting lines */}
            <div className="flex items-start gap-0">
              {result.legs.map((leg, i) => (
                <div key={i} className="flex items-center gap-0">
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest border border-white/8 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-sm text-on-surface-variant"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {leg.icon}
                      </span>
                    </div>
                    <span className="text-[9px] font-black text-secondary tracking-wider">{leg.portCode}</span>
                  </div>
                  {i < result.legs.length - 1 && (
                    <div className="flex-1 h-px border-t border-dashed border-white/15 w-6 mb-5 mx-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Center: Stats ── */}
          <div className="flex-1 grid grid-cols-3 gap-4 pt-9">
            <div>
              <p className="text-[10px] font-semibold text-on-surface-variant/50 uppercase tracking-wider mb-1.5">
                Transit Time
              </p>
              <p className="text-xl font-headline font-extrabold text-on-surface leading-none">
                {result.transitDays}
                <span className="text-xs font-normal text-on-surface-variant ml-1">days</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-on-surface-variant/50 uppercase tracking-wider mb-1.5">
                Legs
              </p>
              <p className="text-xl font-headline font-extrabold text-on-surface leading-none">
                {result.legCount}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-on-surface-variant/50 uppercase tracking-wider mb-1.5">
                Carriers
              </p>
              <p className="text-sm font-semibold text-on-surface leading-snug">
                {result.carriers.join(", ")}
              </p>
            </div>
          </div>

          {/* ── Right: Price + actions ── */}
          <div className="flex flex-col items-end gap-3 lg:w-56 flex-shrink-0 pt-9">
            <div className="text-right">
              <p className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
                ${result.totalPrice.toLocaleString()}
              </p>
              <p className="text-xs text-on-surface-variant/60 mt-0.5">
                {result.currency} · Total estimated
              </p>
            </div>

            <button
              onClick={onToggleBreakdown}
              className="flex items-center gap-1 text-xs font-semibold text-secondary hover:text-secondary/70 transition-colors"
            >
              <span className="material-symbols-outlined text-sm leading-none">
                {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
              {expanded ? "Hide Breakdown" : "View Breakdown"}
            </button>

            <div className="flex gap-2 w-full">
              <button className="flex-1 py-2.5 rounded-xl bg-secondary text-[#0b1326] text-xs font-bold hover:bg-secondary/90 hover:shadow-[0_8px_24px_rgba(107,216,203,0.3)] active:scale-[0.97] transition-all">
                Book This Route
              </button>
              <button className="flex-1 py-2.5 rounded-xl border border-white/10 text-on-surface-variant text-xs font-semibold hover:border-white/20 hover:text-on-surface hover:bg-white/4 transition-all">
                Generate Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Breakdown table (expandable) ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="breakdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mx-6 mb-6 rounded-2xl border border-white/6 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/50">
                  Cost Breakdown
                </p>
              </div>
              <table className="w-full">
                <tbody>
                  {result.breakdown.map((item, i) => (
                    <tr
                      key={item.label}
                      className={`${i % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                    >
                      <td className="px-4 py-2.5 text-sm text-on-surface-variant">{item.label}</td>
                      <td className="px-4 py-2.5 text-sm font-semibold text-on-surface text-right">
                        ${item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/8">
                    <td className="px-4 py-3 text-sm font-bold text-on-surface">Total</td>
                    <td className="px-4 py-3 text-sm font-extrabold text-secondary text-right">
                      ${result.totalPrice.toLocaleString()} {result.currency}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onModify }: { onModify: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0  }}
      exit={{   opacity: 0          }}
      className="mt-6 flex flex-col items-center justify-center py-24 rounded-3xl border border-white/5"
      style={{ background: "rgba(19,27,46,0.4)", backdropFilter: "blur(20px)" }}
    >
      <div className="w-20 h-20 rounded-full bg-surface-container-highest border border-white/8 flex items-center justify-center mb-6">
        <span
          className="material-symbols-outlined text-4xl text-on-surface-variant/30 select-none"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          explore_off
        </span>
      </div>
      <h3 className="text-xl font-headline font-bold text-on-surface mb-2">No Routes Found</h3>
      <p className="text-sm text-on-surface-variant text-center max-w-xs mb-8 leading-relaxed">
        No routes were found for this path. Try adjusting your dates, transport mode, or locations.
      </p>
      <button
        onClick={onModify}
        className="px-6 py-3 rounded-xl border border-secondary/25 text-secondary text-sm font-semibold hover:bg-secondary/10 hover:border-secondary/40 transition-all"
      >
        Modify Search
      </button>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const TRANSPORT_MODES: { key: TransportMode; label: string; icon: string }[] = [
  { key: "air",        label: "Air",        icon: "flight"          },
  { key: "ocean",      label: "Ocean",      icon: "directions_boat" },
  { key: "multimodal", label: "Multimodal", icon: "swap_calls"      },
  { key: "any",        label: "Any",        icon: "public"          },
];

export default function RoutesSearchPage() {
  const [searchState, setSearchState] = useState<SearchState>("idle");
  const [originText,  setOriginText]  = useState("");
  const [destText,    setDestText]    = useState("");
  const [originPort,  setOriginPort]  = useState<Port | null>(null);
  const [destPort,    setDestPort]    = useState<Port | null>(null);
  const [weight,      setWeight]      = useState("");
  const [volume,      setVolume]      = useState("");
  const [mode,        setMode]        = useState<TransportMode>("any");
  const [date,        setDate]        = useState("");
  const [sortBy,      setSortBy]      = useState<SortKey>("price");
  const [expanded,    setExpanded]    = useState<string | null>(null);

  const sortedResults = [...MOCK_RESULTS].sort((a, b) => {
    if (sortBy === "price") return a.totalPrice  - b.totalPrice;
    if (sortBy === "time")  return a.transitDays - b.transitDays;
    if (sortBy === "legs")  return a.legCount    - b.legCount;
    return 0;
  });

  const handleSearch = () => {
    if (!originText.trim() || !destText.trim()) {
      setSearchState("empty");
      return;
    }
    setSearchState("loading");
  };

  const handleLoadingDone = useCallback(() => {
    setSearchState("results");
  }, []);

  const handleSwap = () => {
    setOriginText(destText);
    setDestText(originText);
    setOriginPort(destPort);
    setDestPort(originPort);
  };

  return (
    <div className="px-8 pb-16 min-h-screen relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[-8%]  right-[-8%]  w-[480px] h-[480px] bg-secondary/4 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-8%] left-[-8%]  w-[380px] h-[380px] bg-primary/4  rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="mb-6 pt-8">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Route Search
        </h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Find optimal multi-modal routes with real-time pricing and carrier availability.
        </p>
      </div>

      {/* ── Search Form Card ── */}
      <div
        className="w-full rounded-3xl border border-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        style={{ background: "rgba(19,27,46,0.75)", backdropFilter: "blur(40px)" }}
      >
        {/* Row 1: Origin + Destination */}
        <div className="flex items-center gap-3 mb-4">
          <PortInput
            value={originText}
            onChange={(port, text) => { setOriginPort(port); setOriginText(text); }}
            placeholder="Origin — city, port or code"
            icon="trip_origin"
            iconColor="text-secondary"
          />
          <button
            onClick={handleSwap}
            title="Swap origin and destination"
            className="w-10 h-10 rounded-xl bg-surface-container-highest/60 border border-white/8 flex items-center justify-center flex-shrink-0 hover:bg-white/8 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined text-sm text-on-surface-variant">swap_horiz</span>
          </button>
          <PortInput
            value={destText}
            onChange={(port, text) => { setDestPort(port); setDestText(text); }}
            placeholder="Destination — city, port or code"
            icon="place"
            iconColor="text-error"
          />
        </div>

        {/* Row 2: Secondary filters + Search button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Cargo weight */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant/45 pointer-events-none select-none">
              scale
            </span>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Weight (kg)"
              className="h-10 w-34 bg-surface-container-highest/40 border border-white/8 rounded-xl pl-9 pr-3 text-sm text-on-surface placeholder:text-on-surface-variant/35 focus:outline-none focus:ring-1 focus:ring-secondary/40 transition-all"
            />
          </div>

          {/* Cargo volume */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant/45 pointer-events-none select-none">
              deployed_code
            </span>
            <input
              type="number"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Volume (m³)"
              className="h-10 w-34 bg-surface-container-highest/40 border border-white/8 rounded-xl pl-9 pr-3 text-sm text-on-surface placeholder:text-on-surface-variant/35 focus:outline-none focus:ring-1 focus:ring-secondary/40 transition-all"
            />
          </div>

          {/* Mode toggle pills */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-surface-container-highest/35 border border-white/6">
            {TRANSPORT_MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold transition-all ${
                  mode === m.key
                    ? "bg-secondary text-[#0b1326] shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-[14px] leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {m.icon}
                </span>
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Date picker */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant/45 pointer-events-none select-none">
              calendar_today
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 bg-surface-container-highest/40 border border-white/8 rounded-xl pl-9 pr-3 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary/40 transition-all [color-scheme:dark]"
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="ml-auto flex items-center gap-2 px-7 h-12 rounded-xl bg-secondary text-[#0b1326] font-headline font-bold text-sm tracking-wide shadow-[0_8px_24px_rgba(107,216,203,0.25)] hover:shadow-[0_12px_32px_rgba(107,216,203,0.4)] hover:bg-secondary/90 active:scale-[0.97] transition-all"
          >
            <span className="material-symbols-outlined text-base leading-none">search</span>
            Search Routes
          </button>
        </div>
      </div>

      {/* ── Dynamic Section ── */}
      <AnimatePresence mode="wait">
        {searchState === "loading" && (
          <LoadingState key="loading" onDone={handleLoadingDone} />
        )}

        {searchState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            className="mt-6 space-y-4"
          >
            {/* Sort bar */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm text-on-surface-variant">
                <span className="font-bold text-on-surface">{MOCK_RESULTS.length}</span> routes found
                {originText && destText && (
                  <span className="ml-2 text-on-surface-variant/60">
                    · {originText.split("—")[0].trim()} → {destText.split("—")[0].trim()}
                  </span>
                )}
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-on-surface-variant/60 mr-1">Sort by</span>
                {(["price", "time", "legs"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${
                      sortBy === key
                        ? "bg-secondary/12 text-secondary border-secondary/20"
                        : "text-on-surface-variant border-transparent hover:text-on-surface hover:bg-white/5"
                    }`}
                  >
                    {key === "price" ? "Price" : key === "time" ? "Time" : "Legs"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            {sortedResults.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                expanded={expanded === result.id}
                onToggleBreakdown={() => setExpanded(expanded === result.id ? null : result.id)}
              />
            ))}
          </motion.div>
        )}

        {searchState === "empty" && (
          <EmptyState key="empty" onModify={() => setSearchState("idle")} />
        )}
      </AnimatePresence>
    </div>
  );
}
