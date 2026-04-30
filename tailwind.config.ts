import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme palette — single accent, used sparingly.
        bg: {
          DEFAULT: "#FFFFFF",
          alt: "#FAFAF8",
        },
        ink: {
          DEFAULT: "#06101F", // primary text — deep navy
          2: "#3A4658",       // secondary copy
          3: "#7A8499",       // muted labels
          4: "#B7BFCE",       // very muted (corner markers)
        },
        accent: {
          DEFAULT: "#0EA5E9", // electric sky — readable on white
          2: "#0284C7",       // hover/deeper
          soft: "#E0F2FE",    // light tint
        },
        line: {
          DEFAULT: "rgba(6,16,31,0.08)",
          2: "rgba(6,16,31,0.16)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.035em",
      },
      maxWidth: {
        page: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
