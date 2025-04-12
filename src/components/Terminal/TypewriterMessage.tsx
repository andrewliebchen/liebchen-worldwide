import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { size, typography } from '@/src/styles/theme/constants';
import MarkdownResponse from '@/src/components/Terminal/MarkdownResponse';

interface TypewriterMessageProps {
  content: string;
  onComplete?: () => void;
}

const TypewriterContainer = styled.div`
  font-family: ${typography.fontFamily.primary};
  line-height: ${typography.lineHeight.normal};
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-bottom: ${size[4]};
`;

export function TypewriterMessage({ content, onComplete }: TypewriterMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const contentRef = useRef(content);
  const onCompleteRef = useRef(onComplete);
  const isMountedRef = useRef(true);
  
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
      const charactersToShow = Math.floor(elapsed / 10); // 10ms per character
      
      if (charactersToShow < content.length) {
        setDisplayedContent(content.substring(0, charactersToShow));
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayedContent(content);
        setIsComplete(true);
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
  }, [content]);

  // Handle keyboard shortcut to complete the animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isComplete && isMountedRef.current) {
        setDisplayedContent(content);
        setIsComplete(true);
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
    <TypewriterContainer>
      <MarkdownResponse content={displayedContent} />
    </TypewriterContainer>
  );
} 