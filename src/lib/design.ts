/**
 * Design frames. Compositions are built in design px, written as real CSS sizes with `u()` /
 * calc(N * var(--u)) (--u in globals.css): below md the 390px mobile frame fills the viewport; from
 * md the 1280px desktop frame fills it up to 1920px (one design px = 1.5px), then stays centred.
 * Keep these numbers in sync with --u0 in globals.css.
 */
export const DESIGN = { mobile: 390, desktop: 1280, maxWidth: 1920, md: 768 } as const;

/**
 * `n` design px in screen px, for GSAP offsets (transforms can't take calc()). Same formula as --u0
 * in globals.css. Pass it as a function value (`y: () => designPx(32)`) so it follows resizes.
 */
export function designPx(n: number) {
  const w = document.documentElement.clientWidth;
  return n * (w < DESIGN.md ? w / DESIGN.mobile : Math.min(w, DESIGN.maxWidth) / DESIGN.desktop);
}

/** A length of `n` design px (for sizes set from code, e.g. Figma coordinates in style props). */
export const u = (n: number) => `calc(${n} * var(--u))`;

/** `sizes` for an image `w` design px wide (`mobileW` in the mobile frame) inside a design frame. */
export function designSizes(w: number, mobileW = w) {
  const vw = (px: number, frame: number) => `${Math.ceil((px / frame) * 100)}vw`;
  return [
    `(max-width: ${DESIGN.md - 1}px) ${vw(mobileW, DESIGN.mobile)}`,
    `(max-width: ${DESIGN.maxWidth}px) ${vw(w, DESIGN.desktop)}`,
    `${Math.ceil((w * DESIGN.maxWidth) / DESIGN.desktop)}px`,
  ].join(", ");
}
