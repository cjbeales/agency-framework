import { Roboto, Lato } from "next/font/google";

/**
 * To change fonts, swap the import names here.
 * The CSS variable names (--font-display, --font-body) never change,
 * so tailwind.config.js and components need no updates.
 */
export const displayFont = Roboto({
  variable: "--font-display",
  weight: "700",
  subsets: ["latin"],
});

export const bodyFont = Lato({
  variable: "--font-body",
  weight: ["400", "700"],
  subsets: ["latin"],
});
