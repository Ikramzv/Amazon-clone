/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{jsx,jsx,tsx,ts}'
  ],
  theme: {
    extend: {
      animation: {
        basket: 'basketAnimation 3s cubic-bezier(0.72 , -0.2 , 0.52, 1.7)' 
      },
      keyframes: {
        basketAnimation : {
          '0%': {
            background: 'linear-gradient(to right , #111 , skyblue)' ,
            filter: 'hue-rotate(0deg)' , 
            transform: 'rotate(0deg)'
          },
          '100%' : {
            background: 'linear-gradient(to right , #111 , skyblue)',
            filter: 'hue-rotate(720deg) ',
            transform: 'rotate(360deg)'
          }
        }
      },
      gridAutoColumns : {
        homeGrid: 'minmax(100px, auto) minmax(max-content, 2fr) minmax(20%, 80vmax)'
      }
    },
  },
  plugins: [],
}
