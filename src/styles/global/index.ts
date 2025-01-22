import { createGlobalStyle } from 'styled-components';
import { typography } from '../theme/constants';
import { colors } from '../theme/colors';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    height: 100%;
    overflow: hidden;
    background-color: ${colors.bg.primary};
    color: ${colors.text.primary};
    font-family: ${typography.fontFamily.primary};
    font-size: ${typography.fontSize[2]};
    line-height: ${typography.lineHeight.normal};
  }


  /*
  * {
    outline: 1px dashed rgba(255, 0, 0, 0.3);
  }
  */
`; 