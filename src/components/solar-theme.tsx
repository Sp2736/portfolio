"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Flame, RefreshCcw, AlertTriangle } from "lucide-react";

// --- Global CSS Injection for the Slow Wax Meltdown ---
const meltdownStyles = `
  /* 1. Heat Shimmer (Pre-Melt) */
  .heating-up > *:not(.easter-egg-safe) {
    animation: heatShimmer 0.1s infinite alternate linear;
  }

  @keyframes heatShimmer {
    0% { transform: skewX(0deg) translateY(0px); filter: contrast(1.05); }
    100% { transform: skewX(0.5deg) translateY(-0.5px); filter: contrast(1.1); }
  }

  /* 2. Full Site Structural Collapse */
  .meltdown-active > *:not(.easter-egg-safe) {
    /* We use an SVG filter here to physically ripple and warp the pixels */
    filter: url(#detailed-liquid-melt) saturate(1.3) contrast(1.1);
    animation: detailedMeltSequence 15s forwards cubic-bezier(0.5, 0, 1, 1);
    pointer-events: none !important;
    transform-origin: top center;
  }

  @keyframes detailedMeltSequence {
    0% {
      transform: translateY(0) scaleY(1) scaleX(1);
    }
    15% {
      /* Softening the structure */
      transform: translateY(2px) scaleY(1.02) scaleX(0.99);
    }
    50% {
      /* Dripping phase - elongating downwards */
      transform: translateY(15vh) scaleY(1.4) scaleX(0.95);
    }
    100% {
      /* The Wax Puddle - pooled at the bottom, squished but readable */
      transform: translateY(85vh) scaleY(0.12) scaleX(1.08);
      opacity: 0.85; 
    }
  }
`;

// --- 1. The Easter Egg Controller ---
function MeltdownEasterEgg() {
  const [meltState, setMeltState] = useState<"idle" | "heating" | "melting" | "melted">("idle");
  const [temp, setTemp] = useState(38);

  // Dynamic Temperature HUD
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (meltState === "heating" || meltState === "melting") {
      interval = setInterval(() => {
        setTemp(prev => {
          // Increase faster during actual melt
          const inc = meltState === "melting" ? Math.random() * 25 + 10 : Math.random() * 5 + 2;
          return Math.floor(Math.min(prev + inc, 3400));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [meltState]);

  const triggerMeltdown = () => {
    if (meltState !== "idle") return;
    
    setMeltState("heating");
    document.body.classList.add("heating-up");
    
    // 3 seconds of intense heat shimmer before the melt begins
    setTimeout(() => {
      setMeltState("melting");
      document.body.classList.remove("heating-up");
      document.body.classList.add("meltdown-active");
      
      // The melt animation takes 15 seconds
      setTimeout(() => {
        setMeltState("melted");
      }, 15000);
    }, 3000);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    // The .easter-egg-safe class prevents these specific elements from melting!
    <div className="easter-egg-safe">
      
      {/* THE MAGIC: SVG Displacement Filter that dynamically animates to warp the DOM */}
      <svg className="fixed w-0 h-0 pointer-events-none">
        <defs>
          <filter id="detailed-liquid-melt" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.001 0.01" numOctaves="1" result="warp">
              {/* Animates the frequency to make the waves tighter and faster as it melts */}
              <animate attributeName="baseFrequency" values="0.001 0.01; 0.02 0.15" dur="15s" fill="freeze" />
            </feTurbulence>
            {/* Animates the scale of the displacement to rip the pixels apart over 15 seconds */}
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="0" in="SourceGraphic" in2="warp">
              <animate attributeName="scale" values="0; 10; 40; 100" dur="15s" fill="freeze" />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>

      {/* Temperature Alert HUD */}
      {(meltState === "heating" || meltState === "melting" || meltState === "melted") && (
        <div className="fixed top-24 right-10 z-[300] font-mono text-right pointer-events-none">
          <div className={`text-xs tracking-tighter uppercase font-bold ${meltState === "melted" ? "text-blue-500" : "text-red-500 animate-pulse"}`}>
            {meltState === "melted" ? "SYSTEM OFFLINE" : "CORE TEMPERATURE"}
          </div>
          <div className={`text-5xl font-black italic leading-none drop-shadow-lg ${meltState === "melted" ? "text-blue-600" : "text-orange-500"}`}>
            {temp}°C
          </div>
        </div>
      )}

      {/* Ambient Heat Glow Overlay */}
      <div 
        className={`fixed inset-0 pointer-events-none z-[250] transition-opacity duration-[8000ms] ease-in mix-blend-overlay ${
          meltState === "heating" || meltState === "melting" 
            ? "bg-red-600/30 opacity-100" 
            : "opacity-0"
        }`} 
      />

      {/* The Controller Button */}
      <button
        onClick={meltState === "melted" ? handleReload : triggerMeltdown}
        disabled={meltState === "heating" || meltState === "melting"}
        className={`fixed bottom-6 left-6 z-[300] flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-500 font-mono text-xs uppercase tracking-widest font-bold shadow-2xl backdrop-blur-xl ${
          meltState === "idle"
            ? "bg-orange-600/20 text-orange-500 border-orange-500/50 hover:bg-orange-600 hover:text-white hover:shadow-[0_0_20px_rgba(234,88,12,0.6)]"
            : meltState === "melted"
            ? "bg-blue-600 text-white border-blue-400 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-bounce"
            : "bg-red-950/50 text-red-500 border-red-900 opacity-80 cursor-not-allowed" 
        }`}
      >
        {meltState === "idle" && (
          <>
            <Flame size={16} className="animate-pulse" />
            BRING ON THE FLARE!
          </>
        )}
        {meltState === "heating" && "OVERLOADING..."}
        {meltState === "melting" && "SYSTEM MELTDOWN"}
        {meltState === "melted" && (
          <>
            <RefreshCcw size={16} />
            COOL DOWN (RESET)
          </>
        )}
      </button>

    </div>
  );
}

// --- 2. Foreground Interactive Cursor (Explosions only, NO DOM Shake) ---
// --- 2. Foreground Interactive Cursor (Explosions only, NO DOM Shake, NO Rings) ---
function SolarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    const embers: Ember[] = [];
    const trail: TrailPoint[] = [];

    const TRAIL_DECAY = 0.025; 
    const TRAIL_WIDTH = 5; 
    const EMBER_COUNT = 40; // Increased to make the flare explosion look better without the rings
    const EMBER_SPEED_MIN = 4;
    const EMBER_SPEED_MAX = 14; 
    const COLORS = ["#fef08a", "#f97316", "#ea580c", "#dc2626", "#991b1b"];

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      trail.push(new TrailPoint(e.clientX, e.clientY));
    };

    const handleClick = (e: MouseEvent) => {
      // Spawn violent flare burst only (Rings removed)
      for (let i = 0; i < EMBER_COUNT; i++) {
        embers.push(new Ember(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    class TrailPoint {
      x: number; y: number; life: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y; this.life = 1.0;
      }
      update() { this.life -= TRAIL_DECAY; }
    }

    class Ember {
      x: number; y: number; vx: number; vy: number;
      size: number; life: number; maxLife: number; color: string;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (EMBER_SPEED_MAX - EMBER_SPEED_MIN) + EMBER_SPEED_MIN;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 6; 
        this.size = Math.random() * 8 + 3; 
        this.life = 0;
        this.maxLife = Math.random() * 25 + 15;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.x += this.vx; 
        this.vy += 0.2; 
        this.y += this.vy;
        this.vx *= 0.95; 
        this.life++; 
        this.size *= 0.88; 
      }
      draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = Math.max(0, 1 - this.life / this.maxLife);
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render Trail
      for (let i = trail.length - 1; i >= 0; i--) {
        const point = trail[i];
        point.update();
        if (point.life <= 0) trail.splice(i, 1);
      }

      if (trail.length > 1) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        for (let i = 0; i < trail.length - 1; i++) {
            const point = trail[i];
            const nextPoint = trail[i+1];
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(nextPoint.x, nextPoint.y);
            
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#dc2626"; 
            ctx.lineWidth = TRAIL_WIDTH * point.life; 
            ctx.strokeStyle = `rgba(220, 38, 38, ${point.life})`; 
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            ctx.lineWidth = (TRAIL_WIDTH * 0.5) * point.life;
            ctx.strokeStyle = `rgba(253, 224, 71, ${point.life})`; 
            ctx.stroke();
        }
      }

      // Render Flare Embers
      for (let i = embers.length - 1; i >= 0; i--) {
        const p = embers[i];
        p.update();
        p.draw(ctx);
        if (p.life >= p.maxLife) embers.splice(i, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" />;
}

// --- 3. Apocalyptic Background (Orbital Strike & Rising Ash) ---
function ApocalypticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let fireballs: Fireball[] = [];
    let ashParticles: Ash[] = [];

    const ASH_COUNT = 250; 
    const FIREBALL_FREQUENCY = 0.05; 
    const COLORS = {
      fireballCore: "#ffffff",
      fireballHead: "#fef08a", 
      fireballBody: "#ea580c", 
      fireballTail: "rgba(153, 27, 27, 0)", 
    };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    class Ash {
      x: number; y: number; size: number; opacity: number; speedY: number; speedX: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.speedY = Math.random() * -3 - 1; 
        this.speedX = (Math.random() - 0.5) * 2; 
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity += (Math.random() - 0.5) * 0.2;
        if (this.opacity > 1) this.opacity = 1;
        if (this.opacity < 0.2) this.opacity = 0.2;

        if (this.y < -10) {
          this.y = canvas!.height + 10;
          this.x = Math.random() * canvas!.width;
        }
      }
      draw(context: CanvasRenderingContext2D) {
        const isGlowing = Math.random() > 0.95;
        context.fillStyle = isGlowing ? `rgba(234, 88, 12, ${this.opacity})` : `rgba(30, 30, 30, ${this.opacity * 0.5})`; 
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    class Fireball {
      x: number; y: number; length: number; speed: number; angle: number; width: number;
      constructor() {
        this.x = Math.random() * (canvas!.width * 1.5) - (canvas!.width * 0.25);
        this.y = -200;
        this.length = Math.random() * 200 + 100; 
        this.speed = Math.random() * 25 + 15; 
        this.angle = Math.PI * 0.35 + (Math.random() * 0.1); 
        this.width = Math.random() * 4 + 2; 
      }
      update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
      }
      draw(context: CanvasRenderingContext2D) {
        const endX = this.x - this.length * Math.cos(this.angle);
        const endY = this.y - this.length * Math.sin(this.angle);
        
        const gradient = context.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, COLORS.fireballCore);
        gradient.addColorStop(0.1, COLORS.fireballHead);
        gradient.addColorStop(0.3, COLORS.fireballBody);
        gradient.addColorStop(1, COLORS.fireballTail);

        context.strokeStyle = gradient;
        context.lineWidth = this.width;
        context.lineCap = "round";
        context.shadowBlur = 25;
        context.shadowColor = COLORS.fireballBody;

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(endX, endY);
        context.stroke();
        context.shadowBlur = 0;
      }
      isOutOfBounds() { return this.y > canvas!.height + 200; }
    }

    for (let i = 0; i < ASH_COUNT; i++) ashParticles.push(new Ash());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ashParticles.forEach(a => { a.update(); a.draw(ctx); });
      
      if (Math.random() < FIREBALL_FREQUENCY) fireballs.push(new Fireball());
      
      fireballs.forEach((f, i) => {
        f.update(); f.draw(ctx);
        if (f.isOutOfBounds()) fireballs.splice(i, 1);
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-3] bg-gradient-to-t from-red-900/40 via-orange-900/10 to-transparent" />
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-2] opacity-90" />
    </>
  );
}

// --- 4. Main Export Component ---
export function SolarThemeEffects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "solar") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: meltdownStyles }} />
      <ApocalypticBackground />
      <SolarCursor />
      <MeltdownEasterEgg />
    </>
  );
}