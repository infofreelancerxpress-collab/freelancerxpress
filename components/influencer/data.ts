import { 
    Instagram, 
    Youtube, 
    Twitter, 
    Linkedin 
} from "lucide-react";

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
}

export type PlatformType = "Instagram" | "YouTube" | "TikTok" | "Twitter" | "LinkedIn";

export interface Platform {
    name: PlatformType;
    handle: string;
    followers: string;
    link: string;
}

export const influencers: Influencer[] = [
    {
        id: "1",
        name: "Sarah Jenkins",
        handle: "@sarahstyle",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Fashion & Lifestyle",
        location: "New York, USA",
        platforms: [
            { name: "Instagram", handle: "@sarahstyle", followers: "150K", link: "#" },
            { name: "TikTok", handle: "@sarahstyle", followers: "320K", link: "#" }
        ],
        stats: {
            totalReach: "470K",
            engagementRate: "4.5%",
            followers: "470K"
        },
        bio: "Fashion enthusiast and lifestyle content creator sharing daily outfits, beauty tips, and travel adventures. Specializing in sustainable fashion and accessible luxury.",
        tags: ["Fashion", "Travel", "Beauty", "Sustainable"],
        priceRange: "$$ - $$$",
        experience: "Macro",
        verified: true
    },
    {
        id: "2",
        name: "David Chen",
        handle: "@techdavid",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Tech & Gadgets",
        location: "San Francisco, USA",
        platforms: [
            { name: "YouTube", handle: "TechWithDavid", followers: "500K", link: "#" },
            { name: "Twitter", handle: "@techdavid", followers: "80K", link: "#" }
        ],
        stats: {
            totalReach: "580K",
            engagementRate: "6.2%",
            followers: "580K"
        },
        bio: "Tech reviewer and software engineer. I break down complex technology for everyone. Honest reviews of the latest gadgets, coding tutorials, and industry insights.",
        tags: ["Tech", "Reviews", "Coding", "Gadgets"],
        priceRange: "$$$ - $$$$",
        experience: "Macro",
        verified: true
    },
    {
        id: "3",
        name: "Emma Wilson",
        handle: "@fitwithems",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Fitness & Health",
        location: "London, UK",
        platforms: [
            { name: "Instagram", handle: "@fitwithems", followers: "45K", link: "#" }
        ],
        stats: {
            totalReach: "45K",
            engagementRate: "8.1%",
            followers: "45K"
        },
        bio: "Certified personal trainer and nutritionist. Helping busy professionals stay fit and healthy with quick workouts and meal prep ideas.",
        tags: ["Fitness", "Health", "Nutrition", "Wellness"],
        priceRange: "$ - $$",
        experience: "Micro",
        verified: false
    },
    {
        id: "4",
        name: "Marcus Johnson",
        handle: "@marcus_eats",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Food & Dining",
        location: "Chicago, USA",
        platforms: [
            { name: "TikTok", handle: "@marcus_eats", followers: "850K", link: "#" },
            { name: "Instagram", handle: "@marcus_eats", followers: "120K", link: "#" }
        ],
        stats: {
            totalReach: "970K",
            engagementRate: "5.8%",
            followers: "970K"
        },
        bio: "Food explorer showing you the best hidden gems and street food across America. Lover of spicy food and desserts.",
        tags: ["Food", "Travel", "Restaurants", "Cooking"],
        priceRange: "$$$",
        experience: "Macro",
        verified: true
    },
    {
        id: "5",
        name: "Elena Rodriguez",
        handle: "@elenabiz",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Business & Entrepreneurship",
        location: "Miami, USA",
        platforms: [
            { name: "LinkedIn", handle: "Elena Rodriguez", followers: "25K", link: "#" },
            { name: "Twitter", handle: "@elenabiz", followers: "15K", link: "#" }
        ],
        stats: {
            totalReach: "40K",
            engagementRate: "3.5%",
            followers: "40K"
        },
        bio: "Startup founder and business consultant. Sharing tips on entrepreneurship, marketing strategy, and productivity.",
        tags: ["Business", "Marketing", "Startup", "Productivity"],
        priceRange: "$ - $$",
        experience: "Micro",
        verified: true
    },
    {
        id: "6",
        name: "Jack Thompson",
        handle: "@jackadventure",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        category: "Travel & Adventure",
        location: "Sydney, Australia",
        platforms: [
            { name: "YouTube", handle: "JackAdventures", followers: "1.2M", link: "#" },
            { name: "Instagram", handle: "@jackadventure", followers: "600K", link: "#" }
        ],
        stats: {
            totalReach: "1.8M",
            engagementRate: "7.0%",
            followers: "1.8M"
        },
        bio: "Full-time traveler and filmmaker. Documenting the world's most beautiful destinations and cultures.",
        tags: ["Travel", "Photography", "Adventure", "Vlog"],
        priceRange: "$$$$$",
        experience: "Mega",
        verified: true
    }
];

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
