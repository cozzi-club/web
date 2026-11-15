import { Preloader } from "@/components/preloader";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Horizon } from "@/components/sections/horizon";
import { Music } from "@/components/sections/music";
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
        <Horizon id="horizon" />
        <Origins />
        <Contact id="contact" />
        <Music />
      </main>
      <Footer />
    </>
  );
}
