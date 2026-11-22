import { ProductDetails } from "@/components/product/product-details";
import { ProductHero } from "@/components/product/product-hero";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { coffee } from "@/content/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "‘Jimma’ Reserve Ethiopian Coffee",
  description:
    "‘Jimma’ Reserve: single-origin coffee from the Jimma region, Ethiopia. Natural and washed, medium roast, grown at 1800 to 2200 masl. Coming soon.",
  path: "/coffee",
  ownImage: true,
});

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
