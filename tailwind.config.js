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
          50: "#f6f8f9",
          100: "#ebf1f4",
          200: "#d0e1ec",
          300: "#a4cce5",
          400: "#69b4e2",
          500: "#33a1e6",
          600: "#0e6eaa",
          700: "#1270aa",
          800: "#11547e",
          900: "#104161",
          950: "#0c2c40",
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
