/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "3xl": "1600px",
      "2xl": "1500px",
      xl: "1280px",
      lg: "1024px",
      md: "860px",
      sm: "640px",
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      custom: ["Poppins", "serif"], // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: "#0182ff",
        white: "#fff",
        black: "#000",
        grey: "#c2c8d0",
        purple: "#8f8ff5",
        darkpurple: "#8181E1",
        lightgrey: "#F3F3F3",
        tablegrey: "#d9d9dae6",
        back: "rgb(239 241 245)",
        yellow: "#EEFF00",
        red: "#FF0000",
        green: "#098200",
      },
    },
  },
  plugins: [],
};
