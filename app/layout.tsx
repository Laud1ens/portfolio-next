import type { Metadata } from "next";
import { bodoniModa, jost, inter, jetbrainsMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laud Asante · Data Scientist, Forecasting & Machine Learning",
  description:
    "MSc Data Science & AI candidate building forecasting, optimisation and deep learning pipelines that end in a decision, not just a metric.",
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
      </body>
    </html>
  );
}
