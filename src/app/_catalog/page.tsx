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
        <Container className="px-[101px] pt-[124px] pb-[158px] max-md:px-[32px] max-md:pt-[86px] max-md:pb-[48px]">
          <Heading as="h1" size="lg" className="text-center leading-[35px] max-md:text-[35px] max-md:leading-[30px]">
            Catalogue
          </Heading>
          <ProductGrid products={catalog} className="mt-[64px] max-md:mt-[36px]" />
        </Container>
      </main>
      <Footer />
    </>
  );
}
