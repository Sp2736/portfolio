"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  FolderGit2,
  Terminal as TerminalIcon,
  GitBranch,
  Activity,
  PieChart,
  Info,
} from "lucide-react";

// OPEN SOURCE REPOS DATA
const openSourceRepos = [
  {
    name: "Zaplink_frontend",
    url: "https://github.com/Sp2736/Zaplink_frontend",
    desc: "Frontend architecture and UI ecosystem for the Zaplink platform.",
    tech: ["Frontend", "UI/UX"],
  },
  {
    name: "keploy",
    url: "https://github.com/Sp2736/keploy",
    desc: "Contributions to Keploy, a powerful open-source API testing platform.",
    tech: ["Testing", "Open Source"],
  },
  {
    name: "CareXpert_frontend",
    url: "https://github.com/Sp2736/CareXpert_frontend",
    desc: "The client-facing interface and dashboard ecosystem for CareXpert.",
    tech: ["Next.js", "Client"],
  },
  {
    name: "CareXpert_backend",
    url: "https://github.com/Sp2736/CareXpert_backend",
    desc: "Robust API, auth, and database architecture powering CareXpert.",
    tech: ["Node.js", "API"],
  },
];

export function GithubActivity() {
  const [gitData, setGitData] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    location: "",
    name: "",
    createdAt: "",
    updatedAt: "",
  });
  const [recentPushes, setRecentPushes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRealGithubData = async () => {
      try {
        const userRes = await fetch("https://api.github.com/users/Sp2736");
        const userData = await userRes.json();

        const reposRes = await fetch(
          "https://api.github.com/users/Sp2736/repos?sort=pushed&per_page=4",
        );
        const reposData = await reposRes.json();

        if (userRes.ok && reposRes.ok) {
          setGitData({
            repos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            location: userData.location || "Remote",
            // Real data points from GitHub API
            name: userData.name || userData.login,
            createdAt: userData.created_at,
            updatedAt: userData.updated_at,
          });
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "...";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="w-full py-24 px-6 relative z-10" id="github">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <Github size={24} />
              </div>
              <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-muted-foreground">
                Global Analytics
              </h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Code{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                Intelligence.
              </span>
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Tracking real-time deployment metrics and open-source
              contributions. The following data is fetched directly from the
              GitHub REST API to ensure total transparency of the version
              control lifecycle.
            </p>
          </motion.div>
        </div>

        {/* ANALYTICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {[
            { label: "Repositories", value: gitData.repos, icon: FolderGit2 },
            { label: "Network", value: gitData.followers, icon: Activity },
            { label: "Following", value: gitData.following, icon: GitBranch },
            { label: "Node Location", value: gitData.location, icon: Info },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">
                  {stat.label}
                </p>
                <p className="text-xl font-black text-foreground">
                  {loading ? "..." : stat.value}
                </p>
              </div>
              <stat.icon size={20} className="text-primary/50" />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
          {/* LEFT: THEME-ADAPTIVE TELEMETRY TERMINAL */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="w-full h-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden font-mono text-xs md:text-sm flex flex-col"
            >
              <div className="flex items-center px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-muted-foreground text-[10px] tracking-widest uppercase font-bold">
                  <TerminalIcon size={12} /> git-telemetry.sh
                </div>
                <div className="w-10" /> {/* Spacer */}
              </div>

              <div className="p-6 flex flex-col gap-3 text-foreground flex-grow">
                <p className="text-muted-foreground">
                  $ curl https://api.github.com/users/Sp2736
                </p>
                {loading ? (
                  <div className="animate-pulse text-primary flex items-center gap-2 italic">
                    <Activity size={14} /> Fetching live API response...
                  </div>
                ) : (
                  <>
                    <p className="text-primary font-bold">&gt; HTTP 200 OK</p>
                    <div className="pl-3 border-l border-border flex flex-col gap-1 mt-1">
                      {/* 100% REAL DATA FROM GITHUB API */}
                      <p>
                        &gt;{" "}
                        <span className="text-muted-foreground">User:</span>{" "}
                        {gitData.name}
                      </p>
                      <p>
                        &gt;{" "}
                        <span className="text-muted-foreground">
                          Created_At:
                        </span>{" "}
                        {formatDate(gitData.createdAt)}
                      </p>
                      <p>
                        &gt;{" "}
                        <span className="text-muted-foreground">
                          Updated_At:
                        </span>{" "}
                        {formatDate(gitData.updatedAt)}
                      </p>
                    </div>

                    <div className="mt-5">
                      <p className="text-primary font-bold mb-3">
                        &gt; LATEST_COMMITS:
                      </p>
                      {recentPushes.map((repo, i) => (
                        <a
                          key={i}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex justify-between items-center py-2 border-b border-border/50 hover:bg-muted/30 transition-colors group px-2 -mx-2 rounded-sm"
                        >
                          <span className="text-foreground font-bold group-hover:text-primary transition-colors">
                            {repo.name}
                          </span>
                          <span className="text-muted-foreground text-[10px]">
                            {formatDate(repo.pushed_at)}
                          </span>
                        </a>
                      ))}
                    </div>
                    <p className="text-primary animate-pulse mt-2 font-bold text-lg leading-none">
                      _
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: OPEN SOURCE CONTRIBUTIONS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 w-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-2 font-mono text-sm text-primary uppercase tracking-widest font-bold">
                <PieChart size={18} /> Open-Source Contributions
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {openSourceRepos.map((repo, idx) => (
                <a
                  key={idx}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all flex flex-col shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-foreground font-mono text-xs group-hover:text-primary transition-colors line-clamp-1">
                      {repo.name}
                    </h4>
                    <ExternalLink
                      size={14}
                      className="text-muted-foreground group-hover:text-primary shrink-0"
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 flex-grow">
                    {repo.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {repo.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-background border border-border rounded text-[8px] font-mono text-foreground"
                      >
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
