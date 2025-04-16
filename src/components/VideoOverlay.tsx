import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { CaseStudy } from '@/src/config/caseStudies';
import { colors } from '@/src/styles/theme/colors';
import { spacing } from '@/src/styles/theme/constants';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';

interface VideoOverlayProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

interface VideoContainerProps {
  isMinimized: boolean;
  isMaximized: boolean;
  position?: { x: number; y: number };
}

const VideoContainer = styled.div<VideoContainerProps>`
  background: ${colors.bg.secondary};
  border: 1px solid ${colors.text.accent};
  border-radius: 5px;
  width: ${props => {
    if (props.isMaximized) return '80vw';
    if (props.isMinimized) return '300px';
    return '480px';
  }};
  position: fixed;
  bottom: ${props => props.isMaximized ? '50%' : spacing.xl};
  right: ${props => props.isMaximized ? '50%' : spacing.xl};
  transform: ${props => props.isMaximized 
    ? 'translate(50%, 50%)' 
    : `translate(${props.position?.x || 0}px, ${props.position?.y || 0}px)`};
  z-index: ${props => props.isMaximized ? 1001 : 1000};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: all 0.3s ease;
`;

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.sm};
  background: ${colors.bg.primary};
  cursor: move;
  user-select: none;
`;

const VideoTitle = styled.div`
  color: ${colors.text.accent};
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  padding: ${spacing.xs};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  color: ${colors.text.accent};

  &:hover {
    background: ${colors.bg.secondary};
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-top: 1px solid ${colors.text.accent};
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const HeaderControls = styled.div`
  display: flex;
  gap: ${spacing.xs};
  align-items: center;
`;

export const VideoOverlay: React.FC<VideoOverlayProps> = ({ caseStudy, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      const videoId = url.split('/').pop();
      if (!videoId) return '';

      // Convert timestamp from MM:SS to seconds
      const [minutes, seconds] = caseStudy.timestamp.split(':').map(Number);
      const startTime = (minutes * 60) + seconds;

      // Request HD quality (hd1080) and enable high quality thumbnail
      return `https://www.youtube.com/embed/${videoId}?start=${startTime}&vq=hd1080&modestbranding=1&rel=0`;
    } catch (error) {
      console.error('Error parsing video URL:', error);
      return '';
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return; // Prevent dragging when maximized
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  }, [position, isMaximized]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setPosition({ x: newX, y: newY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const embedUrl = getEmbedUrl(caseStudy.videoUrl);
  if (!embedUrl) {
    console.log('No valid video URL found for case study:', caseStudy);
    return null;
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    if (!isMaximized) {
      setIsMinimized(false); // Ensure we're not minimized when maximizing
    } else {
      // Reset position when exiting maximized state
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (!isMinimized) {
      setIsMaximized(false); // Ensure we're not maximized when minimizing
      setPosition({ x: 0, y: 0 }); // Reset position when minimizing
    }
  };

  return (
    <VideoContainer 
      style={{ 
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      isMinimized={isMinimized}
      isMaximized={isMaximized}
      position={position}
    >
      <VideoHeader onMouseDown={handleMouseDown}>
        <VideoTitle>{caseStudy.title}</VideoTitle>
        <HeaderControls>
          <CloseButton onClick={handleMinimize}>
            <MaterialSymbol 
              icon="minimize" 
              size={20} 
              color={colors.text.accent} 
            />
          </CloseButton>
          <CloseButton onClick={handleMaximize}>
            <MaterialSymbol 
              icon={isMaximized ? "close_fullscreen" : "open_in_full"} 
              size={20} 
              color={colors.text.accent} 
            />
          </CloseButton>
          <CloseButton onClick={onClose}>
            <MaterialSymbol icon="close" size={20} color={colors.text.accent} />
          </CloseButton>
        </HeaderControls>
      </VideoHeader>
      {!isMinimized && (
        <VideoWrapper>
          <Iframe
            src={embedUrl}
            title={caseStudy.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      )}
    </VideoContainer>
  );
}; 