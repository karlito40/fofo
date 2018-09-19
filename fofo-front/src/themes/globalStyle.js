import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  @font-face {
    font-family: "GothamRounded";
    src: url('/fonts/gotham-rounded/GothamRoundedMedium_21022.ttf');
  }

  @font-face {
    font-family: "GothamRounded";
    font-weight: bold;
    src: url('/fonts/gotham-rounded/GothamRoundedBold_21016.ttf');
  }
  
  @font-face {
    font-family: "GothamRoundedBook";
    src: url('/fonts/gotham-rounded/GothamRoundedBook_21018.ttf');
  }
  

  html {
    box-sizing: border-box;
    line-height: ${p => p.theme.primaryLineHeight}; 
    -webkit-text-size-adjust: 100%; 
    font-family: 'Roboto', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: ${p => p.theme.primaryFontSize};
    color: ${p => p.theme.primaryColor};
  }

  strong, b {
    color: ${p => p.theme.strongColor};
  }

  blockquote {
    border-left: 3px solid #e3e4e6;
    color: #a1a2a2;
    padding: 4px 13px;
  }
`;

export default GlobalStyle;