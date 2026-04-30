import { auth } from "@/auth";
import { apiError } from "./api-helpers";

/**
 * Checks if the current request is from an authenticated admin.
 * Returns the session if authenticated, or a NextResponse error otherwise.
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return {
      authorized: false as const,
      response: apiError("Authentication required", 401),
    };
  }

  // The existing auth system only has Admin users via credentials
  // so any authenticated user is an admin
  return {
    authorized: true as const,
    session,
  };
}
