import React from 'react';
import Image from 'next/image';
import { TerminalHeader, HeaderTitle, HeaderAvatar, HeaderText, HeaderStatus, QueryCount } from '../styles/terminal.styles';
import type { StatusType } from '../types/terminal';
import { useQuery } from '../../context/QueryContext';

interface HeaderProps {
  status: StatusType;
}

const getStatusText = (status: StatusType): string => {
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

const generateProgressBar = (used: number, total: number = 5) => {
  if (used >= total) {
    return '█████ No queries left';
  }
  const filled = '█'.repeat(used);
  const empty = '░'.repeat(total - used);
  const remaining = total - used;
  return `${filled}${empty} ${remaining} ${remaining === 1 ? 'query' : 'queries'} left`;
};

export const Header: React.FC<HeaderProps> = ({ status }) => {
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
        <HeaderText>andrew.ai ~ terminal</HeaderText>
      </HeaderTitle>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {aiEnabled && (
          <QueryCount>
            {generateProgressBar(queryCount ?? 0)}
          </QueryCount>
        )}
        <HeaderStatus $status={status}>
          {getStatusText(status)}
        </HeaderStatus>
      </div>
    </TerminalHeader>
  );
}; 