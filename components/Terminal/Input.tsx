import React from 'react';
import { InputContainer, Prompt, Input as StyledInput } from '@/src/styles/components/terminal.styles';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function Input({ value, onChange, onSubmit, disabled, inputRef }: InputProps) {
  return (
    <InputContainer>
      <form onSubmit={onSubmit}>
        <Prompt>❯</Prompt>
        <StyledInput
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Type 'help' to explore commands..."
          disabled={disabled}
        />
      </form>
    </InputContainer>
  );
} 