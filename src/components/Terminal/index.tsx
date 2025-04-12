import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@/src/context/QueryContext';
import { useConversation } from '@/src/context/ConversationContext';
import { handleCommand } from '@/src/ai/commands/handler';
import { TerminalContainer, OutputPane, OutputLine } from '@/src/styles/components/terminal.styles';
import { Header } from '@/src/components/Terminal/Header';
import { Input } from '@/src/components/Terminal/Input';
import { Message as MessageComponent } from '@/src/components/Terminal/Message';
import { TypewriterMessage } from '@/src/components/Terminal/TypewriterMessage';
import { VideoOverlay } from '@/src/components/VideoOverlay';
import { getCaseStudy } from '@/src/config/caseStudies';
import type { Message, MessageType, StatusType, TerminalContext } from '@/src/types/terminal';

const WelcomeSection = React.memo(({ message, onComplete }: { message: string; onComplete: () => void }) => {
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

const welcomeMessages = [
  "Andrew Liebchen is a senior product designer, sculptor, and occasional front-end whisperer. He’s helped startups launch, Meta ship, and wildfire responders stay informed. Ask him about design, AI, or that time his app beat ChatGPT in the App Store. Or type help to poke around.",
  "Andrew Liebchen designs things that actually help people — not just make corporations richer (though he's done that too). From firefighting apps to VR headsets to AI nutrition coaching, he brings clarity, compassion, and clean code. Curious? Ask about a project, or type help to explore.",
  "Andrew Liebchen is a product designer who likes his UX clean, his code shippable, and his sculpting clay slightly overambitious. His work spans Meta’s VR universe, wildfire alerts, and AI-powered wellness tools. Type help if you want a tour—or just say hi.",
  "Need a designer who can ship code, sketch like an architect, and still explain it all in plain English? That’s Andrew Liebchen. He’s worked on everything from AI coaching to emergency response apps. Ask him something, or type help to get ideas.",
  "Andrew Liebchen once helped an app be #1 in the free section of the App Store. He’s also designed internal tools for Meta, conversational AI apps, and a wildfire platform used by thousands. He’s equal parts craftsman and pragmatist. Want to know more? Just ask—or type help."
];


const proTip = "\n\n**Pro tip:** You can ask up to 5 questions per day, so make them count! Commands like **about** and **projects** are unlimited—use them anytime to explore.";

const getRandomWelcomeMessage = () => {
  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  return randomMessage + proTip;
};

const generateTagline = async (content: string): Promise<string> => {
  try {
    const response = await fetch('/api/tagline/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate tagline');
    }

    const data = await response.json();
    return data.tagline;
  } catch (error) {
    console.error('Error generating tagline:', error);
    return 'Liebchen.world is initialized';
  }
};

export default function Terminal() {
  const { queryCount, syncWithServer, resetSession, isLoading, aiEnabled } = useQuery();
  const { setCurrentTopic } = useConversation();
  const [history, setHistory] = useState<Message[]>([]);
  const [isInitialMessageComplete, setIsInitialMessageComplete] = useState(false);
  const [input, setInput] = useState('');
  const welcomeMessageRef = useRef(getRandomWelcomeMessage());
  const welcomeMessageIdRef = useRef(Date.now());
  const [context, setContext] = useState<TerminalContext>({
    awaitingCaseStudy: false,
    inCaseStudy: false,
    currentCaseStudy: null
  });
  const [status, setStatus] = useState<StatusType>('connected');
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState<string | null>(null);

  // Initialize history with welcome message
  useEffect(() => {
    if (history.length === 0) {
      setHistory([{
        type: 'system',
        content: welcomeMessageRef.current,
        id: welcomeMessageIdRef.current
      }]);
    }
  }, []);

  // Mark initial message as complete after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialMessageComplete(true);
    }, 5000); // 5 seconds should be enough for the typewriter effect to complete
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when history changes
  useEffect(() => {
    const scrollToBottom = () => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    };

    scrollToBottom();
    // Add a small delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeoutId);
  }, [history]);

  // Simple focus management
  useEffect(() => {
    if (inputRef.current && !isLoading && status !== 'processing') {
      inputRef.current.focus();
    }
  }, [isLoading, status]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const processCommand = async (command: string) => {
    if (isLoading) {
      console.log('Client: Still loading query count, ignoring command');
      return;
    }

    console.log('Client: Processing command:', command);
    console.log('Client: Current local query count:', queryCount);
    
    const commandEntry: Message = { 
      type: 'command', 
      content: command,
      id: Date.now()
    };
    
    // Check if this will be an AI query (any non-static command)
    const isStaticCommand = command.toLowerCase().startsWith('help') ||
                          command.toLowerCase().startsWith('portfolio') ||
                          command.toLowerCase().startsWith('contact') ||
                          command.toLowerCase().startsWith('clear') ||
                          command.toLowerCase().startsWith('back') ||
                          command.toLowerCase().startsWith('ascii');
    
    const isAIQuery = !isStaticCommand;
    console.log('Client: Is AI query:', isAIQuery);

    if (isAIQuery) {
      // Check server-side query count before proceeding
      try {
        console.log('Client: Checking server query count');
        const serverCount = await syncWithServer();
        console.log('Client: Server query count:', serverCount);
      } catch (error) {
        console.error('Client: Failed to check query count:', error);
      }
    }

    const thinkingEntry: Message = {
      type: 'thinking',
      content: '',
      id: Date.now() + 1
    };

    setHistory(prev => [...prev, commandEntry, thinkingEntry]);
    setStatus('processing');

    try {
      if (isAIQuery) {
        console.log('Client: Starting AI query');
        setStatus('thinking');
      } else if (command === 'portfolio') {
        setStatus('loading');
      }

      const response = await handleCommand(command, context, queryCount);
      console.log('Client: Got response:', response);

      if (response.type === 'clear') {
        console.log('Client: Clearing history and resetting session');
        await resetSession();
        setHistory([]);
        setContext({ 
          awaitingCaseStudy: false, 
          inCaseStudy: false,
          currentCaseStudy: null 
        });
        setCurrentTopic('Liebchen.world is initialized');
        return;
      }

      // Update query count after successful AI response
      if (isAIQuery && response.type !== 'error') {
        console.log('Client: Successful AI response, syncing query count');
        await syncWithServer();
        
        // Update the conversation topic based on the AI response
        if (response.type === 'ai-response') {
          const topic = await generateTagline(response.content);
          setCurrentTopic(topic);
        }
      }

      // Replace the thinking entry with the actual response
      const responseMessage: Message = {
        type: response.type as MessageType,
        content: response.content,
        id: Date.now() + 2,
        caseStudy: response.caseStudy
      };

      // Log AI responses
      if (isAIQuery && response.type === 'ai-response') {
        console.log('Client: AI Response Content:', response.content);
        console.log('Client: Case Study:', response.caseStudy);
      }

      setHistory(prev => [...prev.slice(0, -1), responseMessage]);

      if (response.type !== 'error') {
        setContext({
          awaitingCaseStudy: response.awaitCaseStudy || false,
          inCaseStudy: response.type === 'case-study',
          currentCaseStudy: response.currentCaseStudy || null
        });
        setStatus('connected');
      } else {
        console.log('Terminal: Error response received');
        setStatus('error');
        setTimeout(() => setStatus('connected'), 3000);
      }
    } catch (error) {
      console.error('Terminal: Error processing command:', error);
      setStatus('error');
      const errorMessage: Message = {
        type: 'error',
        content: 'An error occurred. Please try again.',
        id: Date.now() + 2
      };
      setHistory(prev => [...prev.slice(0, -1), errorMessage]);
      setTimeout(() => setStatus('connected'), 3000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || status === 'processing') return;
    
    processCommand(input.trim());
    setInput('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCaseStudyClick = (caseStudyId: string) => {
    console.log('Terminal: Case study click handler called');
    console.log('Terminal: Case study ID:', caseStudyId);
    const caseStudy = getCaseStudy(caseStudyId);
    console.log('Terminal: Found case study:', caseStudy);
    if (caseStudy && caseStudy.videoUrl) {
      console.log('Terminal: Setting active case study');
      setActiveCaseStudy(caseStudyId);
    } else {
      console.log('Terminal: No case study or video URL found');
    }
  };

  const handleCloseVideo = () => {
    setActiveCaseStudy(null);
  };

  return (
    <TerminalContainer onClick={handleTerminalClick}>
      <Header />
      <OutputPane ref={outputRef}>
        {history.map(message => (
          <OutputLine key={message.id}>
            <MessageComponent 
              message={message} 
              onCaseStudyClick={handleCaseStudyClick}
            />
          </OutputLine>
        ))}
      </OutputPane>
      <Input
        value={input}
        onChange={handleChange}
        onSubmit={handleSubmit}
        disabled={!isInitialMessageComplete || status === 'processing'}
        inputRef={inputRef}
      />
      {activeCaseStudy && (
        <VideoOverlay
          caseStudy={getCaseStudy(activeCaseStudy)!}
          onClose={handleCloseVideo}
        />
      )}
    </TerminalContainer>
  );
} 