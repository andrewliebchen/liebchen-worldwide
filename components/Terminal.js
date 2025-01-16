import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import { handleCommand } from '../commands/handler';
import { useQuery } from '../context/QueryContext';
import Image from 'next/image';

const TerminalContainer = styled.div`
  background-color: #1a1b26;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`;

const OutputPane = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 20px;
  -webkit-overflow-scrolling: touch;
  position: relative;

  strong {
    color: #7aa2f7;
  }

  a {
    color: #7dcfff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  ul {
    list-style: none;
    padding-left: 0;
    margin: 4px 0;
  }

  li {
    padding-left: 16px;
    position: relative;
    margin: 4px 0;
    line-height: 1.4;

    &:before {
      content: ">";
      position: absolute;
      left: 0;
      color: #565f89;
    }
  }

  p {
    margin: 8px 0;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #24283b;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
`;

const Prompt = styled.span`
  color: #7aa2f7;
  margin-right: 10px;
  min-width: 20px;
  display: inline-flex;
  justify-content: center;
`;

const Input = styled.input`
  background: none;
  border: none;
  color: #a9b1d6;
  font-family: inherit;
  font-size: 16px;
  width: 100%;
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0;
  margin: 0;
  line-height: normal;
  position: relative;
  z-index: 2;

  &::placeholder {
    color: #565f89;
  }
`;

const OutputLine = styled.div`
  margin: 8px 0;
  line-height: 1.5;
  white-space: pre-wrap;
  padding-left: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding-left: 30px;
`;

const MessageContent = styled.div`
  flex: 1;
  min-width: 0; // Prevents flex item from overflowing
`;

const TypewriterWrapper = styled.div`
  .Typewriter__cursor {
    display: none;
  }
`;

const QueryCount = styled.div`
  color: #565f89;
  font-size: 12px;
  font-family: monospace;
  flex-shrink: 0;
  padding-top: 2px;
`;

const LoadingDots = styled.div`
  color: #7aa2f7;
  padding-left: 30px;
  &:after {
    content: '.';
    animation: dots 1.5s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60% { content: '...'; }
    80%, 100% { content: ''; }
  }
`;

const TerminalHeader = styled.div`
  background-color: #24283b;
  padding: 8px 20px;
  border-bottom: 1px solid #565f89;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  position: relative;
  margin-right: 8px;
  border: 1px solid #565f89;
  overflow: hidden;
  background-color: #1a1b26;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.span`
  color: #7aa2f7;
  font-size: 14px;
`;

const getStatusColor = (status) => {
  switch (status) {
    case 'error':
      return '#f7768e';
    case 'processing':
    case 'thinking':
    case 'loading':
      return '#7aa2f7';
    case 'connected':
      return '#28c841';
    case 'connecting':
    case 'reconnecting':
      return '#e0af68';
    case 'offline':
      return '#565f89';
    default:
      return '#565f89';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'error':
      return 'Error occurred';
    case 'processing':
      return 'Sending to OpenAI';
    case 'thinking':
      return 'Thinking...';
    case 'loading':
      return 'Loading content';
    case 'connected':
      return 'Connected';
    case 'connecting':
      return 'Connecting';
    case 'reconnecting':
      return 'Reconnecting';
    case 'offline':
      return 'Offline';
    default:
      return 'Idle';
  }
};

const HeaderStatus = styled.div`
  color: ${props => getStatusColor(props.$status)};
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => getStatusColor(props.$status)};
  }
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  color: #565f89;
  padding-left: 0;
`;

const ErrorMessage = styled.div`
  color: #f7768e;
  font-style: italic;
  padding-left: 30px;
`;

const TypewriterText = ({ content }) => {
  // Split content to separate the progress bar from the message
  const [message, progressBar] = content.split('\n\n').slice(-2);
  
  return (
    <MessageContainer>
      <MessageContent>
        <TypewriterWrapper>
          <Typewriter
            options={{
              delay: 5,
              cursor: ''
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(message)
                .start();
            }}
          />
        </TypewriterWrapper>
      </MessageContent>
      {progressBar && <QueryCount>{progressBar}</QueryCount>}
    </MessageContainer>
  );
};

const Terminal = () => {
  const { queryCount, incrementQuery, resetQueries } = useQuery();
  const [history, setHistory] = useState([{
    type: 'system',
    content: 'Welcome to Andrew.AI Terminal Portfolio\nType \'help\' to explore commands.\n\n░░░░░ 5 queries left',
    id: Date.now()
  }]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState({
    awaitingCaseStudy: false,
    inCaseStudy: false,
    currentCaseStudy: null
  });
  const [status, setStatus] = useState('connected');
  const outputRef = useRef(null);
  const inputRef = useRef(null);

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

  const processCommand = async (command) => {
    console.log('Terminal: Processing command:', command);
    console.log('Terminal: Current queryCount:', queryCount);
    
    const commandEntry = { 
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

    const thinkingEntry = {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || status === 'processing') return;
    
    processCommand(input.trim());
    setInput('');
  };

  return (
    <TerminalContainer onClick={handleTerminalClick}>
      <TerminalHeader>
        <HeaderTitle>
          <HeaderAvatar>
            <Image
              src="/headshot.webp"
              alt="Andrew Liebchen"
              fill
              sizes="24px"
              priority
              style={{ objectFit: 'cover' }}
            />
          </HeaderAvatar>
          <HeaderText>andrew.ai ~ terminal</HeaderText>
        </HeaderTitle>
        <HeaderStatus $status={status}>
          {getStatusText(status)}
        </HeaderStatus>
      </TerminalHeader>
      <OutputPane ref={outputRef}>
        {history.map((entry) => (
          <OutputLine key={entry.id}>
            {entry.type === 'command' ? (
              <CommandLine>
                <Prompt>❯</Prompt> {entry.content}
              </CommandLine>
            ) : entry.type === 'thinking' ? (
              <LoadingDots>Thinking</LoadingDots>
            ) : entry.type === 'error' ? (
              <ErrorMessage>{entry.content}</ErrorMessage>
            ) : (
              <TypewriterText content={entry.content} />
            )}
          </OutputLine>
        ))}
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Prompt>❯</Prompt>
            <Input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type 'help' to explore commands..."
              disabled={status === 'processing'}
            />
          </InputContainer>
        </form>
      </OutputPane>
    </TerminalContainer>
  );
};

export default Terminal; 