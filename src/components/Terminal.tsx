import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@/src/context/QueryContext';
import { useConversation } from '@/src/context/ConversationContext';
import { handleCommand } from '@/src/ai/commands/handler';
import { TerminalContainer, OutputPane, OutputLine } from '@/src/styles/components/terminal.styles';
import { Header } from '@/src/components/Header';
import { Input } from '@/src/components/Input';
import { Message as MessageComponent } from '@/src/components/Message';
import { TypewriterMessage } from '@/src/components/TypewriterMessage';
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
  "Andrew Liebchen is a senior product designer, sculptor, and occasional front-end whisperer. He's helped startups launch, Meta ship, and wildfire responders stay informed. Ask him about design, AI, or that time his app beat ChatGPT in the App Store. Or type help to poke around.",
  "Andrew Liebchen designs things that actually help people — not just make corporations richer (though he's done that too). From firefighting apps to VR headsets to AI nutrition coaching, he brings clarity, compassion, and clean code. Curious? Ask about a project, or type help to explore.",
  "Andrew Liebchen is a product designer who likes his UX clean, his code shippable, and his sculpting clay slightly overambitious. His work spans Meta's VR universe, wildfire alerts, and AI-powered wellness tools. Type help if you want a tour—or just say hi.",
  "Need a designer who can ship code, sketch like an architect, and still explain it all in plain English? That's Andrew Liebchen. He's worked on everything from AI coaching to emergency response apps. Ask him something, or type help to get ideas.",
  "Andrew Liebchen once helped an app be #1 in the free section of the App Store. He's also designed internal tools for Meta, conversational AI apps, and a wildfire platform used by thousands. He's equal parts craftsman and pragmatist. Want to know more? Just ask—or type help."
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
    console.log('Terminal: processCommand called with:', command);
    console.log('Terminal: Current state:', {
      status,
      isLoading,
      context,
      historyLength: history.length
    });

    // Prevent processing if already processing a command
    if (status === 'processing' || status === 'thinking' || isLoading) {
      console.log('Terminal: Command rejected - already processing:', {
        status,
        isLoading,
        command
      });
      return;
    }

    console.log('Terminal: Processing command:', command);
    console.log('Terminal: Current local query count:', queryCount);
    
    const commandEntry: Message = { 
      type: 'command', 
      content: command,
      id: Date.now()
    };
    console.log('Terminal: Created command entry:', commandEntry);
    
    // Check if this will be an AI query (any non-static command)
    const isStaticCommand = command.toLowerCase().startsWith('help') ||
                          command.toLowerCase().startsWith('portfolio') ||
                          command.toLowerCase().startsWith('contact') ||
                          command.toLowerCase().startsWith('about') ||
                          command.toLowerCase().startsWith('clear') ||
                          command.toLowerCase().startsWith('back') ||
                          command.toLowerCase().startsWith('ascii');
    
    const isAIQuery = !isStaticCommand;
    console.log('Terminal: Command type:', { isStaticCommand, isAIQuery, command });

    // Add command to history first
    console.log('Terminal: Adding command to history');
    setHistory(prev => {
      console.log('Terminal: Previous history length:', prev.length);
      return [...prev, commandEntry];
    });

    // Then set status and add thinking entry
    console.log('Terminal: Setting status to processing');
    setStatus('processing');
    const thinkingEntry: Message = {
      type: 'thinking',
      content: '',
      id: Date.now() + 1
    };
    console.log('Terminal: Adding thinking entry');
    setHistory(prev => [...prev, thinkingEntry]);

    try {
      // For AI queries, sync with server first
      if (isAIQuery) {
        try {
          console.log('Terminal: Starting server sync for AI query');
          await syncWithServer();
          console.log('Terminal: Server sync completed');
          setStatus('thinking');
        } catch (error) {
          console.error('Terminal: Server sync failed:', error);
          throw new Error('Failed to sync with server');
        }
      } else if (command === 'portfolio') {
        console.log('Terminal: Setting portfolio loading state');
        setStatus('loading');
      }

      // Process the command
      console.log('Terminal: Calling handleCommand');
      const response = await handleCommand(command, context, queryCount);
      console.log('Terminal: handleCommand response:', response);

      // Handle clear command
      if (response.type === 'clear') {
        console.log('Terminal: Processing clear command');
        await resetSession();
        setHistory([]);
        setContext({ 
          awaitingCaseStudy: false, 
          inCaseStudy: false,
          currentCaseStudy: null 
        });
        setCurrentTopic('Liebchen.world is initialized');
        setStatus('connected');
        console.log('Terminal: Clear command completed');
        return;
      }

      // For successful AI responses, update query count and topic
      if (isAIQuery && response.type !== 'error') {
        try {
          console.log('Terminal: Updating after successful AI response');
          await syncWithServer();
          
          if (response.type === 'ai-response') {
            console.log('Terminal: Generating tagline for AI response');
            const topic = await generateTagline(response.content);
            setCurrentTopic(topic);
          }
        } catch (error) {
          console.error('Terminal: Post-response sync failed:', error);
        }
      }

      // Create the response message
      const responseMessage: Message = {
        type: response.type as MessageType,
        content: response.content,
        id: Date.now() + 2,
        caseStudy: response.caseStudy
      };
      console.log('Terminal: Created response message:', responseMessage);

      // Update history and context atomically
      console.log('Terminal: Updating history with response');
      setHistory(prev => {
        console.log('Terminal: History length before update:', prev.length);
        return [...prev.slice(0, -1), responseMessage];
      });
      
      if (response.type !== 'error') {
        console.log('Terminal: Updating context for success response');
        setContext(prev => {
          const newContext = {
            awaitingCaseStudy: response.awaitCaseStudy || false,
            inCaseStudy: response.type === 'case-study',
            currentCaseStudy: response.currentCaseStudy || prev.currentCaseStudy
          };
          console.log('Terminal: New context:', newContext);
          return newContext;
        });
        setStatus('connected');
      } else {
        console.log('Terminal: Handling error response');
        setStatus('error');
        setTimeout(() => {
          console.log('Terminal: Resetting error status');
          setStatus('connected');
        }, 3000);
      }
    } catch (error) {
      console.error('Terminal: Command processing error:', error);
      console.log('Terminal: Updating history with error message');
      setHistory(prev => [...prev.slice(0, -1), {
        type: 'error',
        content: 'An error occurred. Please try again.',
        id: Date.now() + 2
      }]);
      setStatus('error');
      setTimeout(() => {
        console.log('Terminal: Resetting error status');
        setStatus('connected');
      }, 3000);
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
        processCommand={processCommand}
        disabled={status === 'processing'}
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