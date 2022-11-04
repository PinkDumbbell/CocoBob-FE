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
      boxShadow: {
        smallSpinner:
          '12px 0px 0 0 rgba(244, 244, 245, 0.2), 9.7px 7.1px 0 0 rgba(244, 244, 245, 0.4),3.7199999999999998px 11.4px 0 0 rgba(244, 244, 245, 0.6), -3.7199999999999998px 11.4px 0 0 rgba(244, 244, 245, 0.8), -9.7px 7.1px 0 0 rgba(244, 244, 245, 1)',
      },
      colors: {
        btnhoverf: '#143B66',
        btnhovert: '#1A70D2',
        btnactivef: '#1E3046',
        btnactivet: '#104077',

        'primary-light': 'rgb(206, 229, 255)',
        'primary-bright': '#1f80ee',
        'primary-brightest': '#F2F8FF',
        'primary-main': '#1A70D2',
        'primary-lightdark': '#165EB0',
        'primary-dark': '#124C8F',
        'primary-darkest': '#0A2B52',

        'secondary-light': '#AAC7E9',
        'secondary-main': '#72A2D8',
        bold: '#1d1d1d',
        black: '#333333',
        white: '#fefefe',
        caption: '#999999',
      },
      keyframes: {
        push: {
          '0%': { transform: 'scale(1.0)' },
          '100%': { transform: 'scale(1.025)' },
        },
        afterpush: {
          '0%': { transform: 'scale(1.025)' },
          '100%': { transform: 'scale(0.96)' },
        },
      },
      animation: {
        push: 'push .2s ease-out forwards',
        afterpush: 'afterpush .2s ease-out forwards',
      },
    },
  },
  plugins: [],
  fontFamily: {
    sans: ['Noto Sans KR', 'sans-serif'],
  },
};
