import { NextRequest } from "next/server";
import { trackVisitor } from "@/lib/services/analytics";

/**
 * POST /api/analytics/track
 * Public endpoint — called by the client-side VisitorTracker component.
 */
export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    let path = "/";
    try {
      const body = await req.json();
      if (body?.path && typeof body.path === "string") {
        path = body.path;
      }
    } catch {
      // Body might be empty when sent via sendBeacon — that's fine
    }

    const tracked = await trackVisitor(ip, userAgent, path);

    return Response.json({ tracked }, { status: tracked ? 201 : 200 });
  } catch (error) {
    console.error("Analytics track error:", error);
    return Response.json({ tracked: false }, { status: 500 });
  }
}
