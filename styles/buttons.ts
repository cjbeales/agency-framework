export const buttons = {
  base: "inline-flex gap-1 items-center justify-center rounded-full font-semibold transition cursor-pointer",

  sizes: {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  },

  primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-soft",

  secondary: "bg-surface text-text hover:bg-surface-muted border border-border",

  ghost: "text-text hover:bg-surface-muted",

  link: "text-brand-600 hover:text-brand-700 text-sm underline hover:no-underline cursor-pointer font-semibold",
} as const;
