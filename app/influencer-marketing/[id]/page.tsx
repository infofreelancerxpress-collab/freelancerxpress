import { notFound } from "next/navigation";
import { influencers } from "@/components/influencer/data";
import { InfluencerProfile } from "@/components/influencer/InfluencerProfile";
import { Metadata } from "next";

// This is required for static site generation with dynamic routes
export async function generateStaticParams() {
    return influencers.map((influencer) => ({
        id: influencer.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const influencer = influencers.find((i) => i.id === id);

    if (!influencer) {
        return {
            title: "Influencer Not Found",
        };
    }

    return {
        title: `${influencer.name} - Influencer Profile`,
        description: influencer.bio.substring(0, 160),
    };
}

export default async function InfluencerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const influencer = influencers.find((i) => i.id === id);

    if (!influencer) {
        notFound();
    }

    return <InfluencerProfile influencer={influencer} />;
}
