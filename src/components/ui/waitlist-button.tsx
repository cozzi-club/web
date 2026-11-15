"use client";

import type { ComponentProps } from "react";
import { openWaitlist } from "@/hooks/use-waitlist-dialog";

/** A button that opens the waitlist sheet, for server components. */
export function WaitlistButton(props: Omit<ComponentProps<"button">, "type" | "onClick">) {
  return <button type="button" onClick={openWaitlist} {...props} />;
}
