import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { colors } from '@/src/styles/theme/colors';

const StyledMarkdown = styled.div`
  font-family: inherit;
  color: inherit;
  
  a {
    color: ${colors.text.link};
    text-decoration: underline;
    padding: 2px;
    margin: -2px;

    &:hover {
      background-color: ${colors.bg.secondary};
    }
  }

  code {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 4px;
    border-radius: 3px;
  }

  strong {
    color: ${colors.text.accent};
  }

  p {
    margin: 0;
    padding: 0;
  }
`;

interface MarkdownResponseProps {
  content: string;
}

const MarkdownResponse: React.FC<MarkdownResponseProps> = ({ content }) => {
  return (
    <StyledMarkdown>
      <ReactMarkdown
        allowedElements={['p', 'code', 'strong', 'a']}
        unwrapDisallowed={true}
      >
        {content}
      </ReactMarkdown>
    </StyledMarkdown>
  );
};

export default MarkdownResponse; 