import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    overflow: hidden;
    background-color: #1a1b26;
    color: #a9b1d6;
    font-family: 'JetBrains Mono', monospace;
  }
`; 