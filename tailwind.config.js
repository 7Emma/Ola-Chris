/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: {
          100: '#dbeafe', // blue-100
          200: '#bfdbfe', // blue-200
          400: '#60a5fa', // blue-400
          500: '#3b82f6', // blue-500
          600: '#2563eb', // blue-600
          700: '#1d4ed8', // blue-700
          800: '#1e40af', // blue-800
          900: '#1e3a8a', // blue-900
        },
        primaryGreen: {
          300: '#86efac', // green-300
          400: '#4ade80', // green-400
          500: '#22c55e', // green-500
          600: '#16a34a', // green-600
          800: '#166534', // green-800
          900: '#14532d', // green-900
        },
        accentPink: {
          600: '#db2777', // pink-600
          700: '#be185d', // pink-700
        },
      },
    },
  },
  plugins: [],
}
