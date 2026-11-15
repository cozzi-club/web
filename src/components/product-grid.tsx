import { ProductCard, type Product } from "@/components/product-card";
import { cn } from "@/lib/cn";

/** 3-column card grid (Figma 343px cards); 2 columns of the same cards zoomed to 158px on mobile. */
export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-3 gap-x-[25px] gap-y-[21px] max-md:grid-cols-2 max-md:gap-x-[11px] max-md:gap-y-[9px]",
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={`${product.name}-${index}`} className="max-md:w-[343px] max-md:zoom-[0.4606]">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
