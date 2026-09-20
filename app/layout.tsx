import type { Metadata } from "next";
import { bodoniModa, jost, inter, jetbrainsMono } from "./fonts";
import { Laudbot } from "@/components/laudbot/laudbot";
import "./globals.css";

const SITE = "https://laud-asante-web-production.up.railway.app";
const TITLE = "Laud Asante · Data Scientist, Forecasting & Machine Learning";
const DESCRIPTION =
  "MSc Data Science & AI candidate building forecasting, optimisation and deep learning pipelines that end in a decision, not just a metric.";

/**
 * Open Graph and Twitter cards. This link's main route to a reader is being
 * pasted into LinkedIn, a recruiter's email or a message, so the preview is
 * often read before the page is.
 *
 * No `images` array here on purpose. `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx` supply them by file convention, and an entry in this
 * object would override both. See the comment in opengraph-image.tsx for why
 * the evolution poster stopped being the card: at 1440x607 it is 2.37:1 and
 * every large card crops to 1.91:1, taking the crop off the two ends that
 * carry the whole illustration.
 *
 * `title.template` exists so any future page can set a short title and still
 * get the full one in a tab and a preview, rather than each page having to
 * remember to repeat the name.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s · Laud Asante" },
  description: DESCRIPTION,
  applicationName: "Laud Asante",
  authors: [{ name: "Laud Asante", url: SITE }],
  creator: "Laud Asante",
  // The canonical URL matters more than usual here: Railway also serves this
  // app on its internal deployment hostnames, and without this a crawler that
  // reaches one of those indexes a duplicate that nobody links to.
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Laud",
    lastName: "Asante",
    url: SITE,
    siteName: "Laud Asante",
    locale: "en_GB",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    // Recruiters find this through search as often as through a pasted link,
    // so the defaults that let Google show a longer snippet and a large image
    // are worth setting rather than inheriting.
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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
