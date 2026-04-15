"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  DollarSign, 
  Leaf, 
  ChevronRight, 
  Star,
  ShieldCheck,
  Anchor,
  Plane,
  Truck,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RouteResultCardProps {
  route: {
    id: string;
    name: string;
    mode: string;
    price: number;
    currency: string;
    transitTime: number;
    co2: number;
    reliability: number;
    carriers: string[];
    fastest?: boolean;
    sustainable?: boolean;
    bestValue?: boolean;
  };
}

export function RouteResultCard({ route }: RouteResultCardProps) {
  const ModeIcon = route.mode.includes("Ocean") ? Anchor : route.mode.includes("Air") ? Plane : Truck;

  return (
    <Card className={cn(
      "group transition-all duration-500 overflow-hidden relative border",
      route.bestValue 
        ? "border-secondary/20 bg-surface-container-low shadow-2xl shadow-secondary/5" 
        : "border-outline-variant/10 bg-surface/40 backdrop-blur-sm hover:bg-surface-container-low/60 hover:border-outline-variant/30 shadow-xl shadow-black/20"
    )}>
      <CardContent className="p-0">
        {/* Dynamic Highlight Banner */}
        <div className="flex h-1">
          {route.bestValue && <div className="flex-1 bg-secondary animate-pulse shadow-[0_0_12px_rgba(13,148,136,0.5)]" />}
          {route.fastest && !route.bestValue && <div className="flex-1 bg-primary" />}
          {route.sustainable && !route.bestValue && <div className="flex-1 bg-emerald-500" />}
        </div>

        <div className="p-8">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
            <div className="flex gap-6 items-start">
              <div className="h-14 w-14 rounded-2xl bg-surface-container-highest flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                <ModeIcon className={cn("h-7 w-7", route.bestValue ? "text-secondary" : "text-primary")} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-extrabold italic tracking-tight text-on-surface">{route.name}</h3>
                  {route.bestValue && (
                    <Badge className="bg-secondary/10 text-secondary border-none text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg">
                      AI Optimized Choice
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-on-surface-variant/60">{route.carriers.join(" + ")}</span>
                  <div className="h-1 w-1 rounded-full bg-outline-variant/30" />
                  <span className="text-xs font-black text-secondary uppercase tracking-[0.1em]">{route.mode}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:gap-14 flex-1 xl:justify-center px-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Clock className="h-3 w-3" /> Duration
                </span>
                <span className="text-xl font-extrabold text-on-surface italic">{route.transitTime} <span className="text-xs not-italic opacity-40">DAYS</span></span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Leaf className="h-3 w-3" /> Emissions
                </span>
                <span className="text-xl font-extrabold text-emerald-500 italic">{route.co2} <span className="text-xs not-italic opacity-40 uppercase">kg/CO₂</span></span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-[0.15em] flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3" /> Network Score
                </span>
                <span className="text-xl font-extrabold text-on-surface italic">{route.reliability}%</span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black text-tertiary uppercase tracking-[0.15em] flex items-center gap-2">
                  <Sparkles className="h-3 w-3" /> AI Conf.
                </span>
                <span className="text-xl font-extrabold text-tertiary italic">98.4%</span>
              </div>
            </div>

            <div className="flex flex-col xl:items-end justify-center pt-8 xl:pt-0 border-t xl:border-t-0 border-outline-variant/10">
              <div className="flex flex-col xl:items-end mb-6">
                <span className="text-[11px] font-black text-on-surface-variant/40 uppercase tracking-[0.2em] mb-1">Projected Landing Cost</span>
                <span className={cn(
                  "text-4xl font-extrabold font-mono tracking-tighter italic",
                  route.bestValue ? "text-secondary" : "text-on-surface"
                )}>
                  ${route.price.toLocaleString(undefined, { minimumFractionDigits: 0 })}<span className="text-lg opacity-40 text-on-surface ml-1">.00</span>
                </span>
              </div>
              <Button className={cn(
                "rounded-2xl h-14 px-10 gap-3 group/btn text-lg font-black italic tracking-tight transition-all",
                route.bestValue 
                  ? "bg-secondary text-on-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20" 
                  : "bg-surface-container-highest text-on-surface hover:bg-surface-container-highest/80 border border-outline-variant/20"
              )}>
                Secure Capacity <ChevronRight className="h-5 w-5 group-hover/btn:translate-x-1.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
