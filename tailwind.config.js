/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBgLight: "#f8f9fa",
        primaryTextLight: "#151515",
        primaryTextDark: "#f8f9fa",
        primaryBgDark: "#151515",
        secondaryBgLight: "#ddd",
        secondaryBgDark: "#343434",
        tertiaryBgLight: "#eee",
        tertiaryBgDark: "#454545",
        transactionBgDark: "#111111",
        transactionGray: "#bbbbbb",
        transactionBgLight: "#111111",
        activeLight: "#0784c3",
        activeDark: "#6ab5db",
      },
    },
  },
  plugins: [],
};
