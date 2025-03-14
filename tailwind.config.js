/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      cursor: {
        'monster-hunter': 'url(/assets/images/cursor/Monster-Hunter-Cursor.cur), auto',
        'monster-hunter-pointer': 'url(/assets/images/cursor/Monster-Hunter-Pointer.cur), auto'
      }
    },
  },
  plugins: [],
}
