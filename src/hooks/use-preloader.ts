"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PRELOADER_OPEN, PRELOADER_SEEN, preloaderWillPlay } from "@/lib/preloader";

type Arch = { left: number; right: number; top: number; bottom: number };

/** Arch outline, drawn from the bottom left, up over the top and down the right side (open at the bottom). */
const outline = ({ left, right, top, bottom }: Arch) => {
  const r = (right - left) / 2;
  return `M ${left} ${bottom} L ${left} ${top + r} A ${r} ${r} 0 0 1 ${right} ${top + r} L ${right} ${bottom}`;
};

/** Page content that settles from a slight zoom as the doors open (the home hero). */
const ZOOM_TARGETS = "[data-preloader-zoom]";
const ZOOM_FROM = 1.06;

/**
 * Preloader, once per visit (tab session), one GSAP timeline (after mdebeauty.com, without the side
 * ornaments):
 * 1. A thin gold arch line draws itself — up the left side, over the top, down the right — while
 *    "Opening 0–100%" counts up.
 * 2. At 100% the text, then the arch, blur out.
 * 3. A seam opens down the middle of the dark screen, then its two halves slide apart like doors.
 * 4. As they part, the hero settles from a slight zoom (`[data-preloader-zoom]`) and PRELOADER_OPEN
 *    fires, so page intros (the hero headline's unblur) start with the reveal.
 * On complete the flag is stored and the component unmounts. Already played (or reduced motion): it
 * unmounts straight away.
 */
export function usePreloader() {
  const line = useRef<SVGPathElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useGSAP(() => {
    if (!preloaderWillPlay()) {
      setShow(false);
      return;
    }

    const html = document.documentElement;
    html.style.overflow = "hidden";

    const w = innerWidth;
    const h = innerHeight;
    // Arch: centred, about a third of the screen wide (narrower on tall screens), rising from the
    // bottom edge to just above the middle.
    const width = Math.min(w * 0.34, h * 0.5);
    const arch: Arch = { left: (w - width) / 2, right: (w + width) / 2, top: h * 0.36, bottom: h + 2 };

    const path = line.current!;
    path.setAttribute("d", outline(arch));
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

    const progress = { value: 0 };
    const renderCount = () => {
      // Rounded down, so 100 shows exactly when the line closes.
      counter.current!.textContent = String(Math.floor(progress.value * 100));
    };

    // The hero waits behind the doors slightly zoomed in, then settles as they open.
    const zoom = document.querySelectorAll(ZOOM_TARGETS);
    gsap.set(zoom, { scale: ZOOM_FROM });

    gsap
      .timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(PRELOADER_SEEN, "1");
          } catch {}
          html.style.overflow = "";
          setShow(false);
        },
      })
      // 1. Draw the arch with the count.
      .to(path, { strokeDashoffset: 0, duration: 2.6, ease: "power2.inOut" }, 0)
      .to(progress, { value: 1, duration: 2.6, ease: "power2.inOut", onUpdate: renderCount }, 0)
      // 2. Blur everything out: the text, then the arch.
      .to([label.current, path], {
        autoAlpha: 0,
        filter: "blur(12px)",
        y: -12,
        duration: 0.6,
        ease: "power2.inOut",
        stagger: 0.08,
      })
      // 3. A seam opens down the middle, then the halves slide apart like doors.
      .to(left.current, { xPercent: -3, duration: 0.35, ease: "power2.out" }, ">-0.05")
      .to(right.current, { xPercent: 3, duration: 0.35, ease: "power2.out" }, "<")
      .addLabel("open", ">0.05")
      .to(left.current, { xPercent: -100, duration: 1.1, ease: "power3.inOut" }, "open")
      .to(right.current, { xPercent: 100, duration: 1.1, ease: "power3.inOut" }, "open")
      // 4. The hero settles from its slight zoom as the doors part, and its headline unblurs.
      .to(zoom, { scale: 1, duration: 1.4, ease: "power3.out", clearProps: "transform" }, "open+=0.1")
      .call(() => void dispatchEvent(new Event(PRELOADER_OPEN)), undefined, "open+=0.15");

    return () => {
      html.style.overflow = "";
      gsap.set(zoom, { clearProps: "transform" });
    };
  });

  return { line, counter, label, left, right, show };
}
