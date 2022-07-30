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
        primary: {
          100: 'rgb(206, 229, 255)',
          900: '#1A70D2',
          dark: '#114786',
        },
      },
    },
  },
  plugins: [],
  fontFamily: {
    sans: ['Noto Sans KR', 'sans-serif'],
  },
};
