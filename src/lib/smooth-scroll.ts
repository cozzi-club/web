import type Lenis from "lenis";

/** The page's Lenis instance (set by `SmoothScroll`), so navigation can stop and reset it. */
let current: Lenis | null = null;

export const setSmoothScroll = (lenis: Lenis | null) => {
  current = lenis;
};

/**
 * Before leaving the page: cancel Lenis easing toward its last scroll target (jump to where the page
 * is now; no style change, so the old page's snapshot is untouched). Otherwise, clicking right after a
 * scroll lets it keep scrolling the next page to the old page's position.
 */
export const haltSmoothScroll = () => {
  current?.scrollTo(current.actualScroll, { immediate: true, force: true });
};

/** On a new page: start at the top, unless the URL has a #hash (Lenis's anchor handling takes it). */
export const resetSmoothScroll = () => {
  if (current && !window.location.hash) current.scrollTo(0, { immediate: true, force: true });
};
