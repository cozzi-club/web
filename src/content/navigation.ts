export type NavLink = { label: string; href: string };

/** Site map — shared by the footer and the mobile menu. Root-relative so it works from any page. */
export const sitemap: NavLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Coffee", href: "/coffee" },
  { label: "Collection", href: "/catalog" },
  { label: "Reach out", href: "/contact" },
];

export const contact: NavLink[] = [
  { label: "cozziclub@gmail.com", href: "mailto:cozziclub@gmail.com" },
  { label: "+61 403 942 298", href: "tel:+61403942298" },
  { label: "+251 967 416 500", href: "tel:+251967416500" },
];

/** All @cozziclub (Figma comment, 2026-11-08). */
export const socials: NavLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/cozziclub" },
  { label: "YouTube", href: "https://www.youtube.com/@cozziclub" },
  { label: "TikTok", href: "https://www.tiktok.com/@cozziclub" },
  { label: "Substack", href: "https://cozziclub.substack.com" },
];

/** Desktop header nav. `soon`: a button that opens the waitlist, with a "Coming Soon!" pill. */
export const headerNav: (NavLink & { soon?: boolean })[] = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Coffee", href: "/coffee" },
  { label: "Inquire", href: "/contact" },
  { label: "Shop", href: "#", soon: true },
];
