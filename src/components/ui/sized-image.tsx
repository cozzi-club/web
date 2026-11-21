import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { designSizes, u } from "@/lib/design";

type Size = { w: number; h: number };

type Props = Size & {
  src: string;
  alt?: string;
  /** Mobile frame size (defaults to the desktop size). */
  mobile?: Size;
  priority?: boolean;
  className?: string;
};

/**
 * Image in an exact-size box (`fill` inside a sized wrapper). Avoids next/image's
 * width/height attribute rounding when Figma sizes are fractional.
 */
export function SizedImage({ src, alt = "", w, h, mobile = { w, h }, priority, className }: Props) {
  const style = { "--w": u(w), "--h": u(h), "--mw": u(mobile.w), "--mh": u(mobile.h) } as CSSProperties;
  const sizes = designSizes(w, mobile.w);

  return (
    <div className={cn("relative h-(--h) w-(--w) shrink-0 max-md:h-(--mh) max-md:w-(--mw)", className)} style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
    </div>
  );
}
