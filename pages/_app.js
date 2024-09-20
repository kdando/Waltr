// pages/_app.js

import { LoadingProvider } from '@/contexts/LoadingContext';
import { CollectionProvider } from '../contexts/CollectionContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <LoadingProvider>
      <CollectionProvider>
        <Component {...pageProps} />
      </CollectionProvider>
    </LoadingProvider>
  );
}

export default MyApp;