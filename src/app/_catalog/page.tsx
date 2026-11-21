// Collection page, switched off (2026-11-21): the `_` folder keeps it out of routing, so /catalog
// is a 404. Rename the folder back to `catalog` to bring it back.

import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";
import { AnnouncementBar } from "@/components/sections/announcement-bar";
import { Footer } from "@/components/sections/footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { catalog } from "@/content/products";

export const metadata: Metadata = {
  title: "Catalogue | Cozzi",
  description: "The COZZI collection: coffee, objects and lifestyle pieces. Coming soon.",
};

export default function CatalogPage() {
  return (
    <>
      <AnnouncementBar />
      <main className="relative flex-1 bg-cream">
        <SiteHeader />
        <Container className="px-[calc(101*var(--u))] pt-[calc(124*var(--u))] pb-[calc(158*var(--u))] max-md:px-[calc(32*var(--u))] max-md:pt-[calc(86*var(--u))] max-md:pb-[calc(48*var(--u))]">
          <Heading as="h1" size="lg" className="text-center leading-[calc(35*var(--u))] max-md:text-[calc(35*var(--u))] max-md:leading-[calc(30*var(--u))]">
            Catalogue
          </Heading>
          <ProductGrid products={catalog} className="mt-[calc(64*var(--u))] max-md:mt-[calc(36*var(--u))]" />
        </Container>
      </main>
      <Footer />
    </>
  );
}
