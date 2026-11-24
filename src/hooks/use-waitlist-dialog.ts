"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { formFields, submitWeb3Form } from "@/lib/web3forms";

const OPEN_EVENT = "cozzi:waitlist";

/** Session flag: the sheet has been shown this visit (tab session), by the visitor or automatically. */
export const WAITLIST_SHOWN = "cozzi:waitlist-shown";

/** The message on every waitlist email (the form only asks for the email). */
const WAITLIST_MESSAGE = "I want in! Please add me to the COZZI waitlist.";

/** Opens the waitlist sheet from anywhere (e.g. a product card). */
export const openWaitlist = () => window.dispatchEvent(new Event(OPEN_EVENT));

/**
 * The waitlist sheet: a modal `<dialog>` (focus trap, Escape to close, inert page) opened by
 * `openWaitlist()`. Clicking the blurred backdrop closes it, and the page behind can't scroll.
 */
export function useWaitlistDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "joined" | "error">("idle");

  useEffect(() => {
    const el = dialog.current!;
    const root = document.documentElement;
    const open = () => {
      if (el.open) return;
      try {
        sessionStorage.setItem(WAITLIST_SHOWN, "1");
      } catch {}
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

  // Sign-ups are emailed through Web3Forms: only the email, plus a fixed message.
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = formFields(event.currentTarget);
    setStatus("sending");
    const result = await submitWeb3Form({
      subject: "Waitlist sign-up (cozzi.club)",
      from_name: "COZZI website",
      message: WAITLIST_MESSAGE,
      ...fields,
    });
    if (!result.ok) console.error("Web3Forms rejected the waitlist sign-up:", result.status, result.message);
    setStatus(result.ok ? "joined" : "error");
  };

  return { dialog, status, close, onSubmit };
}
