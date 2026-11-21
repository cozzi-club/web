/** Session flag: the preloader has played this visit (tab session). */
export const PRELOADER_SEEN = "cozzi:preloaded";

/** Fired as the preloader's doors start to open (page intros time themselves to it). */
export const PRELOADER_OPEN = "cozzi:preloader-open";

/** Whether the preloader plays on this load: not yet played this visit (tab session), motion allowed. */
export function preloaderWillPlay() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(PRELOADER_SEEN) === null;
  } catch {
    return true;
  }
}
