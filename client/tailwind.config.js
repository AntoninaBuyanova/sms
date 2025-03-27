/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbikular': ['Orbikular', 'system-ui', '-apple-system', 'sans-serif'],
        'aeonik': ['Aeonik Pro', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 