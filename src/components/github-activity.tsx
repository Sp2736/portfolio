"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Terminal as TerminalIcon, GitBranch, Activity } from "lucide-react";

// --- OPEN SOURCE REPOS DATA ---
const openSourceRepos = [
  { 
    name: "Zaplink_frontend", 
    url: "https://github.com/Sp2736/Zaplink_frontend", 
    desc: "Frontend architecture and UI ecosystem for the Zaplink platform.",
    tech: ["Frontend", "UI/UX"]
  },
  { 
    name: "keploy", 
    url: "https://github.com/Sp2736/keploy", 
    desc: "Contributions to Keploy, a powerful open-source API testing platform.",
    tech: ["Testing", "Open Source"]
  },
  { 
    name: "CareXpert_frontend", 
    url: "https://github.com/Sp2736/CareXpert_frontend", 
    desc: "The client-facing interface and dashboard ecosystem for CareXpert.",
    tech: ["Next.js", "Client"]
  },
  { 
    name: "CareXpert_backend", 
    url: "https://github.com/Sp2736/CareXpert_backend", 
    desc: "Robust API, auth, and database architecture powering CareXpert.",
    tech: ["Node.js", "API"]
  }
];

export function GithubActivity() {
  const [gitData, setGitData] = useState({ repos: 0, followers: 0 });
  const [recentPushes, setRecentPushes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- OFFICIAL GITHUB API FETCH ---
  useEffect(() => {
    const fetchRealGithubData = async () => {
      try {
        // Fetch User Stats
        const userRes = await fetch("https://api.github.com/users/Sp2736");
        const userData = await userRes.json();
        
        // Fetch Recently Pushed Repositories (Limit 3)
        const reposRes = await fetch("https://api.github.com/users/Sp2736/repos?sort=pushed&per_page=3");
        const reposData = await reposRes.json();

        if (userRes.ok && reposRes.ok) {
          setGitData({ repos: userData.public_repos, followers: userData.followers });
          setRecentPushes(reposData);
        }
      } catch (error) {
        console.error("Failed to fetch live GitHub data.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealGithubData();
  }, []);

  // Format the ISO date into something readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <section className="w-full py-16 px-6 relative z-10" id="github">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* ==========================================
            SECTION HEADER (Top)
        ========================================== */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <Github size={24} />
              </div>
              <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-muted-foreground">Version Control</h2>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Continuous <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-foreground">Integration.</span>
            </h3>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Code is a living organism. It requires constant iteration and refactoring. Here is a live telemetry feed of my repository updates pulled directly from the GitHub API, alongside my active open-source contributions.
            </p>
          </motion.div>
        </div>

        {/* ==========================================
            CONTENT SPLIT (Terminal Left, OSS Right)
        ========================================== */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* --- LEFT: LIVE TELEMETRY TERMINAL --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full flex flex-col"
          >
            {/* Themed Terminal Container */}
            <div className="w-full h-full rounded-2xl bg-background/60 backdrop-blur-md border border-border/30 shadow-2xl overflow-hidden font-mono text-sm flex flex-col">
              
              {/* Terminal Header */}
              <div className="flex items-center px-4 py-3 bg-secondary/40 border-b border-border/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-muted-foreground text-[10px] tracking-widest uppercase font-bold">
                  <TerminalIcon size={14} /> System Telemetry
                </div>
                <div className="w-12" /> {/* Spacer for centering */}
              </div>

              {/* Terminal Body */}
              <div className="p-5 md:p-6 flex flex-col gap-3 flex-grow text-xs md:text-sm">
                <p className="text-muted-foreground mb-1">$ ssh git@github.com -u Sp2736</p>
                
                {loading ? (
                  <div className="flex items-center gap-2 animate-pulse text-primary mt-2">
                    <Activity size={16} /> Establishing secure connection...
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-primary font-bold">&gt; Connection established.</p>
                    <p className="text-muted-foreground">&gt; Target: <span className="text-foreground font-semibold">Swayam Patel (Sp2736)</span></p>
                    <p className="text-muted-foreground">&gt; Public Repositories: <span className="text-foreground font-semibold">{gitData.repos}</span></p>
                    <p className="text-muted-foreground">&gt; Network Followers: <span className="text-foreground font-semibold">{gitData.followers}</span></p>
                    <p className="mt-4 text-primary font-bold">&gt; Retrieving latest push events...</p>
                    
                    <div className="flex flex-col gap-3 mt-2 pl-3 border-l-2 border-primary/30 ml-1">
                      {recentPushes.map((repo, i) => (
                        <motion.a
                          key={i}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (i * 0.1) }}
                          className="flex items-center gap-2 group"
                        >
                          <GitBranch size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="font-bold text-foreground group-hover:text-primary transition-colors underline decoration-transparent group-hover:decoration-primary">
                            {repo.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground hidden sm:inline-block">({formatDate(repo.pushed_at)})</span>
                        </motion.a>
                      ))}
                    </div>
                    <p className="mt-4 text-primary animate-pulse font-bold text-lg leading-none">_</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: OPEN SOURCE CONTRIBUTIONS --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 w-full flex flex-col"
          >
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 font-mono text-sm text-primary uppercase tracking-widest font-bold px-2">
              <FolderGit2 size={18} />
              Open Source Repositories
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
              {openSourceRepos.map((repo, idx) => (
                <a 
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl border border-border/30 bg-background/5 backdrop-blur-md hover:bg-primary/5 hover:border-primary/50 transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(var(--primary),0.15)] flex flex-col hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-foreground font-mono text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {repo.name}
                    </h4>
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-5 flex-grow">
                    {repo.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {repo.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-background/80 border border-border/30 rounded-md text-[9px] font-mono uppercase text-foreground group-hover:border-primary/40 transition-colors shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}