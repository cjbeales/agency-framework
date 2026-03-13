export const buttons = {
  base: "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",

  primary:
    "inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700",

  secondary:
    "inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text hover:bg-surface-muted",

  ghost:
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-text hover:bg-surface-muted",

  link: "text-sm font-semibold text-brand-600 hover:text-brand-700",
} as const;
