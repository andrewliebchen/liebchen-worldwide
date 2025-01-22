import React from 'react';
import {
  MessageContainer,
  LoadingDots,
  CommandLine,
  ErrorMessage,
} from '@/src/styles/components/terminal.styles';
import type { Message as MessageType } from '@/src/types/terminal';
import MarkdownResponse from '@/src/components/Terminal/MarkdownResponse';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  switch (message.type) {
    case 'command':
      return (
        <MessageContainer>
          <CommandLine>{message.content}</CommandLine>
        </MessageContainer>
      );
    
    case 'thinking':
      return <LoadingDots>Thinking</LoadingDots>;
    
    case 'error':
      return <ErrorMessage>{message.content}</ErrorMessage>;
    
    case 'ai-response':
    case 'system':
      return (
        <MessageContainer>
          <MarkdownResponse content={message.content} />
        </MessageContainer>
      );

    default:
      return (
        <MessageContainer>
          <MarkdownResponse content={message.content} />
        </MessageContainer>
      );
  }
} 