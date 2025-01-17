import React from 'react';
import Typewriter from 'typewriter-effect';
import {
  MessageContainer,
  MessageContent,
  TypewriterWrapper,
  QueryCount,
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
  // Extract progress bar (last line) while preserving the rest of the content
  const parts = message.content.split('\n\n');
  const progressBar = parts.length > 1 ? parts[parts.length - 1] : null;
  const content = parts.length > 1 ? parts.slice(0, -1).join('\n\n') : message.content;

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
      return (
        <MessageContainer>
          <MessageContent>
            <MarkdownResponse content={content} />
          </MessageContent>
          {progressBar && <QueryCount>{progressBar}</QueryCount>}
        </MessageContainer>
      );

    case 'system':
      return (
        <MessageContainer>
          <MessageContent>
            <TypewriterWrapper>
              <Typewriter
                options={{
                  delay: 5,
                  cursor: ''
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(content)
                    .start();
                }}
              />
            </TypewriterWrapper>
          </MessageContent>
          {progressBar && <QueryCount>{progressBar}</QueryCount>}
        </MessageContainer>
      );

    default:
      return <div>{message.content}</div>;
  }
} 