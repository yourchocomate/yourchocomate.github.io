/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*{.html,.js}",
  ],
  theme: { 
    extend: {
      colors: {},
      fontFamily: {
        handjet: ['Handjet', 'cursive'],
        nunito: ['Nunito', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
}

