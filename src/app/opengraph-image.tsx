import { ImageResponse } from "next/og";
import { OgWordmark, ogFonts, publicImage } from "@/lib/og";
import { defaultShareImage, ogSize } from "@/lib/seo";
import { brandColors, site } from "@/lib/site";

// Default share card for every page (the coffee page has its own): the jebena still life, wordmark,
// tagline set like the hero heading, and the origin line.
export const alt = defaultShareImage.alt;
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const [photo, fonts] = await Promise.all([publicImage("/images/about/still-life.jpg", "image/jpeg"), ogFonts()]);
  const lines = site.tagline.replace(/, /g, ",\n").split("\n");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: brandColors.ink }}>
        {/* Photo is 2550×1472: full width (693px tall), trimmed a little top and bottom. */}
        <img src={photo} width={1200} height={693} style={{ position: "absolute", left: 0, top: -40 }} alt="" />
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
            {lines.map((line) => (
              <div
                key={line}
                style={{
                  fontFamily: "Banter",
                  fontSize: 64,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: brandColors.parchment,
                }}
              >
                {line}
              </div>
            ))}
            <div style={{ marginTop: 28, fontFamily: "Neoris", fontSize: 24, color: brandColors.sand }}>
              Single-origin coffee from Jimma, Ethiopia
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
