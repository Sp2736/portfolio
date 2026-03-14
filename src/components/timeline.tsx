"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, Code, Cpu, Layers, Terminal } from "lucide-react";

const timelineData = [
  {
    id: "era-1",
    year: "2023",
    title: "The Syntax Foundation",
    subtitle: "C Programming & Procedural Logic",
    icon: Terminal,
    context: "Every architect needs to understand the bricks. I started my journey at the lowest safe level—C programming. Learning how memory works, how pointers operate, and how the compiler actually reads code built an indestructible foundation for everything that followed.",
    tech: ["C", "CLI Tools", "Memory Management"]
  },
  {
    id: "era-2",
    year: "2024",
    title: "Algorithmic Thinking & OOP",
    subtitle: "DSA, Java & System Hierarchies",
    icon: Code,
    context: "Moved from writing scripts to engineering software. I dove deep into Data Structures and Algorithms, completely rewiring how my brain solves problems. Completed certification in Object-Oriented Hierarchies in Java via Coursera, learning how to structure massive, scalable codebases rather than just writing single files.",
    tech: ["Java", "C++", "DSA", "Coursera Cert"]
  },
  {
    id: "era-3",
    year: "2025",
    title: "The Web Ecosystem",
    subtitle: "Full-Stack & Ubuntu Environments",
    icon: Layers,
    context: "Transitioned from local terminals to the global web. I shifted my primary development environment to Ubuntu, mastering the Linux ecosystem. Began connecting frontends to databases, building out my first full-stack projects using React, PHP, and relational databases.",
    tech: ["React", "PHP", "MySQL", "Ubuntu/Linux"]
  },
  {
    id: "era-4",
    year: "2026",
    title: "The Current Frontier",
    subtitle: "AI Tooling & Scalable Architecture",
    icon: Cpu,
    context: "Currently engineering high-level digital ecosystems. Building ARCADE and Wander-n-Wonder using Next.js and Prisma for absolute type safety. Simultaneously exploring AI integrations, leading to the creation of the Logic Commenter VS Code extension using AST parsing and LLMs.",
    tech: ["Next.js", "Prisma", "AI APIs", "System Design"]
  }
];

export function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    // Purged: bg-background
    <section className="w-full py-16 px-6 relative z-10 overflow-hidden" id="chronology">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-16 text-center" data-code="<Timeline data={history} />">
          <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Chronology</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">The Engineering Journey</h3>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2 hidden sm:block" />
          
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2 hidden sm:block shadow-[0_0_10px_rgba(var(--primary),0.8)]"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-20%" }} 
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          <div className="flex flex-col gap-8 md:gap-12">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <div key={item.id} className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  <div className="hidden md:block w-5/12" />

                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary -translate-x-1/2 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(var(--primary),0.4)] hidden sm:flex"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </motion.div>

                  <motion.div 
                    layout 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full sm:w-[90%] md:w-5/12 ml-10 sm:ml-0"
                  >
                    {/* Applied Glassmorphism */}
                    <div 
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md shadow-xl ${
                        isExpanded 
                          ? "bg-primary/10 border-primary shadow-primary/20" 
                          : "bg-background/40 border-border/50 hover:border-primary/50 hover:bg-background/60 hover:-translate-y-1"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2 font-mono text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                          <Calendar size={12} />
                          {item.year}
                        </div>
                        <div className="p-2 rounded-full bg-background/50 border border-border/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                          <Icon size={16} />
                        </div>
                      </div>
                      
                      <motion.h4 layout="position" className="text-xl font-bold text-foreground mb-1">
                        {item.title}
                      </motion.h4>
                      <motion.p layout="position" className="text-sm text-muted-foreground mb-4">
                        {item.subtitle}
                      </motion.p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-border/50 mt-4">
                              <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                                {item.context}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {item.tech.map((t, i) => (
                                  <span key={i} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border border-border/50 bg-background/50 text-muted-foreground">
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div layout="position" className="flex items-center gap-1 text-xs font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors mt-4">
                        {isExpanded ? (
                          <><ChevronUp size={14} /> Collapse logs</>
                        ) : (
                          <><ChevronDown size={14} /> View context</>
                        )}
                      </motion.div>

                    </div>
                  </motion.div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}