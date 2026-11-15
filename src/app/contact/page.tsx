import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Enquire | Cozzi",
  description: "Questions, bulk orders or just saying hello? Leave us a message and we’ll get back to you.",
};

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      {/* Figma "FORM": espresso page, title top-right, intro + form on the left (moved up, 2026-11-08). */}
      <main className="relative flex-1 bg-espresso">
        <SiteHeader />
        <Container className="pt-[144px] pb-[145px] pl-[58px] max-md:px-6 max-md:pt-12 max-md:pb-16">
          <h1 className="absolute top-[125px] right-[89px] font-display text-[60px] leading-[35px] font-bold tracking-[-0.03em] text-parchment uppercase max-md:static max-md:text-[42px] max-md:leading-[36px]">
            Enquire
          </h1>
          <p className="mt-[129.68px] w-[266px] font-sans text-[14px] leading-[13px] font-semibold tracking-[-0.03em] text-parchment max-md:mt-6 max-md:w-auto max-md:leading-[16px]">
            Have a question, want to talk about a bulk order, or simply want to say hello? Leave us a message and
            we’ll get back to you.
          </p>
          <div className="mt-[90px] pl-1 max-md:mt-10 max-md:pl-0">
            <ContactForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
