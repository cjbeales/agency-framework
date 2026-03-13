export const cards = {
  base: "rounded-xl2 border border-border bg-surface p-6 shadow-soft",

  interactive:
    "rounded-xl2 border border-border bg-surface p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card",

  project:
    "group overflow-hidden rounded-xl3 border border-border bg-surface shadow-soft transition hover:-translate-y-1 hover:shadow-card",

  soft: "rounded-xl2 bg-surface-muted p-6",

  dark: "rounded-xl2 bg-surface-inverse p-6 text-text-inverse",
} as const;
