"use client";

import { useEffect } from "react";

/**
 * Invisible client component that sends a single tracking beacon
 * once per browser session. Uses sendBeacon for non-blocking delivery.
 */
export function VisitorTracker() {
  useEffect(() => {
    // Guard: only track once per session
    const key = "fxp_tracked";
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(key)) return;

    const payload = JSON.stringify({ path: window.location.pathname });

    // sendBeacon is fire-and-forget and doesn't block navigation
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(
        "/api/analytics/track",
        new Blob([payload], { type: "application/json" })
      );
      if (sent) {
        sessionStorage.setItem(key, "1");
        return;
      }
    }

    // Fallback to fetch
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    })
      .then(() => sessionStorage.setItem(key, "1"))
      .catch(() => {
        /* Silently fail — analytics should never break the app */
      });
  }, []);

  return null; // No UI
}
