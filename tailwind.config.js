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
                redf: '#A93536',
                redt: '#EA5758',
                primary: {
                    100: '#f9dfdf',
                    900: '#E85354',
                },
            },
        },
    },
    plugins: [],
    fontFamily: {
        sans: ['Noto Sans KR', 'sans-serif'],
    },
};