"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const OPEN_EVENT = "cozzi:waitlist";

/** Opens the waitlist sheet from anywhere (e.g. a product card). */
export const openWaitlist = () => window.dispatchEvent(new Event(OPEN_EVENT));

/**
 * The waitlist sheet: a modal `<dialog>` (focus trap, Escape to close, inert page) opened by
 * `openWaitlist()`. Clicking the blurred backdrop closes it, and the page behind can't scroll.
 */
export function useWaitlistDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const el = dialog.current!;
    const root = document.documentElement;
    const open = () => {
      if (el.open) return;
      el.showModal();
      root.style.overflow = "hidden";
    };
    const onClose = () => {
      root.style.overflow = "";
    };
    addEventListener(OPEN_EVENT, open);
    el.addEventListener("close", onClose);
    return () => {
      removeEventListener(OPEN_EVENT, open);
      el.removeEventListener("close", onClose);
    };
  }, []);

  const close = () => dialog.current?.close();

  // TODO: no email service is connected yet — wire this to the mailing list provider.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setJoined(true);
  };

  return { dialog, joined, close, onSubmit };
}
