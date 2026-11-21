"use client";

import { useId, useState } from "react";
import type { Faq, FaqBlock } from "@/content/faq";
import { cn } from "@/lib/cn";

/** Plus that turns into a (rust) minus when open — Figma: 9px, 2px stroke. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 9 9"
      aria-hidden
      className={cn("size-[calc(9*var(--u))] shrink-0 transition-colors max-md:size-[calc(6.1*var(--u))] duration-300", open ? "text-[#6c331b]" : "text-ink")}
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

/** Answer copy (Figma: 12px, 75% ink), wrapping at the design width at most. Blocks are paragraphs or bulleted lists, a line apart. */
function Answer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="flex max-w-[calc(334*var(--u))] flex-col gap-[calc(12*var(--u))] pt-[calc(23*var(--u))] font-sans text-[calc(12*var(--u))] leading-[calc(12*var(--u))] font-medium tracking-[-0.03em] text-ink/75 max-md:max-w-[calc(291*var(--u))] max-md:gap-[calc(15*var(--u))] max-md:pt-[calc(27.9*var(--u))] max-md:pb-[calc(3.45*var(--u))] max-md:text-[calc(17*var(--u))] max-md:leading-[calc(15*var(--u))]">
      {blocks.map((block, i) =>
        typeof block === "string" ? (
          <p key={i}>{block}</p>
        ) : (
          <ul key={i} className="flex list-disc flex-col gap-[calc(4*var(--u))] pl-[1.2em]">
            {block.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}

/** Single-open FAQ list (Figma "FAHHH"). Height animates via grid-rows 0fr → 1fr. */
export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <ul className="flex flex-col gap-[calc(28*var(--u))] max-md:gap-[calc(14.7*var(--u))]">
      {items.map(({ question, answer }, index) => {
        const expanded = open === index;
        const panel = `${id}-${index}`;
        return (
          <li key={question} className="border-b border-ink pb-[calc(31*var(--u))] max-md:pb-[calc(16.75*var(--u))]">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={panel}
              onClick={() => setOpen(expanded ? -1 : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-6 text-left font-sans text-[calc(13*var(--u))] leading-[calc(14*var(--u))] font-medium tracking-[-0.03em] text-ink max-md:text-[calc(17*var(--u))] max-md:leading-[calc(17*var(--u))]"
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
                <Answer blocks={answer} />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
