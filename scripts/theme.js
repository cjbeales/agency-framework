#!/usr/bin/env node

/**
 * Agency Framework — Theme Update Script
 *
 * Run with: npm run theme
 *
 * Safe to run on an existing project at any time.
 * Reads the current values from each file and shows them as defaults.
 * Only writes a file if a value actually changed — skips everything else.
 */

const readline = require("readline");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// ─── Color utilities (shared with customize.js) ───────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  h /= 360; s /= 100; l /= 100;
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
  return "#" + [r, g, b].map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("");
}

function generateColorScale(primaryHex) {
  const { r, g, b } = hexToRgb(primaryHex);
  const { h, s } = rgbToHsl(r, g, b);
  const shadeMap = {
    50:  [97, 0.25], 100: [94, 0.35], 200: [87, 0.50],
    300: [77, 0.65], 400: [65, 0.80], 500: [55, 0.92],
    600: null,
    700: [37, 0.95], 800: [28, 0.90], 900: [22, 0.85], 950: [15, 0.80],
  };
  const scale = {};
  for (const [shade, val] of Object.entries(shadeMap)) {
    scale[shade] = val === null ? primaryHex.toLowerCase() : hslToHex(h, s * val[1], val[0]);
  }
  return scale;
}

// ─── Read current values from project files ───────────────────────────────────

function readCurrentBrandColor() {
  try {
    const content = fs.readFileSync(path.join(ROOT, "tailwind.config.js"), "utf8");
    const match = content.match(/600:\s*"(#[0-9a-fA-F]{3,6})"/);
    return match ? match[1] : "#1e63e6";
  } catch { return "#1e63e6"; }
}

function readCurrentRadius() {
  try {
    const content = fs.readFileSync(path.join(ROOT, "tailwind.config.js"), "utf8");
    const cardMatch  = content.match(/card:\s*"([^"]+)"/);
    const imageMatch = content.match(/image:\s*"([^"]+)"/);
    return {
      card:  cardMatch  ? cardMatch[1]  : "1rem",
      image: imageMatch ? imageMatch[1] : "1.5rem",
    };
  } catch { return { card: "1rem", image: "1.5rem" }; }
}

function readCurrentButtonShape() {
  try {
    const content = fs.readFileSync(path.join(ROOT, "styles/buttons.ts"), "utf8");
    const match = content.match(/base:.*?(rounded-[\w-]+)/);
    return match ? match[1] : "rounded-full";
  } catch { return "rounded-full"; }
}

function readCurrentFonts() {
  try {
    const content = fs.readFileSync(path.join(ROOT, "styles/fonts.ts"), "utf8");
    const importMatch = content.match(/import\s*\{\s*(\w+),\s*(\w+)\s*\}/);
    // Capture weight from displayFont and bodyFont blocks separately
    const displayBlock = content.match(/displayFont\s*=[\s\S]*?}\s*\)/)?.[0] ?? "";
    const bodyBlock    = content.match(/bodyFont\s*=[\s\S]*?}\s*\)/)?.[0] ?? "";
    const displayWeightMatch = displayBlock.match(/weight:\s*(?:"([^"]+)"|\[([^\]]+)\])/);
    const bodyWeightMatch    = bodyBlock.match(/weight:\s*(?:"([^"]+)"|\[([^\]]+)\])/);
    return {
      displayName:   importMatch ? importMatch[1].replace(/_/g, " ") : "Bebas Neue",
      displayWeight: displayWeightMatch ? (displayWeightMatch[1] ?? displayWeightMatch[2]?.replace(/["\s]/g, "").split(",")[0]) : "",
      bodyName:      importMatch ? importMatch[2].replace(/_/g, " ") : "Open Sans",
      bodyWeight:    bodyWeightMatch    ? (bodyWeightMatch[1]    ?? bodyWeightMatch[2]?.replace(/["\s]/g, "").split(",")[0]) : "",
    };
  } catch { return { displayName: "Bebas Neue", displayWeight: "400", bodyName: "Open Sans", bodyWeight: "" }; }
}

function readCurrentSiteName() {
  try {
    const content = fs.readFileSync(path.join(ROOT, "app/layout.tsx"), "utf8");
    const match = content.match(/title:\s*"([^"]+)"/);
    return match ? match[1] : "My Agency";
  } catch { return "My Agency"; }
}

// ─── Font utilities ───────────────────────────────────────────────────────────

function toFontIdentifier(name) {
  return name.trim().replace(/\s+/g, "_");
}

// ─── Prompt helpers ───────────────────────────────────────────────────────────

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function prompt(rl, label, currentValue) {
  const displayDefault = currentValue !== "" ? `\x1b[2m[${currentValue}]\x1b[0m ` : "\x1b[2m[blank]\x1b[0m ";
  const raw = await ask(rl, `  ${label} ${displayDefault}: `);
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : currentValue;
}

async function choose(rl, label, options, currentValue) {
  console.log(`\n  ${label}:`);
  options.forEach((o, i) => {
    const isCurrent = o.value === currentValue;
    const marker = isCurrent ? " \x1b[32m← current\x1b[0m" : "";
    console.log(`    ${i + 1}. ${o.label}${marker}`);
  });
  const raw = await ask(rl, `  Choice \x1b[2m[enter to keep current]\x1b[0m: `);
  const trimmed = raw.trim();
  if (trimmed === "") return currentValue;
  const idx = parseInt(trimmed) - 1;
  return options[idx >= 0 && idx < options.length ? idx : 0].value;
}

// ─── File writers (only called when value changed) ────────────────────────────

function writeFontsFile({ displayName, displayWeight, bodyName, bodyWeight }) {
  const displayId       = toFontIdentifier(displayName);
  const bodyId          = toFontIdentifier(bodyName);
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
}

function updateButtonShape(shape) {
  const filePath = path.join(ROOT, "styles/buttons.ts");
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(
    /(base:.*?")([^"]*rounded-[\w-]+)([^"]*)(")/,
    (_, pre, classes, after, close) => pre + classes.replace(/rounded-[\w-]+/, shape) + after + close
  );
  fs.writeFileSync(filePath, content);
}

function updateMetadata(siteName) {
  const filePath = path.join(ROOT, "app/layout.tsx");
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(/title:\s*"[^"]*"/, `title: "${siteName}"`);
  content = content.replace(/description:\s*"[^"]*"/, `description: "${siteName}"`);
  fs.writeFileSync(filePath, content);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n\x1b[1m┌─────────────────────────────────────────┐\x1b[0m");
  console.log("\x1b[1m│   Agency Framework — Update Theme       │\x1b[0m");
  console.log("\x1b[1m└─────────────────────────────────────────┘\x1b[0m");
  console.log("  Current values shown in [brackets].");
  console.log("  Press enter to keep a value unchanged.\n");

  // ── Read current state ─────────────────────────────────────────────────────

  const currentBrand   = readCurrentBrandColor();
  const currentRadius  = readCurrentRadius();
  const currentShape   = readCurrentButtonShape();
  const currentFonts   = readCurrentFonts();
  const currentName    = readCurrentSiteName();

  // ── Prompt ─────────────────────────────────────────────────────────────────

  const siteName     = await prompt(rl, "Site name", currentName);
  console.log();
  const brandHex     = await prompt(rl, "Brand color — primary hex (shade 600)", currentBrand);
  console.log();
  const displayName   = await prompt(rl, "Display font — Google Fonts name", currentFonts.displayName);
  const displayWeightDefault = displayName !== currentFonts.displayName ? "400" : currentFonts.displayWeight;
  const displayWeight = await prompt(rl, "Display font weight — e.g. 400, 700 (blank = variable font only)", displayWeightDefault);
  console.log();
  const bodyName      = await prompt(rl, "Body font — Google Fonts name", currentFonts.bodyName);
  const bodyWeightDefault = bodyName !== currentFonts.bodyName ? "400" : currentFonts.bodyWeight ?? "";
  const bodyWeight    = await prompt(rl, "Body font weight — e.g. 400, 700 (blank = variable font only)", bodyWeightDefault);

  const buttonShape  = await choose(rl, "Button shape", [
    { label: "Pill          (rounded-full)", value: "rounded-full" },
    { label: "Large         (rounded-xl)",   value: "rounded-xl"   },
    { label: "Medium        (rounded-lg)",   value: "rounded-lg"   },
    { label: "Small         (rounded-md)",   value: "rounded-md"   },
    { label: "Sharp corners (rounded-none)", value: "rounded-none" },
  ], currentShape);

  console.log();
  const cardRadius  = await prompt(rl, "Card border radius",  currentRadius.card);
  const imageRadius = await prompt(rl, "Image border radius", currentRadius.image);

  rl.close();

  // ── Apply only what changed ────────────────────────────────────────────────

  const changes = [];
  const skipped = [];

  console.log("\n  Checking for changes...\n");

  // Site name
  if (siteName !== currentName) {
    updateMetadata(siteName);
    changes.push("app/layout.tsx      (site name)");
  } else {
    skipped.push("app/layout.tsx");
  }

  // Brand color
  const hex = brandHex.startsWith("#") ? brandHex : `#${brandHex}`;
  if (hex.toLowerCase() !== currentBrand.toLowerCase()) {
    updateTailwindColors(generateColorScale(hex));
    changes.push("tailwind.config.js  (brand colors)");
  } else {
    skipped.push("tailwind.config.js (brand colors)");
  }

  // Border radius
  if (cardRadius !== currentRadius.card || imageRadius !== currentRadius.image) {
    updateTailwindRadius(cardRadius, imageRadius);
    changes.push("tailwind.config.js  (border radius)");
  } else {
    skipped.push("tailwind.config.js (border radius)");
  }

  // Button shape
  if (buttonShape !== currentShape) {
    updateButtonShape(buttonShape);
    changes.push("styles/buttons.ts   (button shape)");
  } else {
    skipped.push("styles/buttons.ts");
  }

  // Fonts — only rewrite if something actually changed
  const fontsChanged =
    displayName   !== currentFonts.displayName   ||
    displayWeight !== currentFonts.displayWeight  ||
    bodyName      !== currentFonts.bodyName       ||
    bodyWeight    !== (currentFonts.bodyWeight ?? "");

  if (fontsChanged) {
    writeFontsFile({
      displayName,
      displayWeight: displayWeight.length > 0 ? displayWeight : null,
      bodyName,
      bodyWeight:    bodyWeight.length > 0    ? bodyWeight    : null,
    });
    changes.push("styles/fonts.ts     (fonts)");
  } else {
    skipped.push("styles/fonts.ts");
  }

  // ── Summary ────────────────────────────────────────────────────────────────

  if (changes.length === 0) {
    console.log("  No changes made — everything matched the current values.\n");
    return;
  }

  changes.forEach((c) => console.log(`  \x1b[32m✓\x1b[0m ${c}`));

  if (skipped.length > 0) {
    console.log();
    skipped.forEach((s) => console.log(`  \x1b[2m— ${s} (unchanged)\x1b[0m`));
  }

  console.log("\n  \x1b[1m✓ Done!\x1b[0m Run \x1b[36mnpm run dev\x1b[0m to preview your changes.");
  if (changes.some((c) => c.includes("brand colors"))) {
    console.log("  Tip: fine-tune the full color scale at \x1b[4mhttps://uicolors.app\x1b[0m");
  }
  console.log();
}

main().catch((err) => {
  console.error("\n  \x1b[31mError:\x1b[0m", err.message);
  process.exit(1);
});
