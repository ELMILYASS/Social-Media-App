/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        main: "#6534d9",
        second: "rgb(215, 187, 245)",
        dark: "#31344f",
        backgroundGray: "#eceef2",
        gray: "#5d5d5d",
      },
      shadow: "shadow-[0_10px_30px_rgb(0,0,0,0.2)]",
    },
  },
  plugins: [],
};
