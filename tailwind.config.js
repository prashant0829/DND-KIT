/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight: {
        0: "0",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
      },
      colors: {
        customBlue: { 1: "#4139c3", 2: "#c0c2ec", 3: "#4148af" },
        customGray: { 1: "#7b8596" },
      },
    },
  },
  plugins: [],
};
