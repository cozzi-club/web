"use client";

import { useEffect, useRef } from "react";

/**
 * A fixed header that starts where it sits in the page (e.g. under the announcement banner) and
 * slides up to the top of the viewport as the page scrolls, so it never covers what's above it.
 * Its parent marks that starting spot.
 */
export function useFixedHeader() {
  const header = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = header.current!;
    let start = 0;
    const update = () => {
      // The header is zoomed (design frame), which scales its own `top` too: divide it back out.
      el.style.top = `calc(${Math.max(0, start - window.scrollY)}px / var(--zoom))`;
    };
    const measure = () => {
      start = el.parentElement!.getBoundingClientRect().top + window.scrollY;
      update();
    };
    measure();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", measure);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", measure);
    };
  }, []);

  return header;
}
