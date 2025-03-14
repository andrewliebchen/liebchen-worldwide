export type MessageType = 'system' | 'command' | 'thinking' | 'error' | 'ai-response' | 'case-study';

export type StatusType = 
  | 'error'
  | 'processing'
  | 'thinking'
  | 'loading'
  | 'connected'
  | 'connecting'
  | 'reconnecting'
  | 'offline';

export interface Message {
  type: MessageType;
  content: string;
  id: number;
}

export interface TerminalContext {
  awaitingCaseStudy: boolean;
  inCaseStudy: boolean;
  currentCaseStudy: string | null;
}

export interface CommandResponse {
  type: MessageType;
  content: string;
  awaitCaseStudy?: boolean;
  currentCaseStudy?: string;
}

export interface TypewriterTextProps {
  content: string;
}

export interface HeaderStatusProps {
  $status: StatusType;
}

export interface QueryState {
  queryCount: number;
  incrementQuery: () => void;
  resetQueries: () => void;
} 