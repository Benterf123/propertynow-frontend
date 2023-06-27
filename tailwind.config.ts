import { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config = {
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
          dark: '#000',
        },
        secondary: {
          DEFAULT: colors.green[500],
          dark: colors.green[700],
        },

        // text-colors
        light: colors.slate[900],
        dart: colors.slate[50],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config

export default config
