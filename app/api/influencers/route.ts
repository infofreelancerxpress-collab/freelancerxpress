import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import {
  apiResponse,
  apiError,
  computeTotalFollowers,
  formatFollowers,
} from "@/lib/api-helpers";
import {
  createInfluencerSchema,
  influencerQuerySchema,
} from "@/lib/validations/influencer";
import { Prisma } from "@/lib/generated/prisma/client";

/**
 * GET /api/influencers
 * Public — List all influencers with advanced filtering, pagination, sorting.
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsed = influencerQuerySchema.safeParse(searchParams);

    if (!parsed.success) {
      return apiError("Invalid query parameters", 400, parsed.error.flatten().fieldErrors as Record<string, string[]>);
    }

    const {
      category,
      platform,
      minEngagement,
      minFollowers,
      maxFollowers,
      search,
      experienceLevel,
      verified,
      page,
      limit,
      sortBy,
      sortOrder,
    } = parsed.data;

    // Build where clause
    const where: Prisma.InfluencerWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (experienceLevel) {
      where.experienceLevel = experienceLevel;
    }

    if (verified !== undefined) {
      where.verified = verified;
    }

    if (minEngagement !== undefined) {
      where.engagementRate = { gte: minEngagement };
    }

    if (minFollowers !== undefined || maxFollowers !== undefined) {
      where.totalFollowers = {
        ...(minFollowers !== undefined && { gte: minFollowers }),
        ...(maxFollowers !== undefined && { lte: maxFollowers }),
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { username: { contains: search, mode: "insensitive" } },
        { bio: { contains: search, mode: "insensitive" } },
      ];
    }

    // Platform filter — search within the JSON column
    if (platform) {
      where.platforms = {
        array_contains: [{ name: platform }],
      };
    }

    // Build orderBy
    const orderByMap: Record<string, Prisma.InfluencerOrderByWithRelationInput> = {
      followers: { totalFollowers: sortOrder },
      engagement: { engagementRate: sortOrder },
      name: { name: sortOrder },
      createdAt: { createdAt: sortOrder },
    };

    const orderBy = orderByMap[sortBy] || { createdAt: "desc" };

    // Execute query with count
    const [influencers, total] = await Promise.all([
      prisma.influencer.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.influencer.count({ where }),
    ]);

    // Format response — add computed display fields
    const data = influencers.map((inf) => ({
      ...inf,
      stats: {
        totalReach: formatFollowers(inf.totalFollowers),
        engagementRate: `${inf.engagementRate}%`,
        followers: formatFollowers(inf.totalFollowers),
      },
      handle: inf.username.startsWith("@") ? inf.username : `@${inf.username}`,
      image: inf.profilePhoto,
      experience: inf.experienceLevel,
    }));

    return apiResponse({
      influencers: data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/influencers error:", error);
    return apiError("Failed to fetch influencers", 500);
  }
}

/**
 * POST /api/influencers
 * Admin only — Create a new influencer.
 */
export async function POST(req: NextRequest) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const body = await req.json();
    const parsed = createInfluencerSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const { platforms, portfolio, ...rest } = parsed.data;

    // Compute total followers from platforms
    const totalFollowers = computeTotalFollowers(platforms);

    const influencer = await prisma.influencer.create({
      data: {
        ...rest,
        platforms: platforms as unknown as Prisma.InputJsonValue,
        portfolio: portfolio as unknown as Prisma.InputJsonValue,
        totalFollowers,
      },
    });

    return apiResponse(influencer, 201);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("POST /api/influencers error:", error?.message || error);

    // Handle unique constraint violations
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const target = (error.meta?.target as string[]) || [];
      const field = target[0] || "field";
      return apiError(`An influencer with this ${field} already exists`, 409);
    }

    return apiError("Failed to create influencer", 500);
  }
}
