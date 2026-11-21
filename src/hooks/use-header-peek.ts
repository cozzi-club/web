"use client";

import { useEffect } from "react";
import { designPx } from "@/lib/design";

/** Design px from the top of the screen that bring a hidden header back, and that keep it shown. */
const EDGE = 24;
const HEADER = 80;

/**
 * While something hides the site header (`<html data-header="hidden">`, the About side-scroll), a
 * mouse near the very top of the screen brings it back (`<html data-header-peek>`). It stays while
 * the pointer is over the header's height, and goes again once it moves down or leaves the window.
 */
export function useHeaderPeek() {
  useEffect(() => {
    const root = document.documentElement;
    const peek = (on: boolean) => {
      if (on) root.dataset.headerPeek = "";
      else delete root.dataset.headerPeek;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const peeking = root.dataset.headerPeek !== undefined;
      const near = e.clientY < designPx(peeking ? HEADER : EDGE);
      if (near !== peeking) peek(near);
    };
    const onLeave = () => peek(false);

    addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("mouseleave", onLeave);
    return () => {
      removeEventListener("pointermove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      peek(false);
    };
  }, []);
}
