import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { fullName, email, phone, service, message } = result.data;

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
      subject: `New Contact Message – ${service}`,
      html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; line-height: 1.6;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                    FreelancerXpress
                  </h1>
                  <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                    New Contact Message Received
                  </p>
                </td>
              </tr>
              
              <!-- Service Badge -->
              <tr>
                <td style="padding: 30px 30px 20px;">
                  <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-left: 4px solid #667eea; padding: 12px 20px; border-radius: 8px; margin-bottom: 30px;">
                    <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Service Requested
                    </p>
                    <p style="margin: 5px 0 0; color: #18181b; font-size: 18px; font-weight: 700;">
                      ${service}
                    </p>
                  </div>
                </td>
              </tr>
              
              <!-- Contact Details -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    
                    <!-- Name -->
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #e4e4e7;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="vertical-align: top;">
                              <p style="margin: 0; color: #71717a; font-size: 14px; font-weight: 600;">
                                👤 Full Name
                              </p>
                            </td>
                            <td style="vertical-align: top;">
                              <p style="margin: 0; color: #18181b; font-size: 15px; font-weight: 500;">
                                ${fullName}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Email -->
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #e4e4e7;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="vertical-align: top;">
                              <p style="margin: 0; color: #71717a; font-size: 14px; font-weight: 600;">
                                📧 Email
                              </p>
                            </td>
                            <td style="vertical-align: top;">
                              <p style="margin: 0;">
                                <a href="mailto:${email}" style="color: #667eea; font-size: 15px; font-weight: 500; text-decoration: none;">
                                  ${email}
                                </a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Phone -->
                    <tr>
                      <td style="padding: 15px 0; border-bottom: 1px solid #e4e4e7;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="140" style="vertical-align: top;">
                              <p style="margin: 0; color: #71717a; font-size: 14px; font-weight: 600;">
                                📱 Phone
                              </p>
                            </td>
                            <td style="vertical-align: top;">
                              <p style="margin: 0; color: #18181b; font-size: 15px; font-weight: 500;">
                                ${phone || "Not provided"}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    
                    <!-- Message -->
                    <tr>
                      <td style="padding: 20px 0 0;">
                        <p style="margin: 0 0 10px; color: #71717a; font-size: 14px; font-weight: 600;">
                          💬 Message
                        </p>
                        <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; margin-top: 10px;">
                          <p style="margin: 0; color: #18181b; font-size: 15px; line-height: 1.6; word-wrap: break-word; overflow-wrap: break-word;">
                            ${message}
                          </p>
                        </div>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>
              
              <!-- Quick Action Button -->
              <tr>
                <td style="padding: 0 30px 30px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                          Reply to ${fullName.split(" ")[0]}
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #fafafa; padding: 25px 30px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; color: #71717a; font-size: 13px; text-align: center; line-height: 1.5;">
                    This message was sent from your FreelancerXpress contact form<br>
                    <span style="color: #a1a1aa;">Received on ${new Date().toLocaleString(
                      "en-US",
                      {
                        dateStyle: "full",
                        timeStyle: "short",
                      },
                    )}</span>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Email failed" },
      { status: 500 },
    );
  }
}
