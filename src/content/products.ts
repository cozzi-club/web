import type { Product } from "@/components/product-card";

export type ProductSpec = { label: string; value: string };

/** The /coffee page (Figma "COFFEE/product"). */
export type CoffeeDetail = {
  name: string;
  /** Hero title lines (Figma sets the name over two lines). */
  title: string[];
  specs: ProductSpec[];
  /** Small dark cards under the specs: headline + muted note (`store`: the online store, opens the waitlist). */
  availability: { title: string; note: string; store?: boolean }[];
  /** Large hero image (transparent product shot, 3:2). */
  hero: string;
};

const images = {
  coffeeBag: { src: "/images/product/coffee-bag.png", width: 300, height: 200 },
  knitWear: { src: "/images/horizon/knit-wear.png", width: 240.21, height: 240.21 },
  keyChain: { src: "/images/horizon/key-chain.png", width: 210.89, height: 270.67 },
  boxyTee: { src: "/images/horizon/boxy-tee.png", width: 257.58, height: 257.58 },
};

export const coffee: CoffeeDetail = {
  name: "Naqamte Forme",
  title: ["‘Naqamte’", "Forme"],
  hero: images.coffeeBag.src,
  specs: [
    { label: "Origin", value: "Nekemte, Ethiopia" },
    { label: "Process", value: "Natural" },
    { label: "Roast", value: "Medium" },
    { label: "Altitude", value: "1800-2200 masl" },
  ],
  availability: [
    { title: "Coming Soon.", note: "On our online store.", store: true },
    { title: "Soretti International", note: "Produced along with" },
  ],
};

const card = (name: string, category: string, image: Product["image"]): Product => ({
  name,
  category,
  image,
  status: "Coming soon",
});

const knitWear = card("Knit wear", "Lifestyle", images.knitWear);
const keyChain = card("Key chain", "Lifestyle", images.keyChain);
const boxyTee = card("Boxy tee", "Lifestyle", images.boxyTee);

/** Home "On the horizon" row. */
export const upcoming = [knitWear, keyChain, boxyTee];

/** Catalogue grid. Cards open the waitlist sheet; there are no product pages yet. */
export const catalog = [
  card(coffee.name, "Coffee", images.coffeeBag),
  knitWear,
  keyChain,
  boxyTee,
  card("Naqamte Espresso", "Coffee", images.coffeeBag),
  card("Gift set", "Coffee", images.coffeeBag),
];
