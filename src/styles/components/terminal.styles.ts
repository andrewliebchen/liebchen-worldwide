import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';
import { spacing, typography, layout, size, maxWidth } from '@/src/styles/theme/constants';


const PROMPT_STYLE = `
    content: '❯';
    position: absolute;
    left: -${size[6]};
    color: ${colors.text.accent};
    display: block;
`;

export const TerminalHeader = styled.div`
  background-color: ${colors.bg.secondary};
  padding: ${size[3]} ${size[8]};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${maxWidth};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${size[3]};
    align-items: flex-start;
  }
`;

export const HeaderTitle = styled.div`
  align-items: center;
  display: flex;
  gap: ${size[4]};
`;

export const HeaderAvatar = styled.div`
  background-color: ${colors.bg.primary};
  border-radius: 50%;
  height: ${size[9]};
  aspect-ratio: 1;
  overflow: hidden;
  position: relative;
  width: ${size[9]};
`;

export const HeaderText = styled.span`
  color: ${colors.text.accent};
  font-size: ${typography.fontSize[2]};
`;

export const HeaderVersion = styled.span`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize[1]};
  font-weight: bold;
`;

export const QueryCount = styled.div`
  color: ${colors.text.primary};
  flex-shrink: 0;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  min-width: 100px;
  white-space: pre;
`;

export const TerminalContainer = styled.div`
  background-color: ${colors.bg.primary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
  position: relative;
`;

export const OutputPane = styled.div`
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  gap: ${size[5]};
  overflow-y: scroll;
  padding: ${size[5]} ${size[8]} calc(${size[8]} * 2);
  position: relative;
  margin-bottom: 0;
`;

export const OutputLine = styled.div`
  padding: 0 ${size[8]};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const MessageContainer = styled.div`
  align-items: flex-start;
  display: flex;
  gap: ${size[10]};
  justify-content: space-between;
  max-width: ${maxWidth};
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${size[2]};
  }
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${size[4]};
  width: 100%;
  align-items: flex-start;
`;

export const CommandLine = styled.div`
  color: ${colors.text.secondary};
  position: relative;

  &::before {
    ${PROMPT_STYLE}
  }
`;

export const InputContainer = styled.div`
  background-color: ${colors.bg.secondary};
  bottom: 0;
  left: 0;
  padding: ${size[4]} ${size[8]};
  position: fixed;
  right: 0;
  z-index: 10;
  margin-top: 0;

  form {
    align-items: center;
    display: flex;
    max-width: ${maxWidth};
    margin: 0 auto;
    position: relative;

    &::before {
      ${PROMPT_STYLE}
    }
  }
`;


export const Input = styled.input`
  -webkit-appearance: none;
  background: none;
  border-radius: 0;
  border: none;
  color: ${colors.text.primary};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[2]};
  line-height: normal;
  margin: 0 auto;
  outline: none;
  position: relative;
  width: 100%;
  z-index: 2;

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;


export const TypewriterWrapper = styled.div`
  .Typewriter__cursor {
    display: none;
  }
`;

export const LoadingDots = styled.div`
  color: ${colors.text.accent};
  max-width: ${maxWidth};
  margin: 0 auto;

  &::after {
    content: '.';
    animation: dots 1.5s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80%, 100% { content: ''; }
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.text.error};
  font-style: italic;
  max-width: ${maxWidth};
  margin: 0 auto;
`; 