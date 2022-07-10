import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;600&family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

  * {
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
`;

export default GlobalStyle;
