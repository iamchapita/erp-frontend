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
          150: '#2D4D44',
          200: '#7DBFB3',
          250: '#A9F3E6',
          300: '#4fd1c5',
          350: '#D1F0E5',
          400: '#F2F2F2',
          500: '#4F7369',
          600: '#2D4D44',
          700: '#1F2D2B',
          800: '#f7fafc'
        },
      }
    },
  },
  plugins: [
  ],
}

