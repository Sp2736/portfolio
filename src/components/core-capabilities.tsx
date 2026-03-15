"use client";

import { motion, Variants } from "framer-motion";
import {
  Layers,
  BarChart,
  Shield,
  Scan,
  Puzzle,
  BrainCircuit,
  Network,
  Users,
  ClipboardList,
  MessageSquare,
  Headphones,
  Activity,
  Compass,
  PenTool,
  Coffee,
} from "lucide-react";

// --- DATA MAPPING ---

const focusAreas = [
  { name: "Full-Stack Architecture", icon: Layers },
  { name: "Data Science & Analytics", icon: BarChart },
  { name: "Web Security", icon: Shield },
];

const coreStrengths = [
  { name: "Problem Analysis", icon: Scan },
  { name: "Problem Solving", icon: Puzzle },
  { name: "Logical Reasoning", icon: BrainCircuit },
  { name: "Systems Thinking", icon: Network },
  { name: "Team Leadership", icon: Users },
  { name: "Project Management", icon: ClipboardList },
  { name: "Professional Communication", icon: MessageSquare },
];

const organicInterests = [
  {
    domain: "Music & Sound",
    icon: Headphones,
    tags: ["Listening", "AI Music Creation via Suno"],
  },
  {
    domain: "Movement & Fitness",
    icon: Activity,
    tags: ["Gyming", "Cycling", "Wall Punches"],
  },
  {
    domain: "Adventure & Travel",
    icon: Compass,
    tags: ["Travelling", "Trekking", "Adventure Activities"],
  },
  {
    domain: "Art & Expression",
    icon: PenTool,
    tags: ["Sketching", "Poetry & Writing"],
  },
  {
    domain: "Daily Ritual",
    icon: Coffee,
    tags: ["Coffee — always"],
  },
];

// --- ANIMATION VARIANTS ---

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVars: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring",
      stiffness: 260, 
      damping: 20 
    } 
  },
};

export function CoreCapabilities() {
  return (
    <section className="w-full py-16 px-6 relative z-10" id="capabilities">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* ==========================================
            LEFT PANEL: COGNITIVE ARCHITECTURE 
            (Focus Areas & Core Strengths)
        ========================================== */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2 border-l-2 border-primary pl-4">
            <h2 className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
              Processing Core
            </h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Cognitive Architecture
            </h3>
          </div>

          {/* FOCUS AREAS: 3 Glowing Directives */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />{" "}
              Primary Directives
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {focusAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVars}
                    className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-background/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group text-center shadow-lg"
                  >
                    <Icon
                      size={24}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                    <span className="text-[10px] md:text-xs font-bold leading-tight text-foreground">
                      {area.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CORE STRENGTHS: Tactical Bento Matrix */}
          <div className="flex flex-col gap-3 mt-2">
            <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full border border-primary" />{" "}
              Behavioral Metrics
            </h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {coreStrengths.map((strength, i) => {
                const Icon = strength.icon;
                return (
                  <motion.div
                    key={i}
                    variants={itemVars}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-background/30 backdrop-blur-md border border-border/40 hover:border-primary/40 transition-colors group cursor-default shadow-sm"
                  >
                    <Icon
                      size={14}
                      className="text-primary opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
                    />
                    <span className="text-[10px] md:text-xs font-mono font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                      {strength.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            RIGHT PANEL: ORGANIC SUBROUTINES 
            (Interests & Human Elements)
        ========================================== */}

        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full lg:w-1/2 flex flex-col gap-8 mt-12 lg:mt-0"
        >
          {/* Header - Fixed to match the left alignment style directly above the content */}
          <div className="flex flex-col gap-2 border-l-2 border-primary pl-4">
            <h2 className="text-primary font-mono text-[10px] tracking-[0.2em] uppercase">
              Beyond The Terminal
            </h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Organic Subroutines
            </h3>
          </div>

          {/* THE TIMELINE: Fiber Optic Logic Tree */}
          <div className="relative flex flex-col gap-6 pl-8 mt-2">
            {/* Continuous Vertical Glowing Line */}
            <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            {organicInterests.map((interest, i) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={i}
                  variants={itemVars}
                  className="relative flex flex-col gap-2 group"
                >
                  {/* Timeline Node (The dot on the line) */}
                  <div className="absolute -left-[27px] top-0.5 w-6 h-6 rounded-full bg-background border border-primary flex items-center justify-center z-10 group-hover:bg-primary/20 transition-colors shadow-[0_0_10px_rgba(var(--primary),0.3)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>

                  {/* Domain Title */}
                  <div className="flex items-center gap-2">
                    <Icon
                      size={16}
                      className="text-muted-foreground group-hover:text-primary transition-colors"
                    />
                    <h4 className="text-sm md:text-base font-bold text-foreground tracking-tight">
                      {interest.domain}
                    </h4>
                  </div>

                  {/* Sub-tags (Glassmorphic Pills) */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {interest.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 text-[9px] md:text-[10px] font-mono text-primary-foreground bg-primary/80 backdrop-blur-md rounded-md shadow-sm border border-primary/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
