/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryBgLight: "#f9f9f9",
        primaryTextLight: "#242424",
        primaryTextDark: "#f9f9f9",
        primaryBgDark: "#242424",
        secondaryBgLight: "#ddd",
        secondaryBgDark: "#343434",
        tertiaryBgLight: "#eee",
        tertiaryBgDark: "#454545",
        active: "#535bf2",
      },
    },
  },
  plugins: [],
};
