/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'red':'#db0000',
        'black-100':'#161616',
        'black-200':'#323232',
        'black-300':'#1f1f1f'
      },
      fontFamily:{
        'anton':["ANTON"]
      }
    },
  },
  plugins: [],
}
