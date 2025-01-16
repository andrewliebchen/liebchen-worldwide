import React, { createContext, useContext, useState } from 'react';

const QueryContext = createContext();

export function QueryProvider({ children }) {
  const [queryCount, setQueryCount] = useState(0);

  const incrementQuery = () => {
    setQueryCount(prev => Math.min(prev + 1, 5));
  };

  const resetQueries = () => {
    setQueryCount(0);
  };

  return (
    <QueryContext.Provider value={{ queryCount, incrementQuery, resetQueries }}>
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