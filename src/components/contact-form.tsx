"use client";

import { CircleCheck } from "lucide-react";
import { Field } from "@/components/ui/field";
import { contact } from "@/content/navigation";
import { useContactForm } from "@/hooks/use-contact-form";

const EMAIL = contact[0].label;
const note = "mt-[calc(28*var(--u))] font-sans text-[calc(11*var(--u))] leading-[calc(13*var(--u))] font-medium tracking-[-0.03em] text-parchment transition-opacity duration-500 starting:opacity-0";

/** Inquiry form (Figma "Enquire - form"), sent with Web3Forms. Once sent it clears, and a thank-you line shows under the button. */
export function ContactForm() {
  const { status, onSubmit, onInput } = useContactForm();

  return (
    <form
      onSubmit={onSubmit}
      onInput={onInput}
      className="flex w-[calc(733*var(--u))] flex-col gap-[calc(39*var(--u))] max-md:w-full max-md:gap-8"
    >
      <div className="flex flex-col gap-10 max-md:gap-6">
        <div className="grid grid-cols-2 gap-[calc(10*var(--u))] max-md:grid-cols-1 max-md:gap-6">
          <Field tone="dark" label="First Name*" name="firstName" required autoComplete="given-name" />
          <Field tone="dark" label="Last name*" name="lastName" required autoComplete="family-name" />
        </div>
        <div className="grid grid-cols-2 gap-[calc(10*var(--u))] max-md:grid-cols-1 max-md:gap-6">
          <Field
            tone="dark"
            label="Email*"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter e-mail address"
          />
          <Field
            tone="dark"
            label="Phone number (optional)"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(123 456-7890)"
          />
        </div>
        <Field tone="dark" label="Message" name="message" multiline placeholder="Enter message" />
        {/* Honeypot: hidden from people, ticked by bots; Web3Forms drops those submissions. */}
        <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
      </div>
      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-[calc(46*var(--u))] w-full cursor-pointer disabled:cursor-wait disabled:opacity-60 rounded-[calc(2*var(--u))] border border-[#61463c] font-sans text-[calc(14*var(--u))] leading-[calc(14*var(--u))] font-medium tracking-[0.1em] text-[#dabeb5] uppercase transition-colors hover:bg-[#61463c]"
        >
          {status === "sending" ? "Sending" : "Submit"}
        </button>
        {/* Figma "after form is filled and sent": check + thanks, centred 28px under the button. */}
        <div aria-live="polite">
          {status === "sent" && (
            <p className={`${note} flex items-center justify-center gap-[calc(7.83*var(--u))]`}>
              <CircleCheck aria-hidden className="size-[calc(19*var(--u))]" strokeWidth={1.5} />
              Thanks for dropping us a line. We&apos;ll get back to you.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className={`${note} text-center`}>
              Something went wrong. Please try again, or email us at{" "}
              <a href={`mailto:${EMAIL}`} className="underline underline-offset-2">
                {EMAIL}
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
