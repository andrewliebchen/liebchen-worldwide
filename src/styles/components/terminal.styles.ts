import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';
import { spacing, typography, layout, size, maxWidth } from '@/src/styles/theme/constants';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';

export const PromptIcon = styled(MaterialSymbol)`
  position: absolute;
  left: -${size[8]};
  color: ${colors.text.accent};
  display: block;
  top: 50%;
  transform: translateY(-50%);
`;

export const TerminalContainer = styled.div`
  background-color: ${colors.bg.primary};
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  position: fixed;
  overflow: hidden;
`;

export const TerminalHeader = styled.div`
  background-color: ${colors.bg.secondary};
  padding: ${size[4]} ${size[8]};
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${maxWidth};
  width: 100%;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;


export const HeaderTagline = styled.div`
  color: ${colors.text.accent};
`;

export const QueryCount = styled.div`
  color: ${colors.text.primary};
  flex-shrink: 0;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  min-width: 100px;
  white-space: pre;
`;

export const OutputPane = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding: ${size[8]};
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md}; /* Reduced from lg to md */
  padding-bottom: ${spacing.lg};
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

export const InputContainer = styled.div`
  background-color: ${colors.bg.secondary};
  padding: ${size[8]} ${size[8]} ${size[6]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${size[6]};

  form {
    align-items: center;
    display: flex;
    max-width: ${maxWidth};
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
`;

export const InputFormContainer = styled.form`
  align-items: center;
  display: flex;
  max-width: ${maxWidth};
  width: 100%;
  margin: 0 auto;
  position: relative;
  gap: ${size[4]};
`;

export const InputWrapper = styled.div`
  flex: 1;
  position: relative;
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

export const CommandLine = styled.div`
  color: ${colors.text.secondary};
  position: relative;
`;

export const CommandButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${size[4]};
  justify-content: flex-start;
  max-width: ${maxWidth};
  width: 100%;
  align-items: center;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  color: ${colors.text.secondary};
`;