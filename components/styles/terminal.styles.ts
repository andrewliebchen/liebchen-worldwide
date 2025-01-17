import styled from 'styled-components';
import { colors } from '../theme/colors';
import { spacing, typography, layout } from '../theme/constants';
import type { HeaderStatusProps } from '../types/terminal';

export const TerminalContainer = styled.div`
  background-color: ${colors.bg.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const OutputPane = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.lg};
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
`;

export const OutputLine = styled.div`
  margin-bottom: ${spacing.sm};
  word-wrap: break-word;
  white-space: pre-wrap;
`;

export const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: ${colors.bg.primary};
  padding-top: ${spacing.sm};
  margin: 0 -${spacing.sm};
  

  form {
    display: flex;
    align-items: center;
    background-color: ${colors.bg.secondary};
    padding: ${spacing.sm};
    border-radius: ${layout.borderRadius};
  }
`;

export const Prompt = styled.span`
  color: ${colors.text.accent};
  margin-right: ${spacing.sm};
  min-width: ${spacing.lg};
  display: inline-flex;
  justify-content: center;
`;

export const Input = styled.input`
  background: none;
  border: none;
  color: ${colors.text.primary};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.md};
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  line-height: normal;
  position: relative;
  z-index: 2;

  &::placeholder {
    color: ${colors.text.secondary};
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${spacing.lg};
  padding-left: ${spacing.xl};
`;

export const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const TypewriterWrapper = styled.div`
  .Typewriter__cursor {
    display: none;
  }
`;

export const QueryCount = styled.div`
  color: ${colors.text.secondary};
  font-size: ${typography.fontSize.xs};
  font-family: ${typography.fontFamily.primary};
  flex-shrink: 0;
  padding-top: ${spacing.xs};
`;

export const LoadingDots = styled.div`
  color: ${colors.text.accent};
  padding-left: ${spacing.xl};
  &:after {
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

export const TerminalHeader = styled.div`
  background-color: ${colors.bg.secondary};
  padding: ${spacing.sm} ${spacing.lg};
  border-bottom: 1px solid ${colors.border.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderAvatar = styled.div`
  width: ${layout.avatarSize};
  height: ${layout.avatarSize};
  border-radius: 50%;
  position: relative;
  margin-right: ${spacing.sm};
  border: 1px solid ${colors.border.primary};
  overflow: hidden;
  background-color: ${colors.bg.primary};
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const HeaderText = styled.span`
  color: ${colors.text.accent};
  font-size: ${typography.fontSize.sm};
`;

export const HeaderStatus = styled.div<HeaderStatusProps>`
  color: ${props => colors.status[props.$status]};
  font-size: ${typography.fontSize.xs};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};

  &::before {
    content: '';
    display: inline-block;
    width: ${spacing.sm};
    height: ${spacing.sm};
    border-radius: 50%;
    background-color: ${props => colors.status[props.$status]};
  }
`;

export const CommandLine = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.text.secondary};
  padding-left: 0;
`;

export const ErrorMessage = styled.div`
  color: ${colors.text.error};
  font-style: italic;
  padding-left: ${spacing.xl};
`; 