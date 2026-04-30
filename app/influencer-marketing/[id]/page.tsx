import { notFound } from "next/navigation";
import { InfluencerProfile } from "@/components/influencer/InfluencerProfile";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { formatFollowers } from "@/lib/api-helpers";
import type { Influencer } from "@/components/influencer/data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const influencer = await prisma.influencer.findUnique({ where: { id }, select: { name: true, bio: true } });

    if (!influencer) {
        return { title: "Influencer Not Found" };
    }

    return {
        title: `${influencer.name} - Influencer Profile`,
        description: influencer.bio.substring(0, 160),
    };
}

export default async function InfluencerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const dbInfluencer = await prisma.influencer.findUnique({ where: { id } });

    if (!dbInfluencer) {
        notFound();
    }

    // Transform DB record to frontend Influencer type
    const platforms = Array.isArray(dbInfluencer.platforms)
        ? (dbInfluencer.platforms as Array<{ name: string; handle: string; followers: string; link: string }>)
        : [];

    const influencer: Influencer = {
        id: dbInfluencer.id,
        name: dbInfluencer.name,
        handle: dbInfluencer.username.startsWith("@") ? dbInfluencer.username : `@${dbInfluencer.username}`,
        image: dbInfluencer.profilePhoto,
        category: dbInfluencer.category,
        location: dbInfluencer.location,
        platforms: platforms.map(p => ({
            name: p.name as Influencer["platforms"][0]["name"],
            handle: p.handle,
            followers: p.followers,
            link: p.link || "#",
        })),
        stats: {
            totalReach: formatFollowers(dbInfluencer.totalFollowers),
            engagementRate: `${dbInfluencer.engagementRate}%`,
            followers: formatFollowers(dbInfluencer.totalFollowers),
        },
        bio: dbInfluencer.bio,
        tags: dbInfluencer.tags,
        priceRange: dbInfluencer.priceRange,
        experience: dbInfluencer.experienceLevel as Influencer["experience"],
        verified: dbInfluencer.verified,
        portfolio: Array.isArray(dbInfluencer.portfolio) 
            ? (dbInfluencer.portfolio as Array<{ type: 'image' | 'youtube'; url: string }>)
            : [],
    };

    return <InfluencerProfile influencer={influencer} />;
}
