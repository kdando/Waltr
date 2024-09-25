// pages/_app.js

import { LoadingProvider } from '@/contexts/LoadingContext';
import { CollectionProvider } from '../contexts/CollectionContext';
import '../styles/globals.css';
import Layout from '../components/Layout'; // Import the Layout

function MyApp({ Component, pageProps }) {
  return (
    <LoadingProvider>
      <CollectionProvider>
        {/* Wrap the page component with the global Layout */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CollectionProvider>
    </LoadingProvider>
  );
}

export default MyApp;
