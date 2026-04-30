import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { apiResponse, apiError } from "@/lib/api-helpers";

/**
 * GET /api/admin/stats
 * Admin only — Dashboard statistics for the influencer marketplace.
 */
export async function GET() {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const [
      totalInfluencers,
      categoriesResult,
      engagementResult,
      totalInquiries,
      pendingInquiries,
      verifiedInfluencers,
      experienceLevels,
    ] = await Promise.all([
      prisma.influencer.count(),
      prisma.influencer.groupBy({
        by: ["category"],
        _count: true,
      }),
      prisma.influencer.aggregate({
        _avg: { engagementRate: true },
        _max: { engagementRate: true },
        _min: { engagementRate: true },
      }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "pending" } }),
      prisma.influencer.count({ where: { verified: true } }),
      prisma.influencer.groupBy({
        by: ["experienceLevel"],
        _count: true,
      }),
    ]);

    return apiResponse({
      totalInfluencers,
      totalCategories: categoriesResult.length,
      categories: categoriesResult.map((c) => ({
        name: c.category,
        count: c._count,
      })),
      averageEngagementRate: parseFloat(
        (engagementResult._avg.engagementRate || 0).toFixed(2)
      ),
      maxEngagementRate: engagementResult._max.engagementRate || 0,
      minEngagementRate: engagementResult._min.engagementRate || 0,
      totalInquiries,
      pendingInquiries,
      verifiedInfluencers,
      experienceLevels: experienceLevels.map((e) => ({
        level: e.experienceLevel,
        count: e._count,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return apiError("Failed to fetch statistics", 500);
  }
}
