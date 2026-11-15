import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/cn";

type ArrowSize = { w: number; h: number; stroke: number };

/** Figma's down-arrow icon at an exact size: shaft top → bottom, head half the height. */
function DesignArrow({ w, h, stroke }: ArrowSize) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="overflow-visible"
      aria-hidden
    >
      <path d={`M${w / 2} 0V${h}M0 ${h / 2}L${w / 2} ${h}L${w} ${h / 2}`} />
    </svg>
  );
}

/**
 * Down-arrow link to the next section. Color comes from `className` (text-*).
 * `size` draws Figma's arrow at exact design px; otherwise the lucide icon.
 */
export function ScrollCue({ href, size, className }: { href: string; size?: ArrowSize; className?: string }) {
  return (
    <a
      href={href}
      aria-label="Scroll to next section"
      className={cn("inline-flex transition-transform duration-300 hover:translate-y-1", className)}
    >
      {size ? <DesignArrow {...size} /> : <ArrowDown size={26} strokeWidth={2.3} absoluteStrokeWidth aria-hidden />}
    </a>
  );
}
