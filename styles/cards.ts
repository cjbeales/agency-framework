export const cards = {
  base: "rounded-card border border-border bg-surface p-6 shadow-soft",

  interactive:
    "rounded-card border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card",

  project:
    "group overflow-hidden rounded-image border border-border bg-surface shadow-soft transition hover:-translate-y-1 hover:shadow-card",

  soft: "rounded-card bg-surface-muted p-6",

  dark: "rounded-card bg-surface-inverse p-6 text-text-inverse",
} as const;
