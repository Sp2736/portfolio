"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { Magnet, RefreshCcw, ShieldAlert, Zap } from "lucide-react";

// Foreground Interactive Cursor (Black Trail, Smoke & Ash)
function AshCursor() {
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
    const COLORS = ["#221414", "#050D15", "#18191A", "#18191a"];

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
          ctx.shadowColor = "#000000";
          ctx.lineWidth = TRAIL_WIDTH * point.life;
          ctx.strokeStyle = `rgba(0, 0, 0, ${point.life * 0.5})`;
          ctx.stroke();

          ctx.shadowBlur = 0;
          ctx.lineWidth = TRAIL_WIDTH * 0.5 * point.life;
          ctx.strokeStyle = `rgba(0, 0, 0, ${point.life})`;
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

// Magnetic Architectural Blueprint (Responsive Grid)
function MagneticGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let grid: GridPoint[][] = [];

    // Grid settings
    const GRID_SIZE = 50;
    let cols = 0;
    let rows = 0;

    // Mouse tracking for the magnetic repulsion
    let mouse = { x: -1000, y: -1000 };

    class GridPoint {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.vx = 0;
        this.vy = 0;
      }

      update(time: number) {
        // Calculate distance from mouse
        const dx = mouse.x - this.baseX;
        const dy = mouse.y - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Base target (with a very subtle organic breathing effect)
        let targetX = this.baseX + Math.sin(time + this.baseY * 0.05) * 3;
        let targetY = this.baseY + Math.cos(time + this.baseX * 0.05) * 3;

        // Magnetic Repulsion Physics
        if (distance < 150) {
          const force = (150 - distance) / 150;
          // Push points aggressively away from the cursor
          targetX -= (dx / distance) * force * 60;
          targetY -= (dy / distance) * force * 60;
        }

        // Spring physics to snap back into place
        this.vx += (targetX - this.x) * 0.15; // Spring stiffness
        this.vy += (targetY - this.y) * 0.15;
        this.vx *= 0.75; // Friction
        this.vy *= 0.75;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const initGrid = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      cols = Math.ceil(canvas.width / GRID_SIZE) + 1;
      rows = Math.ceil(canvas.height / GRID_SIZE) + 1;
      grid = [];

      for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
          grid[i][j] = new GridPoint(i * GRID_SIZE, j * GRID_SIZE);
        }
      }
    };

    initGrid();
    window.addEventListener("resize", initGrid);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Move mouse offscreen when it leaves the window
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      // Update all points first
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j].update(time);
        }
      }

      // Draw the grid with a single ultra-fast stroke
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.08)"; // Crisp, faint architect ink
      ctx.lineWidth = 1;

      // Draw horizontal lines
      for (let j = 0; j < rows; j++) {
        ctx.moveTo(grid[0][j].x, grid[0][j].y);
        for (let i = 1; i < cols; i++) {
          ctx.lineTo(grid[i][j].x, grid[i][j].y);
        }
      }

      // Draw vertical lines
      for (let i = 0; i < cols; i++) {
        ctx.moveTo(grid[i][0].x, grid[i][0].y);
        for (let j = 1; j < rows; j++) {
          ctx.lineTo(grid[i][j].x, grid[i][j].y);
        }
      }
      ctx.stroke();

      // Draw structural intersection dots
      ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.beginPath();
          ctx.arc(grid[i][j].x, grid[i][j].y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", initGrid);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[-3] bg-[#f8fafc]" />{" "}
      {/* Very faint slate-50 background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[-2]"
      />
    </>
  );
}

// Global CSS Injection for the Anti-Gravity Deconstruct
const zeroGStyles = `
  /* Phase 1: Magnetic Containment Failing (Alarms) */
  .gravity-failing > *:not(.easter-egg-safe) {
    animation: magneticTremor 0.05s infinite alternate;
    filter: sepia(0.2) hue-rotate(-50deg) saturate(1.8) contrast(1.1); /* Architectural White -> Alarming Pink */
  }

  @keyframes magneticTremor {
    0% { transform: translate(1.5px, 0.5px); }
    100% { transform: translate(-1.5px, -0.5px); }
  }

  /* Phase 2: Zero Gravity active state */
  .zero-g-active {
    cursor: grab;
    overflow: hidden !important; /* Prevent scrolling while site is broken apart */
  }

  /* Applied by JS to components as they enter the physics loop */
  .zero-g-floater {
    position: fixed !important;
    z-index: 200;
    pointer-events: auto; /* Allow dragging if implemented later */
    will-change: transform;
    /* White Devil aesthetic: hard edges, soft shadow when floating */
    box-shadow: 0 10px 30px -10px rgba(0,0,0,0.15) !important;
    border: 1px solid rgba(0,0,0,0.1) !important;
    background: #ffffff !important;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
  }

  /* Dynamic highlight applied when components CRASH into each other */
  .floater-collision {
    box-shadow: 0 0 25px 2px rgba(59, 130, 246, 0.4) !important; /* Clean Blue 'energy' highlight on impact */
    border-color: rgba(59, 130, 246, 0.6) !important;
  }
`;

interface PhysicsObject {
  element: HTMLElement;
  x: number;
  y: number; // Position
  vx: number;
  vy: number; // Velocity
  w: number;
  h: number; // Dimensions
  mass: number; // Mass (based on area)
  reboundCooldown: number; // Prevents "sticking" together
}

function ZeroGEasterEgg() {
  const [gravityState, setGravityState] = useState<
    "nominal" | "failing" | "zero-g"
  >("nominal");
  const [gravityValue, setGravityValue] = useState(1.0);

  const physicsLoopRef = useRef<number | null>(null);
  const physicsObjectsRef = useRef<any[]>([]);
  const collisionIndicatorsRef = useRef<Map<HTMLElement, NodeJS.Timeout>>(
    new Map(),
  );

  useEffect(() => {
    const loop = () => {
      // physics calculations
      physicsLoopRef.current = requestAnimationFrame(loop);
    };

    physicsLoopRef.current = requestAnimationFrame(loop);

    return () => {
      if (physicsLoopRef.current !== null) {
        cancelAnimationFrame(physicsLoopRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gravityState === "failing" || gravityState === "zero-g") {
      interval = setInterval(() => {
        setGravityValue((prev) => {
          if (gravityState === "zero-g") return 0.0;
          const drop = Math.random() * 0.08 + 0.02;
          return Math.max(0, prev - drop);
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gravityState]);

  // SMART DOM PARSER & PHYSICS ENGINE
  const startPhysicsEngine = () => {
    const targets: HTMLElement[] = [];

    // Recursive function to mathematically identify "Solid" structural blocks
    const findRigidBodies = (element: HTMLElement) => {
      if (element.closest(".easter-egg-safe")) return; // Ignore the HUD/Buttons

      const style = window.getComputedStyle(element);
      const hasBg =
        style.backgroundColor !== "rgba(0, 0, 0, 0)" &&
        style.backgroundColor !== "transparent";
      const hasBorder =
        style.borderWidth !== "0px" &&
        style.borderStyle !== "none" &&
        style.borderWidth !== "";
      const tag = element.tagName.toLowerCase();
      const isMediaOrInteractive = [
        "img",
        "svg",
        "button",
        "a",
        "video",
        "canvas",
        "input",
      ].includes(tag);
      const isTextNode = [
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "span",
        "li",
        "strong",
      ].includes(tag);

      // If the element is a distinct visual block (Card, Button, Image, Text)
      if (hasBg || hasBorder || isMediaOrInteractive || isTextNode) {
        // Make sure we don't grab massive layout wrappers (like the whole page width)
        if (element.getBoundingClientRect().width < window.innerWidth * 0.85) {
          targets.push(element);
          return; // STOP traversing. We want this whole card to float as one solid piece!
        }
      }

      // If it's just a transparent wrapper, keep digging to rip out the elements inside
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) findRigidBodies(child);
      });
    };

    // Scan the core layout areas
    const rootAreas = document.querySelectorAll("header, main, footer");
    rootAreas.forEach((area) => {
      if (area instanceof HTMLElement) {
        Array.from(area.children).forEach((child) => {
          if (child instanceof HTMLElement) findRigidBodies(child);
        });
      }
    });

    // Performance Cap: Limit to ~100 objects so the collision math doesn't crash the browser
    if (targets.length > 100) targets.length = 100;

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    physicsObjectsRef.current = [];

    // If we make them position: fixed one by one, the DOM collapses and ruins the remaining coordinates.
    const initialRects = targets.map((el) => el.getBoundingClientRect());

    // Detach from DOM flow and initialize physics
    targets.forEach((el, index) => {
      const rect = initialRects[index];

      if (rect.width < 5 || rect.height < 5) return;

      physicsObjectsRef.current.push({
        element: el,
        x: rect.left,
        y: rect.top,
        w: rect.width,
        h: rect.height,
        // Random drift vectors
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        mass: (rect.width * rect.height) / 1000,
        reboundCooldown: 0,
      });

      // Break them out of the DOM perfectly in place
      el.style.width = `${rect.width}px`;
      el.style.height = `${rect.height}px`;
      el.style.left = `0px`;
      el.style.top = `0px`;
      el.style.margin = `0px`;
      el.classList.add("zero-g-floater");
      el.style.transform = `translate3d(${rect.left}px, ${rect.top}px, 0px)`;
    });

    // Rigid Body Collision Loop
    const runPhysics = () => {
      const objs = physicsObjectsRef.current;
      const elasticity = 0.9;

      for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        if (obj.reboundCooldown > 0) obj.reboundCooldown--;

        obj.x += obj.vx;
        obj.y += obj.vy;

        // Wall Bounces
        if (obj.x + obj.w > viewportW) {
          obj.x = viewportW - obj.w;
          obj.vx *= -elasticity;
        } else if (obj.x < 0) {
          obj.x = 0;
          obj.vx *= -elasticity;
        }

        if (obj.y + obj.h > viewportH) {
          obj.y = viewportH - obj.h;
          obj.vy *= -elasticity;
        } else if (obj.y < 0) {
          obj.y = 0;
          obj.vy *= -elasticity;
        }

        // Component vs Component Collisions
        for (let j = i + 1; j < objs.length; j++) {
          const other = objs[j];

          if (
            obj.x < other.x + other.w &&
            obj.x + obj.w > other.x &&
            obj.y < other.y + other.h &&
            obj.y + obj.h > other.y
          ) {
            if (obj.reboundCooldown > 0 || other.reboundCooldown > 0) continue;

            showCollision(obj.element);
            showCollision(other.element);

            const overlapX =
              obj.x + obj.w / 2 < other.x + other.w / 2
                ? obj.x + obj.w - other.x
                : other.x + other.w - obj.x;
            const overlapY =
              obj.y + obj.h / 2 < other.y + other.h / 2
                ? obj.y + obj.h - other.y
                : other.x + other.h - obj.y;

            if (overlapX < overlapY) {
              const v1 = obj.vx,
                v2 = other.vx,
                m1 = obj.mass,
                m2 = other.mass;
              obj.vx =
                (((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)) * elasticity;
              other.vx =
                (((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)) * elasticity;

              const shift = overlapX / 2 + 1;
              if (obj.x < other.x) {
                obj.x -= shift;
                other.x += shift;
              } else {
                obj.x += shift;
                other.x -= shift;
              }
            } else {
              const v1 = obj.vy,
                v2 = other.vy,
                m1 = obj.mass,
                m2 = other.mass;
              obj.vy =
                (((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)) * elasticity;
              other.vy =
                (((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)) * elasticity;

              const shift = overlapY / 2 + 1;
              if (obj.y < other.y) {
                obj.y -= shift;
                other.y += shift;
              } else {
                obj.y += shift;
                other.y -= shift;
              }
            }

            obj.reboundCooldown = 5;
            other.reboundCooldown = 5;
          }
        }

        // Apply updated position
        obj.element.style.transform = `translate3d(${obj.x}px, ${obj.y}px, 0px)`;
      }

      physicsLoopRef.current = requestAnimationFrame(runPhysics);
    };

    runPhysics();
  };

  const showCollision = (element: HTMLElement) => {
    if (collisionIndicatorsRef.current.has(element)) {
      clearTimeout(collisionIndicatorsRef.current.get(element)!);
    }
    element.classList.add("floater-collision");
    const timeout = setTimeout(() => {
      element.classList.remove("floater-collision");
      collisionIndicatorsRef.current.delete(element);
    }, 300);
    collisionIndicatorsRef.current.set(element, timeout);
  };

  const triggerZeroG = () => {
    if (gravityState !== "nominal") return;
    setGravityState("failing");
    document.body.classList.add("gravity-failing");

    setTimeout(() => {
      setGravityState("zero-g");
      document.body.classList.remove("gravity-failing");
      document.body.classList.add("zero-g-active");
      startPhysicsEngine();
    }, 4000);
  };

  return (
    <div className="easter-egg-safe">
      <div
        className={`fixed inset-0 pointer-events-none z-[140] transition-colors duration-1000 ${
          gravityState === "failing"
            ? "bg-red-900/10 shadow-[inset_0_0_150px_rgba(220,38,38,0.2)] animate-pulse"
            : gravityState === "zero-g"
              ? "bg-slate-900/5 shadow-[inset_0_0_200px_rgba(0,0,0,0.05)]"
              : "bg-transparent"
        }`}
      />

      {(gravityState === "failing" || gravityState === "zero-g") && (
        <div className="fixed top-24 right-10 z-[300] font-mono text-right pointer-events-none">
          <div
            className={`text-xs tracking-widest uppercase font-black px-2 py-1 inline-block mb-1 border shadow-sm ${
              gravityState === "zero-g"
                ? "bg-slate-100 text-slate-400 border-slate-200"
                : "bg-red-50 text-red-600 border-red-200 animate-pulse"
            }`}
          >
            {gravityState === "zero-g"
              ? "MAGNETIC CONTAINMENT: OFFLINE"
              : "FIELD INTEGRITY: CRITICAL"}
          </div>
          <div
            className={`text-6xl font-black leading-none tracking-tighter drop-shadow-sm ${
              gravityState === "zero-g" ? "text-slate-300" : "text-red-500"
            }`}
          >
            {gravityValue.toFixed(2)}
            <span className="text-2xl ml-1">G</span>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 left-6 z-[300] flex flex-col items-start gap-3">
        <div
          className={`overflow-hidden transition-all duration-500 ${gravityState === "failing" ? "max-h-10 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-red-50 text-red-600 border border-red-200 text-[10px] px-3 py-1.5 rounded-sm font-bold animate-pulse flex items-center gap-2 shadow-lg">
            <ShieldAlert size={12} />
            OVERRIDING ARCHITECTURAL LOCKS
          </div>
        </div>

        <button
          onClick={
            gravityState === "zero-g"
              ? () => window.location.reload()
              : triggerZeroG
          }
          disabled={gravityState === "failing"}
          className={`group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 font-mono text-xs uppercase tracking-widest font-bold shadow-2xl backdrop-blur-md ${
            gravityState === "nominal"
              ? "bg-slate-50/80 text-slate-600 border-slate-300 hover:bg-slate-800 hover:text-white"
              : gravityState === "zero-g"
                ? "bg-blue-50 text-blue-600 border-blue-300 hover:bg-blue-600 hover:text-white shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-bounce"
                : "bg-red-50 text-red-400 border-red-200 cursor-not-allowed"
          }`}
        >
          {gravityState === "nominal" && (
            <>
              <Magnet
                size={16}
                className="text-slate-400 group-hover:text-white"
              />{" "}
              DISABLE GRAVITY
            </>
          )}
          {gravityState === "failing" && (
            <>
              <Zap size={14} className="animate-pulse" /> FIELD COLLAPSING...
            </>
          )}
          {gravityState === "zero-g" && (
            <>
              <RefreshCcw size={16} /> RESTORE GRAVITY
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export function LightThemeEffects() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || theme !== "light") return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: zeroGStyles }} />
      <MagneticGridBackground />
      <AshCursor />
      <ZeroGEasterEgg />
    </>
  );
}
