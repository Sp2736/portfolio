"use client";

import { useState, useEffect, useRef } from "react";

export function KineticOverride() {
  const [isActive, setIsActive] = useState(false);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    let gCount = 0;
    let lastTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'g') {
        const now = Date.now();
        if (now - lastTime < 500) gCount++;
        else gCount = 1;
        lastTime = now;

        if (gCount === 3) {
          setIsActive(true);
          startGravity();
          gCount = 0;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const startGravity = () => {
    // Select everything: headers, paragraphs, buttons, and your project cards
    const nodes = document.querySelectorAll("h1, h2, h3, p, button, a, .project-card, span, img");
    const physicsObjects: any[] = [];

    nodes.forEach((node) => {
      const el = node as HTMLElement;
      const rect = el.getBoundingClientRect();

      // If the element is hidden or zero-sized, skip it
      if (rect.width === 0) return;

      // "Freeze" them in place before they fall
      const style = window.getComputedStyle(el);
      const originalTransform = style.transform === 'none' ? '' : style.transform;

      el.style.position = "fixed";
      el.style.top = `${rect.top}px`;
      el.style.left = `${rect.left}px`;
      el.style.width = `${rect.width}px`;
      el.style.zIndex = "999999";
      el.style.pointerEvents = "none";

      physicsObjects.push({
        el,
        x: rect.left,
        y: rect.top,
        rotation: 0,
        vx: (Math.random() - 0.5) * 6, // Random horizontal drift
        vy: (Math.random() * -5) - 2,  // Initial pop up
        vr: (Math.random() - 0.5) * 10, // Rotation speed
      });
    });

    const update = () => {
      physicsObjects.forEach((obj) => {
        obj.vy += 0.2; // Gravity strength
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.rotation += obj.vr;

        obj.el.style.transform = `translate(${obj.x - parseFloat(obj.el.style.left)}px, ${obj.y - parseFloat(obj.el.style.top)}px) rotate(${obj.rotation}deg)`;
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    // Auto-reload after 8 seconds to fix the site
    setTimeout(() => {
      window.location.reload();
    }, 8000);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[1000000] pointer-events-none bg-black/20 backdrop-blur-sm flex items-center justify-center">
       <div className="text-white font-mono text-center space-y-2">
         <h2 className="text-4xl font-black tracking-tighter animate-pulse">GRAVITY: NULL</h2>
         <p className="text-xs opacity-50 uppercase tracking-[0.5em]">System structural failure detected</p>
       </div>
    </div>
  );
}