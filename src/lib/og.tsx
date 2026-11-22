import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { logoPaths } from "@/components/ui/logo";

// Paths stay scoped to their folders so the build only traces those files, not the whole project.

/** An image under /public/images (`src` as the site uses it, e.g. "/images/x.jpg") as a data URL, for <img> inside ImageResponse. */
export async function publicImage(src: string, type: string) {
  const file = await readFile(join(process.cwd(), "public", "images", src.replace(/^\/images\//, "")));
  return `data:${type};base64,${file.toString("base64")}`;
}

/**
 * The site's two typefaces for share images (ImageResponse can't read woff2). Committed Latin
 * subsets in src/app/fonts/og (same characters as the site's woff2 files), since the source
 * .otf/.ttf files are not in git.
 */
export async function ogFonts() {
  const [banter, neoris] = await Promise.all([
    readFile(join(process.cwd(), "src/app/fonts/og/banter-grotesk-bold.otf")),
    readFile(join(process.cwd(), "src/app/fonts/og/tt-neoris-medium.ttf")),
  ]);
  return [
    { name: "Banter", data: banter, weight: 700 as const, style: "normal" as const },
    { name: "Neoris", data: neoris, weight: 500 as const, style: "normal" as const },
  ];
}

/** The COZZI wordmark at `width` px. */
export function OgWordmark({ width, color }: { width: number; color: string }) {
  return (
    <svg viewBox="0 0 100 25" width={width} height={width / 4} fill={color}>
      {logoPaths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
