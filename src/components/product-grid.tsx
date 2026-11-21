import { ProductCard, type Product } from "@/components/product-card";
import { cn } from "@/lib/cn";

/** 3-column card grid (Figma 343px cards); 2 columns of the same cards shrunk to 158px on mobile (local --u). */
export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-3 gap-x-[calc(25*var(--u))] gap-y-[calc(21*var(--u))] max-md:grid-cols-2 max-md:gap-x-[calc(11*var(--u))] max-md:gap-y-[calc(9*var(--u))]",
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={`${product.name}-${index}`} className="max-md:w-[calc(343*var(--u))] max-md:text-body max-md:[--u:calc(var(--u0)*0.4606)]">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
