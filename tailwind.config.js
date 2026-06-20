/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#2F3D2C",
        forestDark: "#222D1F",
        moss: "#5B6E4F",
        sage: "#8B9A7A",
        sageLight: "#C9D2B8",
        cream: "#F5F0E4",
        linen: "#FBF8F0",
        wood: "#A9784F",
        woodDark: "#8A5F3C",
        charcoal: "#2B2A26",
        charcoalSoft: "#5A5650",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
