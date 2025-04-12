import styled from 'styled-components';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/constants';

export const TerminalButton = styled.button`
  background: transparent;
  border: 1px solid ${colors.text.accent};
  color: ${colors.text.accent};
  padding: ${spacing.sm} ${spacing.lg};
  cursor: pointer;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  font-weight: 500;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  align-self: flex-start;

  &:hover {
    background: ${colors.text.accent};
    color: ${colors.bg.primary};
    
    &:before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(1px);
  }
`; 