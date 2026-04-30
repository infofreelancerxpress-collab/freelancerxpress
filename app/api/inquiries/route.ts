import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-guard";
import { apiResponse, apiError } from "@/lib/api-helpers";
import { createInquirySchema } from "@/lib/validations/inquiry";
import nodemailer from "nodemailer";

/**
 * POST /api/inquiries
 * Public — Submit an inquiry about an influencer.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createInquirySchema.safeParse(body);

    if (!parsed.success) {
      return apiError(
        "Validation failed",
        400,
        parsed.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const { name, email, message, influencerId } = parsed.data;

    // Verify influencer exists
    const influencer = await prisma.influencer.findUnique({
      where: { id: influencerId },
      select: { id: true, name: true, username: true, email: true },
    });

    if (!influencer) {
      return apiError("Influencer not found", 404);
    }

    // Create the inquiry
    const inquiry = await prisma.inquiry.create({
      data: { name, email, message, influencerId },
    });

    // Send email notification (non-blocking — don't fail the request if email fails)
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"FreelancerXpress" <${process.env.EMAIL_USER}>`,
        to: "Infofreelancerxpress@gmail.com",
        replyTo: email,
        subject: `New Influencer Inquiry – ${influencer.name}`,
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Influencer Inquiry</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                    FreelancerXpress
                  </h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                    New Influencer Inquiry Received
                  </p>
                </td>
              </tr>
              
              <!-- Influencer Badge -->
              <tr>
                <td style="padding: 30px 30px 20px;">
                  <div style="background: linear-gradient(135deg, #6366f115 0%, #8b5cf615 100%); border-left: 4px solid #6366f1; padding: 12px 20px; border-radius: 8px;">
                    <p style="margin: 0; color: #6366f1; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Influencer
                    </p>
                    <p style="margin: 5px 0 0; color: #18181b; font-size: 18px; font-weight: 700;">
                      ${influencer.name} (${influencer.username})
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Contact Details -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #e4e4e7;">
                        <p style="margin: 0; color: #71717a; font-size: 14px; font-weight: 600;">👤 From</p>
                        <p style="margin: 5px 0 0; color: #18181b; font-size: 15px; font-weight: 500;">${name}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #e4e4e7;">
                        <p style="margin: 0; color: #71717a; font-size: 14px; font-weight: 600;">📧 Email</p>
                        <p style="margin: 5px 0 0;"><a href="mailto:${email}" style="color: #6366f1; font-size: 15px; font-weight: 500; text-decoration: none;">${email}</a></p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 0 0;">
                        <p style="margin: 0; color: #71717a; font-size: 14px; font-weight: 600;">💬 Message</p>
                        <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; margin-top: 10px;">
                          <p style="margin: 0; color: #18181b; font-size: 15px; line-height: 1.6; word-wrap: break-word;">${message}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Reply Button -->
              <tr>
                <td style="padding: 0 30px 30px;" align="center">
                  <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                    Reply to ${name.split(" ")[0]}
                  </a>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #fafafa; padding: 25px 30px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; color: #71717a; font-size: 13px; text-align: center;">
                    This inquiry was submitted via the Influencer Marketplace<br>
                    <span style="color: #a1a1aa;">Received on ${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</span>
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
        `,
      });
    } catch (emailError) {
      // Log but don't fail the request
      console.error("Email notification failed:", emailError);
    }

    return apiResponse(inquiry, 201);
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return apiError("Failed to submit inquiry", 500);
  }
}

/**
 * GET /api/inquiries
 * Admin only — List all inquiries with influencer info.
 */
export async function GET(req: NextRequest) {
  try {
    const authResult = await requireAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const searchParams = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20")));
    const status = searchParams.get("status") || undefined;

    const where = status ? { status } : {};

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: {
          influencer: {
            select: { id: true, name: true, username: true, profilePhoto: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.inquiry.count({ where }),
    ]);

    return apiResponse({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/inquiries error:", error);
    return apiError("Failed to fetch inquiries", 500);
  }
}
