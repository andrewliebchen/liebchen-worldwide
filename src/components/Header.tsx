import React from 'react';
import { TerminalHeader, HeaderContainer, HeaderTagline, QueryCount } from '@/src/styles/components/terminal.styles';
import { useQuery } from '@/src/context/QueryContext';
import { useConversation } from '@/src/context/ConversationContext';

const generateProgressBar = (used: number, total: number = 5) => {
  if (used >= total) {
    return '█████ No AI queries left';
  }
  const filled = '█'.repeat(used);
  const empty = '░'.repeat(total - used);
  const remaining = total - used;
  return `${filled}${empty} ${remaining} AI ${remaining === 1 ? 'query' : 'queries'} left`;
};

export const Header: React.FC = () => {
  const { queryCount, aiEnabled } = useQuery();
  const { currentTopic } = useConversation();

  return (
    <TerminalHeader>
      <HeaderContainer>
        <HeaderTagline>{currentTopic}</HeaderTagline>
        {aiEnabled && (
          <QueryCount>
            {generateProgressBar(queryCount ?? 0)}
          </QueryCount>
        )}
      </HeaderContainer>
    </TerminalHeader>
  );
}; 