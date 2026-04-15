"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface selection:bg-secondary/30">
      {/* Left Column: Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-sm flex flex-col gap-10 relative z-10"
        >
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-[1.25rem] bg-gradient-to-br from-secondary to-secondary-container flex items-center justify-center shadow-2xl shadow-secondary/20 group">
              <span className="text-3xl font-black italic text-on-secondary group-hover:scale-110 transition-transform">Ex</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-headline font-black tracking-tighter text-on-surface">Exfresso</span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-on-surface-variant font-bold opacity-40">Tactical Center</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <h1 className="text-4xl font-headline font-black italic text-on-surface tracking-tighter">Secure Uplink.</h1>
            <p className="text-on-surface-variant font-medium leading-relaxed opacity-70 italic">Elevate your logistics operations with AI-augmented intelligence.</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-2.5">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40 ml-1">Network Identifier</Label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-30 group-focus-within:text-secondary group-focus-within:opacity-100 transition-all">alternate_email</span>
                <Input 
                  id="email" 
                  placeholder="operator@exfresso.ai" 
                  type="email" 
                  className="pl-12 h-14 bg-surface-container-highest/20 border-white/5 border rounded-2xl focus-visible:ring-1 focus-visible:ring-secondary/50 focus:bg-surface-container-highest/40 text-on-surface font-medium transition-all"
                />
              </div>
            </div>
            <div className="grid gap-2.5">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" title="password" className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">Encryption Key</Label>
                <Link href="#" className="text-[10px] font-black text-secondary hover:underline italic tracking-widest uppercase">Reset</Link>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-30 group-focus-within:text-secondary group-focus-within:opacity-100 transition-all">lock</span>
                <Input 
                  id="password" 
                  placeholder="••••••••" 
                  type="password" 
                  className="pl-12 h-14 bg-surface-container-highest/20 border-white/5 border rounded-2xl focus-visible:ring-1 focus-visible:ring-secondary/50 focus:bg-surface-container-highest/40 text-on-surface font-medium transition-all"
                />
              </div>
            </div>
            <Button className="mt-4 h-15 rounded-2xl bg-gradient-to-br from-secondary to-secondary-container hover:from-secondary/90 hover:to-secondary-container/90 text-on-secondary font-headline font-black italic text-lg tracking-tight shadow-2xl shadow-secondary/20 flex items-center gap-3 group active:scale-[0.98] transition-all">
              Initiate Uplink 
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-500">arrow_forward</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm py-4">
            <span className="text-on-surface-variant opacity-40 font-medium italic">New to Exfresso?</span>
            <Link href="#" className="font-black text-on-surface hover:text-secondary italic tracking-tight transition-colors">Request Access</Link>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-30">
              <span className="material-symbols-outlined text-green-500 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span> 
              Encrypted Corporate Environment
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Column: Visual Brand Content */}
      <div className="hidden lg:flex relative bg-surface-container-low items-center justify-center overflow-hidden p-16">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: "radial-gradient(circle, #6bd8cb 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-12 max-w-lg">
          <div className="relative">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full border border-secondary/10 animate-pulse pointer-events-none" />
            <h2 className="text-6xl font-headline font-black italic text-on-surface leading-[0.9] tracking-tighter">
              Precision <br/> 
              Logistics <br/>
              <span className="text-secondary drop-shadow-[0_0_20px_rgba(107,216,203,0.3)]">AI Augmented.</span>
            </h2>
          </div>

          <div className="grid gap-8">
            <div className="bg-surface-container-highest/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 flex gap-6 items-start shadow-2xl transition-transform hover:-translate-y-1 duration-500 cursor-default">
              <div className="h-12 w-12 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0 border border-secondary/20">
                <span className="material-symbols-outlined text-2xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-on-surface font-headline font-black italic text-xl tracking-tight leading-none">Normalizing the World</span>
                <p className="text-on-surface-variant/60 text-sm font-medium leading-relaxed italic">
                  "Automatically normalize diverse carrier manifests and routing parameters into a high-density unified ledger."
                </p>
              </div>
            </div>
            
            <div className="bg-surface-container-highest/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 flex gap-6 items-start shadow-2xl transition-transform hover:-translate-y-1 duration-500 cursor-default">
              <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0 border border-primary/20">
                <span className="material-symbols-outlined text-2xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-on-surface font-headline font-black italic text-xl tracking-tight leading-none">Global Synchronization</span>
                <p className="text-on-surface-variant/60 text-sm font-medium leading-relaxed italic">
                  "End-to-end visibility across all logistics modes with active predictive milestone intelligence."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Monitor */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-16 bg-surface-container-high/80 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 group"
        >
          <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40 leading-none mb-1">Live Intelligence</div>
            <div className="text-xs font-black text-on-surface italic">Uplink Status: Optimized</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
