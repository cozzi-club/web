"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

// Figma "Group 2480" (design px): espresso arch with the photo masked 5.40 / 6.51px inside it.
export const ARCH = { w: 241.79, h: 291.83, insetX: 5.4, insetY: 6.51 };
// Horizontal focal point of the jebena photo (the vase), used for the arch crop.
export const ARCH_FOCUS_X = 0.92;

const inset = (t: number, r: number, b: number, l: number, radius: number) =>
  `inset(${t}px ${r}px ${b}px ${l}px round ${radius}px ${radius}px 0px 0px)`;
const FULL = inset(0, 0, 0, 0, 0);

/**
 * Scroll-scrubbed arch ("the door") → full-screen jebena → "Inside story, if you will" (md+, motion
 * allowed). The original version, as requested in Figma:
 * 1. Two clip-paths open from the arch's shape to the viewport — the espresso frame, then the
 *    photo window inside it — while the photo scales from the arch crop (fit to height, framed on
 *    the vase) to covering the screen. Starts as soon as the arch peeks in (its top at the
 *    viewport bottom) and finishes with the section pinned.
 * 2. The copy rises in word by word (`[data-word]` spans inside overflow masks), then the button.
 * The section is shorter than the screen (Figma spacing), so it pins centred, like the original
 * full-screen version, instead of with the heading jammed under the nav; the stage is moved up by
 * the same offset so it still covers the screen. `arch` is the static arch, used to measure.
 */
export function useArchReveal() {
  const section = useRef<HTMLElement>(null);
  const arch = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const photoWindow = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const cta = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        // Space above (and below) the section when it's pinned centred on the screen.
        const offset = () => Math.max(0, (innerHeight - section.current!.offsetHeight) / 2);
        const place = () => gsap.set(stage.current, { top: -offset() });
        place();

        // Arch geometry in px relative to the (full-viewport) stage. Pinning moves both together.
        const measure = () => {
          const s = stage.current!.getBoundingClientRect();
          const a = arch.current!.getBoundingClientRect();
          const k = a.width / ARCH.w; // current zoom
          const ix = ARCH.insetX * k;
          const iy = ARCH.insetY * k;
          const top = a.top - s.top;
          const left = a.left - s.left;
          const right = s.width - left - a.width;
          const bottom = s.height - top - a.height;
          const p = photo.current!;
          // Start: photo fit to the window's height, shifted like `object-position: FOCUS 50%`.
          const scale = (a.height - 2 * iy) / p.offsetHeight;
          const windowW = a.width - 2 * ix;
          const focus = (windowW - p.offsetWidth * scale) * (ARCH_FOCUS_X - 0.5);
          return {
            frame: inset(top, right, bottom, left, a.width / 2),
            window: inset(top + iy, right + ix, bottom + iy, left + ix, a.width / 2 - ix),
            scale,
            x: left + a.width / 2 - s.width / 2 + focus,
            y: top + a.height / 2 - s.height / 2,
          };
        };
        let geometry = measure();

        const words = copy.current!.querySelectorAll("[data-word]");
        gsap.set(stage.current, { visibility: "visible" });
        // Start from clean layers: a hot reload can leave inline geometry from an earlier version.
        gsap.set([frame.current, photoWindow.current, photo.current], { clearProps: "all" });
        gsap.set(photo.current, { xPercent: -50, yPercent: -50 });
        // Set every word's start explicitly: a staggered fromTo deep in a scrubbed timeline only
        // renders its first word's "from" state up front. `y: 0` clears any pixel offset GSAP cached
        // from an earlier run (React Strict Mode mounts twice in dev), which would park the words
        // below their masks.
        gsap.set(words, { y: 0, yPercent: 110 });

        // Pin first, so the reveal trigger below is measured with the pin spacing in place.
        const pin = ScrollTrigger.create({
          trigger: section.current,
          start: () => `top ${offset()}px`,
          end: "+=220%",
          pin: true,
          invalidateOnRefresh: true,
        });

        gsap
          .timeline({
            defaults: { ease: "power1.inOut" },
            scrollTrigger: {
              trigger: arch.current,
              start: "top bottom",
              end: () => pin.end,
              scrub: true,
              invalidateOnRefresh: true,
              onRefreshInit: () => {
                place();
                geometry = measure();
              },
            },
          })
          // Durations are roughly "screens of scroll": ~0.8 before the pin + 2.2 pinned.
          .fromTo(frame.current, { clipPath: () => geometry.frame }, { clipPath: FULL, duration: 1.9 }, 0)
          .fromTo(photoWindow.current, { clipPath: () => geometry.window }, { clipPath: FULL, duration: 1.9 }, 0)
          .fromTo(
            photo.current,
            { scale: () => geometry.scale, x: () => geometry.x, y: () => geometry.y },
            { scale: 1, x: 0, y: 0, duration: 1.9 },
            0,
          )
          .fromTo(words, { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, ease: "power3.out", duration: 0.35, stagger: { amount: 0.4 } }, 1.95)
          .fromTo(cta.current, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.25 }, 2.5)
          // Hold the finished view for a beat before the pin releases.
          .to({}, { duration: 0.25 });
      });
    },
    { scope: section },
  );

  return { section, arch, stage, frame, photoWindow, photo, copy, cta };
}
