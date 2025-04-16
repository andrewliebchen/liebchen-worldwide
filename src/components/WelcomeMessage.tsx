import React, { useRef } from 'react';
import { OutputLine } from '@/src/styles/components/terminal.styles';
import { TypewriterMessage } from '@/src/components/TypewriterMessage';

const welcomeMessages = [
    "Andrew Liebchen helps early-stage startups turn ambitious ideas into real products—fast. He also sculpts, codes, and once beat ChatGPT in the App Store. Ask him anything, or type help to explore.",
    
    "Need a designer who can sketch like an architect, ship code, and guide your product from zero to live? That’s Andrew Liebchen. He’s helped Meta ship, volunteers stay safe, and AI coaches feel human. Type help to dig in.",
    
    "Andrew Liebchen designs tools that real people rely on—from wildfire alerts to AI-powered nutrition coaching. He’s fast, collaborative, and allergic to meaningless dashboards. Ask him about a project, or type help to get started.",
    
    "From designing Meta’s VR app to building a wildfire platform used by thousands, Andrew Liebchen knows how to turn complexity into clarity. He works fast, thinks deeply, and always ships. Curious? Just ask—or type help.",
    
    "Andrew Liebchen is a senior product designer who thrives in the messy early stages. He brings structure, speed, and soul to digital products—from emergency response tools to AI coaching apps. Type help to explore what he’s built."
  ];
  

const proTip = "\n\n**Pro tip:** You can ask up to 5 questions per day, so make them count! Commands like **about** and **projects** are unlimited—use them anytime to explore.";

export const getRandomWelcomeMessage = () => {
  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  return randomMessage + proTip;
};

interface WelcomeSectionProps {
  message: string;
  onComplete: () => void;
}

export const WelcomeSection = React.memo(({ message, onComplete }: WelcomeSectionProps) => {
  const hasCompletedRef = useRef(false);
  
  const handleComplete = () => {
    if (!hasCompletedRef.current) {
      hasCompletedRef.current = true;
      onComplete();
    }
  };
  
  return (
    <OutputLine>
      <TypewriterMessage 
        content={message}
        onComplete={handleComplete}
      />
    </OutputLine>
  );
}); 