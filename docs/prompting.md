# AI Prompting Guide

This document defines how AI tools should be used within this project.

The goal is to ensure AI-generated code:

- follows the design system
- uses existing components
- remains maintainable
- avoids inconsistent styling patterns

AI tools may include:

- ChatGPT
- Cursor
- Copilot
- other AI coding assistants

---

# General Rules

When generating code, AI should:

- follow the design system defined in `/docs/design-system.md`
- follow component rules in `/docs/component-rules.md`
- reuse existing primitives whenever possible
- avoid arbitrary spacing or styling
- produce complete files unless otherwise requested
- prefer server components unless interaction is required

AI should not:

- invent new visual patterns
- introduce inconsistent naming
- bypass existing primitives
- hardcode styles outside the design token system

---

# Generating Sections

Use this prompt pattern when creating new marketing sections.

Prompt example:

Create a reusable marketing section for a Next.js + Tailwind project.

Requirements:

- use the `Section` layout component
- use the `Container` layout component
- use the `SectionHeading` component for titles
- responsive layout
- accessible markup
- Tailwind utilities only
- TypeScript props

Return:

1. complete component file
2. TypeScript props interface
3. example mock data

Sections should be reusable across multiple client projects.

---

# Refactoring Components

Use AI to improve code consistency.

Prompt example:

Refactor this component so it matches the design system.

Goals:

- remove duplicated layout patterns
- reuse existing layout primitives
- remove arbitrary values
- simplify the code where possible

Return:

1. refactored component
2. explanation of changes
3. any design system violations discovered

---

# Creating CMS Schemas

AI can generate CMS schemas alongside frontend components.

Prompt example:

Create a Sanity schema and matching React section component.

Return:

1. Sanity schema object
2. TypeScript interface
3. GROQ query
4. React component
5. example mock data

Schema fields should remain simple and editor-friendly.

---

# Section Planning Prompts

AI can help plan page structures before building components.

Prompt example:

Propose a marketing page structure for a web development agency.

Include:

- recommended section order
- purpose of each section
- suggested content for each section
- where CTAs should appear

Optimise for:

- clarity
- trust
- conversion
- reusable section architecture

---

# Code Review Prompts

AI can also act as a consistency checker.

Useful prompts include:

Review this component for design system violations.

Identify duplicated layout patterns in this file.

Suggest which parts of this code should become reusable components.

Check if this component follows the project component rules.

---

# AI Usage Philosophy

AI should primarily assist with:

- scaffolding components
- refactoring repeated patterns
- generating schemas
- checking consistency
- suggesting improvements

AI should not:

- override established architecture
- introduce new styling conventions
- create overly complex abstractions
- ignore existing system rules

The goal is to keep the project **predictable, scalable, and reusable across future client work**.
