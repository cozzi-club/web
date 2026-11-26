/**
 * Page transitions on the View Transitions API. The update step (old page captured → new page in)
 * ends from a layout effect once the new route has mounted (`finishPageTransition`, called by
 * `RouteTransitions`), i.e. before the browser can paint the new page live. Ending it from a passive
 * effect (as next-view-transitions does) let Safari paint one frame of the bare new page first: a
 * white flash.
 */
let finish: (() => void) | null = null;

/** Starts a view transition that runs `navigate`; `onReady` animates it once both pages are captured. */
export function startPageTransition(navigate: () => void, onReady: () => void) {
  if (!("startViewTransition" in document)) {
    navigate();
    return;
  }
  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        // Safety net: if the route never changes, don't hold the screen frozen.
        const timer = setTimeout(() => done(), 3000);
        const done = () => {
          clearTimeout(timer);
          finish = null;
          resolve();
        };
        finish = done;
        navigate();
      }),
  );
  transition.ready.then(onReady).catch(() => {});
}

/** Called once the new route is in the DOM (before paint): lets the transition capture it. */
export const finishPageTransition = () => finish?.();
