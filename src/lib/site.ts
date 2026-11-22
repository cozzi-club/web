/**
 * Brand facts shared by the footer, page metadata, share images and structured data. The contact
 * details are the footer's (the source of truth); `navigation.ts` builds its links from these.
 */
export const site = {
  url: "https://cozzi.club",
  name: "COZZI",
  /** Names people search for, the common misspelling included. Structured data only, never shown. */
  alternateNames: ["Cozzi", "Cozzi Coffee", "COZZI Club", "Cozzie", "Cozzie Coffee"],
  /** Tab titles end in this, so every page matches a "cozzi coffee" search. */
  titleSuffix: "Cozzi Coffee",
  tagline: "Make a moment, make a ritual of it, make it yours.",
  description:
    "COZZI brings intention to the everyday ritual of buna. Single-origin coffee from Jimma, Ethiopia, medium roasted for a softer, fuller expression of the bean.",
  email: "cozziclub@gmail.com",
  phones: [
    { label: "+61 403 942 298", tel: "+61403942298" },
    { label: "+251 967 416 500", tel: "+251967416500" },
  ],
  address: { locality: "Addis Ababa", country: "ET" },
} as const;

/** Hex values of the globals.css colour tokens, for places CSS variables can't reach (generated images). */
export const brandColors = {
  ink: "#0a0605",
  espresso: "#452a20",
  sand: "#d5b181",
  parchment: "#fbf2d4",
  bone: "#ddd5ba",
} as const;
