"use client";

import { motion } from "framer-motion";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* REMOVED the absolute bg-primary/20 blur-[120px] div from here */}

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="flex flex-col gap-6 text-left p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-border/50 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-3">
              System Architect & Developer
            </h2>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">
                Clarity
              </span>.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-foreground/80 max-w-md leading-relaxed"
          >
            I build scalable digital ecosystems, intelligent tools, and seamless interfaces. 
            Currently exploring full-stack systems, AI integrations, and the space where logic meets design.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 mt-4"
          >
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              Deployments
            </button>
            <button className="px-6 py-3 rounded-lg border border-border/50 bg-background/50 hover:bg-background/80 transition-colors font-semibold">
              Initialize Contact
            </button>
          </motion.div>
        </div>

        <div className="flex justify-center lg:justify-end w-full">
          <Terminal />
        </div>

      </div>
    </section>
  );
}