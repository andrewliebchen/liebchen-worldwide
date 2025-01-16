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

interface MessageProps {
  message: MessageType;
}

function TypewriterText({ content }: { content: string }) {
  // Split content to separate the progress bar from the message
  const [message, progressBar] = content.split('\n\n').slice(-2);
  
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
                .typeString(message)
                .start();
            }}
          />
        </TypewriterWrapper>
      </MessageContent>
      {progressBar && <QueryCount>{progressBar}</QueryCount>}
    </MessageContainer>
  );
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
    
    default:
      return <TypewriterText content={message.content} />;
  }
} 