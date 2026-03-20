"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

// ─── Font catalogue ───────────────────────────────────────────────────────────

type Font = { name: string; weights: string };

const FONTS: Font[] = [
  { name: "Inter",              weights: "400;500;600;700" },
  { name: "Roboto",             weights: "400;700"         },
  { name: "Open Sans",          weights: "400;600;700"     },
  { name: "Lato",               weights: "400;700"         },
  { name: "Montserrat",         weights: "400;600;700"     },
  { name: "Poppins",            weights: "400;600;700"     },
  { name: "Raleway",            weights: "400;600;700"     },
  { name: "Nunito",             weights: "400;600;700"     },
  { name: "DM Sans",            weights: "400;500;700"     },
  { name: "Source Sans 3",      weights: "400;600;700"     },
  { name: "Oswald",             weights: "400;600;700"     },
  { name: "Bebas Neue",         weights: "400"             },
  { name: "Anton",              weights: "400"             },
  { name: "Barlow",             weights: "400;600;700"     },
  { name: "Merriweather",       weights: "400;700"         },
  { name: "Playfair Display",   weights: "400;700"         },
  { name: "Lora",               weights: "400;700"         },
  { name: "Libre Baskerville",  weights: "400;700"         },
  { name: "Crimson Pro",        weights: "400;600;700"     },
  { name: "Ubuntu",             weights: "400;700"         },
];

// ─── Suggested sizes (industry best practice per font) ────────────────────────
//
// Display: condensed/display fonts can go larger; editorial serifs sit lower.
// Body: serifs typically need +1–2px over their sans-serif equivalents for the
//       same perceived size due to ink trap and x-height differences.

const DISPLAY_SUGGESTIONS: Record<string, number> = {
  "Bebas Neue":        68,  // condensed all-caps — benefits from scale
  "Anton":             64,  // bold condensed — very tight at small sizes
  "Oswald":            56,  // condensed — slightly smaller than pure display
  "Barlow":            52,
  "Raleway":           52,
  "Montserrat":        52,
  "Playfair Display":  48,  // editorial serif — elegant at moderate scale
  "Merriweather":      44,  // optimised for reading, not huge display use
  "Lora":              44,
  "Libre Baskerville": 44,
  "Crimson Pro":       48,
};
const DISPLAY_DEFAULT = 48;

const BODY_SUGGESTIONS: Record<string, number> = {
  "Merriweather":      17,  // slightly large x-height needs a touch more space
  "Lora":              18,  // generous x-height, works well at 18
  "Crimson Pro":       18,
  "Libre Baskerville": 17,
  "Playfair Display":  17,
  "Bebas Neue":        14,  // not ideal for body — flag it
  "Anton":             14,
  "Oswald":            15,
  "Barlow":            15,
};
const BODY_DEFAULT = 16;

// Fonts that aren't designed for body use — shown with a warning
const DISPLAY_ONLY_FONTS = new Set(["Bebas Neue", "Anton"]);

function suggestDisplay(font: Font | null) {
  if (!font) return DISPLAY_DEFAULT;
  return DISPLAY_SUGGESTIONS[font.name] ?? DISPLAY_DEFAULT;
}

function suggestBody(font: Font | null) {
  if (!font) return BODY_DEFAULT;
  return BODY_SUGGESTIONS[font.name] ?? BODY_DEFAULT;
}

// ─── DOM helpers ──────────────────────────────────────────────────────────────

function injectFont(font: Font) {
  const id = `gf-${font.name.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const family = font.name.replace(/ /g, "+");
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family}:wght@${font.weights}&display=swap`;
  document.head.appendChild(link);
}

// Injected once — overrides only activate when the matching class is on <html>.
// Using !important is intentional: this is a demo tool overriding Tailwind utilities.
function ensureSizeStylesheet() {
  if (document.getElementById("demo-size-overrides")) return;
  const style = document.createElement("style");
  style.id = "demo-size-overrides";
  style.textContent = `
    .demo-display-size h1,
    .demo-display-size h2,
    .demo-display-size h3,
    .demo-display-size h4,
    .demo-display-size h5,
    .demo-display-size h6 {
      font-size: var(--demo-display-size) !important;
      line-height: 1.1 !important;
    }
    .demo-body-size p {
      font-size: var(--demo-body-size) !important;
      line-height: 1.65 !important;
    }
  `;
  document.head.appendChild(style);
}

function applyFontVar(variable: string, font: Font | null) {
  if (font) {
    injectFont(font);
    document.documentElement.style.setProperty(variable, `"${font.name}", sans-serif`);
  } else {
    document.documentElement.style.removeProperty(variable);
  }
}

function applyDisplaySize(px: number | null) {
  ensureSizeStylesheet();
  if (px !== null) {
    document.documentElement.style.setProperty("--demo-display-size", `${px}px`);
    document.documentElement.classList.add("demo-display-size");
  } else {
    document.documentElement.style.removeProperty("--demo-display-size");
    document.documentElement.classList.remove("demo-display-size");
  }
}

function applyBodySize(px: number | null) {
  ensureSizeStylesheet();
  if (px !== null) {
    document.documentElement.style.setProperty("--demo-body-size", `${px}px`);
    document.documentElement.classList.add("demo-body-size");
  } else {
    document.documentElement.style.removeProperty("--demo-body-size");
    document.documentElement.classList.remove("demo-body-size");
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FontSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (name: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-caption text-text-soft">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer rounded-card border border-border bg-surface px-3 py-2.5 text-sm text-text transition focus:outline-none focus:ring-2 focus:ring-brand-600"
      >
        <option value="">— current (from styles/fonts.ts)</option>
        {FONTS.map((f) => (
          <option key={f.name} value={f.name}>{f.name}</option>
        ))}
      </select>
    </div>
  );
}

function SizeSlider({
  label,
  value,
  min,
  max,
  step,
  suggested,
  isDisplayOnly,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suggested: number;
  isDisplayOnly?: boolean;
  onChange: (px: number) => void;
}) {
  const atSuggested = value === suggested;
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-caption text-text-soft">
          {label}
        </label>
        <span className="font-mono text-xs font-semibold text-text">
          {value}px
        </span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-brand-100 accent-brand-600"
        style={{
          background: `linear-gradient(to right, var(--tw-gradient-stops, #1e63e6) ${pct}%, #dbeafe ${pct}%)`,
        }}
      />

      {/* Suggested pill */}
      <div className="flex items-center gap-2">
        {atSuggested ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-700">
            ✓ Suggested for this font
          </span>
        ) : (
          <button
            onClick={() => onChange(suggested)}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-brand-200 px-2.5 py-0.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
          >
            ↩ Snap to suggested ({suggested}px)
          </button>
        )}
        {isDisplayOnly && (
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
            Display font only
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function FontSwitcher() {
  const [displayFont, setDisplayFont] = useState<Font | null>(null);
  const [bodyFont,    setBodyFont]    = useState<Font | null>(null);
  const [displaySize, setDisplaySize] = useState<number | null>(null);
  const [bodySize,    setBodySize]    = useState<number | null>(null);

  // Resolved slider values (use state or fall back to defaults for the UI)
  const displaySlider = displaySize ?? suggestDisplay(displayFont);
  const bodySlider    = bodySize    ?? suggestBody(bodyFont);

  // Apply font family changes
  useEffect(() => applyFontVar("--font-display", displayFont), [displayFont]);
  useEffect(() => applyFontVar("--font-body",    bodyFont),    [bodyFont]);

  // Apply size changes
  useEffect(() => applyDisplaySize(displaySize), [displaySize]);
  useEffect(() => applyBodySize(bodySize),        [bodySize]);

  const hasChanges = displayFont !== null || bodyFont !== null
    || displaySize !== null || bodySize !== null;

  function handleClear() {
    setDisplayFont(null);
    setBodyFont(null);
    setDisplaySize(null);
    setBodySize(null);
  }

  function findFont(name: string): Font | null {
    return FONTS.find((f) => f.name === name) ?? null;
  }

  return (
    <div className="rounded-card border border-brand-200 bg-brand-50 p-6">
      <div className="flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-caption text-brand-600">
              Demo tool
            </p>
            <p className="mt-0.5 font-body text-lg font-semibold text-text">
              Font Switcher
            </p>
            <p className="mt-1 font-body text-sm text-text-muted">
              Select fonts and adjust sizes. Suggested sizes are based on each
              font&apos;s design intent and industry defaults.
            </p>
          </div>
          <button
            onClick={handleClear}
            disabled={!hasChanges}
            className={classNames(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition",
              hasChanges
                ? "cursor-pointer border-brand-300 text-brand-700 hover:bg-brand-100"
                : "cursor-not-allowed border-border text-text-soft opacity-40"
            )}
          >
            ↩ Clear all
          </button>
        </div>

        {/* Font selectors + sliders */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">

          {/* Display column */}
          <FontSelect
            label="Display font (headings)"
            value={displayFont?.name ?? ""}
            onChange={(name) => {
              const font = findFont(name);
              setDisplayFont(font);
              setDisplaySize(font ? suggestDisplay(font) : null);
            }}
          />
          <SizeSlider
            label="Display size"
            value={displaySlider}
            min={28}
            max={96}
            step={2}
            suggested={suggestDisplay(displayFont)}
            onChange={(px) => setDisplaySize(px)}
          />

          {/* Body column */}
          <FontSelect
            label="Body font"
            value={bodyFont?.name ?? ""}
            onChange={(name) => {
              const font = findFont(name);
              setBodyFont(font);
              setBodySize(font ? suggestBody(font) : null);
            }}
          />
          <SizeSlider
            label="Body size"
            value={bodySlider}
            min={12}
            max={24}
            step={1}
            suggested={suggestBody(bodyFont)}
            isDisplayOnly={bodyFont ? DISPLAY_ONLY_FONTS.has(bodyFont.name) : false}
            onChange={(px) => setBodySize(px)}
          />
        </div>

        {/* Live preview */}
        <div className="rounded-card border border-brand-100 bg-surface px-6 py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-caption text-text-soft">
            Preview
          </p>
          {/* Inline styles here so preview always reflects exact slider values */}
          <p
            className="font-display uppercase tracking-display text-text"
            style={{ fontSize: displaySlider, lineHeight: 1.1 }}
          >
            {displayFont ? displayFont.name : "Display heading"}
          </p>
          <p
            className="font-body mt-3 text-text-muted"
            style={{ fontSize: bodySlider, lineHeight: 1.65 }}
          >
            {bodyFont ? bodyFont.name : "Body font"} — the quick brown fox
            jumps over the lazy dog. Adjust both sliders to judge the
            combination at a glance.
          </p>
        </div>

        {/* Active pills */}
        {hasChanges && (
          <div className="flex flex-wrap gap-2">
            {displayFont && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                Display: {displayFont.name}
                {displaySize !== null && ` · ${displaySize}px`}
                <button
                  onClick={() => { setDisplayFont(null); setDisplaySize(null); }}
                  className="cursor-pointer opacity-60 hover:opacity-100"
                  aria-label="Remove display font"
                >✕</button>
              </span>
            )}
            {bodyFont && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                Body: {bodyFont.name}
                {bodySize !== null && ` · ${bodySize}px`}
                <button
                  onClick={() => { setBodyFont(null); setBodySize(null); }}
                  className="cursor-pointer opacity-60 hover:opacity-100"
                  aria-label="Remove body font"
                >✕</button>
              </span>
            )}
            {displaySize !== null && !displayFont && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                Display size: {displaySize}px
                <button
                  onClick={() => setDisplaySize(null)}
                  className="cursor-pointer opacity-60 hover:opacity-100"
                  aria-label="Remove display size"
                >✕</button>
              </span>
            )}
            {bodySize !== null && !bodyFont && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                Body size: {bodySize}px
                <button
                  onClick={() => setBodySize(null)}
                  className="cursor-pointer opacity-60 hover:opacity-100"
                  aria-label="Remove body size"
                >✕</button>
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
