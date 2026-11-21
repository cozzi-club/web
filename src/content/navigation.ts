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
  { label: "+91(123 456 78)", href: "tel:+9112345678" },
];

export const socials: NavLink[] = [
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
  { label: "X", href: "#" },
];

/** Desktop header nav. `soon`: a button that opens the waitlist, with a "Coming Soon!" pill. */
export const headerNav: (NavLink & { soon?: boolean })[] = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "Coffee", href: "/coffee" },
  { label: "Inquire", href: "/contact" },
  { label: "Shop", href: "#", soon: true },
];
