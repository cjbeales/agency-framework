import type { Metadata } from "next";
import "@/styles/globals.css";
import { displayFont, bodyFont } from "@/styles/fonts";

export const metadata: Metadata = {
  title: "The Agency",
  description: "The Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="font-body text-text bg-surface">{children}</body>
    </html>
  );
}
