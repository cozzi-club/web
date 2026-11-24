"use client";

import { useWaitlistAutoOpen } from "@/hooks/use-waitlist-auto-open";

/** Landing page only: opens the waitlist sheet once per visit, 5s after the page is ready. */
export function WaitlistAutoOpen() {
  useWaitlistAutoOpen();
  return null;
}
