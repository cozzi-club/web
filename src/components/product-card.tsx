"use client";

import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SizedImage } from "@/components/ui/sized-image";
import { openWaitlist } from "@/hooks/use-waitlist-dialog";

export type Product = {
  name: string;
  category: string;
  image: { src: string; width: number; height: number };
  status?: string;
};

/** Catalogue card. Nothing is on sale yet, so a click opens the waitlist sheet. */
export function ProductCard({ product }: { product: Product }) {
  const { name, category, image, status } = product;

  return (
    <div className="group relative flex h-[445px] flex-col justify-between rounded-[2px] bg-paper pt-[15px] pr-[18px] pb-4 pl-5 text-ink has-focus-visible:outline-2 has-focus-visible:outline-ink">
      <SizedImage
        src={image.src}
        alt={name}
        w={image.width}
        h={image.height}
        className="absolute! inset-0 m-auto transition-transform duration-500 group-hover:scale-105"
      />

      <div className="relative flex items-center justify-between">
        {status ? <Badge>{status}</Badge> : <span />}
        <ArrowUpRight size={17} strokeWidth={1.4} absoluteStrokeWidth aria-hidden />
      </div>

      <div className="relative flex items-center justify-between font-medium uppercase leading-[15.5px]">
        <span className="text-[12.2px]">{name}</span>
        <span className="text-[11px] opacity-50">{category}</span>
      </div>

      {/* Covers the whole card (stretched button keeps the markup valid: no divs inside a button). */}
      <button
        type="button"
        onClick={openWaitlist}
        aria-label={`${name}: get notified when it launches`}
        className="absolute inset-0 cursor-pointer outline-none"
      />
    </div>
  );
}
