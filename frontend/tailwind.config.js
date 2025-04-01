/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important : true,
  theme: {
    extend: {
      fontFamily: {
        inter: ['Lato', 'sans-serif'], // Add your font
      },
    },
  },
  plugins: [],
}