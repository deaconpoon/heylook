/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary Colors
        "look-blue": "#3D7AFF",
        "look-pink": "#FF5C87",
        "look-purple": "#7B61FF",

        // Secondary Colors
        "soft-cream": "#FFF3E0",
        "neutral-gray": "#F5F7FA",
        "dark-gray": "#333333",

        // Semantic Colors
        success: "#4CD964",
        warning: "#FF9500",
        error: "#FF3B30",
        info: "#5AC8FA",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        mono: ["SF Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        display: ["2rem", { lineHeight: "1.2" }],
        h1: ["1.5rem", { lineHeight: "1.3" }],
        h2: ["1.25rem", { lineHeight: "1.4" }],
        body: ["1rem", { lineHeight: "1.5" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        tiny: ["0.75rem", { lineHeight: "1.5" }],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      borderRadius: {
        sm: "8px",
        DEFAULT: "8px",
        lg: "16px",
        xl: "16px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.1)",
      },
      spacing: {
        // 8px base unit
        1: "8px",
        2: "16px",
        3: "24px",
        4: "32px",
        6: "48px",
        8: "64px",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to right, #3D7AFF, #7B61FF)",
        "accent-gradient": "linear-gradient(to right, #FF5C87, #FFAA5C)",
      },
      backdropBlur: {
        glass: "10px",
      },
    },
  },
  plugins: [],
};
