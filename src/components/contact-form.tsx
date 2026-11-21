"use client";

import { CircleCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Field } from "@/components/ui/field";

/** Enquiry form (Figma "Enquire - form"). Once sent it clears, and a thank-you line shows under the button. */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  // TODO: no email/CRM service is connected yet — send the form data there.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  };

  return (
    <form
      onSubmit={onSubmit}
      onInput={() => setSent(false)}
      className="flex w-[733px] flex-col gap-[39px] max-md:w-full max-md:gap-8"
    >
      <div className="flex flex-col gap-10 max-md:gap-6">
        <div className="grid grid-cols-2 gap-[10px] max-md:grid-cols-1 max-md:gap-6">
          <Field tone="dark" label="First Name*" name="firstName" required autoComplete="given-name" />
          <Field tone="dark" label="Last name*" name="lastName" required autoComplete="family-name" />
        </div>
        <div className="grid grid-cols-2 gap-[10px] max-md:grid-cols-1 max-md:gap-6">
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
      </div>
      <div>
        <button
          type="submit"
          className="h-[46px] w-full cursor-pointer rounded-[2px] border border-[#61463c] font-sans text-[14px] leading-[14px] font-medium tracking-[0.1em] text-[#dabeb5] uppercase transition-colors hover:bg-[#61463c]"
        >
          Submit
        </button>
        {/* Figma "after form is filled and sent": check + thanks, centred 28px under the button. */}
        <div aria-live="polite">
          {sent && (
            <p className="mt-[28px] flex items-center justify-center gap-[7.83px] font-sans text-[11px] leading-[13px] font-medium tracking-[-0.03em] text-parchment transition-opacity duration-500 starting:opacity-0">
              <CircleCheck aria-hidden className="size-[19px]" strokeWidth={1.5} />
              Thanks for dropping us a line. We&apos;ll get back to you.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
