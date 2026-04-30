import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import {
  apiResponse,
  apiError,
  computeTotalFollowers,
  formatFollowers,
} from "@/lib/api-helpers";
import { updateInfluencerSchema } from "@/lib/validations/influencer";
import { Prisma } from "@/lib/generated/prisma/client";

/**
 * GET /api/influencers/[id]
 * Public — Get a single influencer by ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const influencer = await prisma.influencer.findUnique({
      where: { id },
      include: {
        _count: {
          select: { inquiries: true },
        },
      },
    });

    if (!influencer) {
      return apiError("Influencer not found", 404);
    }

    // Format for frontend compatibility
    const data = {
      ...influencer,
      stats: {
        totalReach: formatFollowers(influencer.totalFollowers),
        engagementRate: `${influencer.engagementRate}%`,
        followers: formatFollowers(influencer.totalFollowers),
      },
      handle: influencer.username.startsWith("@")
        ? influencer.username
        : `@${influencer.username}`,
      image: influencer.profilePhoto,
      experience: influencer.experienceLevel,
      inquiryCount: influencer._count.inquiries,
    };

    return apiResponse(data);
  } catch (error) {
    console.error("GET /api/influencers/[id] error:", error);
    return apiError("Failed to fetch influencer", 500);
  }
}

/**
 * PATCH /api/influencers/[id]
 * Admin only — Update an existing influencer.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const { id } = await params;

    // Check if influencer exists
    const existing = await prisma.influencer.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Influencer not found", 404);
    }

    const body = await req.json();
    const parsed = updateInfluencerSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const { platforms, ...rest } = parsed.data;

    // Recompute total followers if platforms changed
    const updateData: Prisma.InfluencerUpdateInput = { ...rest };

    if (platforms) {
      updateData.platforms = platforms as unknown as Prisma.InputJsonValue;
      updateData.totalFollowers = computeTotalFollowers(platforms);
    }

    const updated = await prisma.influencer.update({
      where: { id },
      data: updateData,
    });

    return apiResponse(updated);
  } catch (error: unknown) {
    console.error("PATCH /api/influencers/[id] error:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[]) || [];
      const field = target[0] || "field";
      return apiError(`An influencer with this ${field} already exists`, 409);
    }

    return apiError("Failed to update influencer", 500);
  }
}

/**
 * DELETE /api/influencers/[id]
 * Admin only — Delete an influencer (cascades to inquiries).
 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const { id } = await params;

    const existing = await prisma.influencer.findUnique({ where: { id } });
    if (!existing) {
      return apiError("Influencer not found", 404);
    }

    await prisma.influencer.delete({ where: { id } });

    return apiResponse({ message: "Influencer deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/influencers/[id] error:", error);
    return apiError("Failed to delete influencer", 500);
  }
}
