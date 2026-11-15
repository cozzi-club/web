import type { Metadata } from "next";
import { ProductDetails } from "@/components/product/product-details";
import { ProductHero } from "@/components/product/product-hero";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { coffee } from "@/content/products";

export const metadata: Metadata = {
  title: "Coffee | Cozzi",
  description: "‘Naqamte’ Forme: single-origin coffee from Nekemte, Ethiopia. Natural process, medium roast.",
};

/** Figma "COFFEE/product": gradient hero, specs and availability, then the dark contact block. */
export default function CoffeePage() {
  return (
    <>
      <main className="flex-1">
        <ProductHero product={coffee} nextId="details" />
        <ProductDetails product={coffee} id="details" />
        <Contact surface="coffee" />
      </main>
      <Footer />
    </>
  );
}
