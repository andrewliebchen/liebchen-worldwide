import { Analytics } from '@vercel/analytics/next';
import { QueryProvider } from '@/src/context/QueryContext';
import { ConversationProvider } from '@/src/context/ConversationContext';

function MyApp({ Component, pageProps }) {
  return (
    <QueryProvider>
      <ConversationProvider>
        <Component {...pageProps} />
        <Analytics />
      </ConversationProvider>
    </QueryProvider>
  );
}

export default MyApp; 