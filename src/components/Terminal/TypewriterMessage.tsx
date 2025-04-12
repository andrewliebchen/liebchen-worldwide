import React, { useEffect, useState } from 'react';
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start the animation immediately
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 10); // Increased speed from 30ms to 10ms

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, content, isComplete, onComplete]);

  // Handle keyboard shortcut to complete the animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isComplete) {
        setDisplayedContent(content);
        setCurrentIndex(content.length);
        setIsComplete(true);
        onComplete?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, isComplete, onComplete]);

  return (
    <TypewriterContainer>
      <MarkdownResponse content={displayedContent} />
    </TypewriterContainer>
  );
} 