# Section Inventory

This document lists all reusable marketing sections available in the system.

Sections should be **generic, flexible, and reusable across multiple client projects**.

Every section should:

- use the layout primitives (Section, Container, Stack, Grid)
- follow the design system
- remain content-driven where possible
- avoid project-specific styling

Sections should live in:

/components/sections

Each section should have a corresponding Sanity schema object where appropriate.

---

# Hero Section

Purpose:
Introduce the page and communicate the primary value proposition.

Typical content:

- eyebrow (optional)
- title
- description
- primary CTA
- secondary CTA
- image or illustration

Possible variants:

- centered hero
- split layout (text + image)
- minimal hero
- hero with background media

Notes:

Hero sections should prioritise strong hierarchy and clear CTAs.

---

# Logo Cloud

Purpose:
Display brand trust by showing client or partner logos.

Typical content:

- optional heading
- grid of logos

Layout:

- responsive logo grid
- equal spacing
- consistent logo sizing

Notes:

Logos should generally appear in muted colours to avoid visual noise.

---

# Services Section

Purpose:
Explain the services or offerings provided.

Typical content:

- section heading
- grid of services
- icon or visual
- service title
- service description

Layout:

Typically displayed as a 3 or 4 column grid on desktop.

---

# Feature Grid

Purpose:
Highlight key benefits or capabilities.

Typical content:

- icon
- title
- description

Layout:

Often used in:

- 3 column grid
- 2 column grid
- stacked mobile layout

---

# Project Grid

Purpose:
Display case studies or portfolio items.

Typical content:

- project card
- image
- title
- short description
- category or tag
- link to case study

Layout:

Responsive grid of project cards.

This section should be able to pull projects dynamically from the CMS.

---

# Featured Project

Purpose:
Highlight one specific case study.

Typical content:

- large image
- project description
- key results
- CTA to case study

Layout:

Typically a split layout with image and text.

---

# Process Section

Purpose:
Explain the workflow or process used for projects.

Typical content:

- numbered steps
- title
- description
- optional icon

Layout:

Often displayed as:

- horizontal step layout
- vertical step list
- timeline style layout

---

# Testimonial Section

Purpose:
Provide social proof through client testimonials.

Typical content:

- quote
- author name
- role
- company
- avatar image

Layout:

Possible formats:

- single featured testimonial
- testimonial carousel
- grid of testimonials

---

# Stats Section

Purpose:
Display measurable results or achievements.

Typical content:

- stat value
- stat label
- optional short description

Examples:

- "200+ Projects"
- "5x Conversion Increase"
- "98% Client Satisfaction"

Layout:

Usually displayed in a horizontal grid.

---

# FAQ Section

Purpose:
Answer common questions and reduce conversion friction.

Typical content:

- question
- answer

Layout:

Typically implemented as an accordion.

---

# CTA Section

Purpose:
Encourage visitors to take action.

Typical content:

- headline
- supporting text
- CTA button

Examples of actions:

- contact
- schedule call
- start project
- request quote

CTA sections are typically placed:

- mid-page
- near the end of a page

---

# Rich Text Section

Purpose:
Display editorial content.

Typical content:

- heading
- rich text body

Used for:

- about pages
- long form content
- policy pages

Content should come from the CMS.

---

# Image + Text Section

Purpose:
Explain a concept with supporting visuals.

Typical content:

- heading
- description
- image

Layout:

Usually split layout:

Text | Image

or

Image | Text

---

# Section Design Guidelines

All sections should follow these rules:

- use the Section layout component
- wrap content in Container
- maintain consistent spacing
- remain responsive
- avoid hardcoded layout values

---

# Reusability Principles

Sections should be designed so they can:

- appear on multiple pages
- accept different content
- adapt to different use cases

Avoid building sections that are too specific to a single page.

---

# Adding New Sections

Before creating a new section, consider:

1. Can an existing section be reused?
2. Can an existing section be extended with a variant?
3. Will this section be useful for future client projects?

Only create new sections when necessary.

# Section Naming Convention

All section components should follow this naming format:

HeroSection
ServicesSection
ProjectGridSection
TestimonialSection
CTASection
FAQSection

File naming:

hero-section.tsx  
services-section.tsx  
project-grid-section.tsx
