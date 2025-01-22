import React from 'react';
import Image from 'next/image';
import { TerminalHeader, HeaderTitle, HeaderAvatar, HeaderText, QueryCount, HeaderContainer, HeaderVersion } from '@/src/styles/components/terminal.styles';
import { useQuery } from '@/src/context/QueryContext';

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

  return (
    <TerminalHeader>
      <HeaderContainer>
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
        <HeaderText>Andrew.AI Portfolio <HeaderVersion>v0.1.0</HeaderVersion></HeaderText>
      </HeaderTitle>
      {aiEnabled && (
        <QueryCount>
          {generateProgressBar(queryCount ?? 0)}
        </QueryCount>
      )}
      </HeaderContainer>
    </TerminalHeader>
  );
}; 