"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  BookOpen,
  TrendingUp,
  AlertCircle,
  RefreshCw,
  Code2,
  CheckCircle2,
  ChevronRight,
  Mail,
} from "lucide-react";

// ── TYPES ─────────────────────────────────────────────────────────────────────
interface PreviewProblem {
  id: string;
  title: string;
  url: string;
  completed: boolean;
}

interface LeetcodeSkill {
  id: string;
  title: string;
  track: string;
  totalProblems: number;
  completedProblems: number;
  previewProblems: PreviewProblem[];
  othersCount: number;
}

interface MasteryStats {
  streak: { current: number; longest: number };
  leetcode: {
    skills: LeetcodeSkill[];
    andMoreCount: number;
    totalSkills: number;
  };
  lastUpdated: string;
}

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const MASTERY_OS_BASE = "https://mastery-os-omega.vercel.app";
const MASTERY_OS_API = `${MASTERY_OS_BASE}/api/public/swayam/stats`;

// ── SKELETON ─────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-muted/40 ${className ?? ""}`} />;
}

// ── SKILL CARD ────────────────────────────────────────────────────────────────
function SkillCard({ skill, index }: { skill: LeetcodeSkill; index: number }) {
  const pct = skill.totalProblems > 0
    ? Math.round((skill.completedProblems / skill.totalProblems) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="flex flex-col gap-3 p-4 rounded-xl bg-card border border-border shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] font-mono font-bold text-foreground leading-tight">
            {skill.title}
          </span>
          <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wide">
            {skill.track}
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-primary shrink-0">
          {skill.completedProblems}/{skill.totalProblems}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 + 0.2 }}
          style={{ opacity: pct === 0 ? 0.2 : 1 }}
        />
      </div>

      {/* Problem list */}
      <div className="flex flex-col gap-1">
        {skill.previewProblems.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 py-0.5 hover:opacity-80 transition-opacity"
          >
            <CheckCircle2
              size={11}
              className={p.completed ? "text-primary shrink-0" : "text-muted-foreground/30 shrink-0"}
            />
            <span className={`text-[10px] font-mono truncate ${p.completed ? "text-foreground" : "text-muted-foreground"}`}>
              {p.title}
            </span>
          </a>
        ))}
        {skill.othersCount > 0 && (
          <span className="text-[9px] font-mono text-muted-foreground/60 ml-[19px]">
            and {skill.othersCount} other{skill.othersCount > 1 ? "s" : ""}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function MasteryOSShowcase() {
  const [stats, setStats] = useState<MasteryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(MASTERY_OS_API, { cache: "no-store" });
      if (!res.ok) throw new Error(`API ${res.status}`);
      setStats(await res.json());
    } catch {
      setError("Mastery OS may be cold-starting. Retry in 30s.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Terminal bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-muted/20 border-b border-border/30">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">
          <BookOpen size={11} />
          mastery-os · live
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="p-5 md:p-7 flex flex-col gap-7">

        {/* ── HEADER ROW ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left: title + description + CTAs */}
          <div className="flex flex-col gap-3 max-w-lg">
            <div>
              <h4 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground">
                Mastery OS
              </h4>
              <p className="text-[10px] font-mono text-primary/70 tracking-widest uppercase mt-1">
                Personal Upskilling Operating System
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A database-free, gamified workspace built to self-map and record DSA progress
              section by section. Every task completion commits directly to Git — discipline
              reflected on the GitHub contribution graph.
            </p>
            <div className="flex items-center gap-3 flex-wrap mt-2">
              <a
                href="mailto:swayampatel2736@gmail.com?subject=Inquiry about Mastery OS"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-bold hover:opacity-90 transition-all shadow-sm hover:-translate-y-0.5"
              >
                <Mail size={13} />
                Want this for yourself? Let's talk
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: streak card */}
          {loading && <Skeleton className="w-full md:w-48 h-24 rounded-xl shrink-0" />}

          {error && (
            <div className="flex flex-col items-center gap-2 py-6 w-full md:w-48 shrink-0">
              <AlertCircle size={22} className="text-muted-foreground/40" />
              <p className="text-[10px] font-mono text-muted-foreground text-center max-w-[160px]">{error}</p>
              <button
                onClick={fetchStats}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono font-bold rounded-lg bg-card border border-border hover:border-primary/40 transition-all text-foreground"
              >
                <RefreshCw size={11} />
                Retry
              </button>
            </div>
          )}

          {!loading && !error && stats && (
            <div className="flex gap-3 shrink-0">
              {/* Streak */}
              <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-card border border-border shadow-sm min-w-[100px]">
                <TrendingUp size={16} className="text-primary/60" />
                <span className="text-2xl font-extrabold font-mono text-foreground leading-none">
                  {stats.streak.current}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                  Day Streak
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/50">
                  best: {stats.streak.longest}d
                </span>
              </div>

              {/* Skill count */}
              <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-card border border-border shadow-sm min-w-[100px]">
                <Code2 size={16} className="text-primary/60" />
                <span className="text-2xl font-extrabold font-mono text-foreground leading-none">
                  {stats.leetcode.totalSkills}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                  DSA Sections
                </span>
                <span className="text-[9px] font-mono text-muted-foreground/50">
                  tracked live
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── LEETCODE SECTIONS ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-xl" />
            ))}
          </div>
        )}

        {!loading && !error && stats && (
          <div className="flex flex-col gap-4">
            <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-2">
              <span className="w-3 h-px bg-primary/50 inline-block" />
              DSA Problem Sets — Tracked in Mastery OS
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {stats.leetcode.skills.map((skill, i) => (
                <SkillCard key={skill.id} skill={skill} index={i} />
              ))}
            </div>

            {stats.leetcode.andMoreCount > 0 && (
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60 px-1">
                <ChevronRight size={12} className="text-primary/40" />
                and {stats.leetcode.andMoreCount} more section{stats.leetcode.andMoreCount > 1 ? "s" : ""} tracked inside the app
              </div>
            )}
          </div>
        )}

        {/* ── FOOTER ── */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex flex-wrap gap-2">
            {["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub REST API", "Vercel"].map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[9px] font-mono text-muted-foreground/60 bg-muted/20 border border-border/40"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[9px] font-mono text-muted-foreground/40 shrink-0 ml-4 italic">
            No DB · No LLM · Pure discipline
          </p>
        </div>
      </div>
    </motion.div>
  );
}
