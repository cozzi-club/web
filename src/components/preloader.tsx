"use client";

import { usePreloader } from "@/hooks/use-preloader";

/**
 * First-visit preloader (`usePreloader`): on ink, a thin gold arch line draws itself while
 * "Opening 0–100%" counts up near the bottom; then the text and arch blur out and the dark
 * screen splits down the middle and slides open like doors onto the site. Home page only, once per
 * visit (tab session).
 */
export function Preloader() {
  const { line, counter, label, left, right, show } = usePreloader();
  if (!show) return null;

  return (
    <div aria-hidden data-lenis-prevent className="preloader fixed inset-0 z-[60] text-parchment motion-reduce:hidden">
      {/* The doors: two dark halves that slide apart (1px overlap, so no seam shows while closed). */}
      <div ref={left} className="absolute inset-y-0 left-0 w-[calc(50%+1px)] bg-ink" />
      <div ref={right} className="absolute inset-y-0 right-0 w-[calc(50%+1px)] bg-ink" />

      <div className="absolute inset-0">
        {/* Viewport-sized SVG: the hook sets the arch path in screen px. */}
        <svg className="absolute inset-0 size-full overflow-visible">
          <defs>
            <linearGradient id="preloader-line" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-bone)" />
              <stop offset="55%" stopColor="var(--color-sand)" />
              <stop offset="100%" stopColor="var(--color-caramel)" />
            </linearGradient>
          </defs>
          <path ref={line} fill="none" stroke="url(#preloader-line)" strokeWidth={1.25} />
        </svg>

        <div
          ref={label}
          className="absolute inset-x-0 top-[86%] text-center font-sans text-[calc(11*var(--u))] leading-none font-normal tracking-[0.2em] text-sand uppercase tabular-nums max-md:text-[11px]"
        >
          Opening <span ref={counter}>0</span>%
        </div>

      </div>
    </div>
  );
}
