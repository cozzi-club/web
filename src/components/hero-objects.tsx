"use client";

import { useMemo, useRef } from "react";
import { PositionedImage, type Box } from "@/components/ui/positioned-image";
import { MOBILE_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { useHeroScene } from "@/hooks/use-hero-scene";
import { cn } from "@/lib/cn";
import type { HeroModel } from "@/lib/three/hero-scene";

type Frame = { width: number; height: number };

export type HeroObject = Omit<HeroModel, keyof Box> & {
  src: string;
  /** Per layout: `poster` = Figma export box (shown until 3D is ready), `fit` = visible bounds the model fills. */
  desktop: { poster: Box; fit: Box };
  mobile: { poster: Box; fit: Box };
};

type Props = {
  objects: HeroObject[];
  frames: { desktop: Frame; mobile: Frame };
  /** id of the hero section (scroll trigger + drag surface). */
  triggerId: string;
};

/** Hero 3D objects: posters first, then the three.js canvas crossfades in. Re-lays out per breakpoint. */
export function HeroObjects({ objects, frames, triggerId }: Props) {
  const layout = useMediaQuery(MOBILE_QUERY) ? "mobile" : "desktop";
  // Keyed so the scene (and its ready state) starts fresh when the breakpoint flips.
  return <HeroScene key={layout} layout={layout} objects={objects} frame={frames[layout]} triggerId={triggerId} />;
}

function HeroScene({ layout, objects, frame, triggerId }: Omit<Props, "frames"> & { layout: "desktop" | "mobile"; frame: Frame }) {
  const host = useRef<HTMLDivElement>(null);
  const models = useMemo(() => objects.map((object) => ({ ...object, ...object[layout].fit })), [objects, layout]);
  const ready = useHeroScene(host, { models, frame, triggerId });

  return (
    <>
      <div className={cn("transition-opacity duration-700", ready && "opacity-0")} aria-hidden>
        {objects.map(({ src, desktop, mobile }) => (
          <PositionedImage key={src} src={src} {...desktop.poster} mobile={mobile.poster} priority />
        ))}
      </div>
      <div
        ref={host}
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700",
          ready && "opacity-100",
        )}
        aria-hidden
      />
    </>
  );
}
