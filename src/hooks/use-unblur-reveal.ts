"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Word unblur: from blurred, transparent and slightly low to sharp, one word after another. */
export const UNBLUR_FROM = { filter: "blur(12px)", opacity: 0, yPercent: 25 };
export const UNBLUR_TO = { filter: "blur(0px)", opacity: 1, yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.08 };

/**
 * Words (`[data-word]` inside the returned ref) come into focus as they scroll into view: from
 * blurred, transparent and slightly low to sharp, one after another. Plays once per pass (reverses
 * when scrolled back above). Static for reduced motion.
 */
export function useUnblurReveal<T extends HTMLElement>() {
  const root = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(root.current!.querySelectorAll("[data-word]"), UNBLUR_FROM, {
          ...UNBLUR_TO,
          scrollTrigger: { trigger: root.current, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return root;
}
