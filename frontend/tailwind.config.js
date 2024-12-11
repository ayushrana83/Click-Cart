/** @type {import('tailwindcss').Config} */
import aspectratio from "@tailwindcss/aspect-ration"
import forms from "@tailwindcss/forms"
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [ aspectratio , forms]
}
