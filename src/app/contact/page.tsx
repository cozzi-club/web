import { ContactForm } from "@/components/contact-form";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui/container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Inquire: Questions and Bulk Orders",
  description:
    "Got a question about the beans, a bulk coffee order or just want to say hello? Leave COZZI a message and we’ll get back to you.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      {/* Figma "FORM": espresso page, title top-right, intro + form on the left (moved up, 2026-11-08). */}
      <main className="relative flex-1 bg-espresso">
        <SiteHeader />
        <Container className="pt-[calc(144*var(--u))] pb-[calc(145*var(--u))] pl-[calc(58*var(--u))] max-md:px-6 max-md:pt-12 max-md:pb-16">
          <h1 className="absolute top-[calc(125*var(--u))] right-[calc(89*var(--u))] font-display text-[calc(60*var(--u))] leading-[calc(35*var(--u))] font-bold tracking-[-0.03em] text-parchment uppercase max-md:static max-md:text-[calc(42*var(--u))] max-md:leading-[calc(36*var(--u))]">
            Inquire
          </h1>
          <p className="mt-[calc(129.68*var(--u))] w-[calc(266*var(--u))] font-sans text-[calc(14*var(--u))] leading-[calc(13*var(--u))] font-medium tracking-[-0.03em] text-parchment max-md:mt-6 max-md:w-auto max-md:leading-[calc(16*var(--u))]">
            Have a question, want to talk about a bulk order, or simply want to say hello? Leave us a message and
            we’ll get back to you.
          </p>
          <div className="mt-[calc(90*var(--u))] pl-1 max-md:mt-10 max-md:pl-0">
            <ContactForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
