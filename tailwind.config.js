const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        light: "rgb(var(--light-rgb, 255, 255, 255))",
        dark: "rgb(var(--dark-rgb, 17, 24, 39))",
        primary: "rgb(var(--primary-rgb, 0, 149, 239))",
        secondary: "rgb(var(--secondary-rgb, 9, 193, 225))",
        tertiary: "rgb(var(--tertiary-rgb, 1, 21, 50))",
        accent: "rgb(var(--accent-rgb, 230, 55, 70))",
        gray: {
          100: "#f5f5f5",
          200: "#d8d8d8",
          300: "#bbbbbb",
          400: "#9e9e9e",
          500: "#818181",
          600: "#646464",
          700: "#474747",
          800: "#2a2a2a",
          900: "#0d0d0d",
        },
      },
      screens: {
        xs: "360px",
        lg: "1080px",
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    plugin(function ({ addComponents }) {
      const components = {
        ".text-color": { "@apply text-primary dark:text-secondary": {} },
        ".bg-color": { "@apply bg-primary dark:bg-secondary": {} },
        ".border-color": { "@apply border-primary dark:border-secondary": {} },
      };

      for (let i = 0; i < 10; i++) {
        for (const prop of ["bg"]) {
          components[`.${prop}-opaque${i ? `-${i * 100}` : ""}`] = {
            [`@apply ${prop}-${i ? `gray-${i * 100}` : "white"} dark:${prop}-${
              i ? `gray-${(10 - i) * 100}` : "black"
            }`]: {},
          };
          components[`.${prop}-opaque${i ? `-${i * 100}` : ""}-invert`] = {
            [`@apply ${prop}-${i ? `gray-${(10 - i) * 100}` : "black"} dark:${prop}-${
              i ? `gray-${i * 100}` : "white"
            }`]: {},
          };
        }
        for (const prop of ["text", "border", "from"]) {
          components[`.${prop}-opaque${i ? `-${i * 100}` : ""}`] = {
            [`@apply ${prop}-${i ? `gray-${(10 - i) * 100}` : "black"} dark:${prop}-${
              i ? `gray-${i * 100}` : "white"
            }`]: {},
          };
          components[`.${prop}-opaque${i ? `-${i * 100}` : ""}-invert`] = {
            [`@apply ${prop}-${i ? `gray-${i * 100}` : "white"} dark:${prop}-${
              i ? `gray-${(10 - i) * 100}` : "black"
            }`]: {},
          };
        }
      }

      for (let i = 0; i < 10; i++) {
        for (const prop of ["to"]) {
          components[`.${prop}-opaque${i ? `-${i * 100}` : ""}`] = {
            [`@apply ${prop}-${i ? `gray-${(10 - i) * 100}` : "black"} dark:${prop}-${
              i ? `gray-${i * 100}` : "white"
            }`]: {},
          };
          components[`.${prop}-opaque${i ? `-${i * 100}` : ""}-invert`] = {
            [`@apply ${prop}-${i ? `gray-${i * 100}` : "white"} dark:${prop}-${
              i ? `gray-${(10 - i) * 100}` : "black"
            }`]: {},
          };
        }
      }

      addComponents(components);
    }),
  ],
};
