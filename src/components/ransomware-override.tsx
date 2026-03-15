"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Lock, Terminal as TerminalIcon } from "lucide-react";

export function RansomwareOverride() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"breach" | "encrypting" | "countermeasure" | "cleared">("breach");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  // 1. The Keystroke Listener ("hack" or "kali")
  useEffect(() => {
    let keyBuffer = "";
    const triggers = ["hack", "kali"];
    const maxLen = Math.max(...triggers.map(t => t.length));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > maxLen) {
        keyBuffer = keyBuffer.slice(-maxLen);
      }

      if (triggers.some(trigger => keyBuffer.endsWith(trigger))) {
        setIsActive(true);
        setPhase("breach");
        setTerminalLines([]);
        keyBuffer = ""; 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. The Attack & Defense Sequence
  useEffect(() => {
    if (!isActive) return;

    let timeouts: NodeJS.Timeout[] = [];

    // Phase 1 -> 2: Switch from Breach Warning to "Encrypting"
    timeouts.push(setTimeout(() => setPhase("encrypting"), 2000));

    // Phase 2 -> 3: Countermeasures deploy (Terminal pops up)
    timeouts.push(setTimeout(() => {
      setPhase("countermeasure");
      
      // Simulate terminal typing
      const lines = [
        "> root_access detected: UNAUTHORIZED",
        "> initiating sp.sys defense protocols...",
        "> isolating infected DOM nodes...",
        "> reverse-engineering encryption keys...",
        "> DECRYPTING FILES [||||||||||] 100%",
        "> THREAT PURGED. RESTORING UI."
      ];
      
      lines.forEach((line, index) => {
        timeouts.push(setTimeout(() => {
          setTerminalLines(prev => [...prev, line]);
        }, index * 600)); // Type a new line every 600ms
      });

    }, 4500));

    // Phase 3 -> End: Fade back to normal
    timeouts.push(setTimeout(() => {
      setPhase("cleared");
      setTimeout(() => setIsActive(false), 1000);
    }, 9000)); // Total sequence lasts about 9 seconds

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999999] bg-red-950/90 backdrop-blur-sm pointer-events-auto flex flex-col items-center justify-center overflow-hidden font-mono text-red-500"
        >
          {/* Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%]" />

          {/* PHASE 1 & 2: The Attack */}
          <AnimatePresence>
            {(phase === "breach" || phase === "encrypting") && (
              <motion.div 
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center text-center gap-6"
              >
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <ShieldAlert size={80} className="text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]" />
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(239,68,68,1)]">
                  CRITICAL BREACH
                </h1>
                
                <p className="text-xl md:text-2xl animate-pulse">
                  {phase === "breach" ? "UNAUTHORIZED KALI LINUX SIGNATURE DETECTED" : "ENCRYPTING PORTFOLIO ASSETS..."}
                </p>

                {phase === "encrypting" && (
                  <div className="flex gap-4 mt-8">
                    {[...Array(5)].map((_, i) => (
                      <motion.div key={i} animate={{ rotateY: 360 }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}>
                        <Lock size={32} className="text-red-400" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* PHASE 3: The Countermeasure (Terminal) */}
          <AnimatePresence>
            {phase === "countermeasure" && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute w-full max-w-2xl bg-black border-2 border-green-500 rounded-lg p-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]"
              >
                <div className="flex items-center gap-3 border-b border-green-500/50 pb-4 mb-4 text-green-500">
                  <TerminalIcon size={24} />
                  <span className="font-bold tracking-widest uppercase">SP.SYS // Auto-Defense Subroutine</span>
                </div>
                
                <div className="flex flex-col gap-2 text-green-400 text-sm md:text-base">
                  {terminalLines.map((line, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                      {line}
                    </motion.div>
                  ))}
                  <span className="animate-pulse bg-green-500 text-green-500 inline-block w-2 h-4 mt-1">_</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}