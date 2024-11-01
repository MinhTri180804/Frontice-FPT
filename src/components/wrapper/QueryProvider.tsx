import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

const reactQueryDevToolsOpen: boolean = import.meta.env.DEV ? true : false;

interface QueryProviderProps {
  children: ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={reactQueryDevToolsOpen} />
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
