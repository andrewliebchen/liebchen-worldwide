import React, { useState, useRef, useEffect } from 'react';
import {
  MessageContainer,
  LoadingDots,
  CommandLine,
  ErrorMessage,
  MessageContent,
} from '@/src/styles/components/terminal.styles';
import { Button } from '../styles/components/buttons';
import type { Message as MessageType } from '@/src/types/terminal';
import MarkdownResponse from '@/src/components/MarkdownResponse';
import { TypewriterMessage } from './TypewriterMessage';
import { spacing, size } from '@/src/styles/theme/constants';
import { getCaseStudy } from '@/src/config/caseStudies';
import styled from 'styled-components';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import { PromptIcon } from '@/src/components/PromptIcon';
import { colors } from '../styles/theme/colors';
import { track } from '@vercel/analytics';

interface MessageProps {
  message: MessageType;
  onCaseStudyClick?: (caseStudyId: string) => void;
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${spacing.sm} 0;
  padding: ${spacing.lg};
  padding-right: ${spacing.xl};
  border: 1px solid ${colors.border.primary};
  border-radius: 15px;
  width: 100%;
`;

const FigmaLink = styled.a`
  color: #7aa2f7;
  text-decoration: none;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const LinkText = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

export function Message({ message, onCaseStudyClick }: MessageProps) {
  const [isTextComplete, setIsTextComplete] = useState(false);
  const messageIdRef = useRef(message.id);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isWelcomeMessage = message.type === 'system' && messageIdRef.current === message.id;
  const isAIResponse = message.type === 'ai-response';
  const isCommand = message.type === 'command';
  const hasAnimatedRef = useRef(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log('Message render conditions:', {
      isTextComplete,
      caseStudy: message.caseStudy,
      hasClickHandler: !!onCaseStudyClick,
      messageType: message.type,
      hasAnimated: hasAnimatedRef.current
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
    console.log('Text animation complete for message type:', message.type);
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      setIsTextComplete(true);
    }
  };

  const handleCaseStudyClick = (caseStudyId: string) => {
    const caseStudy = getCaseStudy(caseStudyId);
    if (caseStudy) {
      // Track the case study button click
      track('case_study_button_click', {
        case_study_id: caseStudyId,
        case_study_title: caseStudy.title
      });
    }
    if (isMobile && caseStudy?.videoUrl) {
      window.open(caseStudy.videoUrl, '_blank');
    } else if (onCaseStudyClick) {
      onCaseStudyClick(caseStudyId);
    }
  };

  switch (message.type) {
    case 'command':
      return (
        <MessageContainer>
          <CommandLine>
            <PromptIcon />
            {message.content}
          </CommandLine>
        </MessageContainer>
      );
    
    case 'thinking':
      return <LoadingDots>Thinking</LoadingDots>;
    
    case 'error':
      return (
        <ErrorMessage>
          <MarkdownResponse content={message.content} />
        </ErrorMessage>
      );
    
    case 'ai-response':
    case 'system':
    case 'case-study':
    case 'response':
      return (
        <MessageContainer>
          <MessageContent>
            {(isWelcomeMessage || isAIResponse || message.type === 'case-study' || message.type === 'response') && !hasAnimatedRef.current ? (
              <TypewriterMessage 
                content={message.content} 
                onComplete={handleTextComplete}
              />
            ) : (
              <MarkdownResponse content={message.content} />
            )}
            {isTextComplete && message.caseStudy && (
              <ButtonContainer>
                <Button
                  variant="primary"
                  size="large"
                  ref={buttonRef}
                  onClick={() => {
                    console.log('Case study button clicked');
                    console.log('Case study ID:', message.caseStudy);
                    handleCaseStudyClick(message.caseStudy!);
                  }}
                >
                  <ButtonContent>
                    <MaterialSymbol icon="play_arrow" size={18} />
                    WATCH CASE STUDY
                  </ButtonContent>
                </Button>
                {message.caseStudy && !isMobile && (
                  <FigmaLink 
                    href={getCaseStudy(message.caseStudy)?.figma} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => {
                      const caseStudy = getCaseStudy(message.caseStudy!);
                      if (caseStudy) {
                        track('figma_link_click', {
                          case_study_id: message.caseStudy,
                          case_study_title: caseStudy.title,
                          figma_url: caseStudy.figma
                        });
                      }
                    }}
                  >
                    <LinkText>
                      Review slides in Figma
                      <MaterialSymbol icon="open_in_new" size={14} />
                    </LinkText>
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