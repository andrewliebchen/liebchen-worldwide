import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useQuery } from '@/src/context/QueryContext';
import { handleCommand } from '@/src/ai/commands/handler';
import { TerminalContainer, OutputPane, OutputLine } from '@/src/styles/components/terminal.styles';
import { Header } from '@/src/components/Terminal/Header';
import { Input } from '@/src/components/Terminal/Input';
import { Message as MessageComponent } from '@/src/components/Terminal/Message';
import { TypewriterMessage } from '@/src/components/Terminal/TypewriterMessage';
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
  "Hey there, Andrew.AI here to help. Andrew's all about designing products that feel intuitive and genuinely helpful—whether it's an MVP for a startup or AI-driven tools for nutrition coaching. Got a question? Just ask, or type help for ideas.",
  "Welcome! Andrew's spent over a decade crafting thoughtful, user-focused designs for everything from Meta's Metaverse app to wildfire awareness tools. Curious how he approaches design? Ask away or type help to see where we can go.",
  "Hi there, Andrew.AI here. Andrew believes good design is about solving real problems with empathy and a bit of creativity (architecture degree helps). Want to chat about his work or skills? I'm ready when you are—or type help if you're unsure.",
  "Andrew.AI checking in. Andrew's work spans startups to global companies, always focused on building functional, beautiful products. Need a starting point? Ask about his process, recent projects, or type help to get unstuck.",
  "Hello from Andrew.AI. Andrew loves a good challenge, whether it's designing for VR, wildfire response, or AI-powered coaching. Let's talk about how he approaches design—or type help if you'd like some suggestions."
];

const proTip = "\n\n**Pro tip:** You can ask up to 5 questions per day, so make them count! Commands like **about** and **projects** are unlimited—use them anytime to explore.";

const getRandomWelcomeMessage = () => {
  const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
  return randomMessage + proTip;
};

export default function Terminal() {
  const { queryCount, syncWithServer, resetSession, isLoading, aiEnabled } = useQuery();
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
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
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
        return;
      }

      // Update query count after successful AI response
      if (isAIQuery && response.type !== 'error') {
        console.log('Client: Successful AI response, syncing query count');
        await syncWithServer();
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
    console.log('Client: Case study clicked:', caseStudyId);
    // For now, just log the case study ID
    // In the future, this will open a video overlay
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
    </TerminalContainer>
  );
} 