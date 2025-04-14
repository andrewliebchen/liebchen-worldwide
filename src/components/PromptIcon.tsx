import React from 'react';
import { PromptIcon as StyledPromptIcon } from '@/src/styles/components/terminal.styles';

interface PromptIconProps {
  className?: string;
}

export const PromptIcon: React.FC<PromptIconProps> = ({ className }) => {
  return (
    <StyledPromptIcon 
      icon="arrow_forward_ios" 
      size={20}
      className={className}
    />
  );
}; 