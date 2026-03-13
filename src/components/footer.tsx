"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CupSoda, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const [shakesConsumed, setShakesConsumed] = useState(142);
  const [showToast, setShowToast] = useState(false);

  const handleFuelClick = () => {
    setShakesConsumed(prev => prev + 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <footer className="w-full border-t border-border bg-card/30 backdrop-blur-md relative z-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="font-mono text-sm text-muted-foreground flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} Swayam Patel.</span>
          <span className="hidden md:inline">System stable.</span>
        </div>

        {/* Interactive Developer Fuel */}
        <div className="relative">
          <button 
            onClick={handleFuelClick}
            className="flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border border-border bg-muted/50 hover:bg-primary/10 hover:border-primary/50 transition-all text-muted-foreground hover:text-foreground group"
            data-code="<EasterEgg feature='shakes-here' count={142} />"
          >
            <CupSoda size={14} className="text-primary group-active:scale-75 transition-transform" />
            <span>Powered by <span className="font-bold text-foreground">Shakes-here</span> ({shakesConsumed})</span>
          </button>

          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.8 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 font-mono text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded whitespace-nowrap"
              >
                +1 Coco Added
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors"><Github size={18} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="hover:text-primary transition-colors"><Mail size={18} /></a>
        </div>
      </div>
    </footer>
  );
}