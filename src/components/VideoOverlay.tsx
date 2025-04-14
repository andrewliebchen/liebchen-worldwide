import React, { useState } from 'react';
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

const VideoContainer = styled.div`
  background: ${colors.bg.secondary};
  border: 1px solid ${colors.text.accent};
  border-radius: 5px;
  width: 480px;
  position: absolute;
  bottom: ${spacing.xl};
  right: ${spacing.xl};
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const VideoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.sm};
  background: ${colors.bg.primary};
  border-bottom: 1px solid ${colors.text.accent};
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
`;

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

export const VideoOverlay: React.FC<VideoOverlayProps> = ({ caseStudy, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      const videoId = url.split('/').pop();
      if (!videoId) return '';

      // Convert timestamp from MM:SS to seconds
      const [minutes, seconds] = caseStudy.timestamp.split(':').map(Number);
      const startTime = (minutes * 60) + seconds;

      return `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
    } catch (error) {
      console.error('Error parsing video URL:', error);
      return '';
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const embedUrl = getEmbedUrl(caseStudy.videoUrl);
  if (!embedUrl) {
    console.log('No valid video URL found for case study:', caseStudy);
    return null;
  }

  return (
    <VideoContainer 
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <VideoHeader onMouseDown={handleMouseDown}>
        <VideoTitle>{caseStudy.title}</VideoTitle>
        <CloseButton onClick={onClose}>
          <MaterialSymbol icon="close" size={20} color={colors.text.accent} />
        </CloseButton>
      </VideoHeader>
      <VideoWrapper>
        <Iframe
          src={embedUrl}
          title={caseStudy.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </VideoWrapper>
    </VideoContainer>
  );
}; 