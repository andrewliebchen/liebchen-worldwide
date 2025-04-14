import { Analytics } from '@vercel/analytics/next';
import { QueryProvider } from '@/src/context/QueryContext';
import { ConversationProvider } from '@/src/context/ConversationContext';
import { GlobalStyle } from '@/src/styles/global';

function MyApp({ Component, pageProps }) {
  return (
    <QueryProvider>
      <ConversationProvider>
        <GlobalStyle />
        <Component {...pageProps} />
        <Analytics />
      </ConversationProvider>
    </QueryProvider>
  );
}

export default MyApp; 