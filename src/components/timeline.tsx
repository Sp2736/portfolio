"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Code,
  Cpu,
  Layers,
  Terminal,
  Bug,
  Globe,
  Dumbbell,
} from "lucide-react";

const timelineData = [
  {
    id: "era-1",
    year: "2017",
    title: "The Open-Source Awakening",
    subtitle: "Linux, Edubuntu & First Impressions",
    icon: Terminal,
    context:
      "Since my school taught us 'Learn with Linux', I developed a keen interest in computers. While other parents complained about teaching a 'free' software instead of 'superior' Windows, I was captivated by TED talks and YouTube tutorials. I explored Edubuntu deeply and foresaw the future supremacy of Android over its closed-source counterparts.",
    tech: ["Linux", "Edubuntu", "Open-Source"],
  },
  {
    id: "era-2",
    year: "2019",
    title: "Script Kiddie & System Manipulation",
    subtitle: "VBScript, Batch & Pranks",
    icon: Bug,
    context:
      "Transitioning back to Windows, I discovered the dark arts of system scripting. Armed with VBScript and Batch, I engineered fake viruses, infinite loops, and inescapable shutdown pranks. I even figured out how to remotely shut down the entire computer lab from the root PC using 'shutdown -i'. This thrill of manipulation ignited a serious passion for software.",
    tech: ["VBScript", "Batch", "CMD", "System Scripting"],
  },
  {
    id: "era-3",
    year: "2020",
    title: "The Global Pause & Discovery",
    subtitle: "CS Fundamentals & Web Exploration",
    icon: Globe,
    context:
      "The COVID-19 lockdown provided isolation to dive into the broader landscape of Computer Science. I researched technologies, domains, and programming languages. I originally decided to learn coding simply because I thought it was 'cool'—little did I know it would evolve into a lifelong obsession with 'vibe coding' and late-night deployment struggles.",
    tech: ["Web Dev", "HTML/CSS", "CS Fundamentals"],
  },
  {
    id: "era-4",
    year: "2023",
    title: "The Organic Hiatus",
    subtitle: "Beyond the Terminal & Personal Growth",
    icon: Dumbbell,
    context:
      "After grasping the basics of web development, I hit pause on tech to focus on high school and organic growth. I explored the physical and creative realms: music, gym, cycling, trekking, poetry, anchoring, and sketching. I became an official foodie, had my first chicken dish, and built strict discipline through home workouts and long cycling routes.",
    tech: ["Music", "Fitness", "Poetry", "Art"],
  },
  {
    id: "era-5",
    year: "2024",
    title: "Low-Level Mastery",
    subtitle: "C/C++, Memory & OOP Paradigms",
    icon: Code,
    context: (
      <>
        Before college even started, I mastered C programming, incorporating
        embedded assembly language along the way. I developed a prolific
        understanding of memory management, learnt in-depth tweaking behaviours
        of pointers and some more concepts of embedded assembly, earning an
        NPTEL certification. Over the winter break, I transitioned to OOP,
        mastering C++ topics, application of OOP concepts in C++, its STL
        libraries and building complex management systems before mid-terms even
        hit. A team of other ambitious students, including myself, were chosen
        to draft, document, and develop a detailed C++ theory and practical
        handbook based on Bloom's Taxonomy for Education. Check it out{" "}
        <a href="https://drive.google.com/file/d/1l82y6hqfTRxqi7XBwC3UvEOTBa72PC1G/view">
          <u>here</u>
        </a>
        .
      </>
    ),
    tech: ["C", "C++", "Assembly", "STL"],
  },
  {
    id: "era-6",
    year: "2025",
    title: "Architectural Expansion",
    subtitle: "DSA, Java & Web Ecosystems",
    icon: Layers,
    context: (
      <>
        A year of massive horizontal expansion. I tackled DSA while shifting to
        Core Java and Applets. My curiosity spilled into
        networking—reverse-engineering how Bluetooth and QuickShare operate. I
        published my first VS Code extensions (Dark Angel & White Devil themes),
        then pivoted to modern Web Dev (React, Next.js, Node.js) and integrated
        DBMS essentials. <b>PS:</b> made a similar Java handbook with the same team!!
        Check it out{" "}
        <a href="https://drive.google.com/file/d/1JheCqqipdOTqLDSx-lRKKs9wjlqJhA-G/view">
          <u>here</u>
        </a>
        .
      </>
    ),
    tech: ["DSA", "Java", "Networking", "React/Next.js", "DBMS"],
  },
  {
    id: "era-7",
    year: "2026",
    title: "The Builder Phase",
    subtitle: "Scalable Systems & AI Tooling",
    icon: Cpu,
    context:
      "Bored with standard mid-semester exam prep, I shifted focus entirely to building deployable systems. I engineered 'Wander-n-Wonder', a premium digital garden validating my UI/UX capabilities. Shortly after, I architected and published the 'AI Logic Commenter' VS Code extension, integrating the Gemini 2.5 Flash API via a BYOK architecture.",
    tech: ["UI/UX", "VS Code APIs", "Gemini AI", "System Architecture"],
  },
];

export function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      className="w-full py-10 md:py-12 px-6 relative z-10 overflow-hidden"
      id="chronology"
    >
      <div className="max-w-4xl mx-auto">
        {/* Compressed Header */}
        <div
          className="mb-10 text-center"
          data-code="<Timeline data={history} />"
        >
          <h2 className="text-primary font-mono text-[10px] md:text-sm tracking-widest uppercase mb-1 md:mb-2">
            Chronology
          </h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
            The Engineering Journey
          </h3>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2 hidden sm:block" />

          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-primary -translate-x-1/2 hidden sm:block shadow-[0_0_10px_rgba(var(--primary),0.8)]"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Drastically reduced the gap here from gap-12 to gap-4/gap-6 */}
          <div className="flex flex-col gap-4 md:gap-6">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="hidden md:block w-5/12" />

                  {/* Shrunk the center node slightly to fit tighter spaces */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="absolute left-4 md:left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-background/80 backdrop-blur-sm border-2 border-primary -translate-x-1/2 flex items-center justify-center z-20 shadow-[0_0_10px_rgba(var(--primary),0.4)] hidden sm:flex"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                  </motion.div>

                  <motion.div
                    layout
                    // Reduced initial Y offset to 20px so it pops in faster and tighter
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="w-full sm:w-[90%] md:w-5/12 ml-10 sm:ml-0"
                  >
                    {/* Reduced padding from p-6 to p-4 md:p-5 */}
                    <div
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className={`group p-4 md:p-5 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg ${
                        isExpanded
                          ? "bg-primary/10 border-primary shadow-primary/20"
                          : "bg-background/5 border-border/30 hover:border-primary/50 hover:bg-background/60 hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Reduced bottom margin */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] md:text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                          <Calendar size={12} />
                          {item.year}
                        </div>
                        <div className="p-1.5 rounded-full bg-background/5 border border-border/30 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                          <Icon size={14} />
                        </div>
                      </div>

                      <motion.h4
                        layout="position"
                        className="text-lg md:text-xl font-bold text-foreground mb-0.5"
                      >
                        {item.title}
                      </motion.h4>
                      <motion.p
                        layout="position"
                        className="text-xs md:text-sm text-muted-foreground mb-2"
                      >
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
                            <div className="pt-3 border-t border-border/30 mt-3">
                              <p className="text-xs md:text-sm text-foreground/80 leading-relaxed mb-3">
                                {item.context}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {item.tech.map((t, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] md:text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-border/30 bg-background/5 text-muted-foreground"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.div
                        layout="position"
                        className="flex items-center gap-1 text-[10px] md:text-xs font-mono font-bold text-muted-foreground group-hover:text-primary transition-colors mt-3"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp size={12} /> Collapse logs
                          </>
                        ) : (
                          <>
                            <ChevronDown size={12} /> View context
                          </>
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
