"use client";

import { useState, useRef, useEffect } from "react";
import { Hammer, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

// --- Global CSS to instantly strip the glass when shattered ---
const shatterStyles = `
  /* Instant snap to transparent when shattered, with a physical pop */
  .glass-shattered [class*="backdrop-blur"] {
    animation: shatterPop 0.15s ease-out forwards !important;
    background-color: transparent !important;
    backdrop-filter: blur(0px) !important;
    -webkit-backdrop-filter: blur(0px) !important;
    border-color: transparent !important;
    box-shadow: none !important;
  }

  @keyframes shatterPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }

  /* Smooth fade back in when restored */
  .glass-restored [class*="backdrop-blur"] {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
`;

export function GlassController() {
  const { theme, resolvedTheme } = useTheme();
  const [isShattered, setIsShattered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const triggerShatterAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    // Identify current theme to tint the glass shards
    const currentTheme = resolvedTheme || theme;
    let shardFill = "rgba(255, 255, 255, 0.15)";
    let shardStroke = "rgba(255, 255, 255, 0.5)";

    // Theme-specific glass properties
    if (currentTheme === "light") {
      shardFill = "rgba(0, 0, 0, 0.05)"; // Smoked dark glass
      shardStroke = "rgba(0, 0, 0, 0.2)";
    } else if (currentTheme === "solar") {
      shardFill = "rgba(251, 146, 60, 0.15)"; // Amber tinted glass
      shardStroke = "rgba(251, 146, 60, 0.5)";
    } else if (currentTheme === "cosmic") {
      shardFill = "rgba(56, 189, 248, 0.15)"; // Cyan tinted glass
      shardStroke = "rgba(56, 189, 248, 0.6)";
    }

    const glassElements = document.querySelectorAll('[class*="backdrop-blur"]');
    const shards: Shard[] = [];

    class Shard {
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      rotSpeed: number;
      size: number;
      vertices: { x: number; y: number }[];
      opacity: number;

      constructor(startX: number, startY: number, vX: number, vY: number) {
        this.x = startX;
        this.y = startY;
        this.vx = vX;
        this.vy = vY;
        this.rot = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 15 + 5;
        this.opacity = Math.random() * 0.6 + 0.4;

        const numSides = Math.floor(Math.random() * 3) + 3;
        this.vertices = [];
        for (let i = 0; i < numSides; i++) {
          const angle = (i / numSides) * Math.PI * 2;
          const radius = this.size * (0.4 + Math.random() * 0.6);
          this.vertices.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          });
        }
      }

      update() {
        this.vy += 0.5; // Heavy gravity
        this.vx *= 0.99; // Air resistance
        this.x += this.vx;
        this.y += this.vy;
        this.rot += this.rotSpeed;
      }

      draw(context: CanvasRenderingContext2D) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rot);
        context.globalAlpha = this.opacity;

        context.beginPath();
        context.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
          context.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        context.closePath();

        context.fillStyle = shardFill;
        context.fill();
        context.strokeStyle = shardStroke;
        context.lineWidth = 1;
        context.stroke();

        context.restore();
      }
    }

    glassElements.forEach((el) => {
      const rect = el.getBoundingClientRect();

      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (rect.width === 0 || rect.height === 0) return;

      const area = rect.width * rect.height;
      const shardCount = Math.min(Math.floor(area / 3000), 80);
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < shardCount; i++) {
        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;

        const vx = (startX - centerX) * 0.05 + (Math.random() - 0.5) * 8;
        const vy = (startY - centerY) * 0.05 + (Math.random() - 0.5) * 8 - 4;

        shards.push(new Shard(startX, startY, vx, vy));
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeShards = 0;

      shards.forEach((shard) => {
        shard.update();
        shard.draw(ctx);
        if (shard.y < canvas.height + 100) {
          activeShards++;
        }
      });

      if (activeShards > 0) {
        animationRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  const toggleGlass = () => {
    if (!isShattered) {
      document.body.classList.remove("glass-restored");
      document.body.classList.add("glass-shattered");
      setIsShattered(true);
      triggerShatterAnimation();
    } else {
      document.body.classList.remove("glass-shattered");
      document.body.classList.add("glass-restored");
      setIsShattered(false);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shatterStyles }} />

      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />

      <button
        onClick={toggleGlass}
        title={isShattered ? "Reconstruct Glass" : "Shatter UI Glass"}
        className={`fixed bottom-[84px] right-6 z-[10000] flex items-center justify-center w-12 h-12 rounded-full border transition-all active:scale-95 group shadow-xl ${
          isShattered
            ? "bg-blue-600/20 border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white"
            : "bg-background/40 backdrop-blur-md border-border/50 text-muted-foreground hover:bg-background/60"
        }`}
      >
        {isShattered ? (
          <Sparkles size={20} className="animate-pulse" />
        ) : (
          <Hammer
            size={20}
            className="group-hover:-rotate-45 transition-transform"
          />
        )}
      </button>
    </>
  );
}
