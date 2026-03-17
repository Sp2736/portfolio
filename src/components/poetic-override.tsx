"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PoeticOverride() {
  const [isActive, setIsActive] = useState(false);

  // The Keystroke Listener (The "poem" trigger)
  useEffect(() => {
    let keyBuffer = "";
    const secretCode = "poem";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      keyBuffer += e.key.toLowerCase();

      if (keyBuffer.length > secretCode.length) {
        keyBuffer = keyBuffer.slice(1);
      }

      if (keyBuffer === secretCode) {
        setIsActive(true);
        keyBuffer = ""; // Reset
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // The Cinematic Timer
  useEffect(() => {
    if (isActive) {
      // Keep the poetic screen up for 10 seconds before gracefully fading back
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 2.5 } }} // Slow, elegant fade out
          transition={{ duration: 2.5 }} // Slow, elegant fade in
          className="fixed inset-0 z-[999999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto overflow-hidden font-serif"
        >
          {/* Cinematic Ash / Dust Particles */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  y: -20,
                  x:
                    typeof window !== "undefined"
                      ? Math.random() * window.innerWidth
                      : 0,
                  opacity: 0,
                }}
                animate={{
                  y:
                    typeof window !== "undefined"
                      ? window.innerHeight + 20
                      : 1000,
                  x:
                    typeof window !== "undefined"
                      ? `calc(${Math.random() * window.innerWidth}px + ${Math.random() * 100 - 50}px)`
                      : 0,
                  opacity: [0, 0.8, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 6 + 6,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 5,
                }}
                className="absolute w-1 h-1 bg-white rounded-full blur-[1.5px]"
              />
            ))}
          </div>

          {/* Soft Vignette Overlay */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

          {/* The Poetry Content */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 1 }}
            className="relative z-10 text-center max-w-2xl px-8 flex flex-col gap-8"
          >
            <p className="text-xl md:text-3xl leading-relaxed italic font-light tracking-wide text-[#e5e5e5] drop-shadow-md">
              "A boy who loved the sun so much
              <br />
              he willingly froze underneath it —<br />
              leaving only words as proof he once burned."
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 4 }}
              className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/40 mt-6"
            >
              Before I Learned Goodbye
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
