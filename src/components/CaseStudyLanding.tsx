import React from 'react';
import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';
import { typography, size, maxWidth, spacing } from '@/src/styles/theme/constants';
import { PrimaryButton, Button } from '../styles/components/buttons';
import Link from 'next/link';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.bg.primary};
`;

const Container = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;
  width: 100%;
  padding: ${size[8]};
  display: flex;
  flex-direction: column;
  gap: ${size[8]};
`;

const BackLink = styled(Link)`
  color: ${colors.text.secondary};
  text-decoration: none;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  display: inline-flex;
  align-items: center;
  gap: ${size[2]};
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.text.accent};
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: ${colors.bg.secondary};
  border-radius: 8px;
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${size[8]};
  flex-wrap: wrap;
`;

const FigmaLink = styled.a`
  color: ${colors.text.accent};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const LinkText = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

interface CaseStudyLandingProps {
  caseStudy: {
    title: string;
    videoUrl: string;
    figma: string;
    timestamp: string;
  };
  calendlyUrl?: string;
}

export const CaseStudyLanding: React.FC<CaseStudyLandingProps> = ({ 
  caseStudy,
  calendlyUrl = 'https://calendly.com/andrewliebchen/25min'
}) => {
  // Convert YouTube URL to embed URL with timestamp
  const getEmbedUrl = (url: string, timestamp: string) => {
    if (!url) return '';
    try {
      const videoId = url.split('/').pop();
      if (!videoId) return '';

      // Convert timestamp from MM:SS to seconds
      const [minutes, seconds] = timestamp.split(':').map(Number);
      const startTime = (minutes * 60) + seconds;

      return `https://www.youtube.com/embed/${videoId}?start=${startTime}`;
    } catch (error) {
      console.error('Error parsing video URL:', error);
      return '';
    }
  };

  const embedUrl = getEmbedUrl(caseStudy.videoUrl, caseStudy.timestamp);

  return (
    <Page>
      <Container>
        <BackLink href="/">
          ← Back to Liebchen.world
        </BackLink>
        
        <VideoContainer>
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title={caseStudy.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoContainer>

        <ButtonContainer>
        <Button
            variant="primary"
            size="large"
            onClick={() => window.open(calendlyUrl, '_blank')}
          >
            <ButtonContent>
              <MaterialSymbol icon="today" size={18} />
              Schedule a Chat
            </ButtonContent>
          </Button>
          <FigmaLink
            href={caseStudy.figma}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkText>
              View in Figma
              <MaterialSymbol icon="open_in_new" size={14} />
            </LinkText>
          </FigmaLink>
          
        </ButtonContainer>
      </Container>
    </Page>
  );
}; 