import Terminal from '@components/Terminal';
import { QueryProvider } from '@context/QueryContext';
import { GlobalStyle } from '@/src/styles/global';

export default function Home() {
  return (
    <QueryProvider>
      <GlobalStyle />
      <Terminal />
    </QueryProvider>
  );
} 