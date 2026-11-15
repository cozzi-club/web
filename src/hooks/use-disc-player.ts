"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// 16⅔ rpm, the slowest standard record speed (60 / 16.67 = 3.6s a turn). 33⅓ rpm (1.8s) read as too fast.
const SECONDS_PER_TURN = 3.6;
/** Tonearm angles (deg) around its collar: parked beside the record vs. needle on the record. */
export const ARM_REST = -22;
const ARM_PLAY = 3;

/**
 * Turntable motion driven by `playing`:
 * play  → the arm swings onto the record, then the disc spins up and `onNeedleDown` fires;
 * pause → the arm swings back to rest while the disc spins down.
 * Attach `disc` and `arm` to the rotating disc and the tonearm; `root` scopes the animations.
 */
export function useDiscPlayer({ playing, onNeedleDown }: { playing: boolean; onNeedleDown: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const disc = useRef<HTMLDivElement>(null);
  const arm = useRef<HTMLDivElement>(null);
  const spin = useRef<gsap.core.Tween>(null);
  const needleDown = useRef(onNeedleDown);

  useEffect(() => {
    needleDown.current = onNeedleDown;
  });

  // One spin tween per mount (paused); its timeScale is eased for spin-up/down.
  useGSAP(
    () => {
      spin.current = gsap.to(disc.current, { rotation: 360, duration: SECONDS_PER_TURN, ease: "none", repeat: -1, paused: true });
    },
    { scope: root },
  );

  useGSAP(
    () => {
      const tween = spin.current!;
      const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!playing) {
        gsap.to(tween, { timeScale: 0, duration: instant ? 0 : 1.6, ease: "power2.out", overwrite: true, onComplete: () => tween.pause() });
        gsap.to(arm.current, { rotation: ARM_REST, duration: instant ? 0 : 1.1, ease: "power2.inOut", overwrite: true });
        return;
      }

      const land = () => {
        needleDown.current();
        if (instant) return;
        tween.timeScale(Math.max(tween.timeScale(), 0.01)).play();
        gsap.to(tween, { timeScale: 1, duration: 0.9, ease: "power2.in", overwrite: true });
      };
      gsap.to(arm.current, { rotation: ARM_PLAY, duration: instant ? 0 : 1.1, ease: "power2.inOut", overwrite: true, onComplete: land });
    },
    { scope: root, dependencies: [playing] },
  );

  return { root, disc, arm };
}
