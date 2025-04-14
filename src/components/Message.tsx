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
import MarkdownResponse from '@/src/components/MarkdownResponse';
import { TypewriterMessage } from './TypewriterMessage';
import { spacing } from '@/src/styles/theme/constants';
import { getCaseStudy } from '@/src/config/caseStudies';
import styled from 'styled-components';

interface MessageProps {
  message: MessageType;
  onCaseStudyClick?: (caseStudyId: string) => void;
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  margin-top: ${spacing.sm};
`;

const FigmaLink = styled.a`
  color: #7aa2f7;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export function Message({ message, onCaseStudyClick }: MessageProps) {
  const [isTextComplete, setIsTextComplete] = useState(false);
  const messageIdRef = useRef(message.id);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isWelcomeMessage = message.type === 'system' && messageIdRef.current === message.id;
  const isAIResponse = message.type === 'ai-response';
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    console.log('Message render conditions:', {
      isTextComplete,
      caseStudy: message.caseStudy,
      hasClickHandler: !!onCaseStudyClick,
      messageType: message.type
    });
  }, [isTextComplete, message.caseStudy, onCaseStudyClick, message.type]);
  
  // Reset animation state when message ID changes
  useEffect(() => {
    if (messageIdRef.current !== message.id) {
      messageIdRef.current = message.id;
      setIsTextComplete(false);
      hasAnimatedRef.current = false;
    }
  }, [message.id]);
  
  // Scroll button into view when it appears
  useEffect(() => {
    if (isTextComplete && message.caseStudy && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isTextComplete, message.caseStudy]);
  
  const handleTextComplete = () => {
    console.log('Text animation complete');
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
              <ButtonContainer>
                <TerminalButton 
                  ref={buttonRef}
                  onClick={() => {
                    console.log('Case study button clicked');
                    console.log('Case study ID:', message.caseStudy);
                    onCaseStudyClick(message.caseStudy!);
                  }}
                >
                  WATCH CASE STUDY
                </TerminalButton>
                {message.caseStudy && (
                  <FigmaLink 
                    href={getCaseStudy(message.caseStudy)?.figma} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Review slides in Figma
                  </FigmaLink>
                )}
              </ButtonContainer>
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