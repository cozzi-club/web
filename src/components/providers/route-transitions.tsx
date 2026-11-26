"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { finishPageTransition } from "@/lib/page-transition";
import { resetSmoothScroll } from "@/lib/smooth-scroll";

/**
 * On every route change, before the browser paints the new page: scroll it to the top (unless the
 * URL has a #hash), then let the page transition capture it.
 */
export function RouteTransitions() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    resetSmoothScroll();
    finishPageTransition();
  }, [pathname]);

  return null;
}
