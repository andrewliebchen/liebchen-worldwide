import React, { useState } from 'react';
import {
  MessageContainer,
  LoadingDots,
  CommandLine,
  ErrorMessage,
  CaseStudyButton,
  MessageContent,
} from '@/src/styles/components/terminal.styles';
import type { Message as MessageType } from '@/src/types/terminal';
import MarkdownResponse from '@/src/components/Terminal/MarkdownResponse';
import { TypewriterMessage } from './TypewriterMessage';

interface MessageProps {
  message: MessageType;
  onCaseStudyClick?: (caseStudyId: string) => void;
}

export function Message({ message, onCaseStudyClick }: MessageProps) {
  const [isTextComplete, setIsTextComplete] = useState(false);

  const handleTextComplete = () => {
    setIsTextComplete(true);
  };

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
          <MessageContent>
            <TypewriterMessage 
              content={message.content} 
              onComplete={handleTextComplete}
            />
            {isTextComplete && message.caseStudy && onCaseStudyClick && (
              <CaseStudyButton onClick={() => onCaseStudyClick(message.caseStudy!)}>
                ▶️ WATCH CASE STUDY
              </CaseStudyButton>
            )}
          </MessageContent>
        </MessageContainer>
      );

    default:
      return (
        <MessageContainer>
          <MessageContent>
            <MarkdownResponse content={message.content} />
          </MessageContent>
        </MessageContainer>
      );
  }
} 