/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5fa',
          100: '#e1ebf5',
          200: '#c3d7eb',
          300: '#95bde0',
          400: '#609dd0',
          500: '#3c81bf',
          600: '#2b66a3',
          700: '#235284',
          800: '#1e3a8a', // Official Navy
          900: '#0f2c59', // Deep Institutional GUNI Blue
          950: '#091a36',
        },
        guni: {
          maroon: '#8B0000',
          crimson: '#990000',
          crimsonDark: '#6E0000',
          crimsonLight: '#B22222',
          navy: '#0F2C59',
          navyDark: '#08172E',
          navyLight: '#1E3A8A',
          gold: '#C59B27',
          goldLight: '#F3E5AB',
          goldDark: '#997300',
          cream: '#FDFBF7'
        }
      }
    },
  },
  plugins: [],
}
