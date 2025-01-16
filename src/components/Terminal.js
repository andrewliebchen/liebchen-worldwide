import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';
import { handleCommand } from '../commands/handler';

const TerminalContainer = styled.div`
  background-color: #1a1b26;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const OutputPane = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 20px;

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
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #24283b;
  padding: 10px 20px;
  border-radius: 4px;
  margin: 0 20px 20px 20px;
`;

const Prompt = styled.span`
  color: #7aa2f7;
  margin-right: 10px;
`;

const Input = styled.input`
  background: none;
  border: none;
  color: #a9b1d6;
  font-family: inherit;
  font-size: 16px;
  width: 100%;
  outline: none;

  &::placeholder {
    color: #565f89;
  }
`;

const OutputLine = styled.div`
  margin: 8px 0;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const TypewriterWrapper = styled.div`
  .Typewriter__cursor {
    display: none;
  }
`;

const LoadingDots = styled.div`
  color: #7aa2f7;
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

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;


const HeaderText = styled.span`
  color: #7aa2f7;
  font-size: 14px;
  margin-left: 8px;
`;

const HeaderStatus = styled.div`
  color: ${props => props.isProcessing ? '#7aa2f7' : '#565f89'};
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
    background-color: ${props => props.isProcessing ? '#7aa2f7' : '#28c841'};
  }
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  color: #565f89;  // Darker color for user messages
`;

const Terminal = () => {
  const [history, setHistory] = useState([{
    type: 'system',
    content: 'Welcome to Andrew.AI Terminal Portfolio\nType \'help\' to explore commands.',
    id: Date.now()
  }]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState({
    awaitingCaseStudy: false,
    inCaseStudy: false,
    currentCaseStudy: null
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = async (command) => {
    // Immediately add the user's command to history
    const commandEntry = { 
      type: 'command', 
      content: command,
      id: Date.now()
    };
    
    const thinkingEntry = {
      type: 'thinking',
      content: '',
      id: Date.now() + 1
    };

    setHistory(prev => [...prev, commandEntry, thinkingEntry]);
    setIsProcessing(true);

    try {
      const response = await handleCommand(command, context);

      if (response.type === 'clear') {
        setHistory([]);
        setContext({ 
          awaitingCaseStudy: false, 
          inCaseStudy: false,
          currentCaseStudy: null 
        });
        return;
      }

      // Replace the thinking entry with the actual response
      setHistory(prev => [
        ...prev.slice(0, -1), // Remove thinking entry
        {
          type: response.type,
          content: response.content,
          id: Date.now() + 2
        }
      ]);

      setContext({
        awaitingCaseStudy: response.awaitCaseStudy || false,
        inCaseStudy: response.type === 'case-study',
        currentCaseStudy: response.currentCaseStudy || null
      });
    } catch (error) {
      // Replace thinking entry with error message
      setHistory(prev => [
        ...prev.slice(0, -1),
        {
          type: 'error',
          content: 'An error occurred. Please try again.',
          id: Date.now() + 2
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;
    
    processCommand(input.trim());
    setInput('');
  };

  const renderContent = (entry) => {
    if (entry.type === 'command') {
      return (
        <CommandLine>
          <Prompt>❯</Prompt> {entry.content}
        </CommandLine>
      );
    }

    if (entry.type === 'thinking') {
      return <LoadingDots>Thinking</LoadingDots>;
    }

    return (
      <TypewriterWrapper>
        <Typewriter
          options={{
            delay: 5,
            cursor: ''
          }}
          onInit={(typewriter) => {
            typewriter
              .typeString(entry.content)
              .start();
          }}
        />
      </TypewriterWrapper>
    );
  };

  return (
    <TerminalContainer>
      <TerminalHeader>
        <HeaderTitle>
          <HeaderText>andrew.ai ~ terminal</HeaderText>
        </HeaderTitle>
        <HeaderStatus isProcessing={isProcessing}>
          {isProcessing ? 'processing' : 'connected'}
        </HeaderStatus>
      </TerminalHeader>
      <OutputPane ref={outputRef}>
        {history.map((entry) => (
          <OutputLine key={entry.id}>
            {entry.type === 'case-study' || entry.type === 'ai-response' ? (
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            ) : (
              renderContent(entry)
            )}
          </OutputLine>
        ))}
      </OutputPane>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Prompt>❯</Prompt>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' to explore commands..."
            autoFocus
            disabled={isProcessing}
          />
        </InputContainer>
      </form>
    </TerminalContainer>
  );
};

export default Terminal; 