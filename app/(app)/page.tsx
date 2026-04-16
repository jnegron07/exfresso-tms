"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface flex flex-col relative overflow-hidden">
      {/* Background Cinematic Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[180px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6bd8cb 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 text-center max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.3em] animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#6bd8cb] animate-pulse" />
            V4.0 Intelligence Active
          </div>
          
          <h1 className="text-7xl lg:text-8xl font-headline font-black italic tracking-tighter text-on-surface leading-[0.9] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Normalize the <br/>
            <span className="text-secondary drop-shadow-[0_0_30px_rgba(107,216,203,0.3)]">Chaos.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-on-surface-variant font-medium max-w-2xl mx-auto opacity-70 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 italic">
            "Automating global logistics through high-density predictive intelligence and multi-modal synchronization."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <Link 
              href="/dashboard"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-16 px-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary-container hover:from-secondary/90 hover:to-secondary-container/90 text-on-secondary font-headline font-black italic text-xl tracking-tight shadow-[0_20px_40px_rgba(107,216,203,0.3)] hover:scale-105 active:scale-95 transition-all group border-none"
              )}
            >
              Enter Tactical Ops
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
            </Link>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="h-16 px-10 rounded-2xl border border-white/5 bg-surface-container-low/40 backdrop-blur-md text-on-surface-variant font-bold text-lg hover:bg-surface-container-high/60 transition-all flex items-center gap-3"
            >
              Watch Intelligence Demo
              <span className="material-symbols-outlined">play_circle</span>
            </Button>
          </div>
        </div>

        {/* Floating Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000">
          {[
            { icon: "analytics", title: "Predictive Analytics", note: "Forecast market volatility with 98.4% precision using neural pathfinding." },
            { icon: "hub", title: "Multi-modal Sync", note: "Unified ledger for ocean, air, and road manifests across all carrier entities." },
            { icon: "security", title: "Risk Mitigation", note: "Real-time tactical alerts for port congestion, GRI, and geo-political shifts." },
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-[2.5rem] bg-surface-container-low/40 backdrop-blur-xl border border-white/5 text-left hover:bg-surface-container-high/60 transition-all cursor-crosshair">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                <span className="material-symbols-outlined text-3xl text-secondary">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-headline font-black italic tracking-tight text-on-surface mb-3">{feature.title}</h3>
              <p className="text-sm text-on-surface-variant/60 font-medium leading-relaxed">{feature.note}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-10 flex items-center justify-center z-10 opacity-30">
        <div className="flex items-center gap-3 text-on-surface font-black uppercase tracking-[0.5em] text-xs italic">
          <div className="w-6 h-6 rounded-lg bg-secondary flex items-center justify-center text-[10px] text-on-secondary">Ex</div>
          Exfresso Tactical Management System
        </div>
      </footer>
    </div>
  );
}
