/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        main:{
          white: '#fff3e3',
          blue: '#3a5c92',
          brown: '#3f2c25',
          yellow:'#ffc34d'
        }
      },
      fontFamily: {
        Noto:'Notos-Regular',
        Romance:'Romance'
      }
    },
  },
  plugins: [],
}

