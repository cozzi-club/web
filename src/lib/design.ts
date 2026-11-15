/**
 * Design frames. Compositions are built in design px and scaled with CSS zoom (`design-zoom`):
 * below md the 390px mobile frame fills the viewport; from md the 1280px desktop frame scales
 * with the viewport up to 1920px (zoom 1.5), then stays centred.
 */
export const DESIGN = { mobile: 390, desktop: 1280, maxWidth: 1920, md: 768 } as const;

/** Sets --zoom before first paint and on resize (inlined in the root layout's <head>). */
export const zoomScript = `(() => {
  const root = document.documentElement;
  const update = () => {
    const w = root.clientWidth;
    root.style.setProperty("--zoom", String(w < ${DESIGN.md} ? w / ${DESIGN.mobile} : Math.min(w, ${DESIGN.maxWidth}) / ${DESIGN.desktop}));
  };
  update();
  addEventListener("resize", update);
})();`;

/** `sizes` for an image `w` design px wide (`mobileW` in the mobile frame) inside a zoomed frame. */
export function designSizes(w: number, mobileW = w) {
  const vw = (px: number, frame: number) => `${Math.ceil((px / frame) * 100)}vw`;
  return [
    `(max-width: ${DESIGN.md - 1}px) ${vw(mobileW, DESIGN.mobile)}`,
    `(max-width: ${DESIGN.maxWidth}px) ${vw(w, DESIGN.desktop)}`,
    `${Math.ceil((w * DESIGN.maxWidth) / DESIGN.desktop)}px`,
  ].join(", ");
}
