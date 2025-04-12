import React, { createContext, useContext, useState } from 'react';

interface ConversationContextType {
  currentTopic: string;
  setCurrentTopic: (topic: string) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: React.ReactNode }) {
  const [currentTopic, setCurrentTopic] = useState<string>('Liebchen.world is initialized');

  return (
    <ConversationContext.Provider value={{ currentTopic, setCurrentTopic }}>
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
} 