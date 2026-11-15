"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Parallax drift (design px) for collage pieces: base + order × step. Later pieces in a cluster drift
 * a little further, so they move slightly faster than the track — a small, smooth stagger.
 */
const DRIFT = { base: 50, step: 30 };

type Options = {
  /** Track size (px) in the design — the track is scaled so its height fills the viewport. */
  width: number;
  height: number;
};

/**
 * Pins `section` and scrolls `track` horizontally with the page scroll (md and up).
 * - `[data-stagger="<order>"]` children (collage pieces) get a smooth, staggered parallax drift.
 * - `[data-zoom="<scale>"]` children start zoomed in by `<scale>` and settle to 1 as their left edge
 *   reaches the left of the screen (their box clips the zoom).
 * Both move the piece's first child, so its box stays put for measuring.
 * - `[data-scroll-to="<x>"]` buttons scroll the page until design-x `<x>` is centred in the viewport.
 * - The site header slides away while the track is scrolling (`<html data-header="hidden">`).
 */
export function useHorizontalScroll({ width, height }: Options) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Desktop/tablet only — the mobile About is a separate vertical layout.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const el = track.current!;
        const root = document.documentElement;
        const scale = () => window.innerHeight / height;
        // Scale lives on the track's inner layer (CSS var) so it never fights the x tween.
        const applyScale = () => section.current!.style.setProperty("--track-scale", String(scale()));
        applyScale();
        const distance = () => Math.max(0, width * scale() - window.innerWidth);

        const toggleHeader = ({ progress }: ScrollTrigger) => {
          // A hair of slack: at the very top ScrollTrigger reports ~1e-7, not 0.
          root.dataset.header = progress > 0.001 && progress < 0.999 ? "hidden" : "";
        };

        const scroll = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefreshInit: applyScale,
            // Refresh too: measuring can leave a stale in-between state behind at the very top.
            onUpdate: toggleHeader,
            onRefresh: toggleHeader,
          },
        });

        // Parallax for collage pieces: one linear drift per piece for its whole time on screen, so its
        // speed never changes. It passes through its design position as it crosses the middle of the
        // viewport. Pieces the track never brings to the middle (the last cluster) settle into their
        // design position exactly as the track stops. The inner layer moves; its wrapper is the
        // trigger, so trigger positions aren't skewed by the offset.
        const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
        if (motion) {
          // Where a layer's left edge sits (in % of the viewport) once the track is fully scrolled.
          const finalLeft = (layer: HTMLElement) =>
            ((layer.offsetLeft * scale() - distance()) / window.innerWidth) * 100;
          const settlesAtEnd = (layer: HTMLElement) =>
            finalLeft(layer) + ((layer.offsetWidth * scale()) / window.innerWidth) * 50 > 50;

          el.querySelectorAll<HTMLElement>("[data-stagger]").forEach((layer) => {
            const drift = DRIFT.base + Number(layer.dataset.stagger) * DRIFT.step;
            gsap.fromTo(
              layer.firstElementChild,
              { x: drift },
              {
                x: () => (settlesAtEnd(layer) ? 0 : -drift),
                ease: "none",
                scrollTrigger: {
                  trigger: layer,
                  containerAnimation: scroll,
                  scrub: true,
                  start: "left right",
                  end: () => (settlesAtEnd(layer) ? `left ${finalLeft(layer)}%` : "right left"),
                  invalidateOnRefresh: true,
                },
              },
            );
          });

          el.querySelectorAll<HTMLElement>("[data-zoom]").forEach((layer) => {
            gsap.fromTo(
              layer.firstElementChild,
              { scale: Number(layer.dataset.zoom) },
              {
                scale: 1,
                ease: "none",
                // Measured from the side-scroll's start (the pinned section can't be its own trigger).
                scrollTrigger: {
                  start: () => scroll.scrollTrigger!.start,
                  end: () => scroll.scrollTrigger!.start + layer.offsetLeft * scale(),
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        }

        // Jump buttons: map a design x-position to the matching page scroll position.
        const onClick = (event: MouseEvent) => {
          const button = (event.target as HTMLElement).closest<HTMLElement>("[data-scroll-to]");
          const trigger = scroll.scrollTrigger;
          if (!button || !trigger) return;
          const x = Number(button.dataset.scrollTo) * scale() - window.innerWidth / 2;
          const progress = Math.min(1, Math.max(0, x / distance()));
          window.scrollTo({ top: trigger.start + progress * (trigger.end - trigger.start), behavior: "smooth" });
        };
        el.addEventListener("click", onClick);
        ScrollTrigger.refresh();

        return () => {
          el.removeEventListener("click", onClick);
          delete root.dataset.header;
        };
      });
    },
    { scope: section, dependencies: [width, height] },
  );

  return { section, track };
}
