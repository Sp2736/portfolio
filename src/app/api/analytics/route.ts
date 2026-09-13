import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS API ROUTE — /api/analytics
//
// Requires Vercel KV (serverless Redis). Follow analytics-counter-guide.md
// to provision KV and set the required environment variables:
//   KV_REST_API_URL
//   KV_REST_API_TOKEN
// ─────────────────────────────────────────────────────────────────────────────

// Lazy-import @vercel/kv so the build doesn't fail without env vars locally.
async function getKv() {
  try {
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

// Check if KV is properly configured
function isKvConfigured(): boolean {
  return !!(
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  );
}

// Hash IP for privacy-preserving unique visitor tracking
function hashIp(ip: string): string {
  return createHash("sha256").update(ip + (process.env.KV_SALT ?? "sp-portfolio")).digest("hex").slice(0, 16);
}

export async function GET() {
  if (!isKvConfigured()) {
    return NextResponse.json(
      {
        views: 0,
        uniqueVisitors: 0,
        status: "kv_not_configured",
        message: "Vercel KV not provisioned. See analytics-counter-guide.md",
      },
      { status: 200 }
    );
  }

  try {
    const kv = await getKv();
    if (!kv) throw new Error("KV module unavailable");

    const [views, uniqueVisitors] = await Promise.all([
      kv.get<number>("portfolio:views") ?? 0,
      kv.scard("portfolio:unique_visitors"),
    ]);

    return NextResponse.json({ views: views ?? 0, uniqueVisitors });
  } catch (err) {
    console.error("[Analytics GET] Error:", err);
    return NextResponse.json({ views: 0, uniqueVisitors: 0, error: String(err) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isKvConfigured()) {
    return NextResponse.json({ ok: false, status: "kv_not_configured" }, { status: 200 });
  }

  try {
    const kv = await getKv();
    if (!kv) throw new Error("KV module unavailable");

    // Increment page view counter
    const newViews = await kv.incr("portfolio:views");

    // Track unique visitors (hashed IP, 24h TTL per member to reset daily uniques)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const visitorHash = hashIp(ip);
    // sadd to a set; this is idempotent — re-adding same hash is a no-op
    await kv.sadd("portfolio:unique_visitors", visitorHash);

    return NextResponse.json({ ok: true, views: newViews });
  } catch (err) {
    console.error("[Analytics POST] Error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
