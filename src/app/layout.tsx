import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { zoomScript } from "@/lib/design";
import { preloaderScript } from "@/lib/preloader";
import { banterGrotesk, ttNeoris } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cozzi",
  description: "Make a moment, make a ritual of it, make it yours.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Page transitions (View Transitions API): see usePageTransition.
    <ViewTransitions>
      <html lang="en" className={`${banterGrotesk.variable} ${ttNeoris.variable} h-full`} suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: zoomScript }} />
          <script dangerouslySetInnerHTML={{ __html: preloaderScript }} />
          <noscript>
            <style>{".preloader{display:none}[data-intro-unblur] [data-word]{opacity:1;filter:none}"}</style>
          </noscript>
        </head>
        <body className="flex min-h-full flex-col">
          <SmoothScroll />
          {children}
          <WaitlistDialog />
        </body>
      </html>
    </ViewTransitions>
  );
}
