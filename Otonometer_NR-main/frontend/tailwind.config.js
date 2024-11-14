/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      colors:{
        primary: '#EFF7FB',
        secondary: '#24445A',
        third: '#86BBD8',
        infield1: '#A7A7A7',
        infield2: '#E4E5F0',
      },
      // backgroundImage:{
      //   'ombak':"url(./assets/About/ombak.svg)"
      // }
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}

