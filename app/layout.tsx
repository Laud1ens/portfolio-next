import type { Metadata } from "next";
import { bodoniModa, jost, inter, jetbrainsMono } from "./fonts";
import { Laudbot } from "@/components/laudbot/laudbot";
import "./globals.css";

const SITE = "https://laud-asante-web-production.up.railway.app";
const TITLE = "Laud Asante · Data Scientist, Forecasting & Machine Learning";
const DESCRIPTION =
  "MSc Data Science & AI candidate building forecasting, optimisation and deep learning pipelines that end in a decision, not just a metric.";

/**
 * Open Graph and Twitter cards were missing entirely, which mattered more than
 * it sounds: this link's main route to a reader is being pasted into LinkedIn,
 * a recruiter's email, or a message. Without these it previewed as a bare URL
 * with no title, no summary and no image, which reads as a dead link.
 *
 * The evolution still is used as the card image rather than the headshot. It
 * is already close to the 1.91:1 ratio the platforms crop to, and it shows the
 * work rather than the face.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Laud Asante",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/evolution-poster.jpg",
        width: 1440,
        height: 607,
        alt: "Four stages side by side: a crawling infant, a walking toddler, a boy traced with circuitry, and a machine sprinting under speed lines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/evolution-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bodoniModa.variable} ${jost.variable} ${inter.variable} ${jetbrainsMono.variable} bg-paper text-ink font-sans`}
      >
        {children}
        <Laudbot />
      </body>
    </html>
  );
}
