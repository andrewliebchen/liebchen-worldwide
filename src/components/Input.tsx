import React, { useEffect, useCallback } from 'react';
import { InputContainer, Input as StyledInput, CommandButtonsContainer, CommandButton, HotkeyIndicator } from '@/src/styles/components/terminal.styles';
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

  const handleCommandClick = useCallback((command: string) => {
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
  }, [disabled, processCommand, value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for ^1-4 shortcuts (Control key)
      if (e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
        // Convert key to number, handling both numpad and regular number keys
        const keyNum = e.key.match(/^(?:Numpad)?([1-4])$/)?.[1];
        const num = keyNum ? parseInt(keyNum) : null;
        
        console.log('Input: Hotkey detected:', { key: e.key, keyNum, num, disabled });
        
        if (num && num >= 1 && num <= 4) {
          // Prevent both the keydown and keypress events
          e.preventDefault();
          e.stopPropagation();
          
          if (disabled) {
            console.log('Input: Hotkey ignored - disabled state');
            return;
          }

          let command: string;
          switch (num) {
            case 1:
              command = COMMANDS.PORTFOLIO;
              break;
            case 2:
              command = COMMANDS.CONTACT;
              break;
            case 3:
              command = COMMANDS.ABOUT;
              break;
            case 4:
              command = COMMANDS.HELP;
              break;
            default:
              return;
          }
          
          console.log('Input: Executing hotkey command:', command);
          handleCommandClick(command);
        }
      }
    };

    // Use document instead of window to catch all keystrokes
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [disabled, handleCommandClick]);

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
        <CommandButton
          type="button"
          onClick={() => {
            console.log('Input: Portfolio button clicked');
            handleCommandClick(COMMANDS.PORTFOLIO);
          }}
          disabled={disabled}
        >
          Portfolio
          <HotkeyIndicator>^1</HotkeyIndicator>
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
          <HotkeyIndicator>^2</HotkeyIndicator>
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
          <HotkeyIndicator>^3</HotkeyIndicator>
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
          <HotkeyIndicator>^4</HotkeyIndicator>
        </CommandButton>
      </CommandButtonsContainer>
    </InputContainer>
  );
} 