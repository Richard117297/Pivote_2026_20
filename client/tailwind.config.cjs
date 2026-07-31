/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        card: "0 18px 50px rgba(1, 4, 20, 0.34)",
      },
    },
  },
  plugins: [],
};
