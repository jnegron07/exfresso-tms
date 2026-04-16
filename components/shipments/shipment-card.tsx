"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ShipmentCardProps {
  shipment: {
    id: string;
    trackingId: string;
    status: string;
    origin: { city: string; code: string };
    destination: { city: string; code: string };
    mode: string;
    type: string;
    eta?: string;
    shipper: string;
  };
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "Ocean": return "directions_boat";
      case "Air": return "flight";
      default: return "local_shipping";
    }
  };

  const statusColors: Record<string, string> = {
    "In Transit": "bg-secondary/10 text-secondary border-secondary/20",
    "Delivered": "bg-green-500/10 text-green-400 border-green-500/20",
    "Pending": "bg-amber-500/10 text-amber-500 border-amber-500/20",
    "Customs Hold": "bg-error/10 text-error border-error/20",
  };

  const isAtRisk = shipment.status === "Customs Hold" || shipment.status === "Pending";

  return (
    <Card className="group transition-all duration-500 border border-white/5 bg-surface-container-low/40 backdrop-blur-xl hover:bg-surface-container-high/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden relative rounded-3xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {isAtRisk && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-error/10 text-error text-[10px] font-black uppercase tracking-tighter border border-error/20 animate-pulse">
            <span className="material-symbols-outlined text-xs">warning</span>
            At Risk
          </div>
        </div>
      )}

      <CardContent className="p-0">
        <div className="p-7 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-surface-container-highest flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500 border border-white/5">
                <span className={cn("material-symbols-outlined text-2xl", shipment.mode === "Ocean" ? "text-secondary" : "text-primary")}>
                  {getModeIcon(shipment.mode)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-headline font-black italic tracking-tight text-on-surface leading-none mb-1">
                  {shipment.id}
                </span>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.2em]">
                  {shipment.type} • {shipment.mode}
                </span>
              </div>
            </div>
            {!isAtRisk && (
              <div className={cn("text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-wider", statusColors[shipment.status] || "bg-surface-container-highest/50")}>
                {shipment.status}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-6 py-2 relative">
            <div className="flex flex-col gap-1 min-w-[120px]">
              <span className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest leading-none">Origin</span>
              <span className="text-base font-bold text-on-surface truncate">{shipment.origin.city}</span>
              <span className="text-xs text-secondary font-mono font-black">{shipment.origin.code}</span>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative translate-y-2">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent border-dashed border-t border-white/10" />
              <div className="absolute -top-1.5 h-3 w-3 rounded-full bg-secondary shadow-[0_0_15px_rgba(107,216,203,0.5)] animate-pulse shadow-secondary z-10 border border-white/20" />
            </div>

            <div className="flex flex-col gap-1 items-end min-w-[120px] text-right">
              <span className="text-[10px] text-on-surface-variant/40 font-black uppercase tracking-widest leading-none">Destination</span>
              <span className="text-base font-bold text-on-surface truncate">{shipment.destination.city}</span>
              <span className="text-xs text-secondary font-mono font-black">{shipment.destination.code}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 mt-2 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-surface-container-highest flex items-center justify-center border border-white/5">
                <span className="material-symbols-outlined text-sm text-on-surface-variant/60">calendar_today</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter leading-none mb-1">ETA Delivery</span>
                <span className="text-xs font-black text-on-surface/80">
                  {shipment.eta ? new Date(shipment.eta).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "Pending"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-end group/owner">
              <div className="flex flex-col items-end">
                <span className="text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-tighter leading-none mb-1">Shipper Partner</span>
                <span className="text-xs font-black text-on-surface/80 truncate max-w-[100px] text-right">{shipment.shipper ?? "—"}</span>
              </div>
              <div className="h-8 w-8 rounded-full border border-secondary/20 bg-secondary/10 flex items-center justify-center overflow-hidden shadow-inner group-hover/owner:bg-secondary/20 transition-colors">
                <span className="text-[10px] font-black text-secondary">{shipment.shipper?.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <Link 
          href={`/shipments/${shipment.id}`}
          className="flex items-center justify-between px-7 py-5 bg-surface-container-highest/20 hover:bg-secondary/10 transition-all duration-500 border-t border-white/5 group/link"
        >
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black text-secondary tracking-widest uppercase flex items-center gap-2">
              Deep Intelligence 
              <span className="material-symbols-outlined text-sm group-hover/link:translate-x-2 transition-transform duration-500">arrow_forward</span>
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-on-surface-variant/30 tracking-widest italic group-hover/link:text-on-surface-variant transition-colors">
            REF#{shipment.trackingId}
          </span>
        </Link>
      </CardContent>
    </Card>
  );
}
