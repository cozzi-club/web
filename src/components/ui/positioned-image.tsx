import Image from "next/image";
import type { CSSProperties } from "react";
import { Parallax } from "@/components/motion/parallax";
import { cn } from "@/lib/cn";
import { designSizes } from "@/lib/design";

/** Position and size (px) in a Figma design frame. */
export type Box = { x: number; y: number; w: number; h: number };

export type Placement = Box & {
  src: string;
  alt?: string;
  /** Plays this video (muted, looping, inline) in the box instead, with `src` as its poster. */
  video?: string;
  /** Optional scroll drift in px (see `Parallax`). */
  parallax?: number;
  /** Mobile frame box; `null` hides the image on mobile. Defaults to the desktop box. */
  mobile?: Box | null;
};

type Props = Placement & {
  priority?: boolean;
  anchor?: "center" | "top";
  className?: string;
};

/** Absolutely positioned image placed with Figma coordinates (desktop + optional mobile box). */
export function PositionedImage({ src, alt = "", video, x, y, w, h, mobile, parallax, anchor, priority, className }: Props) {
  const m = mobile ?? { x, y, w, h };
  const style = {
    "--x": `${x}px`,
    "--y": `${y}px`,
    "--w": `${w}px`,
    "--h": `${h}px`,
    "--mx": `${m.x}px`,
    "--my": `${m.y}px`,
    "--mw": `${m.w}px`,
    "--mh": `${m.h}px`,
  } as CSSProperties;
  const classes = cn(
    "absolute top-(--y) left-(--x) h-(--h) w-(--w)",
    "max-md:top-(--my) max-md:left-(--mx) max-md:h-(--mh) max-md:w-(--mw)",
    mobile === null && "max-md:hidden",
    className,
  );
  const sizes = designSizes(w, m.w);
  const image = video ? (
    <video
      src={video}
      poster={src}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover"
    />
  ) : (
    <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
  );

  return parallax ? (
    <Parallax distance={parallax} anchor={anchor} className={classes} style={style}>
      {image}
    </Parallax>
  ) : (
    <div className={classes} style={style}>
      {image}
    </div>
  );
}
