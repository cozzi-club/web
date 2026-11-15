"use client";

import type { ReactNode } from "react";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  /** Track size (px) in the design; scaled to the viewport height. */
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
};

/** Full-screen pinned section whose content track scrolls sideways with the page. */
export function HorizontalScroll({ id, width, height, className, children }: Props) {
  const { section, track } = useHorizontalScroll({ width, height });

  return (
    <section ref={section} id={id} className={cn("relative h-svh overflow-hidden", className)}>
      <div ref={track} className="absolute top-0 left-0 will-change-transform">
        <div className="origin-top-left [transform:scale(var(--track-scale,1))]" style={{ width, height }}>
          {children}
        </div>
      </div>
    </section>
  );
}
