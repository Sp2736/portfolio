#!/usr/bin/env node
/**
 * recover-traffic-data.js
 * ─────────────────────────────────────────────────────────────────────────────
 * GitHub Traffic API Data Recovery Script
 * Portfolio repo: Sp2736/portfolio
 *
 * PURPOSE:
 *   GitHub only exposes the last 14 days of traffic data via its API.
 *   This script:
 *     1. Fetches the 14-day traffic window from the GitHub API
 *     2. Calculates average daily views & unique visitors
 *     3. Extrapolates that average back to the February 2026 launch date
 *     4. Seeds the Vercel KV database with the calculated baseline
 *
 * USAGE:
 *   1. Set environment variables (see below)
 *   2. node scripts/recover-traffic-data.js
 *
 * REQUIRED ENV VARS (create a .env.local or set them in your shell):
 *   GITHUB_TOKEN          — Personal Access Token with repo:traffic scope
 *   KV_REST_API_URL       — From Vercel KV dashboard
 *   KV_REST_API_TOKEN     — From Vercel KV dashboard
 *
 * OPTIONAL:
 *   LAUNCH_DATE           — Override launch date (ISO string, default: 2026-02-01)
 *   DRY_RUN=true          — Print extrapolation without writing to KV
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Load .env.local if present
try {
  require("fs").readFileSync(".env.local", "utf8")
    .split("\n")
    .filter(Boolean)
    .forEach((line) => {
      const [key, ...val] = line.split("=");
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val.join("=").trim().replace(/^["']|["']$/g, "");
      }
    });
} catch {}

const REPO = "Sp2736/portfolio";
const LAUNCH_DATE = new Date(process.env.LAUNCH_DATE || "2026-02-01T00:00:00Z");
const DRY_RUN = process.env.DRY_RUN === "true";

// ── KV REST Client (no SDK needed — direct REST) ──────────────────────────────
async function kvSet(key, value) {
  const url = `${process.env.KV_REST_API_URL}/set/${key}/${value}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
  return res.json();
}

async function kvSadd(key, ...members) {
  const url = `${process.env.KV_REST_API_URL}/sadd/${key}/${members.join("/")}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
  return res.json();
}

// ── GitHub API fetch ───────────────────────────────────────────────────────────
async function fetchTrafficViews() {
  const url = `https://api.github.com/repos/${REPO}/traffic/views`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "portfolio-recovery-script",
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API error ${res.status}: ${text}`);
  }

  return res.json();
}

// ── MAIN ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("╔════════════════════════════════════════════════╗");
  console.log("║  Portfolio Traffic Data Recovery Script        ║");
  console.log("╚════════════════════════════════════════════════╝\n");

  // Validate env
  if (!process.env.GITHUB_TOKEN) {
    console.error("❌ Missing GITHUB_TOKEN. Set it before running.");
    process.exit(1);
  }
  if (!DRY_RUN && (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN)) {
    console.error("❌ Missing KV_REST_API_URL or KV_REST_API_TOKEN.");
    console.error("   Set DRY_RUN=true to run without writing to KV.");
    process.exit(1);
  }

  // 1. Fetch GitHub 14-day traffic window
  console.log(`📡 Fetching 14-day traffic data for ${REPO}...`);
  const traffic = await fetchTrafficViews();

  const { count: totalViews14d, uniques: totalUniques14d, views: daily } = traffic;

  console.log(`\n📊 14-day window:`);
  console.log(`   Total views:   ${totalViews14d}`);
  console.log(`   Unique visitors: ${totalUniques14d}`);
  console.log(`   Days with data:  ${daily.length}`);

  if (daily.length === 0) {
    console.warn("\n⚠️  No daily data returned. GitHub may have no traffic recorded yet.");
    console.warn("   Seeding with zero baseline.");
  }

  // 2. Calculate daily averages
  const daysWithData = daily.length > 0 ? daily.length : 14;
  const avgDailyViews = totalViews14d / daysWithData;
  const avgDailyUniques = totalUniques14d / daysWithData;

  console.log(`\n📈 Averages per day:`);
  console.log(`   Avg views:   ${avgDailyViews.toFixed(2)}`);
  console.log(`   Avg uniques: ${avgDailyUniques.toFixed(2)}`);

  // 3. Calculate how many days since launch
  const now = new Date();
  const daysSinceLaunch = Math.max(
    0,
    Math.floor((now.getTime() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24))
  );

  console.log(`\n📅 Launch date: ${LAUNCH_DATE.toDateString()}`);
  console.log(`   Today:        ${now.toDateString()}`);
  console.log(`   Days since launch: ${daysSinceLaunch}`);

  // 4. Extrapolate baseline
  const extrapolatedViews = Math.round(avgDailyViews * daysSinceLaunch);
  const extrapolatedUniques = Math.round(avgDailyUniques * daysSinceLaunch);

  console.log(`\n🧮 Extrapolated baseline (Feb launch → today):`);
  console.log(`   Views:   ${extrapolatedViews.toLocaleString()}`);
  console.log(`   Uniques: ${extrapolatedUniques.toLocaleString()}`);
  console.log(`\n   ⚠️  NOTE: This is an estimate based on a 14-day average.`);
  console.log(`   It assumes constant traffic since launch, which may not be accurate.`);
  console.log(`   Treat this as a rough seed, not ground truth.\n`);

  if (DRY_RUN) {
    console.log("🏃 DRY RUN — Not writing to KV.\n");
    console.log(`   Would set portfolio:views = ${extrapolatedViews}`);
    console.log(`   (Unique visitor seeding skipped — set-based, can't be backdated)`);
    return;
  }

  // 5. Seed KV
  console.log("💾 Writing baseline to Vercel KV...");

  const viewResult = await kvSet("portfolio:views", extrapolatedViews);
  console.log(`   portfolio:views → ${extrapolatedViews}`, viewResult.result === "OK" ? "✅" : "⚠️");

  // Seed synthetic unique visitor hashes (one hash per estimated unique)
  // We seed these as deterministic hashes so they don't conflict with real ones
  console.log(`   Seeding ${Math.min(extrapolatedUniques, 1000)} unique visitor hashes...`);
  const hashes = Array.from({ length: Math.min(extrapolatedUniques, 1000) }, (_, i) =>
    `seed-${i.toString().padStart(6, "0")}`
  );

  // Seed in batches of 50
  for (let i = 0; i < hashes.length; i += 50) {
    const batch = hashes.slice(i, i + 50);
    await kvSadd("portfolio:unique_visitors", ...batch);
    process.stdout.write(`\r   Progress: ${Math.min(i + 50, hashes.length)}/${hashes.length} `);
  }
  console.log("\n");

  console.log("✅ Recovery complete!");
  console.log(`   portfolio:views seeded with ${extrapolatedViews.toLocaleString()}`);
  console.log(`   portfolio:unique_visitors seeded with ${Math.min(extrapolatedUniques, 1000)} synthetic entries`);
  console.log("\n   Your live analytics counter will now show estimated historical traffic.\n");
}

main().catch((err) => {
  console.error("\n❌ Script failed:", err.message);
  process.exit(1);
});
