"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PRELOADER_OPEN, preloaderWillPlay } from "@/lib/preloader";
import { UNBLUR_FROM, UNBLUR_TO } from "@/hooks/use-unblur-reveal";

/**
 * Page-intro unblur for copy that's on screen at load (the hero headline): words (`[data-word]`)
 * come into focus as the preloader's doors open (PRELOADER_OPEN), or straight away when there's no
 * preloader (already played this visit, or another page first). The hidden start is set in CSS
 * (`[data-intro-unblur]` in globals.css), so nothing flashes before hydration. Static for reduced motion.
 */
export function useIntroUnblur<T extends HTMLElement>() {
  const root = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        // Named `context.add`: the tween joins this media query's context even when it starts later
        // (on the event), so it's reverted with it.
        const play = context.add("play", () => {
          gsap.fromTo(root.current!.querySelectorAll("[data-word]"), UNBLUR_FROM, { ...UNBLUR_TO, stagger: 0.06 });
        }) as () => void;
        if (!preloaderWillPlay()) return void play();
        window.addEventListener(PRELOADER_OPEN, play, { once: true });
        return () => window.removeEventListener(PRELOADER_OPEN, play);
      });
    },
    { scope: root },
  );

  return root;
}
