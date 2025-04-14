import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../theme/colors';
import { spacing, typography, size } from '../theme/constants';

const baseButtonStyles = css`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  padding: ${size[2]} ${size[3]};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const HotkeyBadge = styled.span`
  padding: 0 ${size[1]};
  font-size: ${typography.fontSize[0]};
  opacity: 0.8;
  font-weight: normal;
  margin-left: ${size[3]};
  background-color: rgba(255, 255, 255, 0.05);
  font-weight: bold;
`;

// Primary button variant (formerly TerminalButton)
export const PrimaryButton = styled.button`
  ${baseButtonStyles}
  background: transparent;
  border: 1px solid ${colors.text.accent};
  color: ${colors.text.accent};
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  align-self: flex-start;

  &:hover {
    background: ${colors.text.accent};
    color: ${colors.bg.primary};
  }
`;

// For backward compatibility
export const TerminalButton = PrimaryButton;

// Secondary button variant
export const SecondaryButton = styled.button`
  ${baseButtonStyles}
  background-color: ${colors.bg.secondary};
  border: 1px solid ${colors.border.primary};
  color: ${colors.text.secondary};

  &:hover {
    border-color: ${colors.text.accent};
    color: ${colors.text.accent};
  }
`;

// Button component with hotkey support
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  hotkey?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', hotkey, children, ...props }, ref) => {
    const ButtonComponent = variant === 'primary' ? PrimaryButton : SecondaryButton;
    
    return (
      <ButtonComponent ref={ref} {...props}>
        {children}
        {hotkey && <HotkeyBadge>{hotkey}</HotkeyBadge>}
      </ButtonComponent>
    );
  }
); 