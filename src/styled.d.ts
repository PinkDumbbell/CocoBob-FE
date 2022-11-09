import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        dark: string;
        lightdark: string;
        main: string;
        bright: string;
        light: string;
      };
      secondary: {
        main: string;
        light: string;
      };
      text: {
        title: string;
        default: string;
        caption: string;
      };
      error: string;
      success: string;
    };
  }
}
