"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Terminal as TerminalWindow } from "./terminal";
import {
  MapPin,
  ShieldCheck,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Download,
} from "lucide-react";

// --- HERO PROFILE (ID CARD) COMPONENT ---
function HeroProfile() {
  // CAFFEINE GLITCH EASTER EGG STATE
  const [clicks, setClicks] = useState(0);
  const [isCaffeinated, setIsCaffeinated] = useState(false);

  useEffect(() => {
    if (clicks >= 5) {
      setIsCaffeinated(true);
      setClicks(0); // Reset for next time
      setTimeout(() => setIsCaffeinated(false), 5000); // Back to normal after 5 seconds
    }
  }, [clicks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 p-6 md:p-8 bg-background/10 backdrop-blur-xl border border-border/20 rounded-3xl shadow-xl relative overflow-hidden group ${isCaffeinated ? 'caffeine-glitch' : ''}`}
    >
      {/* INJECTED GLITCH CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .caffeine-glitch {
          animation: caffeineShake 0.15s infinite;
          filter: contrast(120%) saturate(150%);
        }
        @keyframes caffeineShake {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          40% { transform: translate(1px, -1px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
      `}} />

      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* --- LEFT: Tactical Avatar Frame --- */}
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Outer Rotating Scan Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full border border-dashed border-primary/40 group-hover:border-primary/80 transition-colors duration-500"
        />
        {/* Inner Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28 md:w-32 md:h-32 rounded-full border border-primary/20 border-t-primary/60"
        />

        <div 
          className={`relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-secondary/80 border-2 border-primary/50 overflow-hidden shadow-[0_0_20px_rgba(var(--primary),0.3)] z-10 cursor-pointer transition-transform active:scale-90 ${isCaffeinated ? 'animate-spin' : ''}`}
          onClick={() => setClicks(prev => prev + 1)}
          title="Click me 5 times"
        >
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className={`object-cover ${isCaffeinated ? 'hue-rotate-[180deg] contrast-150 saturate-200' : ''}`}
          />
        </div>

        {/* Live Status Badge */}
        <div className="absolute -bottom-2 md:bottom-0 md:-right-2 z-20 flex items-center gap-1.5 px-3 py-1 bg-background/90 backdrop-blur-md border border-primary/50 rounded-full shadow-lg">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          <span className="text-[9px] md:text-[10px] font-mono font-bold text-foreground tracking-widest uppercase">
            Online
          </span>
        </div>
      </div>

      {/* --- RIGHT: Profile Data & Identity --- */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left w-full z-10">
        {/* Verification & Location Row */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 mb-2">
          <div className="flex items-center gap-1 text-[10px] md:text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
            <ShieldCheck size={12} />
            <span className="uppercase tracking-widest">Sys.Admin</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] md:text-xs font-mono text-muted-foreground">
            <MapPin size={12} className="text-primary/70" />
            <span className="uppercase tracking-widest">Vadodara, IN</span>
          </div>
        </div>

        {/* Name Identity */}
        <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight mb-2">
          Swayam Patel<span className="text-primary">.</span>
        </h1>

        {/* Dynamic Titles */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
          {!isCaffeinated ? (
            <>
              <span className="text-[10px] md:text-xs font-semibold text-foreground/80 bg-secondary/50 px-2.5 py-1 rounded-md border border-border/50">Full-Stack Architect</span>
              <span className="text-muted-foreground text-xs font-mono">||</span>
              <span className="text-[10px] md:text-xs font-semibold text-foreground/80 bg-secondary/50 px-2.5 py-1 rounded-md border border-border/50">Web Security</span>
              <span className="text-muted-foreground text-xs font-mono">||</span>
              <span className="text-[10px] md:text-xs font-semibold text-foreground/80 bg-secondary/50 px-2.5 py-1 rounded-md border border-border/50">Data Science & Analytics</span>
              <span className="text-muted-foreground text-xs font-mono">||</span>
              <span className="text-[10px] md:text-xs font-semibold text-foreground/80 bg-secondary/50 px-2.5 py-1 rounded-md border border-border/50">Poetry Writing</span>
            </>
          ) : (
            <>
              <span className="text-[10px] md:text-xs font-black text-white bg-pink-600 px-2.5 py-1 rounded-md border border-pink-400 animate-pulse uppercase tracking-widest">Gym Freak</span>
              <span className="text-pink-500 text-xs font-mono animate-bounce">///</span>
              <span className="text-[10px] md:text-xs font-black text-black bg-yellow-400 px-2.5 py-1 rounded-md border border-yellow-200 animate-pulse uppercase tracking-widest">Vibe Coder</span>
              <span className="text-yellow-500 text-xs font-mono animate-bounce">///</span>
              <span className="text-[10px] md:text-xs font-black text-white bg-green-600 px-2.5 py-1 rounded-md border border-green-400 animate-pulse uppercase tracking-widest">Caffeinated Poet</span>
            </>
          )}
        </div>

        {/* The "About Me" Bio Lines */}
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-2xl mb-5">
          Architecting systems that scale, breaking them to understand security,
          and writing poetry when the terminal goes dark. I build digital
          ecosystems from the lowest level of memory management to the highest
          layers of UI/UX. To see my resume, just type 'CV' anywhere whilst cursor focus is on the screen (and off the below terminal).
        </p>

        {/* --- ACTION BAR: Socials & Resume --- */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full mt-1">
          {/* Social Icons Container */}
          <div className="flex items-center gap-2 md:gap-3">
            <a
              href="https://github.com/Sp2736"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background/5 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/swayam-patel-316ba5317"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background/5 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://instagram.com/sp_27.03"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background/5 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
            >
              <Instagram size={16} />
            </a>
            <a
              href="mailto:swayampatel2736@gmail.com"
              className="p-2 rounded-full bg-background/5 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all"
            >
              <Mail size={16} />
            </a>
          </div>

          {/* Divider (Hidden on Mobile) */}
          <div className="hidden sm:block w-[1px] h-6 bg-border/50" />

          {/* Resume Download Pill
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] transition-all text-xs font-mono font-bold uppercase tracking-widest"
          >
            <Download size={14} />
            Resume
          </a> */}
        </div>
      </div>
    </motion.div>
  );
}

// --- MAIN HERO SECTION ---
export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl flex flex-col gap-10 lg:gap-12 relative z-10">
        {/* 1. The Identification Matrix Panel */}
        <HeroProfile />

        {/* 2. The Original Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-5 md:gap-6 text-left p-6 md:p-8 rounded-3xl bg-background/5 backdrop-blur-md border border-border/30 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-primary font-mono text-xs tracking-widest uppercase mb-2">
                System Initialization
              </h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">
                  Clarity
                </span>
                .
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm md:text-base text-foreground/80 max-w-md leading-relaxed"
            >
              Building intelligent digital systems that combine full-stack
              engineering, AI, and thoughtful design. Computer Science student,
              currently focused on scalable web systems and developer tools.
              Interested in learning Web Security and Vulnerabilities. Currently
              exploring ideas in Data Science and Analytics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                Deployments
              </button>
              <button className="px-5 py-2.5 rounded-lg border border-border/30 bg-background/5 hover:bg-background/80 transition-colors text-sm font-semibold">
                Initialize Contact
              </button>
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end w-full">
            <TerminalWindow />
          </div>
        </div>
      </div>
    </section>
  );
}
