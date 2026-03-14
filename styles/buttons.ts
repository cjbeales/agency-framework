export const buttons = {
  base: "inline-flex gap-1 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition cursor-pointer",

  primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-soft",

  secondary: "bg-surface text-text hover:bg-surface-muted border border-border",

  ghost: "text-text hover:bg-surface-muted px-4 py-2",

  link: "text-brand-600 hover:text-brand-700 text-sm underline hover:no-underline cursor-pointer font-semibold",
} as const;
