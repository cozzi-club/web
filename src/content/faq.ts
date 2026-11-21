/** An answer is a list of blocks: a string is a paragraph, a string array is a bulleted list. */
export type FaqBlock = string | string[];
export type Faq = { question: string; answer: FaqBlock[] };

// Copy: "COZZI FAQ" document (2026-11-21).
export const faqs: Faq[] = [
  {
    question: "What is COZZI?",
    answer: [
      "COZZI is built around the simple belief that less is more. Through the ritual of buna, otherwise known as coffee, we aim to bring intentionality, presence and mindfulness into everyday life thus giving meaning to moments that are often overlooked.",
      "Beyond the cup, we seek to honour the heritage, history and culture of coffee, connecting people to its origins and the stories behind it.",
    ],
  },
  {
    question: "What is the mission behind COZZI?",
    answer: [
      "Our mission is to bring you closer to the origins of coffee, offering a deeper appreciation for Ethiopia's rich heritage, its people and the stories behind every harvest. We hope to introduce you to exceptional coffees while contributing to a more equitable future for the farmers who cultivate them, ensuring greater value is returned to the people behind each origin.",
    ],
  },
  {
    question: "Where does COZZI COFFEE come from?",
    answer: [
      "Our coffee will come from Ethiopia, the birthplace of coffee and home to the founder and team behind COZZI. Our first origin is Jimma, in the southwest of Ethiopia, coffee’s homeland. Here, tradition and care have shaped every harvest for generations.",
    ],
  },
  {
    question: "How is COZZI COFFEE roasted?",
    answer: [
      "Our coffee will be sourced and roasted in small batches, with each release kept limited to preserve freshness and maintain the quality, allowing you to experience each coffee's true character and distinct flavours.",
    ],
  },
  {
    question: "Will COZZI COFFEE be offered as whole bean or ground coffee?",
    answer: [
      "Our coffee will be offered as whole beans, allowing you to grind according to your preference and chosen brewing method.",
    ],
  },
  {
    question: "What brewing methods can I use?",
    answer: [
      "Our coffee can be enjoyed across a range of brewing methods, from espresso to pour-over. We encourage you to explore all the different methods, inviting you to discover what you enjoy most.",
    ],
  },
  {
    question: "Will COZZI offer other coffees?",
    answer: [
      "Ethiopia is home to thousands of heirloom varieties, each with its own distinct character. We aim to explore as many as we can and take you along the journey with us, one origin at a time.",
    ],
  },
  {
    question: "The Founder",
    answer: [
      "COZZI was born from a desire to reconnect with what is often overlooked: the origins of what we consume, the people behind it, and the meaning we bring to everyday rituals.",
      "What began as an appreciation of coffee for me later grew into a deeper vision:",
      [
        "share Ethiopia’s rich coffee heritage with coffee enthusiasts around the world.",
        "transform a part of your daily life into a moment of presence.",
        "extend that care back to the source, by contributing to a more equitable future for the farmers who cultivate it.",
      ],
      "COZZI is a journey of discovery with intention, and we, invite you, to be a part of it.",
      "Welcome home.",
    ],
  },
];
