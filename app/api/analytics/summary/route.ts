import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth-guard";
import { getSummary } from "@/lib/services/analytics";

/**
 * GET /api/analytics/summary?days=7|30
 * Admin only — returns daily visitor breakdown.
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const daysParam = req.nextUrl.searchParams.get("days");
    const days = daysParam === "30" ? 30 : 7;

    const summary = await getSummary(days);
    return Response.json({ success: true, data: summary });
  } catch (error) {
    console.error("Analytics summary error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch analytics summary" },
      { status: 500 }
    );
  }
}
