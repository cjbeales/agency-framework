/**
 * Shared font read/write for theme.js and typography.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");

function toFontIdentifier(name) {
  return name.trim().replace(/\s+/g, "_");
}

function readCurrentFonts() {
  try {
    const content = fs.readFileSync(path.join(ROOT, "styles/fonts.ts"), "utf8");
    const importMatch = content.match(/import\s*\{\s*(\w+),\s*(\w+)\s*\}/);
    const displayBlock = content.match(/displayFont\s*=[\s\S]*?}\s*\)/)?.[0] ?? "";
    const bodyBlock = content.match(/bodyFont\s*=[\s\S]*?}\s*\)/)?.[0] ?? "";
    const displayWeightMatch = displayBlock.match(/weight:\s*(?:"([^"]+)"|\[([^\]]+)\])/);
    const bodyWeightMatch = bodyBlock.match(/weight:\s*(?:"([^"]+)"|\[([^\]]+)\])/);
    return {
      displayName: importMatch ? importMatch[1].replace(/_/g, " ") : "Bebas Neue",
      displayWeight: displayWeightMatch
        ? displayWeightMatch[1] ?? displayWeightMatch[2]?.replace(/["\s]/g, "").split(",")[0]
        : "",
      bodyName: importMatch ? importMatch[2].replace(/_/g, " ") : "Open Sans",
      bodyWeight: bodyWeightMatch
        ? bodyWeightMatch[1] ?? bodyWeightMatch[2]?.replace(/["\s]/g, "").split(",")[0]
        : "",
    };
  } catch {
    return {
      displayName: "Bebas Neue",
      displayWeight: "400",
      bodyName: "Open Sans",
      bodyWeight: "",
    };
  }
}

function writeFontsFile({ displayName, displayWeight, bodyName, bodyWeight }) {
  const displayId = toFontIdentifier(displayName);
  const bodyId = toFontIdentifier(bodyName);
  const displayWeightLine = displayWeight ? `\n  weight: "${displayWeight}",` : "";
  const bodyWeightLine = bodyWeight ? `\n  weight: "${bodyWeight}",` : "";

  const content = `import { ${displayId}, ${bodyId} } from "next/font/google";

/**
 * To change fonts, swap the import names here.
 * The CSS variable names (--font-display, --font-body) never change,
 * so tailwind.config.js and components need no updates.
 */
export const displayFont = ${displayId}({
  variable: "--font-display",${displayWeightLine}
  subsets: ["latin"],
});

export const bodyFont = ${bodyId}({
  variable: "--font-body",${bodyWeightLine}
  subsets: ["latin"],
});
`;

  fs.writeFileSync(path.join(ROOT, "styles/fonts.ts"), content);
}

module.exports = {
  ROOT,
  readCurrentFonts,
  writeFontsFile,
  toFontIdentifier,
};
