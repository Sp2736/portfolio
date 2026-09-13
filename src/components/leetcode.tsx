"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, CheckCircle, AlertCircle, Flame, Target, TrendingUp } from "lucide-react";

const LEETCODE_USERNAME = "_sp_1";
const API_URL = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}`;

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints: number;
  reputation: number;
}

// ── DONUT CHART (pure SVG, no extra libs) ────────────────────────────────────
function DonutChart({
  easy,
  medium,
  hard,
}: {
  easy: number;
  medium: number;
  hard: number;
}) {
  const total = easy + medium + hard;
  if (total === 0) return null;

  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const R = 65;
  const r = 45;

  const segments = [
    { value: easy, color: "#22c55e", label: "Easy" },
    { value: medium, color: "#f59e0b", label: "Medium" },
    { value: hard, color: "#ef4444", label: "Hard" },
  ];

  let currentAngle = -90; // start from top

  const polarToCartesian = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos((angle * Math.PI) / 180),
    y: cy + radius * Math.sin((angle * Math.PI) / 180),
  });

  const arcs = segments.map((seg) => {
    const sweep = (seg.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;

    const start = polarToCartesian(startAngle, R);
    const end = polarToCartesian(endAngle - 0.01, R);
    const innerStart = polarToCartesian(endAngle - 0.01, r);
    const innerEnd = polarToCartesian(startAngle, r);

    const largeArc = sweep > 180 ? 1 : 0;

    const d = [
      `M ${start.x} ${start.y}`,
      `A ${R} ${R} 0 ${largeArc} 1 ${end.x} ${end.y}`,
      `L ${innerStart.x} ${innerStart.y}`,
      `A ${r} ${r} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
      "Z",
    ].join(" ");

    return { ...seg, d, sweep };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {arcs.map((arc, i) => (
            <path
              key={i}
              d={arc.d}
              fill={arc.color}
              opacity={arc.sweep > 0 ? 1 : 0}
              className="transition-all duration-500"
              style={{ filter: `drop-shadow(0 0 6px ${arc.color}55)` }}
            />
          ))}
          {/* Center text */}
          <text
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            className="fill-foreground font-extrabold"
            style={{ fontSize: 22, fontFamily: "var(--font-inter)" }}
          >
            {total}
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            className="fill-muted-foreground"
            style={{ fontSize: 9, fontFamily: "var(--font-fira-code)", letterSpacing: "0.1em" }}
          >
            SOLVED
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        {[
          { label: "Easy", value: easy, color: "bg-green-500", textColor: "text-green-500" },
          { label: "Medium", value: medium, color: "bg-amber-500", textColor: "text-amber-500" },
          { label: "Hard", value: hard, color: "bg-red-500", textColor: "text-red-500" },
        ].map((l) => (
          <div key={l.label} className="flex flex-col items-center gap-1">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className={`text-[10px] font-mono font-bold ${l.textColor}`}>{l.value}</span>
            <span className="text-[9px] font-mono text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SKELETON ──────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-muted/40 ${className ?? ""}`} />
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export function LeetCodeWidget() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const [userRes, solvedRes] = await Promise.all([
          fetch(`${API_URL}/solved`),
          fetch(`${API_URL}`),
        ]);

        if (!userRes.ok || !solvedRes.ok) throw new Error("API unavailable");

        const solvedData = await userRes.json();
        const userData = await solvedRes.json();

        setStats({
          totalSolved: solvedData.solvedProblem ?? 0,
          totalQuestions: solvedData.totalSubmissionNum?.[0]?.count ?? 0,
          easySolved: solvedData.easySolved ?? 0,
          totalEasy: solvedData.totalEasySubmissions ?? 0,
          mediumSolved: solvedData.mediumSolved ?? 0,
          totalMedium: solvedData.totalMediumSubmissions ?? 0,
          hardSolved: solvedData.hardSolved ?? 0,
          totalHard: solvedData.totalHardSubmissions ?? 0,
          acceptanceRate: userData.acceptanceRate ?? 0,
          ranking: userData.ranking ?? 0,
          contributionPoints: userData.contributionPoints ?? 0,
          reputation: userData.reputation ?? 0,
        });
      } catch {
        setError(
          "Could not reach LeetCode API. The server may be cold-starting — refresh in 30s."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
        <div className="w-full">
        {/* Main Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl bg-background/5 backdrop-blur-md border border-border/30 overflow-hidden shadow-2xl"
        >
          {/* Terminal-style top bar */}
          <div className="flex items-center px-5 py-3 bg-muted/30 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-muted-foreground text-[10px] tracking-widest uppercase font-mono font-bold">
              <Code size={12} />
              leetcode-stats.live
            </div>
            <div className="w-12" />
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            {loading && (
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="w-40 h-40 rounded-full" />
                  <div className="flex gap-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <Skeleton className="w-12 h-12 rounded-lg" />
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20 rounded-xl" />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <AlertCircle size={32} className="text-red-500/70" />
                <p className="text-sm text-muted-foreground max-w-sm font-mono">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 text-xs font-mono font-bold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && stats && (
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* LEFT — Donut Chart */}
                <div className="flex justify-center w-full md:w-auto md:shrink-0">
                  <DonutChart
                    easy={stats.easySolved}
                    medium={stats.mediumSolved}
                    hard={stats.hardSolved}
                  />
                </div>

                {/* RIGHT — Stats Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {[
                    {
                      label: "Global Ranking",
                      value: stats.ranking ? `#${stats.ranking.toLocaleString()}` : "N/A",
                      icon: TrendingUp,
                      color: "text-primary",
                    },
                    {
                      label: "Acceptance Rate",
                      value: stats.acceptanceRate ? `${stats.acceptanceRate.toFixed(1)}%` : "N/A",
                      icon: CheckCircle,
                      color: "text-green-500",
                    },
                    {
                      label: "Contribution Pts",
                      value: stats.contributionPoints || "N/A",
                      icon: Target,
                      color: "text-amber-500",
                    },
                    {
                      label: "Reputation",
                      value: stats.reputation || 0,
                      icon: Flame,
                      color: "text-red-500",
                    },
                  ].map((s, i) => {
                    const Icon = s.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex flex-col gap-1.5 p-3 rounded-xl bg-card border border-border shadow-sm"
                      >
                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                          <Icon size={10} className={s.color} />
                          {s.label}
                        </span>
                        <span className={`text-xl font-extrabold ${s.color}`}>
                          {s.value}
                        </span>
                      </motion.div>
                    );
                  })}

                  {/* Difficulty breakdown bars */}
                  <div className="sm:col-span-2 flex flex-col gap-2 p-3 rounded-xl bg-card border border-border shadow-sm">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">
                      Difficulty Breakdown
                    </p>
                    {[
                      { label: "Easy", solved: stats.easySolved, total: stats.totalEasy, color: "bg-green-500", text: "text-green-500" },
                      { label: "Medium", solved: stats.mediumSolved, total: stats.totalMedium, color: "bg-amber-500", text: "text-amber-500" },
                      { label: "Hard", solved: stats.hardSolved, total: stats.totalHard, color: "bg-red-500", text: "text-red-500" },
                    ].map((bar) => (
                      <div key={bar.label} className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono font-bold w-12 ${bar.text}`}>
                          {bar.label}
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${bar.color}`}
                            initial={{ width: 0 }}
                            animate={{
                              width: bar.total > 0 ? `${(bar.solved / bar.total) * 100}%` : "0%",
                            }}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground w-12 text-right">
                          {bar.solved}/{bar.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        </div>
  );
}
