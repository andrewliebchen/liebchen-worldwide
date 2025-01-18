import React from 'react';
import Typewriter from 'typewriter-effect';
import {
  MessageContainer,
  MessageContent,
  TypewriterWrapper,
  LoadingDots,
  CommandLine,
  Prompt,
  ErrorMessage,
} from '../styles/terminal.styles';
import type { Message as MessageType } from '../types/terminal';
import MarkdownResponse from './MarkdownResponse';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  switch (message.type) {
    case 'command':
      return (
        <CommandLine>
          <Prompt>❯</Prompt> {message.content}
        </CommandLine>
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
              delay: 5,
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
          <MessageContent>
            {Content}
          </MessageContent>
        </MessageContainer>
      );

    default:
      return <div>{message.content}</div>;
  }
} 