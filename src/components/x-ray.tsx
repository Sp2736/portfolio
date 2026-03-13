"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan } from "lucide-react";

export function XRayLens() {
  const [isActive, setIsActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) return;
      
      setMousePos({ x: e.clientX, y: e.clientY });

      // Look for the closest element with a data-code attribute
      const target = e.target as HTMLElement;
      const codeElement = target.closest('[data-code]');
      
      if (codeElement) {
        setHoveredCode(codeElement.getAttribute('data-code'));
      } else {
        setHoveredCode(null);
      }
    };

    if (isActive) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "crosshair";
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
      setHoveredCode(null);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, [isActive]);

  return (
    <>
      {/* X-Ray Toggle Button */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 font-mono text-xs uppercase tracking-widest font-bold ${
          isActive 
            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.5)]" 
            : "bg-card/80 text-muted-foreground border-border hover:text-foreground backdrop-blur-md"
        }`}
      >
        <Scan size={14} className={isActive ? "animate-pulse" : ""} />
        X-Ray {isActive ? "ON" : "OFF"}
      </button>

      {/* Floating Code Tooltip */}
      <AnimatePresence>
        {isActive && hoveredCode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: mousePos.y + 20,
              left: mousePos.x + 20,
              pointerEvents: "none",
            }}
            className="z-[100] bg-[#1e1e1e] text-[#d4d4d4] p-3 rounded-lg border border-[#333] shadow-2xl font-mono text-[10px] whitespace-pre shadow-primary/20"
          >
            <div className="flex gap-1.5 mb-2 border-b border-[#333] pb-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            {/* Very simple simulated syntax highlighting */}
            <span className="text-[#569cd6]">export const</span> <span className="text-[#4fc1ff]">Component</span> = () =&gt; {'{\n'}
            {'  '}return (\n
            {'    '}
            <span className="text-[#ce9178]">"{hoveredCode}"</span>\n
            {'  '})\n
            {'}'}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}