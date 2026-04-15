import { Card } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col gap-10 p-10 max-w-5xl mx-auto min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex flex-col gap-3 relative z-10">
        <h1 className="text-4xl font-headline font-black tracking-tight italic text-on-surface">Contacts & Network</h1>
        <p className="text-on-surface-variant font-medium opacity-70">Carrier partners, shippers, and tactical logistics handlers.</p>
      </div>
      
      <Card className="border border-white/5 h-[500px] flex items-center justify-center bg-surface-container-low/40 backdrop-blur-3xl rounded-[3rem] shadow-2xl relative z-10 group overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #6bd8cb 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        
        <div className="text-center flex flex-col items-center gap-6 p-12 relative">
          <div className="h-24 w-24 rounded-[2rem] bg-surface-container-highest flex items-center justify-center border border-white/5 group-hover:rotate-12 transition-transform duration-700 shadow-inner">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30">contact_page</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-headline font-black italic text-on-surface">Under Construction</h3>
            <p className="text-sm text-on-surface-variant/50 max-w-sm italic leading-relaxed">
              "Tactical contact management and carrier relationship modules are currently in the implementation pipeline. All design tokens are active and ready for data integration."
            </p>
          </div>
          
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-secondary opacity-40 pt-4">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_#6bd8cb] animate-pulse" />
            Carrier Directory: Normalizing
          </div>
        </div>
      </Card>
    </div>
  );
}
