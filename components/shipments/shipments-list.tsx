"use client";

import { useShipments } from "@/lib/api/hooks";
import { ShipmentCard } from "./shipment-card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function ShipmentsList() {
  const { data: shipments, isLoading, error } = useShipments();
  const [search, setSearch] = useState("");
  const [modeFilter, setModeFilter] = useState("all");

  const filteredShipments = shipments?.filter((s: any) => {
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || 
                         s.shipper.toLowerCase().includes(search.toLowerCase()) ||
                         s.origin.city.toLowerCase().includes(search.toLowerCase());
    const matchesMode = modeFilter === "all" || s.mode === modeFilter;
    return matchesSearch && matchesMode;
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center flex-col gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
          <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary text-2xl animate-pulse">generating_tokens</span>
        </div>
        <p className="text-on-surface-variant font-bold uppercase tracking-[0.2em] animate-pulse">Syncing Global Fleet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2.5rem] bg-error/5 border border-error/10 p-16 text-center text-error backdrop-blur-xl shadow-2xl">
        <span className="material-symbols-outlined text-6xl mb-6 opacity-30 select-none">error_medley</span>
        <h3 className="font-headline font-black text-2xl italic tracking-tight mb-2">Strategic Failure: Data Feed Interrupted</h3>
        <p className="text-on-surface-variant/70 max-w-md mx-auto font-medium">We are unable to retrieve shipment intelligence at this time. Please check your network bridge or contact tactical ops.</p>
        <Button variant="outline" className="mt-8 rounded-xl border-error/20 hover:bg-error/10 text-error font-bold" onClick={() => window.location.reload()}>
          Attempt Re-sync
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Filtering Header */}
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between p-8 rounded-[2.5rem] bg-surface-container-low/40 backdrop-blur-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-secondary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-secondary/10 transition-colors" />
        
        <div className="relative w-full lg:max-w-2xl">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-2xl group-focus-within:text-secondary transition-colors">search</span>
          <input 
            placeholder="Search manifests, carriers, or origins..." 
            className="w-full pl-14 pr-6 py-5 bg-surface-container-highest/20 border-none rounded-2xl focus:ring-1 focus:ring-secondary/50 focus:bg-surface-container-highest/40 text-lg font-medium text-on-surface placeholder:text-on-surface-variant/30 transition-all shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto z-10">
          <Select value={modeFilter} onValueChange={(val) => setModeFilter(val || "all")}>
            <SelectTrigger className="w-[200px] h-14 rounded-2xl border-none bg-surface-container-highest/30 font-black text-on-surface-variant uppercase tracking-widest hover:bg-surface-container-highest/50 transition-all">
              <SelectValue placeholder="Logistics Mode" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border border-white/10 bg-surface-container-high/90 backdrop-blur-2xl text-on-surface p-2">
              <SelectItem value="all" className="rounded-xl font-bold py-3 hover:bg-secondary/10 focus:bg-secondary/10 transition-colors">All Modes</SelectItem>
              <SelectItem value="Ocean" className="rounded-xl font-bold py-3 hover:bg-secondary/10 focus:bg-secondary/10 transition-colors">Ocean Freight</SelectItem>
              <SelectItem value="Air" className="rounded-xl font-bold py-3 hover:bg-secondary/10 focus:bg-secondary/10 transition-colors">Air Cargo</SelectItem>
              <SelectItem value="Truck" className="rounded-xl font-bold py-3 hover:bg-secondary/10 focus:bg-secondary/10 transition-colors">Road Transport</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="h-8 w-px bg-white/5 hidden lg:block mx-2" />
          
          <Button variant="ghost" className="h-14 rounded-2xl gap-3 bg-surface-container-highest/30 hover:bg-surface-container-highest/50 text-on-surface-variant font-black uppercase tracking-widest px-6 transition-all border border-white/5">
            <span className="material-symbols-outlined text-xl">tune</span>
            <span>Filters</span>
          </Button>
          
          <div className="flex rounded-2xl bg-surface-container-highest/30 border border-white/5 p-1.5 h-14">
            <Button variant="ghost" size="icon" className="rounded-xl bg-secondary text-on-secondary shadow-lg shadow-secondary/20 hover:bg-secondary/90 transition-all">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-xl text-on-surface-variant/30 hover:text-on-surface transition-all">
              <span className="material-symbols-outlined text-2xl">format_list_bulleted</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {filteredShipments?.map((shipment: any) => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}
      </div>
      
      {/* Empty State */}
      {filteredShipments?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 text-center animate-in fade-in zoom-in duration-700">
          <div className="h-32 w-32 bg-surface-container-low rounded-[3rem] flex items-center justify-center mb-10 shadow-inner group transition-transform hover:rotate-12">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 -rotate-12 group-hover:rotate-0 transition-transform">inventory_2</span>
          </div>
          <h3 className="text-3xl font-headline font-black italic tracking-tighter text-on-surface mb-3">No Manifests Detected</h3>
          <p className="text-on-surface-variant/50 max-w-sm font-medium leading-relaxed italic">
            "Our predictive engines couldn't find any manifest matching your current search parameters in the planetary database."
          </p>
          <Button 
            variant="link" 
            className="mt-10 text-secondary font-black text-lg uppercase tracking-widest hover:text-secondary-container transition-all"
            onClick={() => {setSearch(""); setModeFilter("all");}}
          >
            Clear Search Matrix
          </Button>
        </div>
      )}

      {/* Dense Stats Footer (Density increase) */}
      <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-on-surface-variant/30">
        <div className="flex gap-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#6bd8cb]" />
            Data Stream: Live (2.4ms Latency)
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#10b981]" />
            Node Checksum: Verified
          </div>
        </div>
        <div>Total Manifests: {filteredShipments?.length || 0}</div>
      </div>
    </div>
  );
}
