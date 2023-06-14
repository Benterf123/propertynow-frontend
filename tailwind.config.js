/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');


module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.orange[500],
          dark: colors.orange[700],
        },
        'on-primary': {
          DEFAULT: '#000',
          dark: '#000'
        },

				// text-colors
				light: colors.slate[900],
				dart: colors.slate[50],
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
