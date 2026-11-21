"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { playlist } from "@/content/playlist";
import { ARM_REST, useDiscPlayer } from "@/hooks/use-disc-player";
import { usePlaylist } from "@/hooks/use-playlist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { designSizes, u } from "@/lib/design";
import { DeckControls } from "./deck-controls";

// Part positions (px) inside the 458×507 player, measured from Figma.
const box = (x: number, y: number, w: number, h = w): CSSProperties => ({ left: u(x), top: u(y), width: u(w), height: u(h) });

function Part({ src, style, className }: { src: string; style: CSSProperties; className?: string }) {
  return (
    <div className={cn("absolute", className)} style={style}>
      <Image src={src} alt="" fill sizes={designSizes(Number(style.width))} />
    </div>
  );
}

/**
 * COZZI disc player. Play (red button or ▶/II) swings the needle onto the record; the disc
 * spins up and the track starts once it lands. Previous / next / volume control the playlist.
 */
export function DiscPlayer({ className }: { className?: string }) {
  const { audio, track, playing, volume, setVolume, toggle, previous, next, engage, onEnded } = usePlaylist(playlist);
  const { root, disc, arm } = useDiscPlayer({ playing, onNeedleDown: engage });

  return (
    <div className={cn("flex shrink-0 flex-col items-center", className)}>
      {/* deck: 458×507 design px; shrunk to the 267px mobile size below md (local --u) */}
      <div ref={root} className="relative h-[calc(507*var(--u))] w-[calc(458*var(--u))] max-md:text-body max-md:[--u:calc(var(--u0)*0.583)]">
        {/* soft cast shadow + dark backing (shows through the gap between the two panels) */}
        <div
          className="absolute rounded-[calc(4.14*var(--u))] bg-[#1d232b] shadow-[calc(-28*var(--u))_calc(34*var(--u))_calc(60*var(--u))_rgba(0,0,0,0.6),calc(-8*var(--u))_calc(12*var(--u))_calc(18*var(--u))_rgba(0,0,0,0.45)]"
          style={box(33, 0, 424.9, 472.3)}
        />
        <Part src="/images/music/player-panels.png" style={box(33, 0, 424.97, 472.66)} />

        {/* divider between deck and control panel */}
        <div className="absolute rounded-full bg-[#d9d9d9]/20 blur-[calc(0.3*var(--u))]" style={box(35.7, 345, 420.3, 1.1)} />

        {/* power indicator */}
        <div
          className="absolute bg-[#2b3036] shadow-[inset_calc(-4*var(--u))_calc(6*var(--u))_calc(6*var(--u))_rgba(0,0,0,0.5)]"
          style={box(61.4, 25.8, 45.1, 6.3)}
        >
          <div
            className={cn(
              "absolute bg-[#a52f2f] transition-[opacity,box-shadow] duration-500",
              playing ? "opacity-100 shadow-[0_0_calc(6*var(--u))_calc(1*var(--u))_#e0483f]" : "opacity-70",
            )}
            style={box(8.8, 2.5, 28.6, 1.2)}
          />
        </div>

        {/* disc: base + shadow stay still, the art and spindle rotate */}
        <div
          className="absolute rounded-full bg-[#efece1] shadow-[calc(-6*var(--u))_calc(4*var(--u))_calc(6.7*var(--u))_rgba(0,0,0,0.75)]"
          style={box(80.1, 45.7, 276.3)}
        />
        <div ref={disc} className="absolute will-change-transform" style={box(79, 45.5, 277.4)}>
          <Image src="/images/music/disc-art.png" alt="" fill sizes={designSizes(278)} />
          <Part src="/images/music/disc-center.png" style={box(63.9, 63, 150.7)} />
        </div>

        <DeckControls
          playing={playing}
          onToggle={toggle}
          onPrevious={previous}
          onNext={next}
          volume={volume}
          onVolume={setVolume}
          style={box(290.1, 357, 139.9, 40)}
        />

        <button
          type="button"
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? "Pause the COZZI playlist" : "Play the COZZI playlist"}
          className="absolute cursor-pointer rounded-full transition-transform active:scale-95 focus-visible:outline-[calc(2*var(--u))] focus-visible:outline-offset-2 focus-visible:outline-parchment"
          style={box(391.6, 420.4, 40.2)}
        >
          <Image src="/images/music/red-button.png" alt="" fill sizes={designSizes(41)} />
        </button>

        {/* tonearm: the holder plate stays put; only the arm swings, around its collar (parked off the record) */}
        <Part src="/images/music/tonearm-base.png" style={box(296.5, 34.1, 131.2, 233.4)} />
        <div
          ref={arm}
          className="absolute origin-[72.7%_24.5%]"
          style={{ ...box(296.5, 34.1, 131.2, 233.4), transform: `rotate(${ARM_REST}deg)` }}
        >
          <Part src="/images/music/tonearm-shadow.png" style={box(-15.7, 176.3, 56.5, 58.3)} />
          <Image src="/images/music/tonearm-arm.png" alt="" fill sizes={designSizes(132)} />
        </div>

        <audio ref={audio} src={track.src} preload="none" onEnded={onEnded} />
        <p className="sr-only" aria-live="polite">
          {playing ? `Now playing: ${track.title}` : ""}
        </p>
      </div>

      {/* mobile: big "HIT IT" button under the deck (same toggle as the red button) */}
      <Button tone="parchment" aria-pressed={playing} onClick={toggle} className="mt-[calc(30*var(--u))] min-w-[calc(185*var(--u))] md:hidden">
        Hit it
      </Button>
    </div>
  );
}
