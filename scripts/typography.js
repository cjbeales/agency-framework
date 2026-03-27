#!/usr/bin/env node

/**
 * Agency Framework — Typography only (fonts)
 *
 * Run with: npm run typography
 *
 * Same font prompts as `npm run theme`, but skips colours, radius, buttons,
 * and site metadata. Only writes styles/fonts.ts when something changed.
 */

const readline = require("readline");
const { readCurrentFonts, writeFontsFile } = require("./lib/theme-fonts");

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function prompt(rl, label, currentValue) {
  const displayDefault =
    currentValue !== ""
      ? `\x1b[2m[${currentValue}]\x1b[0m `
      : "\x1b[2m[blank]\x1b[0m ";
  const raw = await ask(rl, `  ${label} ${displayDefault}: `);
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : currentValue;
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  console.log("\n\x1b[1m┌─────────────────────────────────────────┐\x1b[0m");
  console.log("\x1b[1m│   Agency Framework — Typography         │\x1b[0m");
  console.log("\x1b[1m└─────────────────────────────────────────┘\x1b[0m");
  console.log("  Display + body fonts only (same as theme flow).");
  console.log("  Current values in [brackets]. Enter keeps them.\n");

  const currentFonts = readCurrentFonts();

  const displayName = await prompt(
    rl,
    "Display font — Google Fonts name",
    currentFonts.displayName
  );
  const displayWeightDefault =
    displayName !== currentFonts.displayName ? "400" : currentFonts.displayWeight;
  const displayWeight = await prompt(
    rl,
    "Display font weight — e.g. 400, 700 (blank = variable font only)",
    displayWeightDefault
  );
  console.log();
  const bodyName = await prompt(
    rl,
    "Body font — Google Fonts name",
    currentFonts.bodyName
  );
  const bodyWeightDefault =
    bodyName !== currentFonts.bodyName ? "400" : currentFonts.bodyWeight ?? "";
  const bodyWeight = await prompt(
    rl,
    "Body font weight — e.g. 400, 700 (blank = variable font only)",
    bodyWeightDefault
  );

  rl.close();

  const fontsChanged =
    displayName !== currentFonts.displayName ||
    displayWeight !== currentFonts.displayWeight ||
    bodyName !== currentFonts.bodyName ||
    bodyWeight !== (currentFonts.bodyWeight ?? "");

  console.log("\n  Checking for changes...\n");

  if (!fontsChanged) {
    console.log("  No changes — styles/fonts.ts is unchanged.\n");
    return;
  }

  writeFontsFile({
    displayName,
    displayWeight: displayWeight.length > 0 ? displayWeight : null,
    bodyName,
    bodyWeight: bodyWeight.length > 0 ? bodyWeight : null,
  });
  console.log("  \x1b[32m✓\x1b[0m styles/fonts.ts");
  console.log("\n  \x1b[1m✓ Done!\x1b[0m Run \x1b[36mnpm run dev\x1b[0m to preview.\n");
}

main().catch((err) => {
  console.error("\n  \x1b[31mError:\x1b[0m", err.message);
  process.exit(1);
});
