import React from 'react';
import styled from 'styled-components';
import { CaseStudy } from '@/src/config/caseStudies';
import { TerminalButton } from '@/src/styles/components/buttons';

interface VideoOverlayProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 27, 38, 0.85); /* Tokyo Night blue background with transparency */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoContainer = styled.div`
  background: #1a1b26;
  border: 1px solid #414868;
  border-radius: 4px;
  width: 90%;
  max-width: 1000px;
  position: relative;
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

  const embedUrl = getEmbedUrl(caseStudy.videoUrl);
  if (!embedUrl) {
    console.log('No valid video URL found for case study:', caseStudy);
    return null;
  }

  return (
    <Overlay onClick={onClose}>
      <VideoContainer onClick={e => e.stopPropagation()}>
        <TerminalButton 
          onClick={onClose}
          style={{ 
            position: 'absolute',
            top: '-50px',
            right: '0'
          }}
        >
          CLOSE
        </TerminalButton>
        <VideoWrapper>
          <Iframe
            src={embedUrl}
            title={caseStudy.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      </VideoContainer>
    </Overlay>
  );
}; 