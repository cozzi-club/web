import { Preloader } from "@/components/preloader";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Origins } from "@/components/sections/origins";
import { Philosophy } from "@/components/sections/philosophy";
import { ProductFeature } from "@/components/sections/product-feature";

export default function Home() {
  return (
    <>
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
