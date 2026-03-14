"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

const skillsData = [
  { name: "React", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind", category: "Frontend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Java", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "C++", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "Python", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "PHP", category: "Backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
  { name: "MySQL", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "Prisma", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
  { name: "MongoDB", category: "Database", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Git", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Ubuntu", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg" },
  { name: "VS Code", category: "Tools", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" }
];

export function SkillsOrbit() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All" 
    ? skillsData 
    : skillsData.filter(s => s.category === activeCategory);

  const getOrbitalPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * (2 * Math.PI) - (Math.PI / 2);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    // Purged: bg-background
    <section className="w-full py-12 px-6 relative z-10 overflow-hidden" id="skills">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Side: Wrapped in Glassmorphism for readability */}
        <div 
          className="lg:w-1/3 flex flex-col gap-6 p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-border/50 shadow-xl" 
          data-code="<SkillOrbit filter={activeCategory} />"
        >
          <div>
            <h2 className="text-primary font-mono text-sm tracking-widest uppercase mb-2">Technical Arsenal</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">The Ecosystem</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Select a subsystem to isolate the technologies orbiting the core. 
            All tools are connected to the central architectural logic.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                  activeCategory === cat 
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.4)]" 
                    : "bg-background/50 text-muted-foreground hover:bg-background/80 hover:text-foreground border border-border/50 backdrop-blur-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: The Orbital Graph */}
        <div className="lg:w-2/3 w-full flex justify-center relative min-h-[500px] items-center">
          
          <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-border/30" />
          <div className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full border border-border/20" />

          {/* Central Power Source - Glassmorphism */}
          <div className="absolute z-20 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-background/40 backdrop-blur-xl border border-border/50 shadow-[0_0_30px_rgba(var(--primary),0.2)]">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="font-mono font-extrabold text-sm md:text-base text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground uppercase tracking-widest text-center"
              >
                {activeCategory === "All" ? "CORE" : activeCategory}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence>
              {filteredSkills.map((skill, index) => {
                const radius = typeof window !== "undefined" && window.innerWidth < 768 ? 140 : 180;
                const pos = getOrbitalPosition(index, filteredSkills.length, radius);

                return (
                  <motion.div
                    key={skill.name}
                    layout 
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 1, x: pos.x, y: pos.y, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
                    className="absolute z-30 group cursor-pointer"
                  >
                    {/* Orbiting Node - Glassmorphism */}
                    <div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-background/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:bg-background/60 transition-colors shadow-lg">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-foreground/5 p-1.5 flex items-center justify-center">
                        <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                      </div>
                    </div>

                    {/* Tooltip - Glassmorphism */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="px-3 py-1.5 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg text-[10px] font-mono text-foreground whitespace-nowrap shadow-xl">
                        {skill.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}