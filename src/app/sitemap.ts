import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Live pages only: /catalog is switched off (`_catalog`), add it back here when it returns.
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/coffee", priority: 0.9 },
  { path: "/philosophy", priority: 0.8 },
  { path: "/faq", priority: 0.7 },
  { path: "/contact", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => ({ url: new URL(path, site.url).href, priority }));
}
