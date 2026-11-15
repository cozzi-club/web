"use client";

import { useEffect, useState, type RefObject } from "react";
import type { HeroModel } from "@/lib/three/hero-scene";

type Options = {
  models: HeroModel[];
  frame: { width: number; height: number };
  /** id of the hero section (scroll trigger + drag surface). */
  triggerId: string;
};

/**
 * Mounts the three.js hero scene into `host` (code-split; three.js is only fetched here).
 * Returns `true` once every model is loaded and drawn; stays `false` if WebGL/loading fails.
 */
export function useHeroScene(host: RefObject<HTMLElement | null>, { models, frame, triggerId }: Options) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let cancelled = false;

    import("@/lib/three/hero-scene")
      .then(({ mountHeroScene }) =>
        mountHeroScene({
          host: host.current!,
          frame,
          models,
          trigger: document.getElementById(triggerId)!,
          motion: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        }),
      )
      .then((cleanup) => {
        if (cancelled) return cleanup();
        dispose = cleanup;
        setReady(true);
      })
      .catch(() => {
        // WebGL or model loading failed — callers keep their fallback visible.
      });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [host, models, frame, triggerId]);

  return ready;
}
