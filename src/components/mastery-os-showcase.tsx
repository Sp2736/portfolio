"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Github,
  ExternalLink,
  Zap,
  Trophy,
  BarChart3,
  BookOpen,
  Target,
  Sparkles,
  ArrowUpRight,
  GitCommit,
  Star,
  Layers,
} from "lucide-react";

// ── FEATURE PILLS ─────────────────────────────────────────────────────────────
const features = [
  { icon: Target,    label: "Multi-Roadmap Parser",        color: "text-violet-400",   bg: "bg-violet-500/10 border-violet-500/20" },
  { icon: Trophy,    label: "Steam-like Trophy Catalog",   color: "text-amber-400",    bg: "bg-amber-500/10 border-amber-500/20" },
  { icon: BarChart3, label: "Pearson Correlation Engine",  color: "text-cyan-400",     bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Zap,       label: "XP & Leveling System",        color: "text-yellow-400",   bg: "bg-yellow-500/10 border-yellow-500/20" },
  { icon: GitCommit, label: "Git-backed JSON Persistence", color: "text-green-400",    bg: "bg-green-500/10 border-green-500/20" },
  { icon: Star,      label: "Gamified Progress Rings",     color: "text-pink-400",     bg: "bg-pink-500/10 border-pink-500/20" },
  { icon: Layers,    label: "Glassmorphism Bento Grids",   color: "text-blue-400",     bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Sparkles,  label: "No External AI / DB",         color: "text-orange-400",   bg: "bg-orange-500/10 border-orange-500/20" },
];

// ── TECH STACK BADGES ─────────────────────────────────────────────────────────
const techStack = ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub REST API", "Vercel"];

// ── FAKE HEATMAP ─────────────────────────────────────────────────────────────
function MiniHeatmap() {
  const weeks = 15;
  const days = 7;
  const intensities = [0, 0.15, 0.35, 0.6, 0.9, 1];
  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () =>
      intensities[Math.floor(Math.random() * intensities.length)]
    )
  );

  return (
    <div className="flex gap-[3px]">
      {grid.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-[3px]">
          {week.map((intensity, di) => (
            <div
              key={di}
              title={intensity > 0 ? `${Math.round(intensity * 8)} tasks` : "No activity"}
              className="w-[10px] h-[10px] rounded-[2px] transition-all duration-300"
              style={{
                backgroundColor:
                  intensity === 0
                    ? "rgba(var(--primary-hsl), 0.05)"
                    : `rgba(var(--primary-hsl), ${0.15 + intensity * 0.85})`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimCounter({ to, duration = 1500, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(eased * to));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function MasteryOSShowcase() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-2xl overflow-hidden border border-border/40 shadow-2xl bg-background/40 backdrop-blur-xl"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-[100px]"
        style={{ background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-10 blur-[80px]"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
      />

      {/* ── TOP BANNER ── */}
      <div className="relative flex items-center justify-between px-5 py-3 bg-muted/20 border-b border-border/30">
        {/* Mac dots */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">
          <BookOpen size={11} />
          mastery-os · personal project
        </div>
        {/* Live badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] font-mono font-bold tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="relative p-5 md:p-7 flex flex-col gap-7">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          {/* Title + Description */}
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary-hsl),0.2)]">
                <Sparkles size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground leading-none">
                  Mastery OS
                </h4>
                <p className="text-[10px] font-mono text-primary/80 tracking-widest uppercase mt-0.5">
                  Personal Upskilling · Gamified Progress OS
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              A self-built, database-free gamified tracking workspace for monitoring long-form upskilling across
              multiple roadmaps simultaneously. Every completed task becomes a{" "}
              <span className="text-primary font-semibold">real Git commit</span> — your discipline visible directly
              on your contribution graph.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 flex-wrap mt-1">
              <a
                href="https://mastery-os-omega.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-bold tracking-wide hover:bg-primary/90 transition-all shadow-md hover:shadow-primary/30 hover:shadow-lg hover:-translate-y-0.5"
              >
                <ExternalLink size={13} />
                Live App
                <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/Sp2736/mastery-os"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-foreground text-xs font-mono font-bold tracking-wide hover:bg-muted/60 hover:border-primary/40 transition-all"
              >
                <Github size={13} />
                Source Code
              </a>
            </div>
          </div>

          {/* Stats panel */}
          <div className="flex flex-col gap-3 shrink-0">
            {/* Heatmap */}
            <div className="p-4 rounded-xl bg-card border border-border/50 flex flex-col gap-3 shadow-sm">
              <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                Activity Heatmap (demo)
              </p>
              <MiniHeatmap />
              <p className="text-[9px] font-mono text-muted-foreground/60 text-right">
                Less → More activity
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Roadmaps", value: 3, suffix: "+" },
                { label: "Trophies", value: 24, suffix: "" },
                { label: "XP Levels", value: 50, suffix: "+" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center p-3 rounded-xl bg-card border border-border/50 shadow-sm text-center">
                  <span className="text-lg font-extrabold text-primary">
                    <AnimCounter to={s.value} suffix={s.suffix} duration={1200} />
                  </span>
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wide mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FEATURES GRID ── */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <span className="w-3 h-[1px] bg-primary/50 inline-block" />
            Core Modules
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-default transition-all duration-200 ${f.bg} ${hoveredFeature === i ? "shadow-md" : ""}`}
                >
                  <Icon size={14} className={`${f.color} shrink-0`} />
                  <span className="text-[10px] font-mono font-semibold text-foreground/80 leading-tight">
                    {f.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── TECH STACK + TAGLINE ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/30">
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-muted/40 border border-border/50 text-[10px] font-mono text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[10px] font-mono text-muted-foreground/50 italic shrink-0">
            No DB · No LLM · Pure discipline.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
