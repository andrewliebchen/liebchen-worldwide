import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@/src/context/QueryContext';
import { handleCommand } from '@/src/ai/commands/handler';
import { TerminalContainer, OutputPane, OutputLine } from '@/src/styles/components/terminal.styles';
import { Header } from '@/src/components/Terminal/Header';
import { Input } from '@/src/components/Terminal/Input';
import { Message as MessageComponent } from '@/src/components/Terminal/Message';
import type { Message, MessageType, StatusType, TerminalContext } from '@/src/types/terminal';

export default function Terminal() {
  const { queryCount, syncWithServer, resetSession, isLoading, aiEnabled } = useQuery();
  const [history, setHistory] = useState<Message[]>([{
    type: 'system',
    content: `████████████████████████████████████████
█                                      █
█     Welcome to Andrew.AI             █
█     Running on LiebchenOS v0.1.0     █
█                                      █
████████████████████████████████████████

Type 'help' to explore commands
Ask me about Andrew's work, projects, or skills`,
    id: Date.now()
  }]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState<TerminalContext>({
    awaitingCaseStudy: false,
    inCaseStudy: false,
    currentCaseStudy: null
  });
  const [status, setStatus] = useState<StatusType>('connected');
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history, status]);

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
        id: Date.now() + 2
      };
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

  return (
    <TerminalContainer onClick={handleTerminalClick}>
      <Header />
      <OutputPane ref={outputRef}>
        {history.map((message) => (
          <OutputLine key={message.id}>
            <MessageComponent message={message} />
          </OutputLine>
        ))}
        <Input
          value={input}
          onChange={handleChange}
          onSubmit={handleSubmit}
          disabled={isLoading || status === 'processing'}
          inputRef={inputRef}
        />
      </OutputPane>
    </TerminalContainer>
  );
} 