import { createGlobalStyle } from 'styled-components';
import 'tailwindcss/tailwind.css';
import checkboxBg from '@/assets/icon/checkbox.png';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  // base setting
  * { // 초기화
    margin : 0;
    padding : 0;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 280px; // galaxy fold width
    margin: 0 auto;

    @media (min-width: 425px){
      width:425px;
    }
    @media (max-width: 425px){
      width:100vw;
    }
  }

  #root{
    width:100%;
    height:100vh;
    background-color:white;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  // Variables
  :root {
    // Color
    --t-title : #1d1d1d;
    --t-default : #333333;
    --t-caption : #999999;
    --gutter: 1.25rem;
    --primary-light: rgb(206, 229, 255);
    --primary-main: #1A70D2;
    --primary-dark: #114786;
    --secondary-light: #AAC7E9;
    --secondary-main: #72A2D8;
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

  input[type='date']{
    position:relative;
  }
  input[type='date']:before{
    display:none;
  }
  input[type='date']::-webkit-calendar-picker-indicator{
    z-index:1;
    position: absolute;
    left:0;
  }

  input[type='radio']{
    appearance: none;
    border: 1px solid #555555;
    width: 16px;
    height: 16px;
    border-radius: 100%;
  }
  input[type='radio']:checked{
    border: 1px solid ${theme.colors.primary.dark};
    outline: 3px solid ${theme.colors.primary.main};
    outline-offset: -3.5px;
  }

  input[type='checkbox']{
    appearance: none;
    border:1px solid #555555;
    border-radius: 4px;
    width: 16px;
    height: 16px;

    transition: background-color 100ms linear;
    &:checked{
      border: 1px solid #114786;
      background-image: url(${checkboxBg});
      background-size: auto;
      background-position:50%;
      background-repeat: no-repeat;
      background-color: ${theme.colors.primary.main}
    }
  }
`;

export default GlobalStyle;
