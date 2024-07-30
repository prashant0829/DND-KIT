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
        customBlue: {
          1: "#4139c3",
          2: "#c0c2ec",
          3: "#4148af",
          4: "#2C1FBD",
          5: "#8284D4",
          6: "#232896",
        },
        neutral: {
          1: "#FFFFFF",
          2: "#F5F5F5",
          3: "#D3D3D3",
          4: "#4B4B4B",
          5: "#000000",
        },
        teal: {
          1: "#30B8AA",
          2: "#84D9CC",
        },
        green: {
          1: "#2ECC71",
          2: "#A5D6A7",
        },
        yellow: {
          1: "#F1C40F",
          2: "#F7DC6F",
        },
        orange: {
          1: "#E67E22",
          2: "#F0B27A",
        },
        red: {
          1: "#E74C3C",
          2: "#F5B7B1",
        },
        customGray: { 1: "#7b8596" },
      },
    },
  },
  plugins: [],
};
