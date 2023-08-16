/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        main: "#6534d9",
        second: "rgb(215, 187, 245)",
        // main: "rgb(0,0,0,9)",
        // second: "white",
        dark: "#31344f",
        backgroundGray: "#f4f5f7",
        gray: "#dadce0",
        grayText: "#5d5d5d",
      },
      shadow: "shadow-[0_10px_30px_rgb(0,0,0,0.2)]",
    },
  },
  plugins: [],
};
