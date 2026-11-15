import localFont from "next/font/local";

// Latin-subset woff2 builds of the source .otf/.ttf files in this folder.
export const banterGrotesk = localFont({
  src: [{ path: "./banter-grotesk-bold.woff2", weight: "700", style: "normal" }],
  variable: "--font-banter",
  display: "swap",
});

export const ttNeoris = localFont({
  src: [
    { path: "./tt-neoris-hairline.woff2", weight: "100", style: "normal" },
    { path: "./tt-neoris-regular.woff2", weight: "400", style: "normal" },
    { path: "./tt-neoris-medium.woff2", weight: "500", style: "normal" },
    { path: "./tt-neoris-demibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-neoris",
  display: "swap",
});
