"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { designPx } from "@/lib/design";

type ParallaxProps = ComponentProps<"div"> & {
  /** Design px moved over the scroll range. Positive drifts up, negative drifts down. */
  distance: number;
  /**
   * "center": rests at its design position mid-viewport (content further down the page).
   * "top": rests at its design position at scroll 0 (above-the-fold content).
   */
  anchor?: "center" | "top";
};

/** Scroll-linked vertical drift. Disabled for prefers-reduced-motion. */
export function Parallax({ distance, anchor = "center", ...props }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: ref.current, scrub: true, end: "bottom top" };
        if (anchor === "top") {
          gsap.to(ref.current, { y: () => -designPx(distance), ease: "none", scrollTrigger: { ...scrollTrigger, start: "top top" } });
        } else {
          gsap.fromTo(
            ref.current,
            { y: () => designPx(distance / 2) },
            { y: () => -designPx(distance / 2), ease: "none", scrollTrigger: { ...scrollTrigger, start: "top bottom" } },
          );
        }
      });
    },
    { dependencies: [distance, anchor] },
  );

  return <div ref={ref} {...props} />;
}
