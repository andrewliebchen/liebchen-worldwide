import React from 'react';
import { InputContainer, Input as StyledInput, CommandButtonsContainer, CommandButton } from '@/src/styles/components/terminal.styles';
import { COMMANDS } from '@/src/ai/commands/content';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  processCommand: (command: string) => void;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function Input({ value, onChange, onSubmit, processCommand, disabled, inputRef }: InputProps) {
  console.log('Input: Rendering with props:', { value, disabled });

  const handleCommandClick = (command: string) => {
    console.log('Input: Command button clicked:', command);
    console.log('Input: Current disabled state:', disabled);
    console.log('Input: Current input value:', value);
    
    if (disabled) {
      console.log('Input: Button click ignored - disabled state');
      return;
    }

    try {
      console.log('Input: Calling processCommand with:', command);
      processCommand(command);
      console.log('Input: processCommand called successfully');
    } catch (error) {
      console.error('Input: Error in processCommand:', error);
    }
  };

  return (
    <InputContainer>
      <form onSubmit={(e) => {
        console.log('Input: Form submit event triggered');
        onSubmit(e);
      }}>
        <StyledInput
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            console.log('Input: Input value changing to:', e.target.value);
            onChange(e);
          }}
          placeholder="Ask a question or type 'help'"
          disabled={disabled}
        />
      </form>
      <CommandButtonsContainer>
        {/* Available commands: */}
        <CommandButton
          type="button"
          onClick={() => {
            console.log('Input: Portfolio button clicked');
            handleCommandClick(COMMANDS.PORTFOLIO);
          }}
          disabled={disabled}
        >
          Portfolio
        </CommandButton>
        <CommandButton
          type="button"
          onClick={() => {
            console.log('Input: Contact button clicked');
            handleCommandClick(COMMANDS.CONTACT);
          }}
          disabled={disabled}
        >
          Contact
        </CommandButton>
        <CommandButton
          type="button"
          onClick={() => {
            console.log('Input: About button clicked');
            handleCommandClick(COMMANDS.ABOUT);
          }}
          disabled={disabled}
        >
          About
        </CommandButton>
        <CommandButton
          type="button"
          onClick={() => {
            console.log('Input: Help button clicked');
            handleCommandClick(COMMANDS.HELP);
          }}
          disabled={disabled}
        >
          Help
        </CommandButton>
      </CommandButtonsContainer>
    </InputContainer>
  );
} 