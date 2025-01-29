const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    flowbite.content(),
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
    require('tailwind-scrollbar-hide')
  ],
}

