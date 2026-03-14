import { Google_Sans, Roboto } from "next/font/google";

/**
 * To change fonts, swap the import names here.
 * The CSS variable names (--font-display, --font-body) never change,
 * so tailwind.config.js and components need no updates.
 */
export const displayFont = Google_Sans({
  variable: "--font-display",
  weight: "700",
  subsets: ["latin"],
});

export const bodyFont = Roboto({
  variable: "--font-body",
  subsets: ["latin"],
});
