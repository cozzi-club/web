"use client";

import { useTransitionRouter } from "next-view-transitions";
import type { MouseEvent } from "react";
import { CURVE_DURATION, CURVE_EASE, curvedClip } from "@/lib/curved-clip";

/**
 * Curved wipe (View Transitions API): the new page rises from the bottom behind a curved top edge
 * that bulges mid-way and flattens as it covers the screen, while the old page drifts up and dims.
 */
function curveReveal() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const edge = (y: number, bulge: number) => curvedClip(w, h, y, bulge, "below");
  const timing = { duration: CURVE_DURATION, easing: CURVE_EASE };

  document.documentElement.animate(
    { clipPath: [edge(h, 0), edge(h * 0.45, h * 0.3), edge(0, 0)] },
    { ...timing, pseudoElement: "::view-transition-new(root)" },
  );
  document.documentElement.animate(
    { transform: ["translateY(0)", "translateY(-25%)"], filter: ["brightness(1)", "brightness(0.4)"] },
    { ...timing, pseudoElement: "::view-transition-old(root)" },
  );
}

/** A click handler for links: in-site navigations to another page play the curved wipe. */
export function usePageTransition() {
  const router = useTransitionRouter();

  return (event: MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    // Leave the browser in charge of new tabs, downloads and modified clicks.
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== "_self") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const url = new URL(link.href, window.location.href);
    // Other sites, mailto:/tel:, and anchors on the current page navigate normally.
    if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;

    event.preventDefault();
    router.push(url.pathname + url.search + url.hash, { onTransitionReady: curveReveal });
  };
}
