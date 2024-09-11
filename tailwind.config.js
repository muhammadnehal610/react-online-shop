/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Correct paths for React components
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Ensure correct NextUI theme paths
  ],
  theme: {
    extend: {}, // Add custom theme configurations here if needed
  },
  darkMode: "class", // Enables dark mode support via 'class' strategy
  plugins: [nextui()], // Properly adding NextUI plugin
};
