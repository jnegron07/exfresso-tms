"use client";

import { motion } from "framer-motion";
import { Ship, Plane, Truck, Globe, Search, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function RoutingLoadingAnimation() {
  const [step, setStep] = useState(0);
  
  const steps = [
    "Analyzing global vessel positions...",
    "Calculating multi-modal connections...",
    "Evaluating carrier reliability & performance...",
    "Optimizing for CO2 footprint and cost...",
    "Synthesizing final routing options...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
      <div className="relative h-48 w-48 flex items-center justify-center">
        {/* Pulsing rings */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border-2 border-brand-teal"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute inset-0 rounded-full border-2 border-brand-navy"
        />
        
        {/* Center Icon */}
        <div className="relative z-10 bg-white dark:bg-zinc-900 h-24 w-24 rounded-full flex items-center justify-center shadow-2xl border border-muted/50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 p-2"
          >
            <div className="h-full w-full rounded-full border-t-4 border-brand-teal" />
          </motion.div>
          <Cpu className="h-10 w-10 text-brand-teal animate-pulse" />
        </div>

        {/* Orbiting Elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white border shadow-lg rounded-xl flex items-center justify-center">
            <Ship className="h-5 w-5 text-brand-navy" />
          </div>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 h-10 w-10 bg-white border shadow-lg rounded-xl flex items-center justify-center">
            <Plane className="h-5 w-5 text-brand-teal" />
          </div>
        </motion.div>
      </div>

      <div className="mt-12 text-center max-w-sm">
        <motion.h3 
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-black italic text-brand-navy dark:text-white"
        >
          Exfresso AI Engine
        </motion.h3>
        <motion.p 
          key={`sub-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground mt-2 font-medium"
        >
          {steps[step]}
        </motion.p>
        
        <div className="mt-8 flex gap-1 justify-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              animate={{ 
                scale: i === step ? [1, 1.2, 1] : 1,
                backgroundColor: i === step ? "#0D9488" : "#E2E8F0"
              }}
              className="h-1.5 w-8 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
