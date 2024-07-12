/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        customOrange: '#ff6100',
      },
      minHeight: {
        '90': '90%',
      },
    },
  },
  plugins: [],
}

