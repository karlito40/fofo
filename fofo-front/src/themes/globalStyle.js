import { injectGlobal } from 'styled-components';

export default () => injectGlobal`
  html {
    box-sizing: border-box;
    line-height: 1.15; 
      -webkit-text-size-adjust: 100%; 
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;