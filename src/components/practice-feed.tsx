"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Github,
  GitCommit,
  Code2,
  Activity,
  ExternalLink,
  Clock,
  BookOpen,
  Terminal as TerminalIcon,
} from "lucide-react";
import { LeetCodeWidget } from "./leetcode";

const PRACTICE_REPO = "Sp2736/practice";
const GITHUB_API = "https://api.github.com";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: { date: string };
  };
  html_url: string;
}

interface RepoData {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  default_branch: string;
  language: string | null;
  html_url: string;
}

interface LangData {
  [key: string]: number;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function shortenMessage(msg: string): string {
  return msg.length > 72 ? msg.slice(0, 69) + "..." : msg;
}

// ── LANGUAGE BAR ─────────────────────────────────────────────────────────────
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  C: "#555555",
  "C++": "#f34b7d",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00ADD8",
  Rust: "#dea584",
};

function LanguageBar({ langs }: { langs: LangData }) {
  const total = Object.values(langs).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const sorted = Object.entries(langs)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        Language Composition
      </p>
      {/* Stacked bar */}
      <div className="flex rounded-full overflow-hidden h-3 w-full shadow-inner">
        {sorted.map(([lang, bytes]) => (
          <div
            key={lang}
            title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`}
            style={{
              width: `${(bytes / total) * 100}%`,
              backgroundColor: LANG_COLORS[lang] ?? "#888",
            }}
            className="transition-all duration-700"
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        {sorted.map(([lang, bytes]) => (
          <div key={lang} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: LANG_COLORS[lang] ?? "#888" }}
            />
            <span className="text-[10px] font-mono text-foreground">{lang}</span>
            <span className="text-[10px] font-mono text-muted-foreground">
              {((bytes / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function PracticeFeed() {
  const [repo, setRepo] = useState<RepoData | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [langs, setLangs] = useState<LangData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [repoRes, commitsRes, langsRes] = await Promise.all([
          fetch(`${GITHUB_API}/repos/${PRACTICE_REPO}`),
          fetch(`${GITHUB_API}/repos/${PRACTICE_REPO}/commits?per_page=8`),
          fetch(`${GITHUB_API}/repos/${PRACTICE_REPO}/languages`),
        ]);

        if (!repoRes.ok) throw new Error(`Repo fetch failed: ${repoRes.status}`);

        const repoData: RepoData = await repoRes.json();
        const commitsData: Commit[] = commitsRes.ok ? await commitsRes.json() : [];
        const langsData: LangData = langsRes.ok ? await langsRes.json() : {};

        setRepo(repoData);
        setCommits(Array.isArray(commitsData) ? commitsData : []);
        setLangs(langsData);
      } catch {
        setError("Failed to fetch practice repository data from GitHub API.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-full py-20 px-6 relative z-10" id="algos">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">

        {/* Section Header */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                <BookOpen size={22} />
              </div>
              <h2 className="font-mono text-sm tracking-widest uppercase font-bold text-muted-foreground">
                Practice Repository
              </h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              DSA &amp;{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                Algorithms.
              </span>
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Tracking daily problem-solving commits, language distribution, and algorithm
              solutions from the dedicated practice repository at{" "}
              <a
                href={`https://github.com/${PRACTICE_REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-mono hover:underline underline-offset-4"
              >
                github.com/{PRACTICE_REPO}
              </a>
              . Data fetched live from the GitHub REST API.
            </p>
          </motion.div>
        </div>

        {/* Repo Stats Bar */}
        {!loading && repo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Stars", value: repo.stargazers_count, icon: Activity },
              { label: "Forks", value: repo.forks_count, icon: Code2 },
              { label: "Open Issues", value: repo.open_issues_count, icon: GitCommit },
              { label: "Last Updated", value: formatDate(repo.updated_at), icon: Clock },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="p-4 rounded-xl bg-card border border-border shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest">
                    {s.label}
                  </p>
                  <p className="text-lg font-black text-foreground">{s.value}</p>
                </div>
                <s.icon size={18} className="text-primary/50" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Main Grid: Terminal + Language */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">

          {/* LEFT: Commit Terminal */}
          <div className="lg:w-1/2 w-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full h-full rounded-2xl bg-card border border-border shadow-xl overflow-hidden font-mono text-xs flex flex-col"
            >
              {/* Mac-style title bar */}
              <div className="flex items-center px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-muted-foreground text-[10px] tracking-widest uppercase font-bold">
                  <TerminalIcon size={12} />
                  git-log-practice.sh
                </div>
                <div className="w-10" />
              </div>

              {/* Terminal body */}
              <div className="p-6 flex flex-col gap-3 text-foreground grow overflow-y-auto">
                <p className="text-muted-foreground">
                  $ git log --oneline {PRACTICE_REPO}
                </p>

                {loading && (
                  <div className="animate-pulse text-primary flex items-center gap-2 italic">
                    <Activity size={14} /> Fetching commit history...
                  </div>
                )}

                {error && (
                  <p className="text-red-500/80 font-mono text-xs">{error}</p>
                )}

                {!loading && !error && (
                  <>
                    <p className="text-primary font-bold">&gt; HTTP 200 OK — {commits.length} commits fetched</p>
                    <div className="pl-3 border-l border-border flex flex-col gap-0.5 mt-1">
                      {commits.map((c, i) => (
                        <a
                          key={i}
                          href={c.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border/40 hover:bg-muted/20 transition-colors group px-2 -mx-2 rounded-sm gap-0.5"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-muted-foreground/60 text-[9px]">
                              {c.sha.slice(0, 7)}
                            </span>
                            <span className="text-foreground font-bold group-hover:text-primary transition-colors">
                              {shortenMessage(c.commit.message)}
                            </span>
                          </span>
                          <span className="text-muted-foreground text-[10px] shrink-0">
                            {formatDate(c.commit.author.date)}
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

          {/* RIGHT: Language stats + Repo link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full flex flex-col gap-6"
          >
            {/* Language distribution */}
            <div className="flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border shadow-xl grow">
              <div className="flex items-center gap-2 font-mono text-sm text-primary uppercase tracking-widest font-bold">
                <Code2 size={18} /> Language Stats
              </div>

              {loading && (
                <div className="flex flex-col gap-3">
                  <div className="h-3 w-full rounded-full bg-muted/50 animate-pulse" />
                  <div className="flex flex-wrap gap-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-20 rounded bg-muted/40 animate-pulse" />
                    ))}
                  </div>
                </div>
              )}

              {!loading && Object.keys(langs).length > 0 && (
                <LanguageBar langs={langs} />
              )}

              {!loading && Object.keys(langs).length === 0 && !error && (
                <p className="text-sm text-muted-foreground font-mono">
                  No language data available yet.
                </p>
              )}
            </div>

            {/* Repo link card */}
            {repo && (
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-5 rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-primary/50 transition-all shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Github size={22} className="text-primary/70 group-hover:text-primary transition-colors" />
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Repository
                    </p>
                    <p className="font-bold text-foreground font-mono group-hover:text-primary transition-colors">
                      {PRACTICE_REPO}
                    </p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            )}
          </motion.div>
        </div>

        {/* LeetCode Widget integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full mt-4"
        >
          <div className="flex items-center gap-2 mb-4 font-mono text-sm text-primary uppercase tracking-widest font-bold">
            <Activity size={18} /> LeetCode Stats
          </div>
          <LeetCodeWidget />
        </motion.div>

      </div>
    </section>
  );
}
