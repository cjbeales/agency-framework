#!/usr/bin/env node

/**
 * Agency Framework — UI Customization Script
 *
 * Run with: npm run customize
 *
 * Updates the following files:
 *   - styles/fonts.ts        (display + body font)
 *   - tailwind.config.js     (brand colors, border radius)
 *   - styles/buttons.ts      (button shape)
 *   - app/layout.tsx         (site name / metadata)
 */

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// ─── Color utilities ──────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return (
    "#" +
    [r, g, b]
      .map((x) => Math.round(x * 255).toString(16).padStart(2, "0"))
      .join("")
  );
}

/**
 * Generates a 11-shade color scale from a single primary hex (treated as shade 600).
 * Results are a good starting point — fine-tune at https://uicolors.app
 */
function generateColorScale(primaryHex) {
  const { r, g, b } = hexToRgb(primaryHex);
  const { h, s } = rgbToHsl(r, g, b);

  // [lightness, saturation multiplier] per shade
  const shadeMap = {
    50:  [97, 0.25],
    100: [94, 0.35],
    200: [87, 0.50],
    300: [77, 0.65],
    400: [65, 0.80],
    500: [55, 0.92],
    600: null,        // primary — use as-is
    700: [37, 0.95],
    800: [28, 0.90],
    900: [22, 0.85],
    950: [15, 0.80],
  };

  const scale = {};
  for (const [shade, val] of Object.entries(shadeMap)) {
    if (val === null) {
      scale[shade] = primaryHex.toLowerCase();
    } else {
      scale[shade] = hslToHex(h, s * val[1], val[0]);
    }
  }
  return scale;
}

// ─── Font utilities ───────────────────────────────────────────────────────────

/** "Bebas Neue" → "Bebas_Neue" (Next.js font import identifier) */
function toFontIdentifier(name) {
  return name.trim().replace(/\s+/g, "_");
}

// ─── Prompt helpers ───────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function prompt(rl, label, defaultValue) {
  const displayDefault = defaultValue !== "" ? `\x1b[2m[${defaultValue}]\x1b[0m ` : "";
  const raw = await ask(rl, `  ${label} ${displayDefault}: `);
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : defaultValue;
}

async function choose(rl, label, options) {
  console.log(`\n  ${label}:`);
  options.forEach((o, i) => console.log(`    ${i + 1}. ${o.label}`));
  const raw = await ask(rl, `  Choice \x1b[2m[1]\x1b[0m: `);
  const idx = parseInt(raw.trim()) - 1;
  return options[idx >= 0 && idx < options.length ? idx : 0].value;
}

// ─── File writers ─────────────────────────────────────────────────────────────

function writeFontsFile({ displayName, displayWeight, bodyName, bodyWeight }) {
  const displayId         = toFontIdentifier(displayName);
  const bodyId            = toFontIdentifier(bodyName);
  const displayWeightLine = displayWeight ? `\n  weight: "${displayWeight}",` : "";
  const bodyWeightLine    = bodyWeight    ? `\n  weight: "${bodyWeight}",`    : "";

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
  console.log("  \x1b[32m✓\x1b[0m styles/fonts.ts");
}

function updateTailwindColors(scale) {
  const filePath = path.join(ROOT, "tailwind.config.js");
  let content = fs.readFileSync(filePath, "utf8");

  const colorBlock = `brand: {
          50: "${scale[50]}",
          100: "${scale[100]}",
          200: "${scale[200]}",
          300: "${scale[300]}",
          400: "${scale[400]}",
          500: "${scale[500]}",
          600: "${scale[600]}",
          700: "${scale[700]}",
          800: "${scale[800]}",
          900: "${scale[900]}",
          950: "${scale[950]}",
        },`;

  content = content.replace(/brand:\s*\{[\s\S]*?\},/, colorBlock);
  fs.writeFileSync(filePath, content);
  console.log("  \x1b[32m✓\x1b[0m tailwind.config.js  (brand colors)");
}

function updateTailwindRadius(cardRadius, imageRadius) {
  const filePath = path.join(ROOT, "tailwind.config.js");
  let content = fs.readFileSync(filePath, "utf8");

  const radiusBlock = `borderRadius: {
        card: "${cardRadius}",
        image: "${imageRadius}",
      },`;

  content = content.replace(/borderRadius:\s*\{[\s\S]*?\},/, radiusBlock);
  fs.writeFileSync(filePath, content);
  console.log("  \x1b[32m✓\x1b[0m tailwind.config.js  (border radius)");
}

function updateButtonShape(shape) {
  const filePath = path.join(ROOT, "styles/buttons.ts");
  let content = fs.readFileSync(filePath, "utf8");
  // Replace the rounded-* token inside the base string
  content = content.replace(/(base:.*?")([^"]*rounded-\S+)([^"]*)(")/,
    (_, pre, classes, after, close) => {
      return pre + classes.replace(/rounded-\S+/, shape) + after + close;
    }
  );
  fs.writeFileSync(filePath, content);
  console.log("  \x1b[32m✓\x1b[0m styles/buttons.ts   (button shape)");
}

function updateMetadata(siteName) {
  const filePath = path.join(ROOT, "app/layout.tsx");
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(/title:\s*"[^"]*"/, `title: "${siteName}"`);
  content = content.replace(/description:\s*"[^"]*"/, `description: "${siteName}"`);
  fs.writeFileSync(filePath, content);
  console.log("  \x1b[32m✓\x1b[0m app/layout.tsx      (site metadata)");
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n\x1b[1m┌─────────────────────────────────────────┐\x1b[0m");
  console.log("\x1b[1m│   Agency Framework — Customize UI       │\x1b[0m");
  console.log("\x1b[1m└─────────────────────────────────────────┘\x1b[0m");
  console.log("  Press enter to keep the value in [brackets].\n");

  // ── Gather inputs ──────────────────────────────────────────────────────────

  const siteName = await prompt(rl, "Site name", "My Agency");

  console.log();
  const brandHex = await prompt(rl, "Brand color — primary hex (shade 600)", "#1e63e6");

  console.log();
  const displayName   = await prompt(rl, "Display font — Google Fonts name", "Bebas Neue");
  const displayWeight = await prompt(rl, "Display font weight e.g. 400, 700 (blank = variable font only)", "400");

  console.log();
  const bodyName   = await prompt(rl, "Body font — Google Fonts name", "Open Sans");
  const bodyWeight = await prompt(rl, "Body font weight e.g. 400, 700 (blank = variable font only)", "400");

  const buttonShape = await choose(rl, "Button shape", [
    { label: "Pill          (rounded-full)", value: "rounded-full" },
    { label: "Large         (rounded-xl)",   value: "rounded-xl"   },
    { label: "Medium        (rounded-lg)",   value: "rounded-lg"   },
    { label: "Small         (rounded-md)",   value: "rounded-md"   },
    { label: "Sharp corners (rounded-none)", value: "rounded-none" },
  ]);

  console.log();
  const cardRadius  = await prompt(rl, "Card border radius", "1rem");
  const imageRadius = await prompt(rl, "Image border radius", "1.5rem");

  rl.close();

  // ── Apply changes ──────────────────────────────────────────────────────────

  console.log("\n  Applying changes...\n");

  const hex = brandHex.startsWith("#") ? brandHex : `#${brandHex}`;
  const colorScale = generateColorScale(hex);

  writeFontsFile({
    displayName,
    displayWeight: displayWeight.length > 0 ? displayWeight : null,
    bodyName,
    bodyWeight:    bodyWeight.length > 0    ? bodyWeight    : null,
  });
  updateTailwindColors(colorScale);
  updateTailwindRadius(cardRadius, imageRadius);
  updateButtonShape(buttonShape);
  updateMetadata(siteName);

  console.log("\n  \x1b[1m✓ Done!\x1b[0m Run \x1b[36mnpm run dev\x1b[0m to preview your changes.");
  console.log("  Tip: fine-tune the full color scale at \x1b[4mhttps://uicolors.app\x1b[0m\n");
}

main().catch((err) => {
  console.error("\n  \x1b[31mError:\x1b[0m", err.message);
  process.exit(1);
});
