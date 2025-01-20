import Terminal from '../src/components/Terminal';
import { QueryProvider } from '../src/context/QueryContext';
import { GlobalStyle } from '../src/styles/global';

export default function Home() {
  return (
    <QueryProvider>
      <GlobalStyle />
      <Terminal />
    </QueryProvider>
  );
} 