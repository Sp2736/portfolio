"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThermalOverride() {
  const [heat, setHeat] = useState(0);
  const [isMelting, setIsMelting] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(Date.now());
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dist = Math.sqrt(
        Math.pow(e.clientX - lastMousePos.current.x, 2) +
        Math.pow(e.clientY - lastMousePos.current.y, 2)
      );
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = now;

      if (dist > 180) {
        setHeat(prev => {
          // Slow, progressive build-up (approx 5-6 seconds to hit 100)
          const next = Math.min(prev + 0.6, 110);
          if (next >= 100 && !isMelting) setIsMelting(true);
          return next;
        });
      }
    };

    const coolDown = setInterval(() => {
      const timeSinceMove = Date.now() - lastMoveTime.current;

      setHeat(prev => {
        if (prev <= 0) {
          if (isMelting) setIsMelting(false);
          return 0;
        }

        // SMOOTH DECAY LOGIC
        // If moving, very slow decay. If stopped, medium-slow drain.
        const decayRate = timeSinceMove > 400 ? 1.2 : 0.2; 
        return Math.max(prev - decayRate, 0);
      });
    }, 40);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(coolDown);
    };
  }, [isMelting]);

  return (
    <>
      {/* 1. DISPLACEMENT & BURN FILTERS */}
      <svg className="fixed pointer-events-none h-0 w-0">
        <defs>
          <filter id="melt-drip">
            {/* Base frequency shifts slightly to create a "wobble" during the melt */}
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.05" numOctaves="2" seed="5">
               <animate attributeName="baseFrequency" values="0.01 0.05; 0.01 0.07; 0.01 0.05" dur="5s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale={heat * 1.2} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 2. THE MAGMA UNDERGLOW */}
      <AnimatePresence>
        {heat > 30 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (heat - 30) / 70 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999996] bg-[#120400] pointer-events-none"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff4500_0%,_#000_80%)] opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SITE DEFORMATION CONTROL */}
      <style dangerouslySetInnerHTML={{ __html: `
        #main-content {
          /* Smoothly interpolate the filter intensity */
          filter: ${heat > 5 ? `url(#melt-drip) brightness(${1 - (heat / 180)}) contrast(${1 + (heat / 200)})` : 'none'};
          /* Transition is set to medium-slow (600ms) to ensure fluidity */
          transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s ease;
          pointer-events: ${heat > 90 ? 'none' : 'auto'};
        }
      `}} />

      {/* 4. OVERLAY WARNINGS */}
      <AnimatePresence>
        {isMelting && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[999999] pointer-events-none flex flex-col items-center justify-center font-mono"
          >
             <div className="bg-orange-600 text-white px-8 py-3 text-2xl font-black italic shadow-[8px_8px_0px_#000] border-2 border-orange-400">
              THERMAL OVERLOAD
            </div>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              className="h-1 bg-orange-500 mt-4 overflow-hidden"
            >
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="h-full w-full bg-white opacity-50"
              />
            </motion.div>

            <div className="mt-2 text-orange-500 text-[10px] tracking-[0.5em] uppercase font-bold">
              Dissipating Heat...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}