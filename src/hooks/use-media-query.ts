"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Live `matchMedia` result. Server render (and hydration) assume `false`. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Matches the Tailwind `max-md` range (the 390px mobile design). */
export const MOBILE_QUERY = "(max-width: 767.98px)";
