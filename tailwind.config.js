const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
        height: "height",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/custom-forms"),
    require("tailwind-scrollbar"),
  ],
  variants: {
        scrollbar: ['dark']
    },
  daisyui: {
    styled: false,
  },
};
