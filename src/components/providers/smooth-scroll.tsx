"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setSmoothScroll } from "@/lib/smooth-scroll";

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. Shared through
 * `lib/smooth-scroll`, so links can cancel its easing before navigating and `RouteTransitions` can put
 * each new page at the top.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, anchors: true });
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    setSmoothScroll(lenis);

    return () => {
      gsap.ticker.remove(raf);
      setSmoothScroll(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
