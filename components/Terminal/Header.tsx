import React from 'react';
import Image from 'next/image';
import { TerminalHeader, HeaderTitle, HeaderAvatar, HeaderText, HeaderStatus } from '../styles/terminal.styles';
import type { StatusType } from '../types/terminal';

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

export const Header: React.FC<HeaderProps> = ({ status }) => {
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
      <HeaderStatus $status={status}>
        {getStatusText(status)}
      </HeaderStatus>
    </TerminalHeader>
  );
}; 