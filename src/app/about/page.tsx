import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About | Cozzi",
  description: "A whole lot more to COZZI: our story, the Naqamte origin and the work behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <main className="relative flex-1">
        <SiteHeader />
        <About id="about" />
        <Contact id="contact" surface="espresso" />
      </main>
      <Footer />
    </>
  );
}
