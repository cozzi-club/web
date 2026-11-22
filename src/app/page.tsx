import { JsonLd } from "@/components/json-ld";
import { Preloader } from "@/components/preloader";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Origins } from "@/components/sections/origins";
import { Philosophy } from "@/components/sections/philosophy";
import { ProductFeature } from "@/components/sections/product-feature";
import { brandJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Cozzi Coffee | Single-Origin Ethiopian Coffee from Jimma",
  absolute: true,
  description: site.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={brandJsonLd} />
      <Preloader />
      <main className="flex-1">
        <Hero nextId="philosophy" banner={<AnnouncementBar />} />
        <Philosophy id="philosophy" />
        <ProductFeature id="coffee" />
        <Origins />
        <Contact id="contact" />
      </main>
      <Footer />
    </>
  );
}
