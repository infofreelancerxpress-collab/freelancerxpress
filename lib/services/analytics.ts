import { createHash } from "crypto";
import prisma from "@/lib/prisma";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** SHA-256 hash an IP address so we never store raw IPs. */
export function hashIP(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

/** Returns true if the user-agent looks like a known bot / crawler. */
export function isBot(userAgent: string): boolean {
  const botPatterns = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
    /yandexbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /whatsapp/i,
    /telegrambot/i,
    /pingdom/i,
    /uptimerobot/i,
    /semrushbot/i,
    /ahrefsbot/i,
    /crawl/i,
    /spider/i,
    /bot\b/i,
  ];
  return botPatterns.some((p) => p.test(userAgent));
}

// ── Core tracking ────────────────────────────────────────────────────────────

/**
 * Track a visitor.  Returns `true` if a new record was inserted,
 * `false` if the visitor was already counted today or is a bot.
 */
export async function trackVisitor(
  ip: string,
  userAgent: string,
  path: string = "/"
): Promise<boolean> {
  if (isBot(userAgent)) return false;

  const ipHash = hashIP(ip);
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  // Check if this visitor was already recorded today
  const existing = await prisma.visitor.findFirst({
    where: {
      ipHash,
      visitedAt: { gte: todayStart, lte: todayEnd },
    },
    select: { id: true },
  });

  if (existing) return false;

  await prisma.visitor.create({
    data: { ipHash, userAgent: userAgent.substring(0, 512), path },
  });

  return true;
}

// ── Query helpers ────────────────────────────────────────────────────────────

/** Get today's total visits and unique visitors. */
export async function getTodayStats(): Promise<{
  totalVisits: number;
  uniqueVisitors: number;
}> {
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());

  const [totalVisits, uniqueResult] = await Promise.all([
    prisma.visitor.count({
      where: { visitedAt: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.visitor.groupBy({
      by: ["ipHash"],
      where: { visitedAt: { gte: todayStart, lte: todayEnd } },
    }),
  ]);

  return { totalVisits, uniqueVisitors: uniqueResult.length };
}

/**
 * Get a daily breakdown for the last N days.
 * Returns an array of `{ date, total, unique }` sorted ascending by date.
 */
export async function getSummary(
  days: number = 7
): Promise<Array<{ date: string; total: number; unique: number }>> {
  const since = startOfDay(
    new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000)
  );

  const visitors = await prisma.visitor.findMany({
    where: { visitedAt: { gte: since } },
    select: { ipHash: true, visitedAt: true },
  });

  // Group in-memory by date string
  const buckets = new Map<
    string,
    { total: number; uniqueIPs: Set<string> }
  >();

  // Pre-fill every day so the chart has no gaps
  for (let i = 0; i < days; i++) {
    const d = new Date(since.getTime() + i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10); // "YYYY-MM-DD"
    buckets.set(key, { total: 0, uniqueIPs: new Set() });
  }

  for (const v of visitors) {
    const key = v.visitedAt.toISOString().slice(0, 10);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.total++;
      bucket.uniqueIPs.add(v.ipHash);
    }
  }

  return Array.from(buckets.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { total, uniqueIPs }]) => ({
      date,
      total,
      unique: uniqueIPs.size,
    }));
}

// ── Date utilities (avoid adding date-fns dependency for 2 functions) ────────

function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

function endOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(23, 59, 59, 999);
  return out;
}
