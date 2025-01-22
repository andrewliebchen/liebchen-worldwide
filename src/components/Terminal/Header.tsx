import React from 'react';
import Image from 'next/image';
import { TerminalHeader, HeaderTitle, HeaderAvatar, HeaderText, QueryCount } from '@/src/styles/components/terminal.styles';
import { useQuery } from '@/src/context/QueryContext';

const generateProgressBar = (used: number, total: number = 5) => {
  if (used >= total) {
    return '█████ No queries left';
  }
  const filled = '█'.repeat(used);
  const empty = '░'.repeat(total - used);
  const remaining = total - used;
  return `${filled}${empty} ${remaining} ${remaining === 1 ? 'query' : 'queries'} left`;
};

export const Header: React.FC = () => {
  const { queryCount, aiEnabled } = useQuery();

  return (
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
        <HeaderText>Andrew.ai Terminal</HeaderText>
      </HeaderTitle>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {aiEnabled && (
          <QueryCount>
            {generateProgressBar(queryCount ?? 0)}
          </QueryCount>
        )}
      </div>
    </TerminalHeader>
  );
}; 