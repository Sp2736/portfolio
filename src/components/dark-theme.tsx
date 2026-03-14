"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Orbit, RefreshCcw, AlertOctagon } from "lucide-react";

// --- 1. Foreground Interactive Cursor (Starlight & Trails) ---
function StarlightCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    const stars: StarParticle[] = [];
    const trail: TrailPoint[] = [];

    const TRAIL_DECAY = 0.02; 
    const TRAIL_WIDTH = 3; 
    const STAR_COUNT = 15; 
    const STAR_SPEED_MIN = 1;
    const STAR_SPEED_MAX = 5; 
    // Pure whites and stark silvers for the professional Shadcn look
    const COLORS = ["#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0"]; 

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      trail.push(new TrailPoint(e.clientX, e.clientY));
      if (Math.random() > 0.8) {
        stars.push(new StarParticle(e.clientX, e.clientY));
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new StarParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const drawStarShape = (context: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
      context.save();
      context.beginPath();
      context.translate(x, y);
      context.moveTo(0, -radius);
      context.quadraticCurveTo(0, 0, radius, 0);
      context.quadraticCurveTo(0, 0, 0, radius);
      context.quadraticCurveTo(0, 0, -radius, 0);
      context.quadraticCurveTo(0, 0, 0, -radius);
      context.fill();
      context.restore();
    };

    class TrailPoint {
      x: number; y: number; life: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y; this.life = 1.0;
      }
      update() { this.life -= TRAIL_DECAY; }
    }

    class StarParticle {
      x: number; y: number; vx: number; vy: number;
      size: number; life: number; maxLife: number; color: string; rotation: number; rotSpeed: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN) + STAR_SPEED_MIN;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 8 + 4; 
        this.life = 0;
        this.maxLife = Math.random() * 30 + 20;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.rotation = Math.random() * Math.PI;
        this.rotSpeed = (Math.random() - 0.5) * 0.2; 
      }
      update() {
        this.x += this.vx; 
        this.y += this.vy;
        this.life++; 
        this.size *= 0.95; 
        this.rotation += this.rotSpeed;
      }
      draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = Math.max(0, 1 - this.life / this.maxLife);
        context.fillStyle = this.color;
        
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        drawStarShape(context, 0, 0, this.size); 
        context.restore();
        
        context.globalAlpha = 1;
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = "#ffffff";
            ctx.lineWidth = TRAIL_WIDTH * point.life; 
            ctx.strokeStyle = `rgba(255, 255, 255, ${point.life * 0.5})`; 
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            ctx.lineWidth = (TRAIL_WIDTH * 0.5) * point.life;
            ctx.strokeStyle = `rgba(255, 255, 255, ${point.life})`; 
            ctx.stroke();
        }
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.update();
        s.draw(ctx);
        if (s.life >= s.maxLife) stars.splice(i, 1);
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

// --- 2. Magnetic Data Swarm Background (Gravitational Vortex) ---
function GravitySwarmBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false optimizes rendering since we fill the bg manually
    if (!ctx) return;

    let animationFrameId: number;
    let dataNodes: DataNode[] = [];
    
    // Density based on screen size
    const NODE_COUNT = typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 700; 
    
    let mouse = { x: -1000, y: -1000 };
    let isClicking = false;
    let clickTimeout: NodeJS.Timeout;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleMouseDown = () => {
      isClicking = true;
      clearTimeout(clickTimeout);
      // The explosion force lasts for 200ms
      clickTimeout = setTimeout(() => { isClicking = false; }, 200); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);

    class DataNode {
      x: number; y: number; vx: number; vy: number; 
      baseAlpha: number; size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 1.5 + 0.5; // Tiny data bits
        this.baseAlpha = Math.random() * 0.3 + 0.1;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Ambient fluid drift
        this.vx += (Math.random() - 0.5) * 0.1;
        this.vy += (Math.random() - 0.5) * 0.1;

        if (distance < 350) {
          const force = (350 - distance) / 350;
          
          if (isClicking) {
            // Supernova: Violent Repulsion
            this.vx -= (dx / distance) * force * 15;
            this.vy -= (dy / distance) * force * 15;
          } else {
            // Gravity Vortex: Pulls inward and spins tangentially
            this.vx += (dx / distance) * force * 0.6; 
            this.vy += (dy / distance) * force * 0.6; 
            // Add perpendicular tangential force to create the swirl
            this.vx += (dy / distance) * force * 0.4;
            this.vy -= (dx / distance) * force * 0.4;
          }
        }

        // Space Friction
        this.vx *= 0.94;
        this.vy *= 0.94;
        
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen beautifully
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw(context: CanvasRenderingContext2D) {
        // Opacity increases as they speed up (they glow when pulled)
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const dynamicAlpha = Math.min(this.baseAlpha + speed * 0.05, 1);
        
        context.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) dataNodes.push(new DataNode());

    const render = () => {
      // MOTION BLUR EFFECT: Instead of clearRect, we fill with a semi-transparent dark color.
      // 9, 9, 11 is the exact RGB equivalent of Shadcn's hsl(240 10% 3.9%) background.
      ctx.fillStyle = "rgba(9, 9, 11, 0.25)"; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      dataNodes.forEach(node => {
        node.update();
        node.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-2]" />
  );
}

// --- Global CSS Injection for the Black Hole Collapse ---
const singularityStyles = `
  /* Phase 1: Gravity Tremors (Event Horizon forming) */
  .spooling-up > *:not(.easter-egg-safe) {
    animation: gravityTremor 0.05s infinite alternate cubic-bezier(0.5, 0.05, 1, 0.5);
    filter: saturate(0.8) contrast(1.2);
  }

  @keyframes gravityTremor {
    0% { transform: translate(1px, 1px) rotate(0.1deg); }
    100% { transform: translate(-1px, -1px) rotate(-0.1deg); }
  }

  /* Phase 2: Spaghettification (The Collapse) */
  .singularity-active > *:not(.easter-egg-safe) {
    animation: spaghettify 6s forwards cubic-bezier(0.7, 0, 0.1, 1);
    pointer-events: none !important;
    /* Forces the suck to the exact center of the viewport */
    transform-origin: 50vw 50vh; 
  }

  @keyframes spaghettify {
    0% {
      transform: scale(1) rotate(0deg) translate(0, 0);
      filter: blur(0px) brightness(1);
      opacity: 1;
    }
    30% {
      /* Gravity grabs the UI - begins to stretch and twist */
      transform: scale(0.8) rotate(-5deg) translate(0, 0);
      filter: blur(2px) brightness(1.5);
    }
    60% {
      /* Violent suck towards the center */
      transform: scale(0.3) rotate(45deg) translate(0, 0);
      filter: blur(8px) brightness(2);
    }
    100% {
      /* Crushed into the singularity */
      transform: scale(0) rotate(720deg) translate(0, 0);
      filter: blur(20px) brightness(0);
      opacity: 0;
    }
  }

  /* Accretion Disk Spin */
  @keyframes spinDisk {
    from { transform: translate(-50%, -50%) rotate(0deg) scale(1); }
    to { transform: translate(-50%, -50%) rotate(360deg) scale(1.1); }
  }
`;

function SingularityEasterEgg() {
  const [singularityState, setSingularityState] = useState<"idle" | "spooling" | "collapsing" | "collapsed">("idle");
  const [mass, setMass] = useState(0);

  // Mass HUD logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (singularityState === "spooling" || singularityState === "collapsing") {
      interval = setInterval(() => {
        setMass(prev => {
          const inc = singularityState === "collapsing" ? Math.random() * 500000 : Math.random() * 5000;
          return Math.floor(Math.min(prev + inc, 9999999));
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [singularityState]);

  const triggerSingularity = () => {
    if (singularityState !== "idle") return;
    
    setSingularityState("spooling");
    document.body.classList.add("spooling-up");
    
    // 3 seconds of tremors before the Event Horizon opens
    setTimeout(() => {
      setSingularityState("collapsing");
      document.body.classList.remove("spooling-up");
      document.body.classList.add("singularity-active");
      
      // 6 seconds to be crushed into the black hole
      setTimeout(() => {
        setSingularityState("collapsed");
      }, 6000);
    }, 3000);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="easter-egg-safe">
      {/* THE BLACK HOLE */}
      <div 
        className={`fixed top-1/2 left-1/2 z-[250] pointer-events-none rounded-full bg-black transition-all duration-[6000ms] ease-in-out ${
          singularityState === "collapsing" || singularityState === "collapsed"
            ? "w-[20vw] h-[20vw] opacity-100" 
            : "w-0 h-0 opacity-0"
        }`}
        style={{ 
          transform: 'translate(-50%, -50%)',
          boxShadow: singularityState !== "idle" ? '0 0 100px 50px rgba(124, 58, 237, 0.6), inset 0 0 50px 20px rgba(0,0,0,1)' : 'none'
        }}
      >
        {/* Accretion Disk (The glowing ring of light) */}
        <div 
          className="absolute top-1/2 left-1/2 w-[150%] h-[150%] rounded-full border-[10px] border-t-purple-500 border-r-blue-500 border-b-transparent border-l-transparent opacity-80"
          style={{ animation: 'spinDisk 1s linear infinite' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[180%] h-[180%] rounded-full border-[4px] border-b-purple-400 border-l-blue-400 border-t-transparent border-r-transparent opacity-40"
          style={{ animation: 'spinDisk 1.5s linear infinite reverse' }}
        />
      </div>

      {/* HUD Warning */}
      {(singularityState === "spooling" || singularityState === "collapsing" || singularityState === "collapsed") && (
        <div className="fixed top-24 right-10 z-[300] font-mono text-right pointer-events-none">
          <div className={`text-xs tracking-widest uppercase font-black px-2 py-1 inline-block mb-1 ${
            singularityState === "collapsed" ? "bg-slate-900 text-slate-500" : "bg-purple-950 text-purple-400 animate-pulse"
          }`}>
            {singularityState === "collapsed" ? "EVENT HORIZON REACHED" : "GRAVITATIONAL ANOMALY"}
          </div>
          <div className={`text-6xl font-black italic leading-none drop-shadow-[0_0_15px_rgba(124,58,237,0.8)] ${
            singularityState === "collapsed" ? "text-slate-800" : "text-purple-500"
          }`}>
            {mass} <span className="text-xl">M☉</span>
          </div>
        </div>
      )}

      {/* Controller Button */}
      <div className="fixed bottom-6 left-6 z-[300] flex flex-col items-start gap-3">
        <div className={`overflow-hidden transition-all duration-500 ${singularityState === "spooling" ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="bg-purple-900 text-purple-100 text-[10px] px-3 py-1.5 rounded-sm font-bold animate-pulse flex items-center gap-2 shadow-[0_0_15px_rgba(124,58,237,0.8)]">
            <AlertOctagon size={12} />
            MASS EXPANSION DETECTED
          </div>
        </div>

        <button
          onClick={singularityState === "collapsed" ? handleReload : triggerSingularity}
          disabled={singularityState === "spooling" || singularityState === "collapsing"}
          className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 font-mono text-xs uppercase tracking-widest font-bold shadow-2xl backdrop-blur-xl ${
            singularityState === "idle"
              ? "bg-purple-950/40 text-purple-400 border-purple-500/50 hover:bg-purple-900 hover:text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.8)]"
              : singularityState === "collapsed"
              ? "bg-slate-800/80 text-white border-slate-500 hover:bg-slate-700 animate-pulse"
              : "bg-black text-purple-900 border-purple-950 cursor-not-allowed" 
          }`}
        >
          {singularityState === "idle" && (
            <>
              <Orbit size={16} className="text-purple-400 group-hover:spin-slow transition-transform" />
              INITIATE SINGULARITY
            </>
          )}
          {singularityState === "spooling" && "SPOOLING GRAVITY WELL..."}
          {singularityState === "collapsing" && "SPAGHETTIFICATION..."}
          {singularityState === "collapsed" && (
            <>
              <RefreshCcw size={16} />
              WHITE HOLE EJECTION (RESET)
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// --- 3. Main Export Component ---
export function DarkThemeEffects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "dark") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: singularityStyles }} />
      <GravitySwarmBackground /> {/* Or GravitySwarmBackground, whatever you named it */}
      <StarlightCursor />
      <SingularityEasterEgg />
    </>
  );
}