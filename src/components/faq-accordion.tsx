"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/faq";
import { cn } from "@/lib/cn";

/** Plus that turns into a (rust) minus when open — Figma: 9px, 2px stroke. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      aria-hidden
      className={cn("shrink-0 transition-colors max-md:size-[6.1px] duration-300", open ? "text-[#6c331b]" : "text-ink")}
    >
      <path d="M0 4.5h9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4.5 0v9"
        stroke="currentColor"
        strokeWidth="2"
        className={cn("origin-center transition-transform duration-300", open && "scale-y-0")}
      />
    </svg>
  );
}

/** Single-open FAQ list (Figma "FAHHH"). Height animates via grid-rows 0fr → 1fr. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <ul className="flex flex-col gap-[28px] max-md:gap-[14.7px]">
      {items.map(({ question, answer }, index) => {
        const expanded = open === index;
        const panel = `${id}-${index}`;
        return (
          <li key={question} className="border-b border-ink pb-[31px] max-md:pb-[16.75px]">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panel}
              onClick={() => setOpen(expanded ? -1 : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 text-left font-sans text-[13px] leading-[14px] font-medium tracking-[-0.03em] text-ink max-md:text-[17px] max-md:leading-[17px]"
            >
              {question}
              <ToggleIcon open={expanded} />
            </button>
            <div
              id={panel}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="w-[334px] pt-[23px] font-sans text-[12px] leading-[12px] font-medium tracking-[-0.03em] text-ink/75 max-md:w-[291px] max-md:pt-[27.9px] max-md:pb-[3.45px] max-md:text-[17px] max-md:leading-[15px]">
                  {answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
