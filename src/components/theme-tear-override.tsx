"use client";

import { useState, useEffect } from "react";

export function ThemeTearOverride() {
  const [isActive, setIsActive] = useState(false);
  const [splitX, setSplitX] = useState(50);

  useEffect(() => {
    let keyBuffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Escape') setIsActive(false);

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.endsWith("invert")) {
        setIsActive(true);
        keyBuffer = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const handleMouseMove = (e: MouseEvent) => {
      const percent = (e.clientX / window.innerWidth) * 100;
      setSplitX(percent);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <>
      {/* THE INVERSION PORTAL 
        We use a fixed div that covers the screen. 
        Background white + mix-blend-difference = Mathematical Inversion of the site below it.
      */}
      <div 
        className="fixed inset-0 z-[999998] bg-white mix-blend-difference pointer-events-none"
        style={{ 
          clipPath: `polygon(${splitX}% 0%, 100% 0%, 100% 100%, ${splitX}% 100%)`,
          // This ensures the inversion is crisp
          willChange: "clip-path"
        }}
      />

      {/* THE VISUAL TEAR & CONTROLS */}
      <div className="fixed inset-0 z-[999999] pointer-events-none">
        {/* The Jagged Line Graphic */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white/20 z-[1000000] pointer-events-auto cursor-col-resize"
          style={{ left: `${splitX}%` }}
        >
          <div className="absolute top-0 bottom-0 w-20 -ml-10">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 50 1000">
              <path 
                d="M25 0 L35 50 L15 100 L30 150 L20 200 L40 300 L10 400 L35 500 L15 600 L30 700 L20 800 L40 900 L25 1000" 
                stroke="white" 
                strokeWidth="2" 
                fill="none" 
                className="drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
              />
            </svg>
          </div>
        </div>

        {/* Labels - mix-blend-difference makes them visible on both themes */}
        <div className="absolute inset-x-0 bottom-12 flex justify-between px-24 font-mono text-[10px] md:text-sm uppercase tracking-[0.6em] text-white mix-blend-difference">
          <span className="opacity-50">[ ESC TO CLOSE ]</span>
        </div>
      </div>
    </>
  );
}