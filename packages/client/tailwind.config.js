/**
 * @type {import('tailwindcss').Config}
 */
const primeui = require('tailwindcss-primeui');

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    '../canvas/src/**/*.{vue,ts,js}',
    '../graph/src/**/*.{vue,ts,js}',
    '../products/src/**/*.{vue,ts,js}',
    '../shapes/src/**/*.{vue,ts,js}',
    '../utils/src/**/*.{vue,ts,js}',
    '../ui/src/**/*.{vue,ts,js}',
  ],
  safelist: [
    'bg-magic',
    'text-magic',
    'bg-pink-magic',
    'text-pink-magic',
  ],
  plugins: [
    primeui,
    function ({ addUtilities }) {
      addUtilities({
        /**
         * our branded text color
         */
        ".text-magic": {
          "@apply bg-gradient-to-tr from-purple-500 to-orange-500 text-transparent bg-clip-text":
            {},
        },
        /**
         * our branded background color
         */
        ".bg-magic": {
          "@apply bg-gradient-to-tr from-purple-500 to-orange-500":
            {},
        },
        /**
         * our branded background color (for pink theme)
         */
        ".bg-pink-magic": {
          "@apply bg-gradient-to-tr from-purple-300 to-pink-100":
            {},
        },
        /**
         * our branded text color (for pink theme)
         */
        ".text-pink-magic": {
          "@apply bg-gradient-to-tr from-purple-300 to-pink-100 text-transparent bg-clip-text":
            {},
        },
      });
    },
  ],

};