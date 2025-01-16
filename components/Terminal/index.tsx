import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '../../context/QueryContext';
import { handleCommand } from '../../commands/handler';
import { TerminalContainer, OutputPane, OutputLine } from '../styles/terminal.styles';
import { Header } from './Header';
import { Input } from './Input';
import { Message } from './Message';
import type { Message as MessageType, StatusType, TerminalContext } from '../types/terminal';

export default function Terminal() {
  const { queryCount, incrementQuery, resetQueries } = useQuery();
  const [history, setHistory] = useState<MessageType[]>([{
    type: 'system',
    content: 'Welcome to Andrew.AI Terminal Portfolio\nType \'help\' to explore commands.\n\n░░░░░ 5 queries left',
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
    console.log('Terminal: Processing command:', command);
    console.log('Terminal: Current queryCount:', queryCount);
    
    const commandEntry: MessageType = { 
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
    console.log('Terminal: isAIQuery:', isAIQuery);
    
    if (isAIQuery && queryCount >= 5) {
      console.log('Terminal: Query limit reached');
      setHistory(prev => [...prev, commandEntry, {
        type: 'error',
        content: 'You have reached the query limit for this session.\n\n' +
                'I\'d love to continue our conversation! You can:\n' +
                '• Email me at andrew@liebchen.world\n' +
                '• Schedule a call: https://calendly.com/andrewliebchen/25min\n\n' +
                'Or refresh the page to start a new session.',
        id: Date.now() + 1
      }]);
      return;
    }

    const thinkingEntry: MessageType = {
      type: 'thinking',
      content: '',
      id: Date.now() + 1
    };

    setHistory(prev => [...prev, commandEntry, thinkingEntry]);
    setStatus('processing');

    try {
      if (isAIQuery) {
        console.log('Terminal: Starting AI query processing');
        setStatus('thinking');
      } else if (command === 'portfolio') {
        setStatus('loading');
      }

      const response = await handleCommand(command, context, queryCount);
      console.log('Terminal: Got response:', response);

      if (response.type === 'clear') {
        console.log('Terminal: Clearing history and resetting queries');
        setHistory([]);
        resetQueries();
        setContext({ 
          awaitingCaseStudy: false, 
          inCaseStudy: false,
          currentCaseStudy: null 
        });
        return;
      }

      // Update query count after successful AI response
      if (isAIQuery && response.type !== 'error') {
        console.log('Terminal: Incrementing query count after successful AI response');
        incrementQuery();
      }

      // Replace the thinking entry with the actual response
      setHistory(prev => [
        ...prev.slice(0, -1),
        {
          type: response.type,
          content: response.content,
          id: Date.now() + 2
        }
      ]);

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
      setHistory(prev => [
        ...prev.slice(0, -1),
        {
          type: 'error',
          content: 'An error occurred. Please try again.',
          id: Date.now() + 2
        }
      ]);
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
      <Header status={status} />
      <OutputPane ref={outputRef}>
        {history.map((message) => (
          <OutputLine key={message.id}>
            <Message message={message} />
          </OutputLine>
        ))}
        <Input
          value={input}
          onChange={handleChange}
          onSubmit={handleSubmit}
          disabled={status === 'processing'}
          inputRef={inputRef}
        />
      </OutputPane>
    </TerminalContainer>
  );
} 