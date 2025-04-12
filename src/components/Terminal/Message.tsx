import React, { useState, useRef, useEffect } from 'react';
import {
  MessageContainer,
  LoadingDots,
  CommandLine,
  ErrorMessage,
  MessageContent,
} from '@/src/styles/components/terminal.styles';
import { TerminalButton } from '@/src/styles/components/buttons';
import type { Message as MessageType } from '@/src/types/terminal';
import MarkdownResponse from '@/src/components/Terminal/MarkdownResponse';
import { TypewriterMessage } from './TypewriterMessage';
import { colors } from '@/src/styles/theme/colors';

interface MessageProps {
  message: MessageType;
  onCaseStudyClick?: (caseStudyId: string) => void;
}

export function Message({ message, onCaseStudyClick }: MessageProps) {
  const [isTextComplete, setIsTextComplete] = useState(false);
  const messageIdRef = useRef(message.id);
  const isWelcomeMessage = message.type === 'system' && messageIdRef.current === message.id;
  const isAIResponse = message.type === 'ai-response';
  const hasAnimatedRef = useRef(false);
  
  // Reset animation state when message ID changes
  useEffect(() => {
    if (messageIdRef.current !== message.id) {
      messageIdRef.current = message.id;
      setIsTextComplete(false);
      hasAnimatedRef.current = false;
    }
  }, [message.id]);
  
  const handleTextComplete = () => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      setIsTextComplete(true);
    }
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
            {(isWelcomeMessage || isAIResponse) && !hasAnimatedRef.current ? (
              <TypewriterMessage 
                content={message.content} 
                onComplete={handleTextComplete}
              />
            ) : (
              <MarkdownResponse content={message.content} />
            )}
            {isTextComplete && message.caseStudy && onCaseStudyClick && (
              <TerminalButton 
                onClick={() => onCaseStudyClick(message.caseStudy!)}
                style={{
                  marginTop: '16px',
                }}
              >
                WATCH CASE STUDY
              </TerminalButton>
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