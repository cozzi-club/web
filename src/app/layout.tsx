import { ViewTransitions } from "next-view-transitions";
import { RouteTransitions } from "@/components/providers/route-transitions";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { rootMetadata } from "@/lib/seo";
import { banterGrotesk, ttNeoris } from "./fonts";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Page transitions (View Transitions API): see usePageTransition. The provider handles back/forward.
    <ViewTransitions>
      <html lang="en" className={`${banterGrotesk.variable} ${ttNeoris.variable} h-full`} suppressHydrationWarning>
        <body className="flex min-h-full flex-col">
          <SmoothScroll />
          <RouteTransitions />
          {children}
          <WaitlistDialog />
        </body>
      </html>
    </ViewTransitions>
  );
}
