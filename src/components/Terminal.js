import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';
import ReactMarkdown from 'react-markdown';
import { handleCommand } from '../commands/handler';
import headshot from '../images/Headshot.webp';

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

const HeaderAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
  border: 1px solid #565f89;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderText = styled.span`
  color: #7aa2f7;
  font-size: 14px;
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

const ErrorMessage = styled.div`
  color: #f7768e;
  font-style: italic;
`;

const TypewriterMarkdown = ({ content }) => {
  const [typedContent, setTypedContent] = useState('');
  
  return (
    <TypewriterWrapper>
      <Typewriter
        options={{
          delay: 5,
          cursor: ''
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(content)
            .callFunction(() => {
              setTypedContent(content);
            })
            .start();
        }}
      />
      {typedContent && <ReactMarkdown>{typedContent}</ReactMarkdown>}
    </TypewriterWrapper>
  );
};

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
  }, [history, isProcessing]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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

      // Only update context if not a throttled response
      if (response.type !== 'error') {
        setContext({
          awaitingCaseStudy: response.awaitCaseStudy || false,
          inCaseStudy: response.type === 'case-study',
          currentCaseStudy: response.currentCaseStudy || null
        });
      }
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

  return (
    <TerminalContainer onClick={handleTerminalClick}>
      <TerminalHeader>
        <HeaderTitle>
          <HeaderAvatar src={headshot} alt="Andrew Liebchen" />
          <HeaderText>andrew.ai ~ terminal</HeaderText>
        </HeaderTitle>
        <HeaderStatus isProcessing={isProcessing}>
          {isProcessing ? 'processing' : 'connected'}
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
              <TypewriterMarkdown content={entry.content} />
            )}
          </OutputLine>
        ))}
      </OutputPane>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Prompt>❯</Prompt>
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' to explore commands..."
            disabled={isProcessing}
          />
        </InputContainer>
      </form>
    </TerminalContainer>
  );
};

export default Terminal; 