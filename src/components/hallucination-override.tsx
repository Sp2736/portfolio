"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function HallucinationOverride() {
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. TRIGGER: Long Press (2 seconds) anywhere on the screen
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setIsActive(true);
        // Auto-reset after 12 seconds
        setTimeout(() => setIsActive(false), 12000);
      }, 2000); 
    };

    const stopTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    window.addEventListener("mousedown", startTimer);
    window.addEventListener("mouseup", stopTimer);
    window.addEventListener("touchstart", startTimer);
    window.addEventListener("touchend", stopTimer);

    return () => {
      window.removeEventListener("mousedown", startTimer);
      window.removeEventListener("mouseup", stopTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isActive && (
        <>
          {/* Global Glitch Styles */}
          <style dangerouslySetInnerHTML={{ __html: `
            h1, h2, .glitch-text {
              animation: ai-glitch 0.2s infinite;
              position: relative;
              color: #00fff2 !important;
              text-shadow: 2px 0 #ff00c1, -2px 0 #00fff2;
            }

            @keyframes ai-glitch {
              0% { transform: translate(0); }
              20% { transform: translate(-2px, 2px); }
              40% { transform: translate(-2px, -2px); }
              60% { transform: translate(2px, 2px); }
              80% { transform: translate(2px, -2px); }
              100% { transform: translate(0); }
            }

            /* The "Hallucination" - Swapping text via CSS */
            h1::after {
              content: " [IDENTITY CORRUPTED]";
              font-size: 0.5em;
              vertical-align: middle;
              color: white;
            }
          `}} />

          {/* Neural Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000000] pointer-events-none bg-cyan-950/20 backdrop-blur-[2px]"
          >
            {/* Moving "Data Streams" */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100 }}
                  animate={{ y: ["0vh", "100vh"] }}
                  transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, ease: "linear" }}
                  className="text-cyan-400 text-[10px] whitespace-nowrap"
                  style={{ marginLeft: `${i * 10}%` }}
                >
                  {Array(20).fill("PROMPT_INJECTION_DETECTED_").join("")}
                </motion.div>
              ))}
            </div>

            {/* Warning Box */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border-2 border-cyan-500 p-8 text-cyan-400 font-mono text-center shadow-[0_0_50px_rgba(6,182,212,0.5)]"
            >
              <h3 className="text-2xl font-bold mb-2 animate-pulse">NEURAL OVERLOAD</h3>
              <p className="text-sm tracking-widest">HALLUCINATING SYSTEM PARAMETERS...</p>
              <div className="mt-4 h-1 w-full bg-cyan-900 overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/2 bg-cyan-400"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}