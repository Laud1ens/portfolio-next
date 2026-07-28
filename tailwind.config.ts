import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FBF9F5",
        cream: "#F1E7D8",
        beige: "#DFCBAF",
        taupe: "#B79772",
        sage: "#899676",
        brown: "#5B4130",
        "brown-deep": "#3A2A1D",
        rust: "#A9673F",
        ink: "#2C2117",
      },
      fontFamily: {
        display: ["var(--font-bodoni)", "serif"],
        label: ["var(--font-jost)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
