"use client";

import { motion, Variants } from "framer-motion";
import { GitPullRequest, Code2, Users, ArrowRight } from "lucide-react";
import { LinkedListVisual } from "./linked-list-visual";

export function OpenInitiative() {
  return (
    <section className="w-full py-16 px-6 relative z-10" id="open-source">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-background/40 backdrop-blur-xl border border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.15)] overflow-hidden p-8 md:p-12"
        >
          {/* Subtle animated background gradient for the CTA */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary animate-pulse">
                  <GitPullRequest size={16} />
                </div>
                <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-primary">
                  Open Initiative
                </h2>
              </div>

              <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                Data Structure Visualizer
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                I am building a VS Code extension that brings data structures to
                life — dynamic pointer arrows for Linked Lists, live tree
                renders, stack frames, and queue animations. All rendered in
                real-time as you code via WebView API and SVG rendering.
              </p>
              <div className="mb-6">
                <LinkedListVisual />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/Sp2736/seebug-visualizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity font-mono text-sm"
                >
                  <Users size={16} /> Become a Contributor or View Repository
                </a>
              </div>
            </div>

            {/* Sidebar Stats/Needs */}
            <div className="w-full md:w-1/3 flex flex-col gap-4 bg-background/50 border border-border/50 rounded-xl p-5 shrink-0">
              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                  Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-[10px] font-mono bg-card border border-border/50 rounded text-foreground">
                    TypeScript
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-card border border-border/50 rounded text-foreground">
                    VS Code API
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-card border border-border/50 rounded text-foreground">
                    SVG / Canvas
                  </span>
                </div>
              </div>
              <div className="w-full h-[1px] bg-border/50 my-1" />
              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                  Ideal Ally
                </span>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2">
                    <Code2 size={12} className="text-primary" /> TS Developer
                  </li>
                  <li className="flex items-center gap-2">
                    <Code2 size={12} className="text-primary" /> DSA Enthusiast
                  </li>
                  <li className="flex items-center gap-2">
                    <Code2 size={12} className="text-primary" /> SVG rendering
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
