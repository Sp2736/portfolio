"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { EyeOff, Eye } from "lucide-react";

// Foreground Interactive Cursor (Starlight & Trails)
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
    // Pure whites and stark silvers
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

    const drawStarShape = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
    ) => {
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
      x: number;
      y: number;
      life: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.life = 1.0;
      }
      update() {
        this.life -= TRAIL_DECAY;
      }
    }

    class StarParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
      rotation: number;
      rotSpeed: number;
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed =
          Math.random() * (STAR_SPEED_MAX - STAR_SPEED_MIN) + STAR_SPEED_MIN;
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
          const nextPoint = trail[i + 1];
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);

          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ffffff";
          ctx.lineWidth = TRAIL_WIDTH * point.life;
          ctx.strokeStyle = `rgba(255, 255, 255, ${point.life * 0.5})`;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.lineWidth = TRAIL_WIDTH * 0.5 * point.life;
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
}

// Magnetic Data Swarm Background (Gravitational Vortex)
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
    const NODE_COUNT =
      typeof window !== "undefined" && window.innerWidth < 768 ? 800 : 2500;

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
      clickTimeout = setTimeout(() => {
        isClicking = false;
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);

    class DataNode {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseAlpha: number;
      size: number;

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
      // MOTION BLUR EFFECT
      ctx.fillStyle = "rgba(9, 9, 11, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dataNodes.forEach((node) => {
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-2]"
    />
  );
}

// The "Go Blind" Spotlight Easter Egg
function BlindEasterEgg() {
  const [isBlind, setIsBlind] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Track mouse movement to move the spotlight hole
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (overlayRef.current && isBlind) {
        overlayRef.current.style.setProperty("--x", `${e.clientX}px`);
        overlayRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
    };

    if (isBlind) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isBlind]);

  const toggleBlind = (e: React.MouseEvent) => {
    if (!isBlind) {
      // Set initial spotlight coordinates exactly where the user clicked the button
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--x", `${e.clientX}px`);
        overlayRef.current.style.setProperty("--y", `${e.clientY}px`);
      }
      setIsBlind(true);
    } else {
      setIsBlind(false);
    }
  };

  return (
    <>
      {/* The Blinding White Overlay with the Dynamic CSS Mask */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[200] bg-white pointer-events-none transition-opacity duration-700 ease-in-out ${
          isBlind ? "opacity-100" : "opacity-0"
        }`}
        style={{
          // This gradient masks out the white background in a circle, revealing the dark theme below.
          // Alpha 0 (transparent) hides the white. Alpha 1 (black) shows the white.
          WebkitMaskImage: `radial-gradient(circle 250px at var(--x, 50vw) var(--y, 50vh), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 90%)`,
          maskImage: `radial-gradient(circle 250px at var(--x, 50vw) var(--y, 50vh), rgba(0,0,0,0) 0%, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 90%)`,
        }}
      />

      {/* The Controller Button */}
      <div className="fixed bottom-6 left-6 z-[300]">
        <button
          onClick={toggleBlind}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-500 font-mono text-xs uppercase tracking-widest font-bold shadow-xl backdrop-blur-md ${
            !isBlind
              ? "bg-card/50 text-foreground border-border hover:bg-card/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              : "bg-black text-white border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.3)] hover:bg-zinc-900"
          }`}
        >
          {!isBlind ? (
            <>
              <EyeOff size={16} className="text-zinc-400" />
              GO BLIND
            </>
          ) : (
            <>
              <Eye size={16} className="text-blue-400" />
              BACK TO NORMAL
            </>
          )}
        </button>
      </div>
    </>
  );
}

// Main Export Component
export function DarkThemeEffects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "dark") return null;

  return (
    <>
      <GravitySwarmBackground /> <StarlightCursor />
      <BlindEasterEgg />
    </>
  );
}
