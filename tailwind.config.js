/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "brand" is remapped to the BINUS blue scale so the whole app
        // (which uses brand-50..900) adopts the BINUS identity at once.
        // Primary reference: BINUS Blue #0093D0.
        brand: {
          50: "#e6f6fc",
          100: "#cceefa",
          200: "#99ddf4",
          300: "#66cbef",
          400: "#33b3e4",
          500: "#0093D0", // BINUS Blue
          600: "#007cb0",
          700: "#00648f",
          800: "#004d6e",
          900: "#00354d",
        },
        // BINUS accent colors, available as binus-* utilities.
        binus: {
          blue: "#0093D0",
          orange: "#F5A200",
          red: "#E4002B",
          dark: "#00354d",
        },
      },
    },
  },
  plugins: [],
};
