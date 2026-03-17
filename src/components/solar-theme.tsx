"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Flame, RefreshCcw } from "lucide-react";

// 1. Foreground Interactive Cursor (Flares only, NO Rings, NO DOM Shake)
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
    const EMBER_COUNT = 40; 
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

// 2. Vintage Background (Transparent Canvas, relies on your CSS variables)
function VintageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let motes: { x: number, y: number, s: number, o: number, vy: number }[] = [];
    
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Create warm, slow drifting dust/bokeh particles
    for (let i = 0; i < 60; i++) {
      motes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 6 + 2,
        o: Math.random() * 0.3 + 0.05,
        vy: Math.random() * -0.4 - 0.1
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      motes.forEach(m => {
        m.y += m.vy;
        if (m.y < -20) { m.y = canvas.height + 20; m.x = Math.random() * canvas.width; }
        
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 146, 60, ${m.o})`; // Soft warm glow
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-3]" />;
}

// 3. Apocalyptic Background (Orbital Strike & Rising Ash)
function ApocalypticBackground({ isActive }: { isActive: boolean }) {
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
      // Pause drawing to save battery if layer is hidden
      if (!isActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

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
  }, [isActive]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-[-2] transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-orange-900/10 to-transparent" />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
    </div>
  );
}

// 4. Main Export Component & State Controller
export function SolarThemeEffects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isFlareActive, setIsFlareActive] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "solar") return null;

  return (
    <>
      <VintageBackground />
      <ApocalypticBackground isActive={isFlareActive} />
      <SolarCursor />

      {/* Theme-Safe Easter Egg Button */}
      <div className="fixed bottom-6 left-6 z-[300]">
        <button
          onClick={() => setIsFlareActive(!isFlareActive)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-500 font-mono text-xs uppercase tracking-widest font-bold shadow-xl backdrop-blur-md ${
            !isFlareActive
              ? "bg-card/50 text-foreground border-border hover:bg-card/80 hover:shadow-[0_0_15px_rgba(234,88,12,0.2)]"
              : "bg-background/80 text-orange-500 border-orange-500/50 shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:bg-background"
          }`}
        >
          {!isFlareActive ? (
            <>
              <Flame size={16} className="text-orange-500" />
              BRING ON THE FLARE!
            </>
          ) : (
            <>
              <RefreshCcw size={16} className="text-blue-400" />
              COOL DOWN (VINTAGE)
            </>
          )}
        </button>
      </div>
    </>
  );
}