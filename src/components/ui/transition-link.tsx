"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "@/hooks/use-page-transition";

/** `next/link` that plays the curved page transition when it goes to another page. */
export function TransitionLink({ onClick, ...props }: ComponentProps<typeof Link>) {
  const transition = usePageTransition();
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event);
        transition(event);
      }}
    />
  );
}
