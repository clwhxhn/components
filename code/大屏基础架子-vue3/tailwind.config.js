/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      fzl: ['FZLanTYJW'],
      dy: ['DOUYU'],
      ysbth: ['YouSheBiaoTiHei']
    },
    extend: {
      fontSize: {
        d88: '0.88rem', // 10px
        '1d25': '1.25rem' // 10px
      }
    }
  },
  plugins: []
}
