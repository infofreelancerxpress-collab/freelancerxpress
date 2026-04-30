import { NextResponse } from "next/server";

/**
 * Format a raw follower count into a human-readable string.
 * e.g. 150000 → "150K", 1200000 → "1.2M"
 */
export function formatFollowers(count: number): string {
  if (count >= 1_000_000) {
    const millions = count / 1_000_000;
    return millions % 1 === 0
      ? `${millions}M`
      : `${parseFloat(millions.toFixed(1))}M`;
  }
  if (count >= 1_000) {
    const thousands = count / 1_000;
    return thousands % 1 === 0
      ? `${thousands}K`
      : `${parseFloat(thousands.toFixed(1))}K`;
  }
  return count.toString();
}

/**
 * Parse a formatted follower string back to a raw number.
 * e.g. "150K" → 150000, "1.2M" → 1200000
 */
export function parseFollowers(str: string): number {
  const cleaned = str.trim().toUpperCase();
  if (cleaned.endsWith("M")) {
    return Math.round(parseFloat(cleaned.slice(0, -1)) * 1_000_000);
  }
  if (cleaned.endsWith("K")) {
    return Math.round(parseFloat(cleaned.slice(0, -1)) * 1_000);
  }
  return parseInt(cleaned, 10) || 0;
}

/**
 * Compute the total followers from a platforms JSON array.
 */
export function computeTotalFollowers(
  platforms: Array<{ followers: string }>
): number {
  return platforms.reduce((sum, p) => sum + parseFollowers(p.followers), 0);
}

/**
 * Standardized success response.
 */
export function apiResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

/**
 * Standardized error response.
 */
export function apiError(
  message: string,
  status = 400,
  errors?: Record<string, string[]>
) {
  return NextResponse.json(
    { success: false, message, ...(errors && { errors }) },
    { status }
  );
}
