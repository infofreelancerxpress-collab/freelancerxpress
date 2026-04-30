import { z } from "zod";

// --- Platform sub-schema ---
const platformSchema = z.object({
  name: z.enum(["Instagram", "YouTube", "TikTok", "Twitter", "LinkedIn"]),
  handle: z.string().min(1, "Platform handle is required"),
  followers: z.string().min(1, "Followers count is required"),
  link: z.string().default("#"),
});

// --- Portfolio sub-schema ---
const portfolioSchema = z.object({
  type: z.enum(["image", "youtube"]),
  url: z.string().url("Invalid URL"),
});

// --- Create Influencer ---
export const createInfluencerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .regex(/^@?[\w.]+$/, "Invalid username format"),
  email: z.string().email("Invalid email address"),
  profilePhoto: z.string().url("Invalid profile photo URL"),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(1, "Location is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  priceRange: z.string().min(1, "Price range is required"),
  experienceLevel: z.enum(["Nano", "Micro", "Macro", "Mega"], {
    message: "Experience level must be Nano, Micro, Macro, or Mega",
  }),
  verified: z.boolean().default(false),
  engagementRate: z
    .number()
    .min(0, "Engagement rate must be positive")
    .max(100, "Engagement rate cannot exceed 100"),
  platforms: z
    .array(platformSchema)
    .min(1, "At least one platform is required"),
  portfolio: z.array(portfolioSchema).default([]),
});

export type CreateInfluencerInput = z.infer<typeof createInfluencerSchema>;

// --- Update Influencer (all fields optional) ---
export const updateInfluencerSchema = createInfluencerSchema.partial();

export type UpdateInfluencerInput = z.infer<typeof updateInfluencerSchema>;

// --- Query params for listing ---
export const influencerQuerySchema = z.object({
  category: z.string().optional(),
  platform: z.string().optional(),
  minEngagement: z.coerce.number().min(0).optional(),
  minFollowers: z.coerce.number().min(0).optional(),
  maxFollowers: z.coerce.number().min(0).optional(),
  search: z.string().optional(),
  experienceLevel: z.string().optional(),
  verified: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  sortBy: z.enum(["followers", "engagement", "name", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type InfluencerQueryInput = z.infer<typeof influencerQuerySchema>;
