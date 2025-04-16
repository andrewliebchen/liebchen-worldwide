import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { size, typography } from '@/src/styles/theme/constants';
import MarkdownResponse from '@/src/components/MarkdownResponse';

interface TypewriterMessageProps {
  content: string;
  onComplete?: () => void;
  useMarkdown?: boolean;
  commandLine?: boolean;
}

const TypewriterContainer = styled.div<{ commandLine?: boolean }>`
  font-family: ${typography.fontFamily.primary};
  line-height: ${typography.lineHeight.normal};
  white-space: pre-wrap;
  word-wrap: break-word;
  min-height: 2em;
  padding-bottom: 36px;
  ${props => props.commandLine && `
    display: inline;
    color: inherit;
  `}
`;

export function TypewriterMessage({ content, onComplete, useMarkdown = true, commandLine = false }: TypewriterMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const contentRef = useRef(content);
  const onCompleteRef = useRef(onComplete);
  const isMountedRef = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const scrollIntoView = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  
  // Update refs when props change
  useEffect(() => {
    contentRef.current = content;
    onCompleteRef.current = onComplete;
  }, [content, onComplete]);
  
  // Cleanup function
  const cleanup = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };
  
  // Reset state when content changes
  useEffect(() => {
    isMountedRef.current = true;
    setDisplayedContent('');
    setIsComplete(false);
    contentRef.current = content;
    
    // Clear any existing animation
    cleanup();
    
    // Start animation immediately
    startTimeRef.current = performance.now();
    const animate = (timestamp: number) => {
      if (!isMountedRef.current) return;
      
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      // Faster animation for command messages
      const msPerChar = commandLine ? 5 : 10;
      const charactersToShow = Math.floor(elapsed / msPerChar);
      
      if (charactersToShow < content.length) {
        setDisplayedContent(content.substring(0, charactersToShow));
        scrollIntoView();
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayedContent(content);
        setIsComplete(true);
        scrollIntoView();
        if (isMountedRef.current && onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      isMountedRef.current = false;
      cleanup();
    };
  }, [content, commandLine]);

  // Handle keyboard shortcut to complete the animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isComplete && isMountedRef.current) {
        setDisplayedContent(content);
        setIsComplete(true);
        scrollIntoView();
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        
        // Cancel any ongoing animation
        cleanup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isComplete, content]);

  return (
    <TypewriterContainer ref={containerRef} commandLine={commandLine}>
      {useMarkdown ? (
        <MarkdownResponse content={displayedContent} />
      ) : (
        displayedContent
      )}
    </TypewriterContainer>
  );
} 