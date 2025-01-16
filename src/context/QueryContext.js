import React, { createContext, useContext, useState, useEffect } from 'react';

const QueryContext = createContext();

export const QueryProvider = ({ children }) => {
  const [queryCount, setQueryCount] = useState(0);

  // Log whenever queryCount changes
  useEffect(() => {
    console.log('QueryContext: queryCount changed to:', queryCount);
  }, [queryCount]);

  const incrementQuery = () => {
    console.log('QueryContext: incrementQuery called, current count:', queryCount);
    setQueryCount(prev => {
      const newCount = Math.min(prev + 1, 5);
      console.log('QueryContext: new count will be:', newCount);
      return newCount;
    });
  };

  const resetQueries = () => {
    console.log('QueryContext: resetQueries called');
    setQueryCount(0);
  };

  const value = {
    queryCount,
    incrementQuery,
    resetQueries,
    remainingQueries: 5 - queryCount
  };

  return (
    <QueryContext.Provider value={value}>
      {children}
    </QueryContext.Provider>
  );
};

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (context === undefined) {
    throw new Error('useQuery must be used within a QueryProvider');
  }
  return context;
}; 