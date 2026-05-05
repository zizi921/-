/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF9F0',
        brand: {
          light: '#FFB888',
          DEFAULT: '#FF8844',
          dark: '#E66A26',
        }
      },
      fontFamily: {
        sans: [
          '"PingFang SC"', 
          '"Microsoft YaHei"', 
          'sans-serif'
        ]
      }
    },
  },
  plugins: [],
}
