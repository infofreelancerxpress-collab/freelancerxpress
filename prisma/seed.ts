import "dotenv/config";
import prisma from "../lib/prisma";
import { initialTeamMembers } from "../data/team";
import bcrypt from "bcryptjs";

// Helper to parse follower strings to numbers
function parseFollowers(str: string): number {
  const cleaned = str.trim().toUpperCase();
  if (cleaned.endsWith("M")) return Math.round(parseFloat(cleaned.slice(0, -1)) * 1_000_000);
  if (cleaned.endsWith("K")) return Math.round(parseFloat(cleaned.slice(0, -1)) * 1_000);
  return parseInt(cleaned, 10) || 0;
}

function computeTotal(platforms: Array<{ followers: string }>): number {
  return platforms.reduce((sum, p) => sum + parseFollowers(p.followers), 0);
}

const influencerSeedData = [
  {
    name: "Sarah Jenkins", username: "@sarahstyle", email: "sarah@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60",
    category: "Fashion & Lifestyle", location: "New York, USA",
    bio: "Fashion enthusiast and lifestyle content creator sharing daily outfits, beauty tips, and travel adventures. Specializing in sustainable fashion and accessible luxury.",
    tags: ["Fashion", "Travel", "Beauty", "Sustainable"],
    priceRange: "$$ - $$$", experienceLevel: "Macro", verified: true, engagementRate: 4.5,
    platforms: [
      { name: "Instagram", handle: "@sarahstyle", followers: "150K", link: "#" },
      { name: "TikTok", handle: "@sarahstyle", followers: "320K", link: "#" },
    ],
  },
  {
    name: "David Chen", username: "@techdavid", email: "david@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60",
    category: "Tech & Gadgets", location: "San Francisco, USA",
    bio: "Tech reviewer and software engineer. I break down complex technology for everyone. Honest reviews of the latest gadgets, coding tutorials, and industry insights.",
    tags: ["Tech", "Reviews", "Coding", "Gadgets"],
    priceRange: "$$$ - $$$$", experienceLevel: "Macro", verified: true, engagementRate: 6.2,
    platforms: [
      { name: "YouTube", handle: "TechWithDavid", followers: "500K", link: "#" },
      { name: "Twitter", handle: "@techdavid", followers: "80K", link: "#" },
    ],
  },
  {
    name: "Emma Wilson", username: "@fitwithems", email: "emma@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60",
    category: "Fitness & Health", location: "London, UK",
    bio: "Certified personal trainer and nutritionist. Helping busy professionals stay fit and healthy with quick workouts and meal prep ideas.",
    tags: ["Fitness", "Health", "Nutrition", "Wellness"],
    priceRange: "$ - $$", experienceLevel: "Micro", verified: false, engagementRate: 8.1,
    platforms: [
      { name: "Instagram", handle: "@fitwithems", followers: "45K", link: "#" },
    ],
  },
  {
    name: "Marcus Johnson", username: "@marcus_eats", email: "marcus@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60",
    category: "Food & Dining", location: "Chicago, USA",
    bio: "Food explorer showing you the best hidden gems and street food across America. Lover of spicy food and desserts.",
    tags: ["Food", "Travel", "Restaurants", "Cooking"],
    priceRange: "$$$", experienceLevel: "Macro", verified: true, engagementRate: 5.8,
    platforms: [
      { name: "TikTok", handle: "@marcus_eats", followers: "850K", link: "#" },
      { name: "Instagram", handle: "@marcus_eats", followers: "120K", link: "#" },
    ],
  },
  {
    name: "Elena Rodriguez", username: "@elenabiz", email: "elena@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=60",
    category: "Business & Entrepreneurship", location: "Miami, USA",
    bio: "Startup founder and business consultant. Sharing tips on entrepreneurship, marketing strategy, and productivity.",
    tags: ["Business", "Marketing", "Startup", "Productivity"],
    priceRange: "$ - $$", experienceLevel: "Micro", verified: true, engagementRate: 3.5,
    platforms: [
      { name: "LinkedIn", handle: "Elena Rodriguez", followers: "25K", link: "#" },
      { name: "Twitter", handle: "@elenabiz", followers: "15K", link: "#" },
    ],
  },
  {
    name: "Jack Thompson", username: "@jackadventure", email: "jack@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60",
    category: "Travel & Adventure", location: "Sydney, Australia",
    bio: "Full-time traveler and filmmaker. Documenting the world's most beautiful destinations and cultures.",
    tags: ["Travel", "Photography", "Adventure", "Vlog"],
    priceRange: "$$$$$", experienceLevel: "Mega", verified: true, engagementRate: 7.0,
    platforms: [
      { name: "YouTube", handle: "JackAdventures", followers: "1.2M", link: "#" },
      { name: "Instagram", handle: "@jackadventure", followers: "600K", link: "#" },
    ],
  },
  {
    name: "Priya Sharma", username: "@priyagaming", email: "priya@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60",
    category: "Gaming", location: "Toronto, Canada",
    bio: "Competitive gamer and streamer. Playing FPS and strategy games with a focus on community building and esports commentary.",
    tags: ["Gaming", "Esports", "Streaming", "Community"],
    priceRange: "$$ - $$$", experienceLevel: "Macro", verified: true, engagementRate: 9.2,
    platforms: [
      { name: "YouTube", handle: "PriyaGames", followers: "280K", link: "#" },
      { name: "TikTok", handle: "@priyagaming", followers: "190K", link: "#" },
    ],
  },
  {
    name: "Olivia Park", username: "@oliviabeauty", email: "olivia@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=60",
    category: "Beauty & Makeup", location: "Los Angeles, USA",
    bio: "Licensed esthetician and makeup artist. Tutorials, product reviews, and skincare routines for every skin type.",
    tags: ["Beauty", "Makeup", "Skincare", "Tutorials"],
    priceRange: "$$$ - $$$$", experienceLevel: "Macro", verified: true, engagementRate: 5.4,
    platforms: [
      { name: "Instagram", handle: "@oliviabeauty", followers: "380K", link: "#" },
      { name: "YouTube", handle: "OliviaBeautyTV", followers: "220K", link: "#" },
    ],
  },
  {
    name: "Tom & Lisa Carter", username: "@carterparenting", email: "carters@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=60",
    category: "Parenting & Family", location: "Austin, USA",
    bio: "Parents of three sharing real, unfiltered family life. Tips on parenting, education, and maintaining work-life balance.",
    tags: ["Parenting", "Family", "Education", "Lifestyle"],
    priceRange: "$ - $$", experienceLevel: "Micro", verified: false, engagementRate: 6.8,
    platforms: [
      { name: "Instagram", handle: "@carterparenting", followers: "55K", link: "#" },
      { name: "TikTok", handle: "@carterparenting", followers: "72K", link: "#" },
    ],
  },
  {
    name: "Alex Rivera", username: "@alexfitpro", email: "alex@example.com",
    profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60",
    category: "Fitness & Health", location: "Miami, USA",
    bio: "CrossFit coach and nutrition expert. Helping people transform their bodies and mindset through functional fitness.",
    tags: ["Fitness", "CrossFit", "Nutrition", "Motivation"],
    priceRange: "$$", experienceLevel: "Nano", verified: false, engagementRate: 11.5,
    platforms: [
      { name: "Instagram", handle: "@alexfitpro", followers: "8K", link: "#" },
    ],
  },
];

async function main() {
  console.log("Start seeding ...");

  // Seed team members
  for (const member of initialTeamMembers) {
    const user = await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: {
        id: member.id, name: member.name, role: member.role, bio: member.bio,
        image: member.image, linkedin: member.linkedin, twitter: member.twitter,
        email: member.email, isActive: true,
      },
    });
    console.log(`Created team member: ${user.name}`);
  }

  // Seed admin
  const adminEmail = "admin@freelancerxpress.com";
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    await prisma.admin.create({ data: { email: adminEmail, password: hashedPassword, name: "Admin User" } });
    console.log(`Created admin user: ${adminEmail}`);
  } else {
    console.log("Admin user already exists.");
  }

  // Seed influencers
  console.log("Seeding influencers...");
  for (const inf of influencerSeedData) {
    const totalFollowers = computeTotal(inf.platforms);
    const existing = await prisma.influencer.findUnique({ where: { username: inf.username } });
    if (!existing) {
      await prisma.influencer.create({
        data: {
          name: inf.name, username: inf.username, email: inf.email,
          profilePhoto: inf.profilePhoto, category: inf.category,
          location: inf.location, bio: inf.bio, tags: inf.tags,
          priceRange: inf.priceRange, experienceLevel: inf.experienceLevel,
          verified: inf.verified, engagementRate: inf.engagementRate,
          platforms: inf.platforms, totalFollowers,
        },
      });
      console.log(`Created influencer: ${inf.name}`);
    } else {
      console.log(`Influencer ${inf.name} already exists.`);
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
