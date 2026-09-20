import { ImageResponse } from "next/og";

/**
 * The link preview card, generated rather than cropped.
 *
 * WHAT WAS ACTUALLY WRONG
 *
 * The tags themselves were present and valid. The image behind them was not
 * the right shape. `evolution-poster.jpg` is 1440x607, which is 2.37:1, and
 * every platform that renders a large summary card crops to 1.91:1. That crop
 * comes off the left and right, and the left and right of that poster are the
 * crawling infant and the sprinting machine, which is the entire point of the
 * picture. The preview kept the two middle panels and threw away the story.
 *
 * Height was the other half of it. 630px is the floor for a large card on
 * LinkedIn and Facebook; 607 is under it, which is enough for some clients to
 * downgrade the whole thing to a small square thumbnail with the title beside
 * it.
 *
 * Rather than re-export the poster at a different crop and lose content either
 * way, this renders a purpose-built 1200x630 card. A link preview is read in
 * about a second in a feed, so it carries the name, what he does and three
 * facts that are checkable on the page, rather than an illustration that needs
 * the page open to make sense.
 *
 * Next.js picks this file up by convention. Nothing imports it, so do not
 * "clean it up" as unused.
 */

export const alt =
  "Laud Asante, Data Scientist working in forecasting and machine learning, based in Hull";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Straight from globals.css. Hardcoded because this renders outside the app's
 * CSS, so a custom property would resolve to nothing and silently paint black
 * text on a black card. */
const PAPER = "#FBF9F5";
const CREAM = "#F1E7D8";
const BROWN_DEEP = "#3A2A1D";
const RUST = "#A9673F";
const TAUPE = "#B79772";

/** Facts, not adjectives. Every one of these is checkable on the page itself,
 *  which is the only reason to put a number on a card somebody cannot click
 *  into before deciding whether to trust it. */
const PROOF = [
  ["3,219", "US counties, 7 models benchmarked"],
  ["445", "tests guarding a live staffing platform"],
  ["33.2%", "novel attacks caught, against 5.1%"],
];

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BROWN_DEEP,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* A rust rule rather than a logo. There is no mark to use, and an
            invented one would be the least honest pixel on the page. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 96, height: 6, backgroundColor: RUST }} />
          <div
            style={{
              display: "flex",
              marginTop: 34,
              fontSize: 78,
              fontWeight: 700,
              color: PAPER,
              letterSpacing: "-0.02em",
            }}
          >
            Laud Asante
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              fontSize: 30,
              color: TAUPE,
              letterSpacing: "0.01em",
            }}
          >
            Data Scientist · Forecasting, ML and Applied AI · Hull, UK
          </div>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {PROOF.map(([value, label]) => (
            <div
              key={value}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                borderTop: `2px solid ${RUST}`,
                paddingTop: 16,
              }}
            >
              <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: CREAM }}>
                {value}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 21,
                  lineHeight: 1.3,
                  color: TAUPE,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
