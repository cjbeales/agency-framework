# Customizing This Framework

This guide covers the minimal set of changes needed to rebrand this project for a new client.

---

## 1. Brand Colors

Edit `tailwind.config.js` → `theme.extend.colors.brand`.

The brand palette is used throughout buttons, badges, eyebrows, and links. Swap the color scale to match the client's primary color.

```js
brand: {
  50:  "#...",
  100: "#...",
  // ...
  600: "#...", // primary button background, links
  700: "#...", // hover states
},
```

Use a tool like [uicolors.app](https://uicolors.app) to generate a full scale from a single hex value.

---

## 2. Fonts

Edit `styles/fonts.ts`.

Swap the Google Font imports. The CSS variable names (`--font-display`, `--font-body`) stay the same — no other files need updating.

```ts
// Display font: typically used for headings
export const displayFont = Bebas_Neue({ ... });

// Body font: used for all body text
export const bodyFont = Open_Sans({ ... });
```

Browse fonts at [fonts.google.com](https://fonts.google.com).

---

## 3. Button Shape & Size

Edit `styles/buttons.ts`.

- **Shape**: Change `rounded-full` in `base` to `rounded-md`, `rounded-lg`, etc.
- **Padding / text size**: Edit the `sizes` object (`sm`, `md`, `lg`).
- **Colors**: Edit the `primary` and `secondary` variant strings.

---

## 4. Card & Image Radius

Edit `tailwind.config.js` → `theme.extend.borderRadius`.

```js
borderRadius: {
  card: "1rem",   // used by Card component
  image: "1.5rem", // used by project cards and images
},
```

Set both to `"0.5rem"` for a sharper look, or `"0"` for fully square corners.

---

## 5. Spacing & Layout

Edit `tailwind.config.js` → `theme.extend.spacing` and `theme.extend.maxWidth`.

- `section` / `section-sm` / `section-lg` — vertical padding on page sections
- `page` — max width of the main content container (default 1200px)
- `narrow` — max width for prose/text-focused layouts (default 760px)

---

## 6. Typography Scale

Edit `styles/typography.ts`.

Each key maps to a component variant:

| Key | Used by |
|---|---|
| `display` | `<Heading variant="display">` |
| `h1`–`h4` | `<Heading variant="h1">` etc. |
| `bodyLg` / `body` / `bodySm` | `<Text>` component |
| `eyebrow` | `<SectionHeading>` eyebrow label |
| `caption` | Small labels and captions |

Letter spacing for `caption` and `eyebrow` is controlled by `tracking-caption` and `tracking-eyebrow` in `tailwind.config.js`.

---

## 7. Dark Mode

Dark mode support is enabled (`darkMode: "class"` in `tailwind.config.js`). To activate it, add the `dark` class to the `<html>` element in `app/layout.tsx`.

Extend the color tokens in `tailwind.config.js` with `dark:` variants in components as needed.

---

## Summary Checklist

- [ ] `tailwind.config.js` — brand colors, border radius, spacing, max widths, letter spacing
- [ ] `styles/fonts.ts` — display and body font
- [ ] `styles/buttons.ts` — button shape, padding, size defaults
- [ ] `styles/typography.ts` — heading and body text styles
