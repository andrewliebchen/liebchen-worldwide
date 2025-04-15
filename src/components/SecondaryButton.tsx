import React from 'react';
import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';
import { typography, size } from '@/src/styles/theme/constants';

const ButtonContainer = styled.button`
  align-items: center;
  background-color: ${colors.bg.secondary};
  border: 1px solid ${colors.border.primary};
  color: ${colors.text.secondary};
  cursor: pointer;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  padding: ${size[2]} ${size[3]};
  transition: all 0.2s ease;
  display: flex;
  white-space: nowrap;

  &:hover {
    border-color: ${colors.text.accent};
    color: ${colors.text.accent};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const HotkeyBadge = styled.span`
  padding: 0 ${size[1]};
  font-size: ${typography.fontSize[0]};
  opacity: 0.8;
  font-weight: normal;
  margin-left: ${size[3]};
  background-color: rgba(255, 255, 255, 0.05);
  font-weight: bold;
`;

interface SecondaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  hotkey?: string;
  children: React.ReactNode;
}

export function SecondaryButton({ onClick, disabled, hotkey, children }: SecondaryButtonProps) {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled}>
      {children}
      {hotkey && <HotkeyBadge>{hotkey}</HotkeyBadge>}
    </ButtonContainer>
  );
} 