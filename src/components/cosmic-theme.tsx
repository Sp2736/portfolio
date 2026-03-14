"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Rocket, RefreshCcw, Orbit } from "lucide-react";   

// --- 1. Foreground Interactive Cursor (Trails & Sparkles) ---
function CosmicCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Arrays to hold our active elements
    const sparkles: Sparkle[] = [];
    const trail: TrailPoint[] = [];

    // Configuration
    const TRAIL_DECAY = 0.016; 
    const TRAIL_WIDTH = 3;
    const SPARKLE_COUNT = 12; 
    const SPARKLE_SPEED_MIN = 2;
    const SPARKLE_SPEED_MAX = 6; 
    const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#ffffff"]; 

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
      for (let i = 0; i < SPARKLE_COUNT; i++) {
        sparkles.push(new Sparkle(e.clientX, e.clientY));
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

    class Sparkle {
      x: number; y: number; vx: number; vy: number;
      size: number; life: number; maxLife: number; color: string;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * (SPARKLE_SPEED_MAX - SPARKLE_SPEED_MIN) + SPARKLE_SPEED_MIN;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 4 + 2; 
        this.life = 0;
        this.maxLife = Math.random() * 20 + 30;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        this.life++; this.size *= 0.95; 
      }
      draw(context: CanvasRenderingContext2D) {
        context.globalAlpha = 1 - this.life / this.maxLife;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 1;
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Trail Logic
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
            ctx.shadowColor = "#3b82f6";
            ctx.lineWidth = TRAIL_WIDTH * point.life; 
            ctx.strokeStyle = `rgba(59, 130, 246, ${point.life})`;
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            ctx.lineWidth = (TRAIL_WIDTH * 0.5) * point.life;
            ctx.strokeStyle = `rgba(255, 255, 255, ${point.life})`;
            ctx.stroke();
        }
      }

      // Sparkles Logic
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const p = sparkles[i];
        p.update();
        p.draw(ctx);
        if (p.life >= p.maxLife) sparkles.splice(i, 1);
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

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[100]" style={{ mixBlendMode: "screen" }} />
  );
}

// --- 2. Background Starfield & Meteors ---
function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let meteors: Meteor[] = [];
    let stars: Star[] = [];

    const STAR_COUNT = 300; 
    const METEOR_FREQUENCY = 0.03; 
    const COLORS = {
      meteorHead: "#ffffff",
      meteorTail: "rgba(59, 130, 246, 1)", 
    };

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    class Star {
      x: number; y: number; size: number; opacity: number; blinkSpeed: number;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.blinkSpeed = Math.random() * 0.005 + 0.002;
      }
      update() {
        this.opacity += this.blinkSpeed;
        if (this.opacity > 0.8 || this.opacity < 0.1) this.blinkSpeed = -this.blinkSpeed;
      }
      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }

    class Meteor {
      x: number; y: number; length: number; speed: number; angle: number;
      constructor() {
        this.x = Math.random() * (canvas!.width + 200) - 100;
        this.y = -100;
        this.length = Math.random() * 150 + 50; 
        this.speed = Math.random() * 15 + 10; 
        this.angle = Math.PI / 4; 
      }
      update() {
        this.x -= this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
      }
      draw(context: CanvasRenderingContext2D) {
        const endX = this.x + this.length * Math.cos(this.angle);
        const endY = this.y - this.length * Math.sin(this.angle);
        
        const gradient = context.createLinearGradient(this.x, this.y, endX, endY);
        gradient.addColorStop(0, COLORS.meteorHead);
        gradient.addColorStop(0.2, COLORS.meteorTail);
        gradient.addColorStop(1, "transparent");

        context.strokeStyle = gradient;
        context.lineWidth = 2.5;
        context.lineCap = "round";
        context.shadowBlur = 15;
        context.shadowColor = COLORS.meteorTail;

        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(endX, endY);
        context.stroke();
        context.shadowBlur = 0;
      }
      isOutOfBounds() { return this.x < -200 || this.y > canvas!.height + 200; }
    }

    for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => { s.update(); s.draw(ctx); });
      
      if (Math.random() < METEOR_FREQUENCY) meteors.push(new Meteor());
      
      meteors.forEach((m, i) => {
        m.update(); m.draw(ctx);
        if (m.isOutOfBounds()) meteors.splice(i, 1);
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-2] opacity-100" />;
}

// --- Global CSS Injection for the Hyperspace Jump ---
const warpStyles = `
  /* Phase 1: Engine Spooling (Hull Vibration) */
  .warp-spooling > *:not(.easter-egg-safe) {
    animation: hullVibrate 0.05s infinite alternate linear;
  }

  @keyframes hullVibrate {
    0% { transform: translate(1px, 1px) scale(1); filter: contrast(1) brightness(1); }
    100% { transform: translate(-1px, -1px) scale(0.999); filter: contrast(1.1) brightness(1.1); }
  }

  /* Phase 2: The Jump (Perspective pushback, then massive acceleration forward) */
  .warp-active > *:not(.easter-egg-safe) {
    animation: lightSpeedJump 1.5s forwards cubic-bezier(0.6, -0.2, 0.2, 1);
    transform-origin: 50vw 50vh;
    pointer-events: none !important;
  }

  @keyframes lightSpeedJump {
    0% {
      transform: scale(1) translateZ(0) translateY(0);
      filter: blur(0px) brightness(1.2);
      opacity: 1;
    }
    20% {
      /* The Pushback (G-Force) */
      transform: scale(0.95) translateZ(-100px) translateY(20px);
      filter: blur(1px) brightness(0.8);
      opacity: 1;
    }
    100% {
      /* The Slingshot (Warp Speed) */
      transform: scale(10) translateZ(1000px) translateY(-200px);
      filter: blur(20px) brightness(3);
      opacity: 0;
    }
  }
`;

export function WarpDriveEasterEgg() {
  const [warpState, setWarpState] = useState<"idle" | "spooling" | "warped">("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [velocity, setVelocity] = useState(0.001);

  // --- 3D Warp Drive Engine ---
  useEffect(() => {
    // We only run the heavy 3D math if the warp drive is engaged
    if (warpState === "idle") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let celestialObjects: CelestialObject[] = [];
    const OBJECT_COUNT = 400; // Dense starfield
    const FOV = 800; // Field of view for 3D projection
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Speed controller
    let currentSpeed = 0;
    let targetSpeed = warpState === "spooling" ? 15 : 120; // Max warp speed

    class CelestialObject {
      x: number; y: number; z: number; pz: number;
      type: 'star' | 'energy' | 'asteroid' | 'planet';
      color: string; size: number; angle: number;

      constructor(spawnDeep = true) {
        // Spread objects wide across the X and Y axes
        this.x = (Math.random() - 0.5) * canvas!.width * 4;
        this.y = (Math.random() - 0.5) * canvas!.height * 4;
        // Z is depth. 2000 is far away, 1 is hitting the camera.
        this.z = spawnDeep ? Math.random() * 2000 + 100 : 2500;
        this.pz = this.z;
        this.angle = Math.random() * Math.PI * 2;

        const rand = Math.random();
        if (rand < 0.85) {
          // 85% basic white stars
          this.type = 'star';
          this.color = '#ffffff';
          this.size = Math.random() * 2 + 0.5;
        } else if (rand < 0.95) {
          // 10% glowing hyperspace energy streaks
          this.type = 'energy';
          const colors = ['#3b82f6', '#8b5cf6', '#22d3ee', '#fb7185']; 
          this.color = colors[Math.floor(Math.random() * colors.length)];
          this.size = Math.random() * 4 + 2;
        } else if (rand < 0.99) {
          // 4% grey jagged asteroids
          this.type = 'asteroid';
          this.color = '#475569'; 
          this.size = Math.random() * 20 + 5;
        } else {
          // 1% massive colored planets
          this.type = 'planet';
          const pColors = ['#f43f5e', '#10b981', '#f59e0b', '#6366f1'];
          this.color = pColors[Math.floor(Math.random() * pColors.length)];
          this.size = Math.random() * 80 + 30; 
        }
      }

      update(speed: number) {
        this.pz = this.z;
        this.z -= speed;

        // Rotate asteroids slowly
        if (this.type === 'asteroid') this.angle += 0.05;

        // Respawn far away if it passes the camera
        if (this.z < 1) {
          this.z = 2500;
          this.pz = 2500;
          this.x = (Math.random() - 0.5) * canvas!.width * 4;
          this.y = (Math.random() - 0.5) * canvas!.height * 4;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        const cx = canvas!.width / 2;
        const cy = canvas!.height / 2;
        
        // 3D to 2D Projection Math
        const scale = FOV / this.z;
        const x2d = (this.x * scale) + cx;
        const y2d = (this.y * scale) + cy;

        const pScale = FOV / this.pz;
        const px2d = (this.x * pScale) + cx;
        const py2d = (this.y * pScale) + cy;

        // Fade in as they get closer (z decreases)
        const opacity = Math.min(1, Math.max(0, 1 - (this.z / 2000)));

        context.globalAlpha = opacity;

        if (this.type === 'star' || this.type === 'energy') {
          // Draw streaking lines for speed
          context.beginPath();
          context.moveTo(px2d, py2d);
          context.lineTo(x2d, y2d);
          
          context.strokeStyle = this.color;
          context.lineWidth = this.size * scale;
          
          if (this.type === 'energy') {
            context.shadowBlur = 15;
            context.shadowColor = this.color;
          } else {
            context.shadowBlur = 0;
          }
          
          context.stroke();
        } 
        else if (this.type === 'asteroid') {
          // Draw jagged polygon
          context.shadowBlur = 0;
          context.fillStyle = this.color;
          context.beginPath();
          const sides = 6;
          const aSize = this.size * scale;
          for (let i = 0; i < sides; i++) {
            const a = this.angle + (i * Math.PI * 2) / sides;
            // Add some irregularity to the radius
            const r = aSize * (0.8 + Math.random() * 0.4); 
            const px = x2d + Math.cos(a) * r;
            const py = y2d + Math.sin(a) * r;
            if (i === 0) context.moveTo(px, py);
            else context.lineTo(px, py);
          }
          context.closePath();
          context.fill();
        } 
        else if (this.type === 'planet') {
          // Draw massive sphere with an atmospheric glow
          const pSize = this.size * scale;
          context.shadowBlur = 30;
          context.shadowColor = this.color;
          context.fillStyle = this.color;
          
          // Add a simple crescent shadow
          const gradient = context.createRadialGradient(
            x2d - pSize*0.3, y2d - pSize*0.3, pSize*0.1,
            x2d, y2d, pSize
          );
          gradient.addColorStop(0, this.color);
          gradient.addColorStop(1, '#020617'); // Fade to deep space black
          
          context.fillStyle = gradient;
          context.beginPath();
          context.arc(x2d, y2d, pSize, 0, Math.PI * 2);
          context.fill();
        }

        context.globalAlpha = 1; // Reset
      }
    }

    // Populate the universe
    for (let i = 0; i < OBJECT_COUNT; i++) {
      celestialObjects.push(new CelestialObject(true));
    }

    const render = () => {
      // Smooth acceleration
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;

      // Deep space background
      ctx.fillStyle = "rgba(3, 7, 18, 0.4)"; // Fades previous frames slightly for motion blur
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      celestialObjects.forEach(obj => {
        obj.update(currentSpeed);
        obj.draw(ctx);
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [warpState]);

  // Velocity HUD Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (warpState === "spooling" || warpState === "warped") {
      interval = setInterval(() => {
        setVelocity(prev => {
          if (warpState === "spooling") return prev + 0.05;
          return prev + (Math.random() * 8 + 2); // Hyperspace speeds
        });
      }, 50);
    } else {
      setVelocity(0.001); // Reset
    }
    return () => clearInterval(interval);
  }, [warpState]);

  const triggerWarp = () => {
    if (warpState !== "idle") return;
    setWarpState("spooling");
    
    // Spool for 2 seconds, then jump
    setTimeout(() => {
      setWarpState("warped");
    }, 2000);
  };

  const cancelWarp = () => {
    // Seamlessly drop back to normal space
    setWarpState("idle");
  };

  return (
    <>
      {/* The Warp Canvas overlay. 
        Sits exactly above the original meteors (z-[-2]) but below the UI (z-0). 
        It has a solid dark background to hide the meteors while active. 
      */}
      <canvas 
        ref={canvasRef} 
        className={`fixed inset-0 pointer-events-none z-[-1] bg-slate-950 transition-opacity duration-1000 ${
          warpState !== "idle" ? "opacity-100" : "opacity-0"
        }`} 
      />

      {/* Sci-Fi Navigation HUD */}
      {(warpState !== "idle") && (
        <div className="fixed top-24 right-10 z-[300] font-mono text-right pointer-events-none transition-opacity duration-500">
          <div className={`text-xs tracking-widest uppercase font-black px-2 py-1 inline-block mb-1 border ${
            warpState === "warped" ? "bg-cyan-950 text-cyan-400 border-cyan-800" : "bg-blue-950 text-blue-400 border-blue-800 animate-pulse"
          }`}>
            {warpState === "warped" ? "HYPERSPACE: ACTIVE" : "FTL DRIVE: SPOOLING"}
          </div>
          <div className={`text-6xl font-black italic leading-none drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] ${
            warpState === "warped" ? "text-cyan-300" : "text-white"
          }`}>
            {velocity.toFixed(3)}<span className="text-2xl ml-1 text-blue-500">c</span>
          </div>
        </div>
      )}

      {/* The Controller Button */}
      <div className="fixed bottom-6 left-6 z-[300] flex flex-col items-start gap-3">
        <button
          onClick={warpState === "warped" ? cancelWarp : triggerWarp}
          disabled={warpState === "spooling"}
          className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 font-mono text-xs uppercase tracking-widest font-bold shadow-2xl backdrop-blur-xl ${
            warpState === "idle"
              ? "bg-slate-900/60 text-blue-400 border-blue-500/50 hover:bg-blue-900 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
              : warpState === "warped"
              ? "bg-cyan-950/80 text-cyan-400 border-cyan-500 hover:bg-cyan-600 hover:text-white shadow-[0_0_30px_rgba(34,211,238,0.5)]"
              : "bg-black text-blue-900 border-blue-950 cursor-not-allowed" 
          }`}
        >
          {warpState === "idle" && (
            <>
              <Rocket size={16} className="text-blue-500 group-hover:text-white transition-colors" />
              ENGAGE WARP DRIVE
            </>
          )}
          {warpState === "spooling" && (
            <>
              <Orbit size={14} className="animate-spin" />
              SPOOLING FTL...
            </>
          )}
          {warpState === "warped" && (
            <>
              <RefreshCcw size={16} />
              DROP TO NORMAL SPACE
            </>
          )}
        </button>
      </div>
    </>
  );
}

// --- Main Export Component ---
export function CosmicThemeEffects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "cosmic") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: warpStyles }} />
      <CosmicBackground /> {/* Your existing background */}
      <CosmicCursor />     {/* Your existing cursor */}
      <WarpDriveEasterEgg />
    </>
  );
}