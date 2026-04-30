import { requireAdmin } from "@/lib/auth-guard";
import { getTodayStats } from "@/lib/services/analytics";

/**
 * GET /api/analytics/today
 * Admin only — returns today's total visits and unique visitors.
 */
export async function GET() {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const stats = await getTodayStats();
    return Response.json({ success: true, data: stats });
  } catch (error) {
    console.error("Analytics today error:", error);
    return Response.json(
      { success: false, message: "Failed to fetch today's stats" },
      { status: 500 }
    );
  }
}
