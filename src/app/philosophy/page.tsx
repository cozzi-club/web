import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Philosophy and Jimma Origin",
  description:
    "A whole lot more to COZZI: the philosophy behind the brand, Jimma as a coffee landscape of its own, and sourcing that gives back to the farmers who grow it.",
  path: "/philosophy",
});

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
