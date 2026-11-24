"use client";

import { useEffect } from "react";
import { openWaitlist, WAITLIST_SHOWN } from "@/hooks/use-waitlist-dialog";
import { PRELOADER_OPEN, preloaderWillPlay } from "@/lib/preloader";

/** Delay after the landing page is ready (preloader doors opening, or the page loaded). */
const DELAY = 5000;

const shownThisVisit = () => {
  try {
    return sessionStorage.getItem(WAITLIST_SHOWN) !== null;
  } catch {
    return false;
  }
};

/**
 * Landing page: opens the waitlist sheet 5s after the page is ready, once per visit (tab session).
 * Ready = the preloader's doors opening when it plays, otherwise the window's load. Skipped when the
 * sheet was already shown this visit (opened from the banner, Shop, or automatically).
 */
export function useWaitlistAutoOpen() {
  useEffect(() => {
    if (shownThisVisit()) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      timer = setTimeout(() => {
        if (!shownThisVisit()) openWaitlist();
      }, DELAY);
    };

    const readyEvent = preloaderWillPlay() ? PRELOADER_OPEN : document.readyState === "complete" ? null : "load";
    if (readyEvent) addEventListener(readyEvent, start, { once: true });
    else start();

    return () => {
      if (readyEvent) removeEventListener(readyEvent, start);
      clearTimeout(timer);
    };
  }, []);
}
