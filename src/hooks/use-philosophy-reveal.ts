"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-scrubbed "Less is more" reveal (md+, motion allowed). The section pins while the heading
 * fills in word by word (50% → full ink) and the photos fade and rise into place one at a time,
 * in DOM order, overlapping the copy and finishing just after it.
 * `words` holds the heading's word spans; `photos` is the parent of the photo wrappers.
 */
export function usePhilosophyReveal() {
  const section = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const photos = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const words = heading.current!.querySelectorAll("[data-word]");
        const images = photos.current!.children;

        gsap
          .timeline({
            // Pin with the section's centre on the viewport's: when the scaled frame is taller than
            // the screen (e.g. 813px × 1.5 at 1920), the copy still sits mid-screen.
            scrollTrigger: { trigger: section.current, start: "center center", end: "+=150%", pin: true, scrub: true },
          })
          // Durations are in "copy lengths": the words fill over 0 → 1, the photos over 0.15 → 1.3.
          .fromTo(words, { opacity: 0.5 }, { opacity: 1, ease: "none", stagger: { amount: 0.9 }, duration: 0.1 }, 0)
          .fromTo(
            images,
            { autoAlpha: 0, y: 32 },
            { autoAlpha: 1, y: 0, ease: "power2.out", stagger: { amount: 0.95 }, duration: 0.2 },
            0.15,
          )
          // Hold the finished composition for a beat before the pin releases.
          .to({}, { duration: 0.2 });
      });
    },
    { scope: section },
  );

  return { section, heading, photos };
}
