import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },

      colors: {
        brand: {
          50: "#f8f6f9",
          100: "#f2ebf4",
          200: "#e3d1eb",
          300: "#d1a6e3",
          400: "#be6cdf",
          500: "#b037e1",
          600: "#9d17d4",
          700: "#7c16a6",
          800: "#5d147b",
          900: "#48125e",
          950: "#310e3f",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f7f8fa",
          soft: "#f2f4f7",
          inverse: "#0f172a",
        },
        text: {
          DEFAULT: "#0f172a",
          muted: "#475569",
          soft: "#64748b",
          inverse: "#ffffff",
        },
        border: {
          DEFAULT: "#e2e8f0",
          strong: "#cbd5e1",
        },
        success: "#16a34a",
        warning: "#f59e0b",
        danger: "#dc2626",
      },

      maxWidth: {
        page: "1200px",
        wide: "1400px",
        narrow: "760px",
        prose: "68ch",
      },

      spacing: {
        section: "5rem",
        "section-sm": "3.5rem",
        "section-lg": "7rem",
        container: "1.25rem",
      },

      borderRadius: {
        card: "2",
        image: "1",
      },

      boxShadow: {
        soft: "0 8px 30px rgba(15, 23, 42, 0.06)",
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
        float: "0 18px 60px rgba(15, 23, 42, 0.12)",
      },

      letterSpacing: {
        display: "0.02em",
        caption: "0.14em",
        eyebrow: "0.18em",
      },

      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "hero-grid": "32px 32px",
      },
    },
  },
  plugins: [typography],
};

export default config;
