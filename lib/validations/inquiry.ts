import { z } from "zod";

export const createInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  influencerId: z.string().min(1, "Influencer ID is required"),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
