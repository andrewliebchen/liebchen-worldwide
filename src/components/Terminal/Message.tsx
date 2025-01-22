import React from 'react';
import Typewriter from 'typewriter-effect';
import {
  MessageContainer,
  TypewriterWrapper,
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
      const Content = message.type === 'system' ? (
        <TypewriterWrapper>
          <Typewriter
            options={{
              delay: 1,
              cursor: ''
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(message.content)
                .start();
            }}
          />
        </TypewriterWrapper>
      ) : (
        <MarkdownResponse content={message.content} />
      );

      return (
        <MessageContainer>
          {Content}
        </MessageContainer>
      );

    default:
      return <MessageContainer>{message.content}</MessageContainer>;
  }
} 