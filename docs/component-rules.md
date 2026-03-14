# Component Rules

This document defines how React components should be structured.

The goal is:

- consistency
- reusability
- maintainability
- predictable AI-generated code

---

# Component Categories

Components are grouped into three categories.

## UI Components

Small reusable elements.

Examples:

Button  
Badge  
Card  
Heading  
Text

Location:

/components/ui

---

## Layout Components

Structural components.

Examples:

Container  
Section  
Stack  
Grid  
Cluster

Location:

/components/layout

---

## Sections

Page-level marketing sections.

Examples:

HeroSection  
ServicesSection  
ProjectGridSection  
TestimonialSection  
CTASection

Location:

/components/sections

---

# Component Design Rules

Components should:

- be small
- be composable
- avoid unnecessary nesting
- avoid excessive props
- prefer clear APIs

---

# Props Guidelines

Use descriptive prop names.

Good:

variant
size
tone
alignment

Bad:

styleType
mode
kind

---

# Variants

Use variants instead of creating multiple components.

Example:

<Button variant="primary" /> <Button variant="secondary" /> ```

Avoid:

PrimaryButton
SecondaryButton

# Layout Primitives

Sections should always use these primitives:

Section
Container
Stack
Grid

Avoid writing raw layout markup repeatedly.

# Headless UI

When creating a new component, check if [Headless UI](https://headlessui.com/) provides a similar component for the same use case. If so, use the Headless UI component as the foundation instead of building from scratch.

Examples: Button, Dialog, Dropdown, Listbox, Tabs, Disclosure.

Wrap Headless UI components with your design system styles (coreStyles) rather than reimplementing their behaviour.

# Styling Rules

Prefer Tailwind utilities.

**Always use the classnames library** for conditional or composed class names. Do not use ternary operators for styling.

Avoid:

inline styles
hardcoded spacing
arbitrary values
ternary operators when applying styling (use classnames instead)

# Composition Pattern

Example:

Section
.Container
..SectionHeading
...Grid
....Card
....Card
....Card

# Server vs Client Components

Prefer Server Components.

Use "use client" only when needed for:

interaction

state

animation

event handling

# File Structure

Component files should:

export default component

export TypeScript props

keep logic simple

Example structure:

component.tsx
component.types.ts (optional)

# Reusability Rule

If a pattern appears 3 or more times, extract it into a reusable component.

Avoid Over Abstraction

Do not create components that:

only wrap a div

only apply a single class

Balance reuse with simplicity.
