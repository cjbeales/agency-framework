import { Bebas_Neue, Open_Sans } from "next/font/google";

/**
 * To change the display font, swap the import and update the google font name.
 * The CSS variable names (--font-display, --font-body) stay the same so
 * tailwind.config.js and components never need updating.
 */
export const displayFont = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const bodyFont = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});
