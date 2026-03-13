# Content Model

This document defines the Sanity CMS structure used in this project.

The goal is a **simple, scalable content model for brochure-style websites** that can easily be reused for future client projects.

The model prioritises:

- clarity for content editors
- reusability of content
- clean mapping between CMS data and frontend components
- minimal complexity

---

# Core Documents

## Site Settings

Global site configuration.

This document stores settings used across the entire website.

Fields:

- siteName
- logo
- navigation
- footer navigation
- social links
- default SEO settings

There should typically be **only one Site Settings document**.

---

## Page

Represents a standard marketing page.

Fields:

- title
- slug
- seo
- pageBuilder[]

The `pageBuilder` field is an array that allows editors to assemble a page using reusable section components.

Example:

pageBuilder:

- heroSection
- servicesSection
- projectGridSection
- testimonialSection
- ctaSection

This allows flexible page layouts without requiring developers to create unique templates for every page.

---

## Project

Represents a case study or portfolio item.

Fields:

- title
- slug
- client
- summary
- project description
- featured image
- gallery
- technologies (optional)
- results
- tags
- seo

Project documents power:

- project index pages
- featured project sections
- individual project pages

---

## Testimonial

Represents social proof content.

Fields:

- quote
- author
- role
- company
- avatar image

Testimonials may be referenced by sections across the site.

---

# Reusable Objects

These objects are used inside multiple documents or sections.

---

## SEO Object

Fields:

- title
- description
- openGraphImage

This object should be reusable across:

- pages
- projects
- blog posts (if added later)

---

## Button Object

Fields:

- label
- link
- variant

Variants should correspond with frontend button styles such as:

- primary
- secondary
- ghost

---

## Link Object

Fields:

- label
- url

This can be used for navigation items, footer links, or other lists of links.

---

# Section Objects

Each frontend section component should have a matching Sanity schema object.

Examples:

- heroSection
- servicesSection
- featureGridSection
- projectGridSection
- testimonialSection
- statsSection
- faqSection
- ctaSection
- richTextSection

Each section object should:

- match a React component
- contain only the fields needed by that component
- avoid unnecessary nesting
- avoid overly complex field relationships

---

# Page Builder Pattern

Pages are built using a flexible section array.

Example structure:

pageBuilder:

1. heroSection
2. servicesSection
3. projectGridSection
4. testimonialSection
5. ctaSection

This allows editors to:

- reorder sections
- remove sections
- add sections

without needing developer intervention.

---

# Content Modelling Principles

When designing schemas, follow these rules:

Content should be:

- structured
- reusable
- editor-friendly
- minimal

Avoid:

- deeply nested fields
- complex conditional logic
- unnecessary references
- overly abstract content structures

---

# CMS ↔ Frontend Mapping

Every section schema should correspond directly to a frontend component.

Example:

Sanity object: heroSection  
Frontend component: HeroSection.tsx

Sanity object: projectGridSection  
Frontend component: ProjectGridSection.tsx

This predictable mapping makes development faster and easier to maintain.

---

# Editor Experience Guidelines

Sanity schemas should prioritise usability for editors.

Best practices:

- provide clear field titles
- include helpful descriptions
- use previews where possible
- avoid unnecessary fields
- group related fields logically

Good CMS UX improves content quality and reduces client confusion.

---

# Future Extensions

This content model can easily be extended to support:

- blog posts
- resources
- team members
- service pages
- landing pages

The same page builder system can be reused across those page types if needed.
