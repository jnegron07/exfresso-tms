"use client";

import { ShipmentsList } from "@/components/shipments/shipments-list";
import { Button } from "@/components/ui/button";

export default function ShipmentsPage() {
  return (
    <div className="px-8 pb-12 min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-10 mb-12 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-8 h-1 bg-secondary rounded-full" />
            <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface italic">
              Shipment Management
            </h1>
          </div>
          <p className="text-on-surface-variant max-w-2xl text-lg font-medium opacity-70">
            A high-density predictive command center for tracking and managing your global logistics pipeline.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="h-14 px-8 rounded-2xl bg-surface-container-highest/20 hover:bg-surface-container-highest/40 text-on-surface-variant font-bold border border-white/5 transition-all flex items-center gap-3 group">
            <span className="material-symbols-outlined text-xl group-hover:rotate-12 transition-transform">download</span>
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="uppercase text-[9px] tracking-widest opacity-40">System</span>
              <span>Export Manifest</span>
            </div>
          </Button>
          
          <Button className="h-14 px-10 rounded-2xl bg-gradient-to-br from-secondary to-secondary-container hover:from-secondary/90 hover:to-secondary-container/90 text-on-secondary font-headline font-black italic text-base tracking-tight shadow-xl shadow-secondary/20 hover:shadow-secondary/30 transition-all flex items-center gap-3 active:scale-95 group">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-lg">add</span>
            </div>
            Create Intelligence Node
          </Button>
        </div>
      </div>

      <div className="relative z-10">
        <ShipmentsList />
      </div>

      {/* Aesthetic Detail: Floating HUD element */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-surface-container-highest/6 backdrop-blur-3xl border border-white/5 shadow-2xl z-50 pointer-events-none hidden xl:flex items-center gap-10">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#6bd8cb]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Neural Feed Active</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#b7c6ee]" />
          <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40">Market Volatility: Normal</span>
        </div>
        <div className="flex items-center gap-3 border-l border-white/10 pl-10">
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary italic">Exfresso TMS v4.0.0-build.82</span>
        </div>
      </div>
    </div>
  );
}
