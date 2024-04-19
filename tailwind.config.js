/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
      colors: {
        "green": "#254d32",
        "light-green": "#cad7c6",
        "dark-green": "#1a3524",
        "lavender": "#e3dae7",
        "light-lavender": "#f6f3f7",
        "dark-lavender": "#6d507a"
      },
      fontFamily: {
        'title': ['Le Jour Script'],
      },
      screens: {
        'tall': { 'raw': '(min-height: 800px)' },
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
}

