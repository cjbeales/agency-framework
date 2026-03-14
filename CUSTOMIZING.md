# Customizing This Framework

## Quick start — run the script

After cloning and installing, run:

```bash
npm run customize
```

The script will prompt you for each value and update all the relevant files automatically:

```
┌─────────────────────────────────────────┐
│   Agency Framework — Customize UI       │
└─────────────────────────────────────────┘

  Site name [My Agency]:
  Brand color — primary hex (shade 600) [#1e63e6]:
  Display font — Google Fonts name [Bebas Neue]:
  Display font weight [400]:
  Body font — Google Fonts name [Open Sans]:

  Button shape:
    1. Pill          (rounded-full)
    2. Large         (rounded-xl)
    3. Medium        (rounded-lg)
    4. Small         (rounded-md)
    5. Sharp corners (rounded-none)

  Card border radius [1rem]:
  Image border radius [1.5rem]:
```

Once done, run `npm run dev` to preview.

---

## What gets updated

| Prompt | File updated |
|---|---|
| Site name | `app/layout.tsx` — page metadata |
| Brand color | `tailwind.config.js` — full 11-shade scale generated automatically |
| Display / body font | `styles/fonts.ts` — Google Font imports |
| Button shape | `styles/buttons.ts` — `base` rounded value |
| Card / image radius | `tailwind.config.js` — `borderRadius.card` and `borderRadius.image` |

---

## Manual reference

Use this if you want to make targeted changes without running the script.

### Brand colors → `tailwind.config.js`

```js
colors: {
  brand: {
    600: "#1e63e6", // primary button, links, eyebrows
    700: "#184fba", // hover states
    // ...full scale
  },
}
```

Generate a full scale from a single hex at [uicolors.app](https://uicolors.app).

---

### Fonts → `styles/fonts.ts`

```ts
export const displayFont = Bebas_Neue({ ... }); // headings
export const bodyFont = Open_Sans({ ... });      // body text
```

The CSS variable names (`--font-display`, `--font-body`) are fixed — only the import and font name change. Browse at [fonts.google.com](https://fonts.google.com).

---

### Button shape → `styles/buttons.ts`

Change `rounded-full` in `base` to `rounded-lg`, `rounded-md`, etc.

Adjust `sizes.sm / md / lg` for padding and text size.

---

### Card & image radius → `tailwind.config.js`

```js
borderRadius: {
  card: "1rem",    // Card component
  image: "1.5rem", // project cards and images
},
```

---

### Section spacing → `tailwind.config.js`

```js
spacing: {
  "section":    "5rem",
  "section-sm": "3.5rem",
  "section-lg": "7rem",
},
```

---

### Typography → `styles/typography.ts`

Each key maps to a component variant:

| Key | Used by |
|---|---|
| `display` | `<Heading variant="display">` |
| `h1` – `h4` | `<Heading variant="h1">` etc. |
| `bodyLg` / `body` / `bodySm` | `<Text>` |
| `eyebrow` | `<SectionHeading>` eyebrow label |
| `caption` | Small labels |

Letter spacing for `eyebrow` and `caption` is the `tracking-eyebrow` / `tracking-caption` token in `tailwind.config.js`.

---

### Dark mode

Dark mode is ready (`darkMode: "class"` in `tailwind.config.js`). To activate, add the `dark` class to `<html>` in `app/layout.tsx` and add `dark:` variants to components as needed.

---

## Layout widths → `tailwind.config.js`

```js
maxWidth: {
  page:   "1200px", // main container
  wide:   "1400px", // wide sections
  narrow: "760px",  // prose / text layouts
},
```
