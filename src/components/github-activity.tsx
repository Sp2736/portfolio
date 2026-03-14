"use client";

import { motion } from "framer-motion";
import { GitBranch, GitCommit, Github } from "lucide-react";

export function GithubActivity() {
  // Generate mock contribution data deterministically to prevent hydration mismatches.
  // Using Math.sin(index) creates a pseudo-random but perfectly repeatable sequence.
  const generateContributions = () => {
    const days = [];
    for (let i = 0; i < 84; i++) {
      // Deterministic pseudo-random number between 0 and 1
      const pseudoRandom = Math.abs(Math.sin(i * 12.345)); 
      
      const isActive = pseudoRandom > 0.4;
      // Scale it to 1-10 commits if active
      const count = isActive ? Math.floor(pseudoRandom * 10) + 1 : 0; 
      days.push({ id: i, count });
    }
    return days;
  };

  const contributions = generateContributions();
  const totalCommits = contributions.reduce((sum, day) => sum + day.count, 0);

  // Helper to determine the color intensity of a square based on commit count
  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-muted/30 border-transparent";
    if (count < 3) return "bg-primary/30 border-primary/20";
    if (count < 6) return "bg-primary/60 border-primary/40";
    return "bg-primary border-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]";
  };

  return (
    <section className="w-full py-12 px-6 relative z-10 bg-card/30 border-y border-border" id="github">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left: Narrative */}
        <div className="md:w-1/3 flex flex-col gap-6" data-code="<Github username='swayam-patel' />">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4 text-foreground">
              <Github size={24} />
              <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-muted-foreground">Version Control</h2>
            </div>
            <h3 className="text-3xl font-extrabold text-foreground tracking-tight mb-4">
              Continuous <br />
              <span className="text-primary">Integration.</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Code is a living organism. It requires constant iteration, refactoring, and committing. Here is the pulse of my recent engineering activity.
            </p>
            
            <div className="mt-8 flex flex-col gap-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground flex items-center gap-2"><GitCommit size={14}/> Total Commits (90d)</span>
                <span className="font-bold text-foreground">{totalCommits}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground flex items-center gap-2"><GitBranch size={14}/> Active Branches</span>
                <span className="font-bold text-foreground">12</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: The Graph */}
        <div className="md:w-2/3 w-full flex justify-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl border border-border bg-card shadow-2xl overflow-x-auto custom-scrollbar w-full max-w-[600px]"
          >
            <div className="flex items-end gap-1 min-w-max">
              {/* Split into 12 columns (weeks) of 7 rows (days) */}
              {Array.from({ length: 12 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {contributions.slice(weekIndex * 7, (weekIndex + 1) * 7).map((day, i) => (
                    <motion.div
                      key={day.id}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: (weekIndex * 0.05) + (i * 0.01) }}
                      className={`w-4 h-4 rounded-sm border ${getIntensityClass(day.count)} cursor-crosshair hover:scale-150 hover:z-10 transition-transform`}
                      title={`${day.count} commits`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted/30"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/30"></div>
                <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
                <div className="w-3 h-3 rounded-sm bg-primary"></div>
              </div>
              <span>More</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}