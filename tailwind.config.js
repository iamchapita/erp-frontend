/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          100: '#194759',
          200: '#7DBFB3',
          300: '#A9F3E6',
          400: '#ECF2F2',
          500: '#4F7369',
        },
      }
    },
  },
  plugins: [],
}

