/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      rotate: {
        270: "270deg",
        135: "135deg",
      },
    },
  },
  plugins: [],
}

