"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const featureChips = [
  { label: "AI Route Optimization", icon: "alt_route", accent: true },
  { label: "Live Shipment Tracking", icon: "location_on" },
  { label: "Rate Intelligence", icon: "trending_up", accent: true },
  { label: "Document OCR", icon: "document_scanner" },
  { label: "Carrier Network", icon: "hub" },
  { label: "Predictive ETAs", icon: "schedule", accent: true },
  { label: "Multi-modal Freight", icon: "directions_boat" },
  { label: "Customs & Compliance", icon: "verified_user" },
  { label: "Fleet Analytics", icon: "monitoring", accent: true },
  { label: "Smart Invoicing", icon: "receipt_long" },
  { label: "Carbon Footprint", icon: "eco" },
  { label: "Real-time Alerts", icon: "notifications_active", accent: true },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[#0b1326] selection:bg-[#0D9488]/30">
      {/* Left Column: Login Form — 45% */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-16 relative">
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-[#0D9488]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[380px] flex flex-col gap-8 relative z-10"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/icon.svg"
              alt="Exfresso"
              className="h-10 w-10 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl font-headline font-extrabold tracking-tight text-white">
                Exfresso
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-slate-500 font-semibold">
                Transport Management
              </span>
            </div>
          </Link>

          {/* Heading */}
          <div className="flex flex-col gap-2 pt-2">
            <h1 className="text-3xl font-headline font-extrabold text-white tracking-tight !mb-0">
              Welcome back
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Sign in to your logistics command center.
            </p>
          </div>

          {/* Error message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-rose-500/[0.08] border border-rose-500/[0.15]"
              >
                <span
                  className="material-symbols-outlined text-rose-400 !text-[18px] mt-0.5 shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  error
                </span>
                <span className="text-rose-300 text-sm font-medium">
                  {error}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 ml-0.5"
              >
                Email address
              </Label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#0D9488] transition-colors !text-[18px]">
                  mail
                </span>
                <Input
                  id="email"
                  placeholder="you@exfresso.com"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  className={`pl-11 h-12 bg-white/[0.03] border rounded-xl focus-visible:ring-1 focus-visible:ring-[#0D9488]/40 focus:bg-white/[0.05] focus:border-[#0D9488]/30 text-white placeholder:text-slate-600 font-medium transition-all ${
                    error
                      ? "border-rose-500/30"
                      : "border-white/[0.06]"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between ml-0.5">
                <Label
                  htmlFor="password"
                  className="text-[11px] font-semibold uppercase tracking-wider text-slate-500"
                >
                  Password
                </Label>
                <Link
                  href="#"
                  className="text-[11px] font-semibold text-[#0D9488] hover:text-[#5EEAD4] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#0D9488] transition-colors !text-[18px]">
                  lock
                </span>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError("");
                  }}
                  required
                  className={`pl-11 h-12 bg-white/[0.03] border rounded-xl focus-visible:ring-1 focus-visible:ring-[#0D9488]/40 focus:bg-white/[0.05] focus:border-[#0D9488]/30 text-white placeholder:text-slate-600 font-medium transition-all ${
                    error
                      ? "border-rose-500/30"
                      : "border-white/[0.06]"
                  }`}
                />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="mt-2 h-12 rounded-xl bg-[#0D9488] hover:bg-[#0D9488]/90 disabled:opacity-50 text-white font-headline font-bold text-sm tracking-wide shadow-lg shadow-[#0D9488]/15 flex items-center gap-2 group active:scale-[0.98] transition-all"
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined !text-[18px] animate-spin">
                    progress_activity
                  </span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined !text-[18px] group-hover:translate-x-1 transition-transform duration-300">
                    arrow_forward
                  </span>
                </>
              )}
            </Button>
          </form>

          {/* Footer links */}
          <div className="flex items-center justify-center gap-2 text-sm pt-2">
            <span className="text-slate-500 font-medium">
              Don&apos;t have an account?
            </span>
            <Link
              href="#"
              className="font-semibold text-white hover:text-[#0D9488] transition-colors"
            >
              Request Access
            </Link>
          </div>

          {/* Trust badge */}
          <div className="pt-6 border-t border-white/[0.04] flex items-center gap-2.5 text-[10px] text-slate-600 font-semibold uppercase tracking-widest">
            <span
              className="material-symbols-outlined text-emerald-500/60 !text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            256-bit encrypted environment
          </div>
        </motion.div>
      </div>

      {/* Right Column: Feature Showcase — 55% */}
      <div className="hidden lg:flex w-[55%] relative bg-[#0f1a30] items-center justify-center overflow-hidden p-12 xl:p-20">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6bd8cb 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/[0.06] via-transparent to-[#1B2A4A]/[0.08] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-12 max-w-xl w-full">
          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <h2 className="text-4xl xl:text-5xl font-headline font-extrabold text-white leading-[1.1] tracking-tight !mb-0">
              Freight Intelligence,{" "}
              <span className="text-[#0D9488] drop-shadow-[0_0_24px_rgba(13,148,136,0.25)]">
                Reimagined.
              </span>
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed max-w-md">
              AI-powered logistics platform that transforms how you manage
              shipments, optimize routes, and control costs.
            </p>
          </motion.div>

          {/* Feature Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-2.5"
          >
            {featureChips.map((chip, i) => (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                className={`
                  inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                  backdrop-blur-sm cursor-default
                  transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                  ${
                    chip.accent
                      ? "bg-[#0D9488]/[0.08] border border-[#0D9488]/[0.15] text-[#5EEAD4] hover:bg-[#0D9488]/[0.12] hover:shadow-[#0D9488]/10"
                      : "bg-white/[0.04] border border-white/[0.06] text-slate-300 hover:bg-white/[0.07] hover:shadow-white/5"
                  }
                `}
              >
                <span
                  className={`material-symbols-outlined !text-[16px] ${
                    chip.accent ? "text-[#0D9488]" : "text-slate-500"
                  }`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {chip.icon}
                </span>
                <span className="text-[13px] font-semibold whitespace-nowrap">
                  {chip.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex items-center gap-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl px-8 py-5 max-w-md"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#0D9488]/[0.1] flex items-center justify-center border border-[#0D9488]/[0.12]">
                <span
                  className="material-symbols-outlined text-[#0D9488] !text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  package_2
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-headline font-bold text-lg leading-tight">
                  3,200+
                </span>
                <span className="text-slate-500 text-[11px] font-medium">
                  Shipments optimized
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/[0.06]" />

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#0D9488]/[0.1] flex items-center justify-center border border-[#0D9488]/[0.12]">
                <span
                  className="material-symbols-outlined text-[#0D9488] !text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  speed
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-headline font-bold text-lg leading-tight">
                  98.7%
                </span>
                <span className="text-slate-500 text-[11px] font-medium">
                  On-time delivery
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#0D9488]/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-[#1B2A4A]/20 rounded-full blur-[80px] pointer-events-none" />
      </div>
    </div>
  );
}
