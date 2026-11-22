import { ImageResponse } from "next/og";
import { coffee } from "@/content/products";
import { OgWordmark, ogFonts, publicImage } from "@/lib/og";
import { ogSize } from "@/lib/seo";
import { brandColors } from "@/lib/site";

// Coffee page share card: the home "Reserve" section's gradient, the bag, the name and its specs.
export const alt = `COZZI ${coffee.name} coffee bag: single-origin coffee from Jimma, Ethiopia.`;
export const size = ogSize;
export const contentType = "image/png";

const GRADIENT = "linear-gradient(to bottom, #452a20 0%, #583629 21%, #6d4233 40%, #7d533e 56%, #8c634a 71%, #ae8864 89%, #d5b181 100%)";

export default async function Image() {
  const [bag, fonts] = await Promise.all([publicImage(coffee.hero, "image/png"), ogFonts()]);
  const spec = (label: string) => coffee.specs.find((s) => s.label === label)?.value;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundImage: GRADIENT }}>
        {/* Bag shot is 1252×835 (3:2), the bag in its middle third. */}
        <img src={bag} width={960} height={640} style={{ position: "absolute", right: -150, top: 10 }} alt="" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
          }}
        >
          <OgWordmark width={190} color={brandColors.parchment} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {coffee.title.map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "Banter",
                  fontSize: 84,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: brandColors.parchment,
                }}
              >
                {line}
              </div>
            ))}
            <div style={{ marginTop: 28, fontFamily: "Neoris", fontSize: 24, color: brandColors.parchment }}>
              {`${spec("Origin")}. ${spec("Roast")} roast.`}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
