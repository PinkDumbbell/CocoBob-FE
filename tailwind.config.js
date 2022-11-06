/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // for iPhone 12 pro (390, 844, gutter 20)
      nw: '100vw',
      nh: '100vh',
    },
    extend: {
      colors: {
        redf: 'rgb(206, 229, 255)',
        redt: '#1A70D2',
        'primary-light': 'rgb(206, 229, 255)',
        'primary-bright': '#1f80ee',
        'primary-main': '#1A70D2',
        'primary-dark': '#114786',
        'secondary-light': '#AAC7E9',
        'secondary-main': '#72A2D8',
        bold: '#1d1d1d',
        black: '#333333',
        caption: '#999999',
      },
    },
  },
  plugins: [],
  fontFamily: {
    sans: ['Noto Sans KR', 'sans-serif'],
  },
};
