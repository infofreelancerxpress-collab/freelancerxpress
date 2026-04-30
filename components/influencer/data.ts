export interface Influencer {
    id: string;
    name: string;
    handle: string;
    image: string;
    category: string;
    location: string;
    platforms: Platform[];
    stats: {
        totalReach: string;
        engagementRate: string;
        followers: string;
    };
    bio: string;
    tags: string[];
    priceRange: string;
    experience: "Nano" | "Micro" | "Macro" | "Mega";
    verified: boolean;
    portfolio?: {
        type: 'image' | 'youtube';
        url: string;
    }[];
}

export type PlatformType = "Instagram" | "YouTube" | "TikTok" | "Twitter" | "LinkedIn";

export interface Platform {
    name: PlatformType;
    handle: string;
    followers: string;
    link: string;
}

export const categories = [
    "All Categories",
    "Fashion & Lifestyle",
    "Tech & Gadgets",
    "Fitness & Health",
    "Food & Dining",
    "Business & Entrepreneurship",
    "Travel & Adventure",
    "Gaming",
    "Beauty & Makeup",
    "Parenting & Family"
];
