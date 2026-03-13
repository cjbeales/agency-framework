# Design System

This document defines the visual and layout rules for the project.  
All components and sections must follow these tokens and patterns.

The goal is **consistency, speed, and reusability across client projects.**

---

# Design Principles

1. **Consistency over novelty**
2. **Reusable patterns over bespoke layouts**
3. **Readable typography**
4. **Minimal visual noise**
5. **Mobile-first responsive layouts**

---

# Typography

## Font Families

Display / Headings:

- Bebas Neue (or chosen display font)

Body / UI text:

- Open Sans (or chosen body font)

Fallback stack:

system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial

---

## Type Scale

Display
Hero Title
Section Title
Subheading
Body Large
Body
Small
Caption

Use **consistent scale steps** and avoid arbitrary font sizes.

---

## Typography Rules

Headings should:

- use tighter line-height
- use slightly increased tracking
- avoid long multi-line blocks

Body text should:

- use comfortable line height
- max width of ~65 characters
- use readable contrast

---

# Colour System

Colours are defined in Tailwind theme tokens.

### Colour Groups

Primary
Secondary
Accent
Surface
Muted
Border
Text

Example structure:

Primary:

- primary-500
- primary-600

Surface:

- surface-default
- surface-muted
- surface-inverse

Text:

- text-primary
- text-muted
- text-inverse

---

# Spacing System

Spacing should always use the design scale.

Example scale:

xs
sm
md
lg
xl
2xl
3xl

Spacing should never use **arbitrary pixel values** unless absolutely necessary.

Bad:

mt-[37px]

Good:

mt-lg

---

# Container System

Standard containers:

### Page Container

Used for most content sections.

Max width:
~1200px

### Narrow Container

Used for text-heavy sections.

Max width:
~720px

### Wide Container

Used for image-heavy layouts.

Max width:
~1400px

---

# Section Spacing

Standard vertical spacing:

Small section:

py-section-sm

Default section:

py-section

Large section:

py-section-lg

Sections should not define their own arbitrary padding.

---

# Border Radius

Use consistent radii:

sm
md
lg
xl

Avoid introducing additional radius values.

---

# Shadows

Use predefined shadows only.

Examples:

shadow-card
shadow-soft
shadow-lg

---

# Buttons

Primary Button  
Secondary Button  
Ghost Button

Rules:

Buttons must use the `Button` component.

Do not create inline button styles.

---

# Cards

Cards should follow a shared pattern:

- consistent padding
- consistent radius
- consistent shadow
- consistent hover behaviour

Cards should be implemented using the `Card` component.

---

# Image Handling

Images must:

- include alt text
- use Next.js Image where possible
- use consistent aspect ratios

Avoid layout shift.

---

# Accessibility

Always:

- use semantic HTML
- include alt text
- ensure colour contrast
- use proper heading order
- ensure focus states exist

---

# Responsive Rules

Design mobile first.

Typical breakpoints:

sm
md
lg
xl
2xl

Do not introduce custom breakpoints unless necessary.

---

# Design System Rules

Components must:

- use tokens
- avoid arbitrary values
- use layout primitives
- remain reusable
