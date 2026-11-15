/**
 * `clip-path` for one side of a horizontal edge at `y` (px) across a `w`×`h` box, bowed upwards by
 * `bulge` in the middle (quadratic curve). `keep` picks the side that stays visible. Used by the
 * page transition (new page rising from below).
 */
export function curvedClip(w: number, h: number, y: number, bulge: number, keep: "below" | "above") {
  const edge = `${w / 2} ${y - bulge}`;
  return keep === "below"
    ? `path("M 0 ${y} Q ${edge} ${w} ${y} L ${w} ${h} L 0 ${h} Z")`
    : `path("M 0 0 L ${w} 0 L ${w} ${y} Q ${edge} 0 ${y} Z")`;
}

/** The site's transition easing (expo in-out) and duration. */
export const CURVE_EASE = "cubic-bezier(0.87, 0, 0.13, 1)";
export const CURVE_DURATION = 1100;
