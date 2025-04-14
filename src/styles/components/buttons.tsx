import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { colors } from '../theme/colors';
import { spacing, typography, size } from '../theme/constants';

const baseButtonStyles = css<{ $size?: 'default' | 'large' }>`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  white-space: nowrap;
  padding: ${props => props.$size === 'large' 
    ? `${size[3]} ${size[4]}` 
    : `${size[2]} ${size[3]}`};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const HotkeyBadge = styled.span<{ $size?: 'default' | 'large' }>`
  padding: ${size[1]};
  font-size: ${props => props.$size === 'large' ? typography.fontSize[1] : typography.fontSize[0]};
  opacity: 0.8;
  font-weight: normal;
  margin-left: ${size[3]};
  background-color: ${colors.text.accent}20;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1;
`;

// Primary button variant (formerly TerminalButton)
export const PrimaryButton = styled.button<{ $size?: 'default' | 'large' }>`
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

  &:disabled {
    color: ${colors.text.accent};
    background-color: transparent;
  }
`;

// For backward compatibility
export const TerminalButton = PrimaryButton;

// Secondary button variant
export const SecondaryButton = styled.button<{ $size?: 'default' | 'large' }>`
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
  size?: 'default' | 'large';
  hotkey?: string | React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', hotkey, children, ...props }, ref) => {
    const ButtonComponent = variant === 'primary' ? PrimaryButton : SecondaryButton;
    
    return (
      <ButtonComponent ref={ref} $size={size} {...props}>
        {children}
        {hotkey && <HotkeyBadge $size={size}>{hotkey}</HotkeyBadge>}
      </ButtonComponent>
    );
  }
); 