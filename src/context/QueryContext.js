import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [queryCount, setQueryCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiEnabled, setAiEnabled] = useState(false);

  const resetSession = async () => {
    try {
      const response = await fetch('/api/queries/reset', {
        method: 'POST'
      });
      const data = await response.json();
      setQueryCount(data.queryCount);
      setAiEnabled(data.aiEnabled);
      return data.queryCount;
    } catch (error) {
      console.error('Failed to reset session:', error);
      return queryCount;
    }
  };

  const syncWithServer = useCallback(async () => {
    try {
      const response = await fetch('/api/queries/count');
      const data = await response.json();
      setQueryCount(data.queryCount);
      setAiEnabled(data.aiEnabled);
      return data.queryCount;
    } catch (error) {
      console.error('Failed to sync with server:', error);
      return queryCount;
    }
  }, [queryCount]);

  // Initialize query count and reset session on mount
  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await syncWithServer();
      setIsLoading(false);
    };
    initialize();
  }, [syncWithServer]);

  return (
    <QueryContext.Provider value={{ 
      queryCount: queryCount ?? 0, 
      resetSession,
      syncWithServer,
      isLoading,
      aiEnabled
    }}>
      {children}
    </QueryContext.Provider>
  );
}

export function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
} 