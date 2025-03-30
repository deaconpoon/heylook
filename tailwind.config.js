/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "look-blue": "var(--look-blue)",
        "look-pink": "var(--look-pink)",
        "look-purple": "var(--look-purple)",
        "soft-cream": "var(--soft-cream)",
        "neutral-gray": "var(--neutral-gray)",
        "dark-gray": "var(--dark-gray)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
    },
  },
  plugins: [],
};
