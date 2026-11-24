"use client";

import { useState, type FormEvent } from "react";
import { formFields, submitWeb3Form } from "@/lib/web3forms";

export type FormStatus = "idle" | "sending" | "sent" | "error";

/**
 * Inquiry form → Web3Forms (emailed). Sending disables the button; once sent the form clears and the
 * thank-you line shows; typing again hides it. Errors keep what was typed.
 */
export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { firstName, lastName, ...rest } = formFields(form);
    const name = `${firstName} ${lastName}`.trim();
    setStatus("sending");
    const result = await submitWeb3Form({
      subject: `New inquiry from ${name} (cozzi.club)`,
      from_name: "COZZI website",
      name,
      ...rest,
    });
    if (result.ok) {
      form.reset();
      setStatus("sent");
    } else {
      console.error("Web3Forms rejected the inquiry:", result.status, result.message);
      setStatus("error");
    }
  };

  const onInput = () => setStatus((s) => (s === "sent" || s === "error" ? "idle" : s));

  return { status, onSubmit, onInput };
}
