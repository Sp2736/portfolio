"use client";

import { motion } from "framer-motion";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Narrative */}
        <div className="flex flex-col gap-6 text-left">
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
            className="text-lg text-muted-foreground max-w-md leading-relaxed"
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
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Deployments
            </button>
            <button className="px-6 py-3 rounded-lg border border-border hover:bg-muted transition-colors font-semibold">
              Initialize Contact
            </button>
          </motion.div>
        </div>

        {/* Right Column: The Terminal */}
        <div className="flex justify-center lg:justify-end w-full">
          <Terminal />
        </div>

      </div>
    </section>
  );
}