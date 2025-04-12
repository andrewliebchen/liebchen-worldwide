import React from 'react';
import styled from 'styled-components';
import { CaseStudy } from '../../config/caseStudies';
import { TerminalButton } from '../../styles/components/buttons';

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
    const videoId = url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

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
            src={getEmbedUrl(caseStudy.videoUrl)}
            title={caseStudy.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      </VideoContainer>
    </Overlay>
  );
}; 