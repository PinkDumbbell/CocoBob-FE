import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;600&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

  // base setting
  * { // 초기화
    margin : 0;
    padding : 0;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
  }

  #root {
    width : 100vw;
    height : 100vh;
  }

  // Variables
  :root {
    // Color
    --t-title : #1d1d1d;
    --t-default : #333333;
    --t-caption : #999999;
  }

  // App.tsx
  .slide-enter {
    opacity: 0;
    transform: translateX(100);
    z-index: 1;
  }
  .slide-enter.slide-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 200ms ease-out, transform 250ms ease;
  }
  .slide-exit {
    opacity: 1;
    transform: translateX(0);
  }
  .slide-exit.slide-exit-active {
    opacity: 0.2;
    transform: translate(0, -100);
    transition: opacity 200ms ease-out, transform 250ms ease;
  }

  // Font -------------------
  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.88rem;
    text-align: left;
    letter-spacing: -0.025em;
    color : var(--t-default);
  }
  
  h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2.16rem;
    text-align: left;
    letter-spacing: -0.025em;
    color : var(--t-default);
  }

  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 1.25rem;
    line-height: 1.8rem;
    text-align: left;
    letter-spacing: -0.025em;
    color : var(--t-default);
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.44rem;
    text-align: left;
    letter-spacing: -0.02em;
    color : var(--t-default);
  }

  caption {
    display : block;
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.26rem;
    text-align: left;
    letter-spacing: -0.02em;
    color : var(--t-caption);
  }
`;

export default GlobalStyle;
