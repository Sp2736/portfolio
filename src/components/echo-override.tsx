"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function EchoOverride() {
  const [isActive, setIsActive] = useState(false);
  const [echoes, setEchoes] = useState<{ id: number; x: number; y: number; tag: string; classes: string }[]>([]);
  const lastPos = useRef({ x: 0, y: 0 });

  // 1. TRIGGER: Type "leak"
  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement).isContentEditable) return;
      
      buffer += e.key.toLowerCase();
      if (buffer.endsWith("leak")) {
        setIsActive(prev => !prev);
        buffer = "";
      }
      if (buffer.length > 10) buffer = buffer.slice(-4);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. SAFE DOM SCANNER
  useEffect(() => {
    if (!isActive) {
      setEchoes([]);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.sqrt(Math.pow(e.clientX - lastPos.current.x, 2) + Math.pow(e.clientY - lastPos.current.y, 2));

      if (dist > 80) { // Distance threshold
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        if (!target || target.closest('.echo-container')) return;

        const tagName = target.tagName.toLowerCase();
        
        // Handle SVG classNames (which are objects, not strings)
        const rawClass = typeof target.className === 'string' 
          ? target.className 
          : (target.getAttribute('class') || '');

        const classList = rawClass
          .split(' ')
          .filter(c => c && !c.includes(':') && c.length < 15) // Filter out tailwind junk
          .slice(0, 1) // Just one class is cleaner
          .join('.');

        setEchoes(prev => {
          const newEcho = { 
            id: Date.now() + Math.random(), 
            x: e.clientX, 
            y: e.clientY, 
            tag: tagName, 
            classes: classList 
          };
          return [...prev.slice(-6), newEcho]; // Keep it lightweight (last 7 items)
        });
        
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive]);

  return (
    <div className="echo-container fixed inset-0 z-[9999999] pointer-events-none overflow-hidden select-none">
      <AnimatePresence mode="popLayout">
        {isActive && echoes.map((echo) => (
          <motion.div
            key={echo.id}
            initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="absolute font-mono text-[10px] font-bold whitespace-nowrap will-change-transform"
            style={{ 
              left: echo.x + 15, 
              top: echo.y + 15,
              // We use CSS variables directly from your globals.css
              color: "hsl(var(--primary))", 
              textShadow: "0 0 12px hsl(var(--primary) / 0.3)"
            }}
          >
            <span className="opacity-50 mr-1" style={{ color: "hsl(var(--foreground))" }}>&lt;</span>
            <span className="tracking-tighter uppercase">{echo.tag}</span>
            {echo.classes && (
              <span className="opacity-40 font-normal ml-0.5">
                .{echo.classes}
              </span>
            )}
            <span className="opacity-50 ml-1" style={{ color: "hsl(var(--foreground))" }}>/&gt;</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* STATUS OVERLAY */}
      <AnimatePresence>
        {isActive && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute bottom-10 left-10 font-mono text-[9px] tracking-[0.4em] font-black flex items-center gap-3 px-3 py-1.5 border border-primary/20 bg-background/80 backdrop-blur-md rounded-sm"
            style={{ color: "hsl(var(--primary))" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            DATA_LEAK_INSPECTOR_ACTIVE
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}