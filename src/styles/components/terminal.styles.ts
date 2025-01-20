import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';
import { spacing, typography, layout } from '@/src/styles/theme/constants';
import type { HeaderStatusProps } from '@components/types/terminal';

export const TerminalContainer = styled.div`
  background-color: ${colors.bg.primary};
  min-height: 100vh;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const OutputPane = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.lg} ${spacing.lg} 0 ${spacing.lg};
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const OutputLine = styled.div`
  margin-bottom: ${spacing.sm};
  word-wrap: break-word;
  white-space: pre-wrap;
  padding-left: ${spacing.xl};
`;

export const InputContainer = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${colors.bg.primary};
  padding-bottom:${spacing.lg};
  z-index: 10;
  padding-left: ${spacing.sm};
  margin: 0 -10px;

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
  min-width: 20px;
  display: inline-flex;
  justify-content: center;
  margin: 0 2px 0 -2px; // Minor visual adjustment
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
  width: 100%;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: ${spacing.sm};
  }
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
  white-space: pre;
  min-width: 100px;
`;

export const LoadingDots = styled.div`
  color: ${colors.text.accent};
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
  position: sticky;
  top: 0;
  z-index: 10;
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
  margin-left: -${spacing.lg};
`;

export const ErrorMessage = styled.div`
  color: ${colors.text.error};
  font-style: italic;
  padding-left: ${spacing.xl};
`; 