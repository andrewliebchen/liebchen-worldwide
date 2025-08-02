import React from 'react';
import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';
import { typography, size, maxWidth, spacing } from '@/src/styles/theme/constants';
import { Button } from '../styles/components/buttons';
import Link from 'next/link';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-material-symbols/rounded';
import { CASE_STUDIES } from '@/src/ai/context';

// Page container with scrolling
const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.bg.primary};
  overflow-y: auto;
  overflow-x: hidden;
`;

// Main content container
const Container = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;
  width: 100%;
  padding: ${size[8]};
  display: flex;
  flex-direction: column;
  gap: ${size[8]};
`;

// Header with back link and schedule button
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${size[4]};
`;

// Back navigation link
const BackLink = styled(Link)`
  color: ${colors.text.secondary};
  text-decoration: none;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  display: inline-flex;
  align-items: center;
  gap: ${size[2]};
  transition: color 0.2s ease;
  padding: ${size[2]} 0;

  &:hover {
    color: ${colors.text.accent};
  }
`;

// Sticky video container
const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: ${colors.bg.secondary};
  border-radius: 8px;
  overflow: hidden;
  position: sticky;
  top: ${size[4]};
  z-index: 5;
`;

// Case study information container
const CaseStudyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${size[4]};
  margin-top: ${size[4]};
  padding: 0 ${size[4]};
`;

// Title row with project title and Figma link
const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// Case study title
const CaseStudyTitle = styled.h1`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[4]};
  font-weight: bold;
  color: ${colors.text.primary};
  margin: 0;
`;

// Case study description
const CaseStudyDescription = styled.p`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[2]};
  color: ${colors.text.primary};
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
`;

// Figma link
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

// Link text with icon
const LinkText = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
`;

// Button content with icon
const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

// Case study section (challenge, solution, outcome)
const CaseStudySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${size[2]};
`;

// Section title
const SectionTitle = styled.h3`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[2]};
  font-weight: 600;
  color: ${colors.text.primary};
  margin: 0;
`;

// Section content
const SectionContent = styled.p`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  color: ${colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

// Case study links section
const CaseStudyLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${size[4]};
  margin-top: ${size[6]};
`;

// Case study link
const CaseStudyLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${size[3]};
  text-decoration: none;
  padding: ${spacing.md};
  border-radius: 8px;
  border: 1px solid ${colors.border.primary};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${colors.bg.secondary};
  }
`;

// Case study link title
const CaseStudyLinkTitle = styled.h3`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[2]};
  font-weight: 600;
  color: ${colors.text.primary};
  margin: 0;
`;

// Case study link description
const CaseStudyLinkDescription = styled.p`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize[1]};
  color: ${colors.text.secondary};
  margin: 0;
`;

// Case study link content
const CaseStudyLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
  flex: 1;
`;

// Arrow icon
const ArrowIcon = styled(MaterialSymbol)`
  color: ${colors.text.accent};
`;

interface CaseStudyLandingProps {
  caseStudy: {
    title: string;
    videoUrl: string;
    figma: string;
    timestamp: string;
    id?: string; // ID to match with context
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
  
  // Get case study data from context if ID is provided
  const contextCaseStudy = caseStudy.id ? CASE_STUDIES[caseStudy.id] : null;
  
  // Check if this is the showcase page (root)
  const isShowcase = caseStudy.id === 'root';
  
  // Showcase content
  const showcaseTitle = "Design That Ships and Serves";
  const showcaseDescription = `In this short talk, I walk through three real-world projects—from helping a wildfire app become a statewide lifeline, to redesigning the Meta Quest companion app under tight hardware deadlines, to building and shipping an AI-powered nutrition coach in weekly sprints.

It's a look at how I work: fast, thoughtful, collaborative, and always grounded in solving real problems for real people. If you're curious how I think, what I value, or how I approach early-stage product design, this is a good place to start`;

  // Case study links data
  const caseStudyLinks = [
    {
      id: 'watchduty',
      title: 'Watch Duty: Wildfire Awareness',
      description: 'A wildfire tracking app used by thousands during real emergencies.'
    },
    {
      id: 'metaquest',
      title: 'Meta Quest: Bridge to the Metaverse',
      description: 'Led design for the Meta Quest companion app ahead of a major headset launch.'
    },
    {
      id: 'miri',
      title: 'Miri: AI-Powered Wellness Coach',
      description: 'An AI coaching app that combined chat-based guidance with structured nutrition tracking.'
    }
  ];

  return (
    <Page>
      <Container>
        <Header>
          <BackLink href="/">
            ← Back to Liebchen.world
          </BackLink>
        </Header>
        
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

        <CaseStudyInfo>
          {isShowcase ? (
            <>
              <TitleRow>
                <CaseStudyTitle>{showcaseTitle}</CaseStudyTitle>
                <FigmaLink
                  href={caseStudy.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>
                    View slides in Figma
                    <MaterialSymbol icon="open_in_new" size={14} />
                  </LinkText>
                </FigmaLink>
              </TitleRow>
              <CaseStudyDescription>{showcaseDescription}</CaseStudyDescription>
              
              <CaseStudyLinks>
                
                {caseStudyLinks.map((link) => (
                  <CaseStudyLink key={link.id} href={`/showcase/${link.id}`}>
                    <CaseStudyLinkContent>
                      <CaseStudyLinkTitle>{link.title}</CaseStudyLinkTitle>
                      <CaseStudyLinkDescription>{link.description}</CaseStudyLinkDescription>
                    </CaseStudyLinkContent>
                    <ArrowIcon icon="arrow_forward_ios" size={20} />
                  </CaseStudyLink>
                ))}
              </CaseStudyLinks>
            </>
          ) : (
            <>
              <TitleRow>
                <CaseStudyTitle>{contextCaseStudy?.title || caseStudy.title}</CaseStudyTitle>
                <FigmaLink
                  href={caseStudy.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkText>
                    View slides in Figma
                    <MaterialSymbol icon="open_in_new" size={14} />
                  </LinkText>
                </FigmaLink>
              </TitleRow>
              <CaseStudyDescription>{contextCaseStudy?.description}</CaseStudyDescription>
              
              {contextCaseStudy && (
                <>
                  <CaseStudySection>
                    <SectionTitle>Challenge</SectionTitle>
                    <SectionContent>{contextCaseStudy.challenge}</SectionContent>
                  </CaseStudySection>
                  
                  <CaseStudySection>
                    <SectionTitle>Solution</SectionTitle>
                    <SectionContent>{contextCaseStudy.solution}</SectionContent>
                  </CaseStudySection>
                  
                  <CaseStudySection>
                    <SectionTitle>Outcome</SectionTitle>
                    <SectionContent>{contextCaseStudy.outcome}</SectionContent>
                  </CaseStudySection>
                </>
              )}
            </>
          )}
        </CaseStudyInfo>
      </Container>
    </Page>
  );
}; 