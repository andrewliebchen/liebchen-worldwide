export type MessageType = 'system' | 'command' | 'thinking' | 'error' | 'ai-response' | 'case-study' | 'response';

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
  caseStudy?: string;
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
  caseStudy?: string;
  dynamicCommands?: {
    label: string;
    command: string;
    hotkey?: string;
  }[];
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

export interface Action {
  type: 'video' | 'link' | 'case-study';
  payload: {
    videoId?: string;
    title?: string;
    description?: string;
    buttonText?: string;
  };
}

export interface AIResponse {
  text: string;
  caseStudy?: string;  // Optional identifier for which case study to show
} 