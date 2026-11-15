export type Faq = { question: string; answer: string };

// Only the first answer exists in the Figma file — replace the placeholders with real answers.
const PENDING = "We're putting this answer together. In the meantime, email us at info@cozzi.world.";

export const faqs: Faq[] = [
  {
    question: "Where does our coffee come from?",
    answer:
      "Our coffee is directly sourced from Nekemte, Ethiopia, in the western part of the country. We work with coffee from the area and roast it to create the COZZI profile you’ll find in every pack.",
  },
  { question: "Is the coffee ground or whole bean?", answer: PENDING },
  { question: "Can I buy your coffee in bulk?", answer: PENDING },
  { question: "Will you offer other coffees?", answer: PENDING },
  { question: "Where can I buy your products?", answer: PENDING },
  { question: "Where are you guys based in?", answer: PENDING },
  { question: "Is COZZI only a coffee brand?", answer: PENDING },
];
