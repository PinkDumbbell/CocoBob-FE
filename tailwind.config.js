/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // for iPhone 12 pro (390, 844, gutter 20)
      nw: '100vw',
      nh: '100vh',
      full: '425px',
    },
    maxWidth: {
      full: '425px',
    },
    // font
    fontSize: {
      h1: [
        '2rem',
        {
          lineHeight: '2.88rem',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        },
      ],
      h2: [
        '1.5rem',
        {
          lineHeight: '2.16rem',
          letterSpacing: '-0.025em',
          fontWeight: '700',
        },
      ],
      h3: [
        '1.125rem',
        {
          lineHeight: '1.62rem',
          letterSpacing: '-0.025em',
          fontWeight: '500',
        },
      ],
      p: [
        '1rem',
        {
          lineHeight: '1.44rem',
          letterSpacing: '-0.02em',
          fontWeight: '400',
        },
      ],
      caption: [
        '0.8125rem',
        {
          lineHeight: '1.26rem',
          letterSpacing: '-0.02em',
          fontWeight: '300',
        },
      ],
    },
    extend: {
      // custon min-height
      minHeight: {
        btn: '2.9375rem',
        section: '3.125rem',
      },
      // custom Height
      height: {
        btn: '2.9375rem',
      },
      margin: {
        // Space Heirarchy
        min: '0.3125rem',
        'semi-min': '0.625rem',
        main: '1.25rem',
        'semi-max': '1.875rem',
        max: '3.125rem',

        // Layout
        layout: '1rem',
      },

      // padding
      padding: {
        sm: '0.375rem',
        lg: '0.625rem',

        // Space Heirarchy
        min: '0.3125rem',
        'semi-min': '0.625rem',
        main: '1.25rem',
        'semi-max': '1.875rem',
        max: '3.125rem',
      },

      // rounded corners (default 10px(0.625rem))
      borderRadius: {
        none: '0',
        sm: '0.3125rem',
        DEFAULT: '0.625rem',
        main: '0.625rem',
        lg: '1.25rem',
        full: '9999px',
      },

      boxShadow: {
        // Shadow Heirarchy
        min: '1px 1px 3px rgba(0, 0, 0, 0.15)',
        main: '0px 4px 10px rgba(0, 0, 0, 0.15)',
        max: '0px 4px 4px rgba(0, 0, 0, 0.25), 10px 10px 30px rgba(174, 174, 192, 0.4)',

        // for spinner animation
        smallSpinner:
          '12px 0px 0 0 rgba(244, 244, 245, 0.2), 9.7px 7.1px 0 0 rgba(244, 244, 245, 0.4),3.7199999999999998px 11.4px 0 0 rgba(244, 244, 245, 0.6), -3.7199999999999998px 11.4px 0 0 rgba(244, 244, 245, 0.8), -9.7px 7.1px 0 0 rgba(244, 244, 245, 1)',
      },
      colors: {
        // for gradation (from, to)
        btnhoverf: '#143B66',
        btnhovert: '#1A70D2',
        btnactivef: '#1E3046',
        btnactivet: '#104077',

        // primary color (blue)
        'primary-darkest': '#0A2B52',
        'primary-darker': '#0E3A6D',
        'primary-dark': '#124C8F',
        'primary-lightdark': '#165EB0',
        primary: '#1A70D2',
        'primary-lightbright': '#3F87D9',
        'primary-bright': '#639EE0',
        'primary-brighter': '#88B5E8',
        'primary-brightest': '#ADCCEF',
        'primary-max': '#F2F8FF',

        // secondary color (black)
        'secondary-darkest': '#121212',
        'secondary-darker': '#1B1B1B',
        'secondary-dark': '#232323',
        'secondary-lightdark': '#2b2b2b',
        secondary: '#333333',
        'secondary-lightbright': '#4e4e4e',
        'secondary-bright': '#737373',
        'secondary-brighter': '#b3b3b3',
        'secondary-brightest': '#e6e6e6',
        'secondary-max': '#fefefe',

        // text
        bold: '#1B1B1B',
        black: '#333333',
        white: '#fffdfd',
        gray: '#737373',
        disabled: '#e6e6e6',
        focus: '#0099FF',

        // alert
        good: '#1AD27C',
        bad: '#e85354',
        warn: '#d27c1a',

        // dim (background shadow screen)
        'dim-black': '#00000029',
        'dim-blue': '#d5e4f77d',
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
