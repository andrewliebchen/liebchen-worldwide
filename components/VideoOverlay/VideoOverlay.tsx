import React from 'react';
import styled from 'styled-components';
import { CaseStudy } from '../../config/caseStudies';

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
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoContainer = styled.div`
  background: #1a1b26;
  border: 1px solid #414868;
  border-radius: 4px;
  padding: 20px;
  width: 90%;
  max-width: 1000px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: #414868;
  border: none;
  color: #a9b1d6;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  transition: all 0.2s ease;

  &:hover {
    background: #565f89;
    color: #c0caf5;
  }
`;

const Title = styled.h2`
  color: #7aa2f7;
  margin: 0 0 20px 0;
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
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
        <CloseButton onClick={onClose}>[ Close ]</CloseButton>
        <Title>{caseStudy.title}</Title>
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