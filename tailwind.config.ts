// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // Use "media" for system-based dark mode
  plugins: [heroui(), require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // Optional DaisyUI customization
  },
};
