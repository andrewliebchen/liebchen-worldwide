import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Terminal from './components/Terminal';
import { QueryProvider } from './context/QueryContext';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
    overflow: hidden;
    background-color: #1a1b26;
    color: #a9b1d6;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }
`;

function App() {
  return (
    <QueryProvider>
      <GlobalStyle />
      <Terminal />
    </QueryProvider>
  );
}

export default App;
