"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Clock, MapPin, Anchor, Truck, Plane } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  location?: string;
}

interface RouteTimelineProps {
  milestones?: Milestone[];
}

export function RouteTimeline({ milestones = [] }: RouteTimelineProps) {
  return (
    <Card className="shadow-md border-none bg-white dark:bg-zinc-900 h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold italic">Shipment Journey</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-brand-teal before:via-brand-navy before:to-muted">
          {milestones.map((milestone, index) => (
            <div key={milestone.id || index} className="relative flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div 
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 z-10 transition-all duration-500",
                    milestone.completed 
                      ? "bg-brand-teal border-brand-teal text-white shadow-lg shadow-brand-teal/20" 
                      : "bg-white border-muted text-muted-foreground"
                  )}
                >
                  {milestone.completed ? (
                    <Check className="h-5 w-5 animate-in zoom-in duration-300" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "font-bold text-base transition-colors",
                    milestone.completed ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {milestone.title}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{new Date(milestone.date).toLocaleString()}</span>
                    {milestone.location && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs font-medium flex items-center gap-1 text-brand-teal">
                          <MapPin className="h-3 w-3" /> {milestone.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {index === 0 && milestone.completed && (
                <div className="hidden md:flex flex-col items-end">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[10px]">On Schedule</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-2 py-0.5 rounded-full font-medium", className)}>
      {children}
    </span>
  );
}
